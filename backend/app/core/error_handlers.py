from __future__ import annotations

import logging
from typing import Any, Dict, Optional

from fastapi import Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from app.core.exceptions import AppError, MisconfigurationError, UpstreamLLMError
from app.core.logging import request_id_ctx
from app.schemas.errors import ErrorResponse

logger = logging.getLogger(__name__)


def _rid() -> Optional[str]:
    return request_id_ctx.get() or None


def app_error_handler(_: Request, exc: AppError) -> JSONResponse:
    """
    Handles known, typed domain errors.
    """
    rid = _rid()

    # map error type -> status
    status_code = 400
    if isinstance(exc, MisconfigurationError):
        status_code = 500
    elif isinstance(exc, UpstreamLLMError):
        status_code = 502

    # log with code + details; message is safe
    logger.warning(
        "handled app error",
        extra={"error_code": exc.code, "details": exc.details, "request_id": rid},
    )

    body = ErrorResponse(
        error=exc.code,
        message=exc.message,
        request_id=rid,
        details=exc.details,
    ).model_dump()

    return JSONResponse(status_code=status_code, content=body)


def validation_error_handler(_: Request, exc: RequestValidationError) -> JSONResponse:
    """
    Invalid request payload (Pydantic/FastAPI).
    """
    rid = _rid()

    # Pydantic gives structured validation errors
    details: Dict[str, Any] = {"errors": exc.errors()}

    logger.info(
        "request validation failed",
        extra={"details": details, "request_id": rid},
    )

    body = ErrorResponse(
        error="validation_error",
        message="Request payload validation failed",
        request_id=rid,
        details=details,
    ).model_dump()

    return JSONResponse(status_code=422, content=body)


def unhandled_exception_handler(_: Request, exc: Exception) -> JSONResponse:
    """
    Internal errors (bugs, unexpected states). Avoid leaking internals to clients.
    """
    rid = _rid()

    logger.exception(
        "unhandled exception",
        extra={"request_id": rid},
    )

    body = ErrorResponse(
        error="internal_error",
        message="An unexpected error occurred",
        request_id=rid,
    ).model_dump()

    return JSONResponse(status_code=500, content=body)

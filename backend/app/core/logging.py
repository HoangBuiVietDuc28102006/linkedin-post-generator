from __future__ import annotations

import logging
import sys
import uuid
from contextvars import ContextVar
from typing import Optional

from app.core.config import get_settings

try:
    from pythonjsonlogger import jsonlogger
except Exception:  # fallback if not installed
    jsonlogger = None


# Per-request context
request_id_ctx: ContextVar[Optional[str]] = ContextVar("request_id", default=None)


class RequestIdFilter(logging.Filter):
    def filter(self, record: logging.LogRecord) -> bool:
        record.request_id = request_id_ctx.get() or "-"
        return True


def set_request_id(value: Optional[str] = None) -> str:
    rid = value or str(uuid.uuid4())
    request_id_ctx.set(rid)
    return rid


def _build_formatter(json_mode: bool) -> logging.Formatter:
    if json_mode and jsonlogger is not None:
        formatter = jsonlogger.JsonFormatter(
            fmt="%(asctime)s %(levelname)s %(name)s %(message)s %(request_id)s",
        )
        return formatter

    # human-readable formatter
    return logging.Formatter(
        fmt="%(asctime)s | %(levelname)s | %(name)s | %(request_id)s | %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )


def configure_logging() -> None:
    """
    Configure app + uvicorn loggers.
    Call once on startup (before creating noise).
    """
    settings = get_settings()

    # Root logger
    root = logging.getLogger()
    root.setLevel(settings.log_level.upper())

    # Clear existing handlers to avoid duplicate logs (common with reload)
    root.handlers.clear()

    handler = logging.StreamHandler(sys.stdout)
    handler.setLevel(settings.log_level.upper())
    handler.setFormatter(_build_formatter(settings.log_json))
    handler.addFilter(RequestIdFilter())
    root.addHandler(handler)

    # Make uvicorn loggers use root handlers/format
    for logger_name in ("uvicorn", "uvicorn.error", "uvicorn.access"):
        uv_logger = logging.getLogger(logger_name)
        uv_logger.handlers.clear()
        uv_logger.propagate = True
        uv_logger.setLevel(settings.log_level.upper())

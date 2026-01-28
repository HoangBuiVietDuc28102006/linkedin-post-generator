import logging
import time

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import get_settings
from app.core.logging import configure_logging, set_request_id

# Settings & Logging

settings = get_settings()

configure_logging()
logger = logging.getLogger(__name__)

# App

app = FastAPI(
    title=settings.app_name,
    debug=settings.debug,
)

# Middlewware

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.normalized_cors_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def request_context_middleware(request: Request, call_next):
    start_time = time.time()

    # Use incoming request id if provided, else generate one
    incoming_request_id = request.headers.get("x-request-id")
    request_id = set_request_id(incoming_request_id)

    response = await call_next(request)

    duration_ms = int((time.time() - start_time) * 1000)

    response.headers["x-request-id"] = request_id

    logger.info(
        "request completed",
        extra={
            "method": request.method,
            "path": request.url.path,
            "status_code": response.status_code,
            "duration_ms": duration_ms,
        },
    )

    return response

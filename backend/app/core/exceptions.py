from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Dict, Optional


@dataclass
class AppError(Exception):
    """
    Base app error with a stable error code and optional details.
    """
    code: str
    message: str
    details: Optional[Dict[str, Any]] = None


@dataclass
class MisconfigurationError(AppError):
    """
    Raised when required environment/config is missing or invalid.
    """
    code: str = "misconfiguration"
    message: str = "Service is misconfigured"
    details: Optional[Dict[str, Any]] = None


@dataclass
class UpstreamLLMError(AppError):
    """
    Raised when the LLM provider fails (timeouts, API errors, etc.).
    """
    code: str = "upstream_llm_failure"
    message: str = "Upstream LLM provider failed"
    details: Optional[Dict[str, Any]] = None

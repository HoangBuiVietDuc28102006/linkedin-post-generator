from __future__ import annotations

from typing import Any, Dict, Optional

from pydantic import BaseModel, Field


class ErrorResponse(BaseModel):
    error: str = Field(..., description="Stable machine-readable error code")
    message: str = Field(..., description="Human-readable error message")
    request_id: Optional[str] = Field(default=None, description="Correlates logs for this request")
    details: Optional[Dict[str, Any]] = Field(default=None, description="Optional extra context")

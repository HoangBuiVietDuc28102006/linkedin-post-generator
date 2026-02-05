from __future__ import annotations

from functools import lru_cache

from app.core.config import get_settings
from app.core.exceptions import MisconfigurationError
from app.integrations.llms.base import LLMClient
from app.integrations.llms.openai_client import OpenAIClient


@lru_cache
def get_llm_client() -> LLMClient:
    settings = get_settings()

    provider = (settings.llm_provider or "").strip().lower()
    if provider == "openai":
        if not settings.openai_api_key:
            raise MisconfigurationError(
                message="OPENAI_API_KEY is not set but LLM_PROVIDER=openai",
                details={"env_var": "OPENAI_API_KEY", "provider": "openai"},
            )
        return OpenAIClient(
            api_key=settings.openai_api_key,
            default_model=settings.openai_model,
        )

    raise MisconfigurationError(
        message=f"Unsupported LLM_PROVIDER={settings.llm_provider!r}",
        details={"provider": settings.llm_provider, "supported": ["openai"]},
    )

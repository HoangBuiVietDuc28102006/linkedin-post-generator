from __future__ import annotations

from functools import lru_cache

from app.core.config import get_settings
from app.integrations.llms.base import LLMClient
from app.integrations.llms.openai_client import OpenAIClient


@lru_cache
def get_llm_client() -> LLMClient:
    """
    Dependency provider for the configured LLM client.

    Cached so we reuse one client per process (recommended for HTTP client reuse).
    """
    settings = get_settings()

    provider = (settings.llm_provider or "").strip().lower()
    if provider == "openai":
        
        if not settings.openai_api_key:
            raise RuntimeError(
                "OPENAI_API_KEY is not set but LLM_PROVIDER=openai. "
                "Set OPENAI_API_KEY in environment variables."
            )
        print(settings.openai_api_key)
        return OpenAIClient(
            api_key=settings.openai_api_key,
            default_model=settings.openai_model,
        )

    raise RuntimeError(
        f"Unsupported LLM_PROVIDER={settings.llm_provider!r}. "
        "Supported providers: 'openai'."
    )

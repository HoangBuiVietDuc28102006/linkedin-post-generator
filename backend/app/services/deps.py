from functools import lru_cache

from app.integrations.llms.deps import get_llm_client
from app.services.post_generation_service import PostGenerationService


@lru_cache
def get_post_generation_service() -> PostGenerationService:
    """
    Dependency provider for PostGenerationService.

    Cached so we reuse one instance per process.
    Later, this is where you’d inject an LLM client, settings, etc.
    """
    llm_client = get_llm_client()
    return PostGenerationService(llm=llm_client)
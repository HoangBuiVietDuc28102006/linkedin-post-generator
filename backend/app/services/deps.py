from functools import lru_cache

from app.services.post_generation_service import PostGenerationService


@lru_cache
def get_post_generation_service() -> PostGenerationService:
    """
    Dependency provider for PostGenerationService.

    Cached so we reuse one instance per process.
    Later, this is where you’d inject an LLM client, settings, etc.
    """
    return PostGenerationService()

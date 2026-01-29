import logging
from typing import Optional

from app.schemas.post_generation import (
    PostGenerationRequest,
    PostGenerationResponse,
)

logger = logging.getLogger(__name__)


class PostGenerationService:
    """
    Orchestrates LinkedIn post generation.

    Responsibilities:
    - Validate and normalize input
    - Build prompt (later)
    - Call LLM provider (later)
    - Post-process output (later)
    """

    def __init__(self) -> None:
        # Later:
        # - inject LLM client
        # - inject feature flags
        pass

    def generate(self, data: PostGenerationRequest) -> PostGenerationResponse:
        """
        Generate a LinkedIn post based on user input.
        """

        logger.info(
            "starting post generation",
            extra={
                "topic": data.topic,
                "tone": data.tone,
                "length": data.length,
            },
        )

        # TEMP placeholder implementation
        content = self._placeholder_content(data)

        logger.info("post generation completed")

        return PostGenerationResponse(content=content)

    # -----------------------
    # Internal helpers
    # -----------------------

    def _placeholder_content(self, data: PostGenerationRequest) -> str:
        """
        Temporary implementation until LLM integration is added.
        """
        keywords = ", ".join(data.keywords) if data.keywords else "no keywords"

        return (
            f"🚀 Topic: {data.topic}\n\n"
            f"{data.description}\n\n"
            f"Tone: {data.tone}\n"
            f"Length: {data.length}\n"
            f"Keywords: {keywords}\n\n"
            "👉 Generated content will appear here."
        )

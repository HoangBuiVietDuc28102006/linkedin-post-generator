import logging

from app.core.exceptions import UpstreamLLMError
from app.integrations.llms.base import LLMClient
from app.schemas.post_generation import PostGenerationRequest, PostGenerationResponse
from app.services.prompt_builder import PromptBuilder

logger = logging.getLogger(__name__)


class PostGenerationService:
    def __init__(self, llm: LLMClient) -> None:
        self._llm = llm
        self._prompt_builder = PromptBuilder()

    @property
    def llm(self) -> LLMClient:
        return self._llm

    def generate(self, data: PostGenerationRequest) -> PostGenerationResponse:
        logger.info(
            "starting post generation",
            extra={
                "topic": data.topic,
                "tone": data.tone,
                "length": data.length,
                "llm_provider": self._llm.provider_name,
            },
        )

        prompt = self._prompt_builder.build_post_generation(data)

        try:
            llm_response = self._llm.generate(
                prompt.messages,
                config=prompt.config,
            )
        except Exception as e:
            # provider-specific exceptions get normalized here
            raise UpstreamLLMError(
                message="LLM generation failed",
                details={"provider": self._llm.provider_name},
            ) from e

        content = (llm_response.content or "").strip()

        if not content:
            # Treat empty content as upstream failure (often indicates provider trouble)
            raise UpstreamLLMError(
                message="LLM returned empty content",
                details={"provider": self._llm.provider_name, "model": llm_response.model},
            )

        logger.info(
            "post generation completed",
            extra={"model": llm_response.model, "provider": self._llm.provider_name},
        )

        return PostGenerationResponse(content=content)
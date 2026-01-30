import logging

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

        llm_response = self._llm.generate(
            prompt.messages,
            config=prompt.config,
        )

        content = (llm_response.content or "").strip()

        logger.info(
            "post generation completed",
            extra={
                "llm_model": llm_response.model,
                "prompt_tokens": getattr(getattr(llm_response, "usage", None), "prompt_tokens", None),
                "completion_tokens": getattr(getattr(llm_response, "usage", None), "completion_tokens", None),
                "total_tokens": getattr(getattr(llm_response, "usage", None), "total_tokens", None),
            },
        )

        return PostGenerationResponse(content=content)
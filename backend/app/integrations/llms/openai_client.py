from __future__ import annotations

import logging
from typing import Any, Dict, Optional, Sequence

from openai import OpenAI

from app.integrations.llms.base import (
    LLMClient,
    LLMGenerationConfig,
    LLMMessage,
    LLMResponse,
    Usage,
)

logger = logging.getLogger(__name__)


class OpenAIClient:
    def __init__(self, *, api_key: str, default_model: str) -> None:
        self._client = OpenAI(api_key=api_key)
        self._default_model = default_model

    @property
    def provider_name(self) -> str:
        return "openai"

    def generate(
        self,
        messages: Sequence[LLMMessage],
        *,
        config: Optional[LLMGenerationConfig] = None,
    ) -> LLMResponse:
        cfg = config or LLMGenerationConfig()
        model = cfg.model or self._default_model

        messages =[
            {
                "role": m.role,
                "content": [
                    {"type": "input_text", "text": m.content}
                ],
            }
            for m in messages
        ]

        params: Dict[str, Any] = {
            "model": model,
            "input": messages,
            "temperature": cfg.temperature,
        }

        if cfg.max_tokens is not None:
            params["max_output_tokens "] = cfg.max_tokens
        if cfg.top_p is not None:
            params["top_p"] = cfg.top_p
        if cfg.presence_penalty is not None:
            params["presence_penalty"] = cfg.presence_penalty
        if cfg.frequency_penalty is not None:
            params["frequency_penalty"] = cfg.frequency_penalty
        if cfg.stop is not None:
            params["stop"] = cfg.stop
        if cfg.seed is not None:
            params["seed"] = cfg.seed

        try:
            response = self._client.responses.create(**params)
        except Exception:
            logger.exception(
                "OpenAI generation failed",
                extra={"model": model, "provider": self.provider_name},
            )
            raise

        output_text = response.output_text or ""

        usage = None
        if response.usage:
            usage = Usage(
                prompt_tokens=response.usage.input_tokens,
                completion_tokens=response.usage.output_tokens,
                total_tokens=response.usage.total_tokens,
            )

        return LLMResponse(
            content=output_text,
            model=getattr(response, "model", None),
            usage=usage,
            raw = response.model_dump() if hasattr(response, "model_dump") else None
        )

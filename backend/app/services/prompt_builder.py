from __future__ import annotations

from dataclasses import dataclass
from typing import List, Union, Literal

from app.integrations.llms.base import LLMGenerationConfig, LLMMessage
from app.schemas.post_generation import PostGenerationRequest


@dataclass(frozen=True)
class PromptBuildResult:
    messages: List[LLMMessage]
    config: LLMGenerationConfig


class PromptBuilder:
    """
    Builds LLM messages + generation config for LinkedIn post generation.
    Keeps prompt logic isolated, testable, and provider-agnostic.
    """

    def build_post_generation(self, data: PostGenerationRequest) -> PromptBuildResult:
        length_instruction = self._length_to_instruction(data.length)
        keywords = ", ".join(data.keywords) if data.keywords else "None"

        system_prompt = (
            "You are an expert LinkedIn ghostwriter.\n"
            "Write high-quality, authentic LinkedIn posts that sound human.\n"
            "Follow instructions precisely. Avoid generic fluff and clichés.\n"
            "Do not mention that you are an AI."
        )

        user_prompt = (
            "Create a LinkedIn post with the following inputs:\n"
            f"- Topic: {data.topic}\n"
            f"- Description: {data.description}\n"
            f"- Keywords: {keywords}\n"
            f"- Tone: {data.tone}\n"
            f"- Length: {length_instruction}\n\n"
            "Guidelines:\n"
            "- Make it engaging and skimmable.\n"
            "- Use short paragraphs.\n"
            "- Include a strong hook in the first 1–2 lines.\n"
            "- Include a clear takeaway.\n"
            "- Do not add hashtags unless explicitly requested.\n"
        )

        messages: List[LLMMessage] = [
            LLMMessage(role="system", content=system_prompt),
            LLMMessage(role="user", content=user_prompt),
        ]

        # Keep defaults here; override later via settings/feature flags.
        config = LLMGenerationConfig(
            temperature=0.7,
            # max_tokens left None by default; can be set based on length later
        )

        return PromptBuildResult(messages=messages, config=config)

    def _length_to_instruction(self, length: Union[Literal["Short", "Medium", "Long"], int]) -> str:
        if isinstance(length, int):
            # keep it strict and explicit
            return f"Approximately {length} words"
        # Presets: map to practical ranges
        preset = length
        if preset == "Short":
            return "Short (about 80–120 words)"
        if preset == "Medium":
            return "Medium (about 150–220 words)"
        if preset == "Long":
            return "Long (about 250–400 words)"
        # Should be unreachable due to schema typing, but safe fallback:
        return str(length)

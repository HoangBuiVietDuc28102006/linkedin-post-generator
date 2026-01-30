from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Dict, List, Optional, Protocol, Sequence, Literal, runtime_checkable


Role = Literal["system", "user", "assistant", "tool", "developer"]


@dataclass(frozen=True)
class LLMMessage:
    role: Role
    content: str


@dataclass(frozen=True)
class LLMGenerationConfig:
    model: Optional[str] = None
    temperature: float = 0.7
    max_tokens: Optional[int] = None

    top_p: Optional[float] = None
    presence_penalty: Optional[float] = None
    frequency_penalty: Optional[float] = None
    stop: Optional[List[str]] = None

    seed: Optional[int] = None
    timeout_s: Optional[float] = None
    retries: int = 0

    request_id: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None


@dataclass(frozen=True)
class Usage:
    prompt_tokens: Optional[int] = None
    completion_tokens: Optional[int] = None
    total_tokens: Optional[int] = None


@dataclass(frozen=True)
class LLMResponse:
    content: str
    model: Optional[str] = None

    usage: Optional[Usage] = None
    raw: Optional[Dict[str, Any]] = None


@runtime_checkable
class LLMClient(Protocol):
    @property
    def provider_name(self) -> str:
        ...

    def generate(
        self,
        messages: Sequence[LLMMessage],
        *,
        config: Optional[LLMGenerationConfig] = None,
    ) -> LLMResponse:
        ...

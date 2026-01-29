from __future__ import annotations

from typing import List, Union, Literal

from pydantic import BaseModel, Field


class PostGenerationRequest(BaseModel):
    topic: str = Field(
        ...,
        min_length=2,
        description="Main topic of the LinkedIn post (e.g. AI, Finance, Career)",
        examples=["AI", "Personal Branding"],
    )
    description: str = Field(
        ...,
        min_length=5,
        description="Short description or context for the post",
        examples=["How AI is changing hiring processes"],
    )
    keywords: List[str] = Field(
        default_factory=list,
        description="Keywords to enrich the post",
        examples=[["AI", "Hiring", "Automation"]],
    )
    tone: str = Field(
        ...,
        description="Desired tone of the post (e.g. Professional, Casual, Inspirational)",
        examples=["Professional"],
    )
    length: Union[
        Literal["Short", "Medium", "Long"],
        int,
    ] = Field(
        ...,
        description="Post length preset or explicit word count",
        examples=["Short", "Medium", 150],
    )


class PostGenerationResponse(BaseModel):
    content: str = Field(
        ...,
        description="Generated LinkedIn post content",
    )

from typing import Union, Literal

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow your Vite dev server to call FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite default
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Topic = Literal["ai", "financial"]
Tone = Literal["professional", "casual"]
LengthPreset = Literal["short", "medium", "long"]

class GenerateRequest(BaseModel):
    topic: Topic
    short_description: str
    keywords: str
    tone: Tone
    length: Union[LengthPreset, int]  # "short"/"medium"/"long" OR number of words


class GenerateResponse(BaseModel):
    result: str


@app.post("/generate", response_model=GenerateResponse)
def generate(req: GenerateRequest):
    # Your generation logic will go here later.
    # For now: return formatted string exactly like your requirement.
    result = "\n".join([
        f"Your topic is {req.topic}",
        f"Short description: {req.short_description}",
        f"Post keywords: {req.keywords}",
        f"Preferred tone: {req.tone}",
        f"Ideal length: {req.length}",
    ])

    return {"result": result}

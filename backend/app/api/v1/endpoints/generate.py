from fastapi import APIRouter, Depends

from app.schemas.post_generation import PostGenerationRequest, PostGenerationResponse
from app.services.deps import get_post_generation_service
from app.services.post_generation_service import PostGenerationService

router = APIRouter()


@router.post("/generate", response_model=PostGenerationResponse, tags=["Generation"])
def generate_post(
    payload: PostGenerationRequest,
    service: PostGenerationService = Depends(get_post_generation_service),
) -> PostGenerationResponse:
    return service.generate(payload)

from typing import List

from fastapi import APIRouter

from app.schemas.odds_schemas import OddsRequest, OddsResponse
from app.services.calculator import calculate_odds

router = APIRouter()


@router.post("/generate-odds", response_model=OddsResponse)
def generate_odds(payload: OddsRequest) -> OddsResponse:
    return calculate_odds(payload)


@router.post("/batch-odds", response_model=List[OddsResponse])
def batch_generate_odds(payload: List[OddsRequest]) -> List[OddsResponse]:
    return [calculate_odds(item) for item in payload]

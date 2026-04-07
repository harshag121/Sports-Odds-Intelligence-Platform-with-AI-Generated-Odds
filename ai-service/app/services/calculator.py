from app.models.odds_model import build_odds_response
from app.schemas.odds_schemas import OddsRequest, OddsResponse
from app.services.normalizer import normalize_request


def calculate_odds(payload: OddsRequest) -> OddsResponse:
    normalized = normalize_request(payload)
    return build_odds_response(normalized)

from app.schemas.odds_schemas import OddsBreakdown, OddsRequest, OddsResponse, Total
from app.models.probability_engine import derive_probabilities, to_decimal_odds, calculate_total_points


def build_odds_response(payload: OddsRequest) -> OddsResponse:
    team_a_prob, team_b_prob, draw_prob = derive_probabilities(payload)
    confidence = min(0.97, max(0.58, abs(team_a_prob - team_b_prob) + 0.55))

    # Calculate total points
    total_prediction, over_prob, under_prob = calculate_total_points(
        payload.teamA_rating,
        payload.teamB_rating,
        payload.sport
    )

    return OddsResponse(
        teamA_win_prob=round(team_a_prob, 3),
        teamB_win_prob=round(team_b_prob, 3),
        draw_prob=round(draw_prob, 3),
        odds=OddsBreakdown(
            teamA=to_decimal_odds(team_a_prob),
            teamB=to_decimal_odds(team_b_prob),
            draw=to_decimal_odds(draw_prob),
            over=to_decimal_odds(over_prob),
            under=to_decimal_odds(under_prob),
        ),
        confidence_score=round(confidence, 3),
        factors=[
            "Rating-based baseline using an Elo-inspired formula.",
            "Home advantage can add five percentage points to the stronger side.",
            "Recent form and head-to-head data softly adjust the probability spread.",
        ],
        total=Total(
            prediction=total_prediction,
            overProb=over_prob,
            underProb=under_prob,
        ),
    )

from __future__ import annotations

import math
from typing import Iterable

from app.schemas.odds_schemas import HeadToHead, OddsRequest
from app.utils.config import settings


def rating_probability(team_a_rating: float, team_b_rating: float, home_advantage: bool) -> float:
    effective_diff = team_a_rating - team_b_rating + (5 if home_advantage else 0)
    return 1 / (1 + math.pow(10, -(effective_diff / 18)))


def recent_form_adjustment(recent_form: Iterable[int] | None) -> float:
    if not recent_form:
        return 0.0

    average_form = sum(recent_form) / len(list(recent_form))
    return (average_form - 0.5) * 0.06


def head_to_head_adjustment(history: HeadToHead | None) -> float:
    if history is None:
        return 0.0

    total = history.teamAWins + history.teamBWins
    if total == 0:
        return 0.0

    return ((history.teamAWins - history.teamBWins) / total) * 0.04


def derive_probabilities(payload: OddsRequest) -> tuple[float, float, float]:
    team_a = rating_probability(payload.teamA_rating, payload.teamB_rating, payload.home_advantage)
    team_a += recent_form_adjustment(payload.recent_form)
    team_a += head_to_head_adjustment(payload.head_to_head)
    team_a = min(0.82, max(0.12, team_a))

    sport = (payload.sport or "").lower()
    draw_probability = 0.04 if "basket" in sport else 0.18
    team_b = max(0.08, 1 - team_a - draw_probability)

    return team_a, team_b, draw_probability


def to_decimal_odds(probability: float) -> float:
    adjusted = max(probability - settings.margin / 3, 0.02)
    return round(1 / adjusted, 2)


def calculate_total_points(team_a_rating: float, team_b_rating: float, sport: str = "") -> tuple[float, float, float]:
    """
    Calculate expected total points and over/under probabilities.

    Returns:
        tuple: (total_points_prediction, over_probability, under_probability)
    """
    sport_lower = (sport or "").lower()

    # Sport-specific average points per team
    if "basket" in sport_lower:
        base_points_per_team = 110  # Basketball averages ~220 total
    elif "american" in sport_lower or "nfl" in sport_lower:
        base_points_per_team = 22   # NFL averages ~44 total
    elif "soccer" in sport_lower or "football" in sport_lower and "nfl" not in sport_lower:
        base_points_per_team = 1.5  # Soccer averages ~3 total
    else:
        base_points_per_team = 2.5  # Generic default

    # Rating-based adjustment (higher rated teams = more points)
    avg_rating = (team_a_rating + team_b_rating) / 2
    rating_factor = 0.8 + (avg_rating / 100) * 0.4  # range 0.8 to 1.2

    total_prediction = base_points_per_team * 2 * rating_factor

    # Over/Under probabilities (assume bell curve around prediction)
    # Over probability increases with higher predicted total
    over_prob = 0.5 + (rating_factor - 1) * 0.15
    over_prob = min(0.75, max(0.25, over_prob))
    under_prob = 1 - over_prob

    return round(total_prediction, 1), round(over_prob, 3), round(under_prob, 3)

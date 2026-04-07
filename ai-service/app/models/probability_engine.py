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

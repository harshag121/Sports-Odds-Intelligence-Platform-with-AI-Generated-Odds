from typing import List, Optional

from pydantic import BaseModel, Field


class HeadToHead(BaseModel):
    teamAWins: int = Field(default=0, alias="teamAWins")
    teamBWins: int = Field(default=0, alias="teamBWins")


class OddsRequest(BaseModel):
    teamA: str
    teamB: str
    sport: Optional[str] = None
    teamA_rating: float
    teamB_rating: float
    home_advantage: bool = False
    recent_form: Optional[List[int]] = None
    head_to_head: Optional[HeadToHead] = None


class OddsBreakdown(BaseModel):
    teamA: float
    teamB: float
    draw: float
    over: Optional[float] = None
    under: Optional[float] = None


class Total(BaseModel):
    prediction: float
    overProb: float
    underProb: float


class OddsResponse(BaseModel):
    teamA_win_prob: float
    teamB_win_prob: float
    draw_prob: float
    odds: OddsBreakdown
    confidence_score: float
    factors: List[str]
    total: Optional[Total] = None

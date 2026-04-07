export interface OddsBreakdown {
  teamA: number;
  teamB: number;
  draw: number;
}

export interface MatchOdds {
  teamAWinProb: number;
  teamBWinProb: number;
  drawProb: number;
  odds: OddsBreakdown;
  confidenceScore: number;
  factors: string[];
}

export interface AgentResponse {
  answer: string;
  confidence: number;
  relatedMatches: string[];
  reasoning: string;
}

export interface OddsBreakdown {
  teamA: number;
  teamB: number;
  draw: number;
  over?: number;
  under?: number;
}

export interface Total {
  prediction: number;
  overProb: number;
  underProb: number;
}

export interface MatchOdds {
  teamAWinProb: number;
  teamBWinProb: number;
  drawProb: number;
  odds: OddsBreakdown;
  confidenceScore: number;
  factors: string[];
  total?: Total;
}

export interface AgentResponse {
  answer: string;
  confidence: number;
  relatedMatches: string[];
  reasoning: string;
}

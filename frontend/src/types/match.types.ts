import type { MatchOdds } from './odds.types';

export type MatchStatus = 'scheduled' | 'live' | 'completed';

export interface Match {
  id: string;
  sport: string;
  league: string;
  teamA: string;
  teamB: string;
  teamARating: number;
  teamBRating: number;
  startTime: string;
  status: MatchStatus;
  homeAdvantage?: boolean;
  recentForm?: number[];
  headToHead?: {
    teamAWins: number;
    teamBWins: number;
  };
  odds: MatchOdds;
}

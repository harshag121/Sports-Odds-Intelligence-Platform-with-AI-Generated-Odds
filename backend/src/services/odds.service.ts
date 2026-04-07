import { matchModel } from '../models/match.model.js';
import { pythonService } from './python.service.js';

export interface MatchWithOdds {
  id: string;
  sport: string;
  league: string;
  teamA: string;
  teamB: string;
  teamARating: number;
  teamBRating: number;
  startTime: string;
  status: 'scheduled' | 'live' | 'completed';
  homeAdvantage?: boolean;
  recentForm?: number[];
  headToHead?: {
    teamAWins: number;
    teamBWins: number;
  };
  odds: Awaited<ReturnType<typeof pythonService.generateOdds>>;
}

const cache = new Map<string, { expiresAt: number; data: MatchWithOdds[] }>();

export const oddsService = {
  async getMatchesWithOdds() {
    const key = 'matches-with-odds';
    const cached = cache.get(key);

    if (cached && cached.expiresAt > Date.now()) {
      return cached.data;
    }

    const matches = matchModel.findAll();
    const odds = await pythonService.batchGenerateOdds(matches);
    const enriched = matches.map((match, index) => ({
      ...match,
      odds: odds[index],
    }));

    cache.set(key, {
      expiresAt: Date.now() + 5 * 60 * 1000,
      data: enriched,
    });

    return enriched;
  },
  async getMatchById(id: string) {
    const match = matchModel.findById(id);

    if (!match) {
      return null;
    }

    return {
      ...match,
      odds: await pythonService.generateOdds(match),
    };
  },
  async getLiveMatches() {
    const liveMatches = matchModel.findLive();
    const odds = await pythonService.batchGenerateOdds(liveMatches);

    return liveMatches.map((match, index) => ({
      ...match,
      odds: odds[index],
    }));
  },
};

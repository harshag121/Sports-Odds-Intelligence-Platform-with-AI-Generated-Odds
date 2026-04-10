import { env } from '../config/env.js';
import { withMargin } from '../utils/helpers.js';
import type { StoredMatch } from '../data/sampleData.js';

interface Total {
  prediction: number;
  overProb: number;
  underProb: number;
}

interface OddsResult {
  teamAWinProb: number;
  teamBWinProb: number;
  drawProb: number;
  odds: {
    teamA: number;
    teamB: number;
    draw: number;
    over?: number;
    under?: number;
  };
  confidenceScore: number;
  factors: string[];
  total?: Total;
}

function calculateTotalPoints(match: StoredMatch): Total {
  const sport = (match.sport || '').toLowerCase();

  // Sport-specific average points per team
  let basePointsPerTeam = 2.5; // Generic default
  if (sport.includes('basket')) {
    basePointsPerTeam = 110; // Basketball averages ~220 total
  } else if (sport.includes('american') || sport.includes('nfl')) {
    basePointsPerTeam = 22; // NFL averages ~44 total
  } else if (sport.includes('soccer') || (sport.includes('football') && !sport.includes('nfl'))) {
    basePointsPerTeam = 1.5; // Soccer averages ~3 total
  }

  // Rating-based adjustment
  const avgRating = (match.teamARating + match.teamBRating) / 2;
  const ratingFactor = 0.8 + (avgRating / 100) * 0.4; // range 0.8 to 1.2

  const totalPrediction = basePointsPerTeam * 2 * ratingFactor;

  // Over/Under probabilities
  const overProb = Math.min(0.75, Math.max(0.25, 0.5 + (ratingFactor - 1) * 0.15));
  const underProb = 1 - overProb;

  return {
    prediction: Math.round(totalPrediction * 10) / 10,
    overProb: Math.round(overProb * 1000) / 1000,
    underProb: Math.round(underProb * 1000) / 1000,
  };
}

function localOddsEngine(match: StoredMatch): OddsResult {
  const ratingDiff = match.teamARating - match.teamBRating;
  const base = 1 / (1 + Math.pow(10, -(ratingDiff + (match.homeAdvantage ? 5 : 0)) / 18));
  const recentFormBoost =
    ((match.recentForm?.reduce((sum, item) => sum + item, 0) ?? 0) / Math.max(match.recentForm?.length ?? 1, 1) -
      0.5) *
    0.06;
  const headToHeadBoost =
    match.headToHead
      ? ((match.headToHead.teamAWins - match.headToHead.teamBWins) /
          Math.max(match.headToHead.teamAWins + match.headToHead.teamBWins, 1)) *
        0.04
      : 0;

  const teamAWinProb = Math.min(0.82, Math.max(0.12, base + recentFormBoost + headToHeadBoost));
  const drawProb = match.sport === 'Basketball' ? 0.04 : 0.18;
  const teamBWinProb = Math.max(0.08, 1 - teamAWinProb - drawProb);
  const confidenceScore = Math.min(0.97, Math.max(0.58, Math.abs(teamAWinProb - teamBWinProb) + 0.55));

  const total = calculateTotalPoints(match);

  return {
    teamAWinProb: Number(teamAWinProb.toFixed(3)),
    teamBWinProb: Number(teamBWinProb.toFixed(3)),
    drawProb: Number(drawProb.toFixed(3)),
    odds: {
      teamA: withMargin(teamAWinProb),
      teamB: withMargin(teamBWinProb),
      draw: withMargin(drawProb),
      over: withMargin(total.overProb),
      under: withMargin(total.underProb),
    },
    confidenceScore: Number(confidenceScore.toFixed(3)),
    factors: [
      match.homeAdvantage ? `${match.teamA} receives a modeled home advantage.` : 'Neutral venue weighting applied.',
      'Recent form contributes up to three percentage points.',
      'Head-to-head history nudges the baseline when enough data exists.',
    ],
    total,
  };
}

export const pythonService = {
  async generateOdds(match: StoredMatch) {
    try {
      const response = await fetch(`${env.PYTHON_SERVICE_URL}/generate-odds`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamA: match.teamA,
          teamB: match.teamB,
          sport: match.sport,
          teamA_rating: match.teamARating,
          teamB_rating: match.teamBRating,
          home_advantage: match.homeAdvantage,
          recent_form: match.recentForm,
          head_to_head: match.headToHead,
        }),
      });

      if (!response.ok) {
        throw new Error('Python service unavailable');
      }

      return (await response.json()) as OddsResult;
    } catch {
      return localOddsEngine(match);
    }
  },
  async batchGenerateOdds(batch: StoredMatch[]) {
    try {
      const response = await fetch(`${env.PYTHON_SERVICE_URL}/batch-odds`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          batch.map((match) => ({
            teamA: match.teamA,
            teamB: match.teamB,
            sport: match.sport,
            teamA_rating: match.teamARating,
            teamB_rating: match.teamBRating,
            home_advantage: match.homeAdvantage,
            recent_form: match.recentForm,
            head_to_head: match.headToHead,
          })),
        ),
      });

      if (!response.ok) {
        throw new Error('Python batch service unavailable');
      }

      return (await response.json()) as OddsResult[];
    } catch {
      return Promise.all(batch.map((match) => this.generateOdds(match)));
    }
  },
};

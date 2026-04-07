import type { Match } from '../types/match.types';

export interface OddsUpdateEvent {
  matchId: string;
  nextConfidence: number;
  nextTeamAProb: number;
  nextTeamBProb: number;
}

export function subscribeToOddsUpdates(matches: Match[], onUpdate: (event: OddsUpdateEvent) => void) {
  const timer = window.setInterval(() => {
    const match = matches[Math.floor(Math.random() * matches.length)];

    if (!match) {
      return;
    }

    const swing = (Math.random() - 0.5) * 0.04;
    const teamA = Math.min(0.8, Math.max(0.15, match.odds.teamAWinProb + swing));
    const teamB = Math.min(0.8, Math.max(0.1, match.odds.teamBWinProb - swing));

    onUpdate({
      matchId: match.id,
      nextConfidence: Math.min(0.99, Math.max(0.55, match.odds.confidenceScore + swing)),
      nextTeamAProb: teamA,
      nextTeamBProb: teamB,
    });
  }, 5000);

  return () => window.clearInterval(timer);
}

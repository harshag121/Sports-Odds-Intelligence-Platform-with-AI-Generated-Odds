import { useMemo } from 'react';
import { useMatches } from './useMatches';

export function useOdds() {
  const { matches } = useMatches();

  return useMemo(() => {
    const sortedByConfidence = [...matches].sort(
      (a, b) => b.odds.confidenceScore - a.odds.confidenceScore,
    );

    return {
      topPick: sortedByConfidence[0] ?? null,
      closeCalls: matches.filter(
        (match) => Math.abs(match.odds.teamAWinProb - match.odds.teamBWinProb) < 0.1,
      ),
      liveMatches: matches.filter((match) => match.status === 'live'),
    };
  }, [matches]);
}

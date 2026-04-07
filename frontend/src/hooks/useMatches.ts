import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '../services/api';
import { subscribeToOddsUpdates } from '../services/websocket';
import { useMatchesStore } from '../store/matchesStore';
import type { Match } from '../types/match.types';
import { demoMatches } from '../utils/constants';

export function useMatches() {
  const matches = useMatchesStore((state) => state.matches);
  const setMatches = useMatchesStore((state) => state.setMatches);
  const updateMatch = useMatchesStore((state) => state.updateMatch);

  const query = useQuery({
    queryKey: ['matches'],
    queryFn: async () => {
      try {
        return await apiRequest<Match[]>('/matches');
      } catch {
        return demoMatches;
      }
    },
  });

  useEffect(() => {
    if (query.data?.length) {
      setMatches(query.data);
    }
  }, [query.data, setMatches]);

  useEffect(() => {
    if (!matches.length) {
      return;
    }

    return subscribeToOddsUpdates(matches, (event) => {
      const match = matches.find((item) => item.id === event.matchId);

      if (!match) {
        return;
      }

      updateMatch({
        ...match,
        odds: {
          ...match.odds,
          confidenceScore: event.nextConfidence,
          teamAWinProb: event.nextTeamAProb,
          teamBWinProb: event.nextTeamBProb,
          drawProb: Math.max(0.02, 1 - event.nextTeamAProb - event.nextTeamBProb),
          odds: {
            teamA: Number((1.05 / event.nextTeamAProb).toFixed(2)),
            teamB: Number((1.05 / event.nextTeamBProb).toFixed(2)),
            draw: Number((1.05 / Math.max(0.02, 1 - event.nextTeamAProb - event.nextTeamBProb)).toFixed(2)),
          },
        },
      });
    });
  }, [matches, updateMatch]);

  return {
    matches: matches.length ? matches : query.data ?? [],
    ...query,
  };
}

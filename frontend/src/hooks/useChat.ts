import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '../services/api';
import type { AgentResponse } from '../types/odds.types';
import { demoMatches } from '../utils/constants';

function localAgent(prompt: string): AgentResponse {
  const topMatch = [...demoMatches].sort(
    (a, b) => b.odds.confidenceScore - a.odds.confidenceScore,
  )[0];
  const closeCall = demoMatches.find(
    (match) => Math.abs(match.odds.teamAWinProb - match.odds.teamBWinProb) < 0.1,
  );

  if (/close|closest/i.test(prompt) && closeCall) {
    return {
      answer: `${closeCall.teamA} vs ${closeCall.teamB} is the closest market on the board.`,
      confidence: 0.75,
      relatedMatches: [closeCall.id],
      reasoning: 'The probability spread between both sides is under ten percentage points.',
    };
  }

  return {
    answer: `${topMatch.teamA} is the strongest projected side right now.`,
    confidence: topMatch.odds.confidenceScore,
    relatedMatches: [topMatch.id],
    reasoning: topMatch.odds.factors.join(', '),
  };
}

export function useChat() {
  return useMutation({
    mutationFn: async (prompt: string) => {
      try {
        return await apiRequest<AgentResponse>('/agent/query', {
          method: 'POST',
          body: JSON.stringify({ prompt }),
        });
      } catch {
        return localAgent(prompt);
      }
    },
  });
}

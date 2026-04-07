import type { MatchWithOdds } from './odds.service.js';

export const agentService = {
  answer(prompt: string, matches: MatchWithOdds[]) {
    const ranked = [...matches].sort((a, b) => b.odds.confidenceScore - a.odds.confidenceScore);
    const closest = matches.find(
      (match) => Math.abs(match.odds.teamAWinProb - match.odds.teamBWinProb) < 0.1,
    );
    const lowerPrompt = prompt.toLowerCase();

    if (lowerPrompt.includes('close') && closest) {
      return {
        answer: `${closest.teamA} vs ${closest.teamB} is the tightest market right now.`,
        confidence: 0.78,
        relatedMatches: [closest.id],
        reasoning: 'The model shows less than a ten-point gap between win probabilities.',
      };
    }

    const top = ranked[0];

    return {
      answer: `${top.teamA} is the most likely winner on the board based on current probabilities.`,
      confidence: top.odds.confidenceScore,
      relatedMatches: [top.id],
      reasoning: top.odds.factors.join(' '),
    };
  },
};

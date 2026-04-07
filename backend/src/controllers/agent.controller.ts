import type { Request, Response } from 'express';
import { agentService } from '../services/agent.service.js';
import { oddsService } from '../services/odds.service.js';
import { agentSchema } from '../utils/validators.js';

export const agentController = {
  async query(req: Request, res: Response) {
    const payload = agentSchema.parse(req.body);
    const matches = await oddsService.getMatchesWithOdds();

    return res.json(agentService.answer(payload.prompt, matches));
  },
};

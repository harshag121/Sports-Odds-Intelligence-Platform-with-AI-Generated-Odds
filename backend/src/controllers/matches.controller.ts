import type { Request, Response } from 'express';
import { oddsService } from '../services/odds.service.js';

export const matchesController = {
  async list(_req: Request, res: Response) {
    return res.json(await oddsService.getMatchesWithOdds());
  },
  async getById(req: Request, res: Response) {
    const match = await oddsService.getMatchById(String(req.params.id));

    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }

    return res.json(match);
  },
  async listLive(_req: Request, res: Response) {
    return res.json(await oddsService.getLiveMatches());
  },
};

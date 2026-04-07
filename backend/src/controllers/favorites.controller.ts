import type { Request, Response } from 'express';
import { favoriteModel } from '../models/favorite.model.js';
import { oddsService } from '../services/odds.service.js';
import { favoriteSchema } from '../utils/validators.js';

export const favoritesController = {
  async list(req: Request, res: Response) {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const favoriteIds = favoriteModel.getByUser(userId);
    const matches = await oddsService.getMatchesWithOdds();

    return res.json(matches.filter((match) => favoriteIds.includes(match.id)));
  },
  add(req: Request, res: Response) {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const payload = favoriteSchema.parse(req.body);
    return res.status(201).json({ favorites: favoriteModel.add(userId, payload.matchId) });
  },
  remove(req: Request, res: Response) {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    return res.json({ favorites: favoriteModel.remove(userId, String(req.params.id)) });
  },
};

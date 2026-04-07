import { Router } from 'express';
import { matchesController } from '../controllers/matches.controller.js';
import { oddsController } from '../controllers/odds.controller.js';

export const matchesRouter = Router();

matchesRouter.get('/', matchesController.list);
matchesRouter.get('/live', matchesController.listLive);
matchesRouter.get('/:id/odds', oddsController.preview);
matchesRouter.get('/:id', matchesController.getById);

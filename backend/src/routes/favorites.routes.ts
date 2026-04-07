import { Router } from 'express';
import { favoritesController } from '../controllers/favorites.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

export const favoritesRouter = Router();

favoritesRouter.use(authMiddleware);
favoritesRouter.get('/', favoritesController.list);
favoritesRouter.post('/', favoritesController.add);
favoritesRouter.delete('/:id', favoritesController.remove);

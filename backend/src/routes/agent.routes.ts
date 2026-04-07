import { Router } from 'express';
import { agentController } from '../controllers/agent.controller.js';

export const agentRouter = Router();

agentRouter.post('/query', agentController.query);

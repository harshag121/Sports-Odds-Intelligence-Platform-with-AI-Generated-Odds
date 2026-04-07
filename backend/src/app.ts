import cors from 'cors';
import express from 'express';
import { env } from './config/env.js';
import { errorMiddleware } from './middleware/error.middleware.js';
import { rateLimiterMiddleware } from './middleware/rateLimiter.middleware.js';
import { agentRouter } from './routes/agent.routes.js';
import { authRouter } from './routes/auth.routes.js';
import { favoritesRouter } from './routes/favorites.routes.js';
import { matchesRouter } from './routes/matches.routes.js';

export const app = express();

app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(rateLimiterMiddleware);

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api/auth', authRouter);
app.use('/api/matches', matchesRouter);
app.use('/api/agent', agentRouter);
app.use('/api/favorites', favoritesRouter);

app.use(errorMiddleware);

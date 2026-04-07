import type { Request, Response } from 'express';
import { userModel } from '../models/user.model.js';
import { createTokens } from '../utils/helpers.js';
import { loginSchema, registerSchema } from '../utils/validators.js';

export const authController = {
  register(req: Request, res: Response) {
    const payload = registerSchema.parse(req.body);
    const existing = userModel.findByEmail(payload.email);

    if (existing) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const user = userModel.create(payload);

    return res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      tokens: createTokens({ userId: user.id, email: user.email }),
    });
  },
  login(req: Request, res: Response) {
    const payload = loginSchema.parse(req.body);
    const user = userModel.findByEmail(payload.email);

    if (!user || !userModel.verifyPassword(payload.password, user.passwordHash)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      tokens: createTokens({ userId: user.id, email: user.email }),
    });
  },
  refresh(req: Request, res: Response) {
    const email = String(req.body?.email ?? 'demo@oddsai.dev');
    const user = userModel.findByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({
      tokens: createTokens({ userId: user.id, email: user.email }),
    });
  },
  logout(_req: Request, res: Response) {
    return res.status(204).send();
  },
};

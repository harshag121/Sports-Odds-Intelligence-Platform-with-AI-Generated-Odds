import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function createTokens(payload: { userId: string; email: string }) {
  return {
    accessToken: jwt.sign(payload, env.JWT_SECRET, { expiresIn: '30m' }),
    refreshToken: jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: '7d' }),
  };
}

export function withMargin(probability: number, overround = 0.05) {
  return Number((1 / Math.max(probability - overround / 3, 0.02)).toFixed(2));
}

import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Missing authorization header' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    req.user = jwt.verify(token, env.JWT_SECRET) as { userId: string; email: string };
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

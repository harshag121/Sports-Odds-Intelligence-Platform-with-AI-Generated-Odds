import type { NextFunction, Request, Response } from 'express';

const requests = new Map<string, { count: number; resetAt: number }>();

export function rateLimiterMiddleware(req: Request, res: Response, next: NextFunction) {
  const key = req.ip ?? 'unknown';
  const current = requests.get(key);

  if (!current || current.resetAt < Date.now()) {
    requests.set(key, { count: 1, resetAt: Date.now() + 60_000 });
    return next();
  }

  if (current.count > 120) {
    return res.status(429).json({ message: 'Too many requests' });
  }

  current.count += 1;
  return next();
}

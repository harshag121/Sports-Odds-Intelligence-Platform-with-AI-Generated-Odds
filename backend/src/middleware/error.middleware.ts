import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { logger } from '../utils/logger.js';

export function errorMiddleware(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation failed',
      issues: error.flatten(),
    });
  }

  logger.error('Unhandled API error', {
    error: error instanceof Error ? error.message : String(error),
  });

  return res.status(500).json({ message: 'Internal server error' });
}

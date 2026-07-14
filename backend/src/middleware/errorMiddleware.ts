import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';

export function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const isDevelopment = process.env.NODE_ENV === 'development';

  // 1. If the error is a known custom operational error
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: []
    });
    return;
  }

  // 2. Handle Prisma constraint violations
  if (err.code && err.code.startsWith('P')) {
    let message = 'Database connection error';
    let statusCode = 500;

    if (err.code === 'P2002') {
      message = 'A record with this unique field already exists';
      statusCode = 409;
    } else if (err.code === 'P2025') {
      message = 'Requested record not found';
      statusCode = 404;
    }

    res.status(statusCode).json({
      success: false,
      message,
      errors: isDevelopment ? [err] : []
    });
    return;
  }

  // 3. Fallback for unhandled unexpected exceptions
  console.error('Unhandled Exception 💥:', err);

  res.status(500).json({
    success: false,
    message: isDevelopment ? err.message : 'Internal server error',
    errors: isDevelopment ? [err.stack] : []
  });
}

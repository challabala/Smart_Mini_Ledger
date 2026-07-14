import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/errors';

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    let token = '';

    // Check authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    // Fallback check cookies
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      throw new UnauthorizedError('Please log in to access this resource');
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    
    // Attach user to request
    (req as any).user = { id: decoded.id };

    next();
  } catch (error) {
    next(new UnauthorizedError('Invalid or expired authentication token'));
  }
}

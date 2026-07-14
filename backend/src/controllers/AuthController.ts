import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/AuthService';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { fullName, email, password } = req.body;
      const result = await authService.register({ fullName, email, password });

      // Set cookie for token (optional but recommended for security)
      res.cookie('token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);

      res.cookie('token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
      });
      res.status(200).json({
        success: true,
        message: 'Logged out successfully',
        data: null
      });
    } catch (error) {
      next(error);
    }
  }

  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const user = await authService.getCurrentUser(userId);

      res.status(200).json({
        success: true,
        message: 'User profile retrieved successfully',
        data: { user }
      });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();

import { Request, Response, NextFunction } from 'express';
import { analyticsService } from '../services/AnalyticsService';

export class AnalyticsController {
  async getAnalyticsSummary(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const analytics = await analyticsService.getAnalytics(userId);

      res.status(200).json({
        success: true,
        message: 'Analytics summary retrieved successfully',
        data: analytics
      });
    } catch (error) {
      next(error);
    }
  }
}

export const analyticsController = new AnalyticsController();

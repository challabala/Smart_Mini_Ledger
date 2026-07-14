import { Request, Response, NextFunction } from 'express';
import { dashboardService } from '../services/DashboardService';

export class DashboardController {
  async getSummary(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const summary = await dashboardService.getDashboardSummary(userId);

      res.status(200).json({
        success: true,
        message: 'Dashboard summary retrieved successfully',
        data: summary
      });
    } catch (error) {
      next(error);
    }
  }
}

export const dashboardController = new DashboardController();

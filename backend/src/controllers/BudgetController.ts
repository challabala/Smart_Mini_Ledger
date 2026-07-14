import { Request, Response, NextFunction } from 'express';
import { budgetService } from '../services/BudgetService';

export class BudgetController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const { category, monthlyLimit } = req.body;

      const budget = await budgetService.createBudget(userId, {
        category,
        monthlyLimit: parseFloat(monthlyLimit)
      });

      res.status(201).json({
        success: true,
        message: 'Budget limit set successfully',
        data: budget
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const { id } = req.params;
      const { category, monthlyLimit } = req.body;

      const budget = await budgetService.updateBudget(id, userId, {
        category,
        monthlyLimit: monthlyLimit ? parseFloat(monthlyLimit) : undefined
      });

      res.status(200).json({
        success: true,
        message: 'Budget limit updated successfully',
        data: budget
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const { id } = req.params;

      await budgetService.deleteBudget(id, userId);

      res.status(200).json({
        success: true,
        message: 'Budget limit deleted successfully',
        data: null
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const budgets = await budgetService.getBudgets(userId);

      res.status(200).json({
        success: true,
        message: 'Budgets retrieved successfully',
        data: budgets
      });
    } catch (error) {
      next(error);
    }
  }
}

export const budgetController = new BudgetController();

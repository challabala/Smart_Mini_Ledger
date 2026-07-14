import { Request, Response, NextFunction } from 'express';
import { transactionService } from '../services/TransactionService';

export class TransactionController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const { title, amount, type, category, notes, transactionDate } = req.body;

      const tx = await transactionService.createTransaction(userId, {
        title,
        amount: parseFloat(amount),
        type,
        category,
        notes,
        transactionDate: transactionDate ? new Date(transactionDate) : undefined
      });

      res.status(201).json({
        success: true,
        message: 'Transaction created successfully',
        data: tx
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const { id } = req.params;
      const { title, amount, type, category, notes, transactionDate } = req.body;

      const tx = await transactionService.updateTransaction(id, userId, {
        title,
        amount: amount ? parseFloat(amount) : undefined,
        type,
        category,
        notes,
        transactionDate: transactionDate ? new Date(transactionDate) : undefined
      });

      res.status(200).json({
        success: true,
        message: 'Transaction updated successfully',
        data: tx
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const { id } = req.params;

      await transactionService.deleteTransaction(id, userId);

      res.status(200).json({
        success: true,
        message: 'Transaction deleted successfully',
        data: null
      });
    } catch (error) {
      next(error);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const { id } = req.params;

      const tx = await transactionService.getTransactionOrThrow(id, userId);

      res.status(200).json({
        success: true,
        message: 'Transaction retrieved successfully',
        data: tx
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const { search, category, type, sortBy, page, limit } = req.query;

      const result = await transactionService.getAllTransactions(userId, {
        search: search as string,
        category: category as string,
        type: type as string,
        sortBy: sortBy as string,
        page: page ? parseInt(page as string) : undefined,
        limit: limit ? parseInt(limit as string) : undefined
      });

      res.status(200).json({
        success: true,
        message: 'Transactions retrieved successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }
}

export const transactionController = new TransactionController();

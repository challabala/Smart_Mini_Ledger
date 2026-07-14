import { budgetRepository } from '../repositories/BudgetRepository';
import { ConflictError, NotFoundError } from '../utils/errors';
import { Prisma } from '@prisma/client';

export class BudgetService {
  async createBudget(userId: string, data: Omit<Prisma.BudgetUncheckedCreateInput, 'userId'>) {
    const existing = await budgetRepository.findByCategory(userId, data.category);
    if (existing) {
      throw new ConflictError(`Budget for category "${data.category}" already exists`);
    }

    return budgetRepository.create({
      ...data,
      userId
    });
  }

  async updateBudget(id: string, userId: string, data: Omit<Prisma.BudgetUncheckedUpdateInput, 'userId'>) {
    const budget = await budgetRepository.findById(id, userId);
    if (!budget) {
      throw new NotFoundError('Budget not found');
    }

    // If changing category, check if new category conflicts
    if (data.category && data.category !== budget.category) {
      const existing = await budgetRepository.findByCategory(userId, data.category as string);
      if (existing) {
        throw new ConflictError(`Budget for category "${data.category}" already exists`);
      }
    }

    return budgetRepository.update(id, userId, data);
  }

  async deleteBudget(id: string, userId: string) {
    const budget = await budgetRepository.findById(id, userId);
    if (!budget) {
      throw new NotFoundError('Budget not found');
    }
    return budgetRepository.delete(id, userId);
  }

  async getBudgets(userId: string) {
    return budgetRepository.findAll(userId);
  }
}

export const budgetService = new BudgetService();

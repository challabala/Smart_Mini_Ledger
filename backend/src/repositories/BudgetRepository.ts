import prisma from '../config/db';
import { Prisma } from '@prisma/client';

export class BudgetRepository {
  async create(data: Prisma.BudgetUncheckedCreateInput) {
    return prisma.budget.create({
      data
    });
  }

  async update(id: string, userId: string, data: Prisma.BudgetUncheckedUpdateInput) {
    return prisma.budget.update({
      where: { id, userId },
      data
    });
  }

  async delete(id: string, userId: string) {
    return prisma.budget.delete({
      where: { id, userId }
    });
  }

  async findById(id: string, userId: string) {
    return prisma.budget.findFirst({
      where: { id, userId }
    });
  }

  async findByCategory(userId: string, category: string) {
    return prisma.budget.findUnique({
      where: {
        userId_category: { userId, category }
      }
    });
  }

  async findAll(userId: string) {
    return prisma.budget.findMany({
      where: { userId },
      orderBy: { category: 'asc' }
    });
  }
}

export const budgetRepository = new BudgetRepository();

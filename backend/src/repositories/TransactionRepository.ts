import prisma from '../config/db';
import { Prisma } from '@prisma/client';

export interface GetTransactionsFilters {
  search?: string;
  category?: string;
  type?: string;
  sortBy?: string; // 'date_asc' | 'date_desc' | 'amount_asc' | 'amount_desc'
  page?: number;
  limit?: number;
}

export class TransactionRepository {
  async create(data: Prisma.TransactionUncheckedCreateInput) {
    return prisma.transaction.create({
      data
    });
  }

  async update(id: string, userId: string, data: Prisma.TransactionUncheckedUpdateInput) {
    return prisma.transaction.update({
      where: { id, userId },
      data
    });
  }

  async delete(id: string, userId: string) {
    return prisma.transaction.delete({
      where: { id, userId }
    });
  }

  async findById(id: string, userId: string) {
    return prisma.transaction.findFirst({
      where: { id, userId }
    });
  }

  async findAll(userId: string, filters: GetTransactionsFilters) {
    const {
      search,
      category,
      type,
      sortBy = 'date_desc',
      page = 1,
      limit = 10
    } = filters;

    const skip = (page - 1) * limit;

    // Build Prisma query condition
    const where: Prisma.TransactionWhereInput = {
      userId,
      ...(category && { category }),
      ...(type && { type }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { notes: { contains: search, mode: 'insensitive' } }
        ]
      })
    };

    // Build sorting condition
    let orderBy: Prisma.TransactionOrderByWithRelationInput = { transactionDate: 'desc' };
    if (sortBy === 'date_asc') orderBy = { transactionDate: 'asc' };
    if (sortBy === 'date_desc') orderBy = { transactionDate: 'desc' };
    if (sortBy === 'amount_asc') orderBy = { amount: 'asc' };
    if (sortBy === 'amount_desc') orderBy = { amount: 'desc' };

    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where,
        orderBy,
        skip,
        take: limit
      }),
      prisma.transaction.count({ where })
    ]);

    return {
      transactions,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    };
  }
}

export const transactionRepository = new TransactionRepository();

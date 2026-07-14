import { transactionRepository, GetTransactionsFilters } from '../repositories/TransactionRepository';
import { NotFoundError } from '../utils/errors';
import { Prisma } from '@prisma/client';

export class TransactionService {
  async createTransaction(userId: string, data: Omit<Prisma.TransactionUncheckedCreateInput, 'userId'>) {
    return transactionRepository.create({
      ...data,
      userId
    });
  }

  async updateTransaction(id: string, userId: string, data: Omit<Prisma.TransactionUncheckedUpdateInput, 'userId'>) {
    await this.getTransactionOrThrow(id, userId);
    return transactionRepository.update(id, userId, data);
  }

  async deleteTransaction(id: string, userId: string) {
    await this.getTransactionOrThrow(id, userId);
    return transactionRepository.delete(id, userId);
  }

  async getTransactionOrThrow(id: string, userId: string) {
    const tx = await transactionRepository.findById(id, userId);
    if (!tx) {
      throw new NotFoundError('Transaction not found');
    }
    return tx;
  }

  async getAllTransactions(userId: string, filters: GetTransactionsFilters) {
    return transactionRepository.findAll(userId, filters);
  }
}

export const transactionService = new TransactionService();

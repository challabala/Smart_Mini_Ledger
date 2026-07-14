import prisma from '../config/db';

export class DashboardService {
  async getDashboardSummary(userId: string) {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    // 1. Calculate Total Income, Total Expenses, and Transaction Count
    const aggregations = await prisma.transaction.groupBy({
      by: ['type'],
      where: { userId },
      _sum: {
        amount: true
      },
      _count: {
        id: true
      }
    });

    let totalIncome = 0;
    let totalExpenses = 0;
    let transactionCount = 0;

    aggregations.forEach((group) => {
      const sum = group._sum.amount || 0;
      const count = group._count.id || 0;
      transactionCount += count;

      if (group.type === 'income') {
        totalIncome = sum;
      } else if (group.type === 'expense') {
        totalExpenses = sum;
      }
    });

    const currentBalance = totalIncome - totalExpenses;

    // 2. Fetch all user budgets
    const budgets = await prisma.budget.findMany({
      where: { userId }
    });

    // 3. For each budget, calculate the total expense amount in that category for the current month
    const categorySpending = await prisma.transaction.groupBy({
      by: ['category'],
      where: {
        userId,
        type: 'expense',
        transactionDate: {
          gte: startOfMonth,
          lte: endOfMonth
        }
      },
      _sum: {
        amount: true
      }
    });

    // Map spending into a lookup map
    const spendingMap = new Map<string, number>();
    categorySpending.forEach((item) => {
      spendingMap.set(item.category.toLowerCase(), item._sum.amount || 0);
    });

    // Compile budget usage
    const budgetUsage = budgets.map((b) => {
      const spent = spendingMap.get(b.category.toLowerCase()) || 0;
      const percentage = b.monthlyLimit > 0 ? (spent / b.monthlyLimit) * 100 : 0;
      return {
        id: b.id,
        category: b.category,
        monthlyLimit: b.monthlyLimit,
        spent,
        percentage: parseFloat(percentage.toFixed(1))
      };
    });

    return {
      totalIncome,
      totalExpenses,
      currentBalance,
      transactionCount,
      budgetUsage
    };
  }
}

export const dashboardService = new DashboardService();

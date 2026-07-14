import prisma from '../config/db';

export class AnalyticsService {
  async getAnalytics(userId: string) {
    // 1. Expenses By Category
    const categoryGroup = await prisma.transaction.groupBy({
      by: ['category'],
      where: { userId, type: 'expense' },
      _sum: { amount: true },
      orderBy: { _sum: { amount: 'desc' } }
    });

    const expensesByCategory = categoryGroup.map((item) => ({
      category: item.category,
      amount: item._sum.amount || 0
    }));

    // 2. Monthly Cash Flow (Last 6 Months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        transactionDate: {
          gte: sixMonthsAgo
        }
      },
      orderBy: { transactionDate: 'asc' }
    });

    // Initialize 6-month slots
    const monthlyCashFlow: { month: string; income: number; expenses: number }[] = [];
    const tempDate = new Date(sixMonthsAgo);
    for (let i = 0; i < 6; i++) {
      const monthLabel = tempDate.toLocaleString('default', { month: 'short' });
      monthlyCashFlow.push({
        month: monthLabel,
        income: 0,
        expenses: 0
      });
      tempDate.setMonth(tempDate.getMonth() + 1);
    }

    transactions.forEach((tx) => {
      const txMonth = tx.transactionDate.toLocaleString('default', { month: 'short' });
      const slot = monthlyCashFlow.find((flow) => flow.month === txMonth);
      if (slot) {
        if (tx.type === 'income') {
          slot.income += tx.amount;
        } else if (tx.type === 'expense') {
          slot.expenses += tx.amount;
        }
      }
    });

    // 3. Savings Rate (Total)
    const overallAggregations = await prisma.transaction.groupBy({
      by: ['type'],
      where: { userId },
      _sum: { amount: true }
    });

    let totalIncome = 0;
    let totalExpenses = 0;

    overallAggregations.forEach((item) => {
      const sum = item._sum.amount || 0;
      if (item.type === 'income') {
        totalIncome = sum;
      } else if (item.type === 'expense') {
        totalExpenses = sum;
      }
    });

    const savingsAmount = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? (savingsAmount / totalIncome) * 100 : 0;

    // 4. Largest Expense
    const largestExpense = await prisma.transaction.findFirst({
      where: { userId, type: 'expense' },
      orderBy: { amount: 'desc' }
    });

    // 5. Financial Health Score (Computed)
    let healthScore = 70; // Base baseline
    if (savingsRate > 30) healthScore += 20;
    else if (savingsRate > 15) healthScore += 10;
    else if (savingsRate < 0) healthScore -= 20;

    // Adjust score based on largest expense compared to total income
    if (largestExpense && totalIncome > 0) {
      const ratio = largestExpense.amount / totalIncome;
      if (ratio > 0.5) healthScore -= 15; // Single expense eats > 50% income
    }

    // Bound between 10 and 100
    healthScore = Math.max(10, Math.min(100, healthScore));

    // 6. Smart Spending Insights (Dynamic text generators)
    const insights: string[] = [];
    if (savingsRate > 25) {
      insights.push('Excellent job! Your savings rate is above the recommended 20% mark.');
    } else if (savingsRate > 0) {
      insights.push('You are saving money, but could improve by review recurring subscription budgets.');
    } else if (totalIncome > 0) {
      insights.push('Warning: You are spending more than your current income. Consider cutting auxiliary limits.');
    } else {
      insights.push('No income logged yet. Log recurring income to unlock personalized cash flow analysis.');
    }

    if (largestExpense && totalIncome > 0 && (largestExpense.amount / totalIncome) > 0.3) {
      insights.push(`Your transaction "${largestExpense.title}" represents a significant portion of your income this period.`);
    }

    return {
      expensesByCategory,
      monthlyCashFlow,
      savingsRate: parseFloat(savingsRate.toFixed(1)),
      largestExpense: largestExpense || null,
      financialHealthScore: healthScore,
      smartSpendingInsights: insights
    };
  }
}

export const analyticsService = new AnalyticsService();

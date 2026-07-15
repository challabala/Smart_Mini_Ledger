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

    // 5. Budget Utilization & Overruns
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    const budgets = await prisma.budget.findMany({ where: { userId } });

    const categorySpending = await prisma.transaction.groupBy({
      by: ['category'],
      where: {
        userId,
        type: 'expense',
        transactionDate: { gte: startOfMonth, lte: endOfMonth }
      },
      _sum: { amount: true }
    });

    const spendingMap = new Map<string, number>();
    categorySpending.forEach((item) => {
      spendingMap.set(item.category.toLowerCase(), item._sum.amount || 0);
    });

    let totalBudgetLimit = 0;
    let totalBudgetSpent = 0;
    let budgetOverruns = 0;
    let budgetsUsedCount = 0;

    budgets.forEach((b) => {
      const spent = spendingMap.get(b.category.toLowerCase()) || 0;
      totalBudgetLimit += b.monthlyLimit;
      totalBudgetSpent += spent;
      if (spent > b.monthlyLimit) budgetOverruns++;
      if (b.monthlyLimit > 0) budgetsUsedCount++;
    });

    const budgetUtilization = totalBudgetLimit > 0
      ? (totalBudgetSpent / totalBudgetLimit) * 100
      : 0;

    // 6. Spending Consistency (std dev of daily spending over last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentExpenses = await prisma.transaction.findMany({
      where: {
        userId,
        type: 'expense',
        transactionDate: { gte: thirtyDaysAgo }
      },
      orderBy: { transactionDate: 'asc' }
    });

    const dailySpending: Record<string, number> = {};
    recentExpenses.forEach((tx) => {
      const day = tx.transactionDate.toISOString().split('T')[0];
      dailySpending[day] = (dailySpending[day] || 0) + tx.amount;
    });

    const dailyValues = Object.values(dailySpending);
    const avgDailySpend = dailyValues.length > 0
      ? dailyValues.reduce((a, b) => a + b, 0) / dailyValues.length
      : 0;
    const dailyStdDev = dailyValues.length > 1
      ? Math.sqrt(dailyValues.reduce((sum, val) => sum + Math.pow(val - avgDailySpend, 2), 0) / dailyValues.length)
      : 0;
    const spendingConsistencyScore = avgDailySpend > 0
      ? Math.max(0, 100 - (dailyStdDev / avgDailySpend) * 100)
      : 80;

    // 7. Financial Health Score (0-100)
    let healthScore = 50;

    // Savings Rate Component (0-30 points)
    if (savingsRate >= 30) healthScore += 30;
    else if (savingsRate >= 20) healthScore += 25;
    else if (savingsRate >= 10) healthScore += 15;
    else if (savingsRate >= 0) healthScore += 5;
    else healthScore -= 15;

    // Income vs Expense Ratio Component (0-25 points)
    if (totalIncome > 0) {
      const ratio = totalExpenses / totalIncome;
      if (ratio <= 0.5) healthScore += 25;
      else if (ratio <= 0.7) healthScore += 20;
      else if (ratio <= 0.85) healthScore += 12;
      else if (ratio <= 1.0) healthScore += 5;
      else healthScore -= 10;
    } else {
      healthScore -= 15;
    }

    // Budget Utilization Component (0-20 points)
    if (budgetsUsedCount > 0) {
      if (budgetUtilization <= 80) healthScore += 20;
      else if (budgetUtilization <= 90) healthScore += 12;
      else if (budgetUtilization <= 100) healthScore += 5;
      else healthScore -= 10;
    }

    // Budget Overruns Component (-15 to 0 points)
    if (budgetOverruns === 0 && budgetsUsedCount > 0) healthScore += 5;
    else if (budgetOverruns === 1) healthScore -= 5;
    else if (budgetOverruns >= 2) healthScore -= 15;

    // Spending Consistency Component (0-10 points)
    if (spendingConsistencyScore >= 70) healthScore += 10;
    else if (spendingConsistencyScore >= 50) healthScore += 5;
    else healthScore -= 5;

    // Bound between 0 and 100
    healthScore = Math.max(0, Math.min(100, Math.round(healthScore)));

    // 8. Health Score Breakdown
    const healthBreakdown = {
      savingsRate: {
        value: parseFloat(savingsRate.toFixed(1)),
        score: savingsRate >= 30 ? 30 : savingsRate >= 20 ? 25 : savingsRate >= 10 ? 15 : savingsRate >= 0 ? 5 : -15,
        label: savingsRate >= 20 ? 'Excellent' : savingsRate >= 10 ? 'Good' : savingsRate >= 0 ? 'Fair' : 'Poor'
      },
      incomeVsExpense: {
        value: totalIncome > 0 ? parseFloat(((1 - totalExpenses / totalIncome) * 100).toFixed(1)) : 0,
        score: totalIncome > 0 ? (totalExpenses / totalIncome <= 0.5 ? 25 : totalExpenses / totalIncome <= 0.7 ? 20 : totalExpenses / totalIncome <= 0.85 ? 12 : 5) : -15,
        label: totalIncome > 0 ? (totalExpenses / totalIncome <= 0.7 ? 'Healthy' : totalExpenses / totalIncome <= 1.0 ? 'Tight' : 'Deficit') : 'No Income'
      },
      budgetUtilization: {
        value: parseFloat(budgetUtilization.toFixed(1)),
        score: budgetsUsedCount > 0 ? (budgetUtilization <= 80 ? 20 : budgetUtilization <= 90 ? 12 : 5) : 0,
        label: budgetsUsedCount === 0 ? 'No Budgets' : budgetUtilization <= 80 ? 'On Track' : budgetUtilization <= 100 ? 'Near Limit' : 'Over'
      },
      budgetOverruns: {
        value: budgetOverruns,
        score: budgetOverruns === 0 ? 5 : budgetOverruns === 1 ? -5 : -15,
        label: budgetOverruns === 0 ? 'None' : `${budgetOverruns} overrun${budgetOverruns > 1 ? 's' : ''}`
      },
      spendingConsistency: {
        value: parseFloat(spendingConsistencyScore.toFixed(1)),
        score: spendingConsistencyScore >= 70 ? 10 : spendingConsistencyScore >= 50 ? 5 : -5,
        label: spendingConsistencyScore >= 70 ? 'Consistent' : spendingConsistencyScore >= 50 ? 'Moderate' : 'Volatile'
      }
    };

    // 9. Smart Spending Insights (Dynamic, 3-5 insights)
    const insights: string[] = [];

    if (totalIncome === 0) {
      insights.push("You haven't recorded any income this month. Add income to track your cash flow.");
    }

    if (totalExpenses > totalIncome && totalIncome > 0) {
      insights.push("Expenses are greater than income. Consider reducing discretionary spending.");
    }

    if (savingsRate >= 25) {
      insights.push(`Your savings rate is ${parseFloat(savingsRate.toFixed(1))}% — well above the recommended 20% target.`);
    } else if (savingsRate > 0 && savingsRate < 25) {
      insights.push(`Your savings rate is ${parseFloat(savingsRate.toFixed(1))}%. Aim for 20% or higher for long-term financial health.`);
    } else if (savingsRate < 0) {
      insights.push(`You're spending ${Math.abs(parseFloat(savingsRate.toFixed(1)))}% more than you earn. This is unsustainable.`);
    }

    // Category comparison with previous month
    if (monthlyCashFlow.length >= 2) {
      const currentMonth = monthlyCashFlow[monthlyCashFlow.length - 1];
      const prevMonth = monthlyCashFlow[monthlyCashFlow.length - 2];
      if (currentMonth && prevMonth) {
        if (currentMonth.expenses > prevMonth.expenses && prevMonth.expenses > 0) {
          const pctIncrease = ((currentMonth.expenses - prevMonth.expenses) / prevMonth.expenses * 100).toFixed(0);
          insights.push(`Your spending increased by ${pctIncrease}% compared to last month.`);
        } else if (currentMonth.expenses < prevMonth.expenses && prevMonth.expenses > 0) {
          const pctDecrease = ((prevMonth.expenses - currentMonth.expenses) / prevMonth.expenses * 100).toFixed(0);
          insights.push(`Great job! Your spending decreased by ${pctDecrease}% compared to last month.`);
        }
      }
    }

    // Largest expense category
    if (expensesByCategory.length > 0) {
      const largest = expensesByCategory[0];
      const pct = totalExpenses > 0 ? ((largest.amount / totalExpenses) * 100).toFixed(0) : 0;
      insights.push(`${largest.category} is your largest expense category at ${pct}% of total spending.`);
    }

    // Budget overrun warnings
    if (budgetOverruns > 0) {
      const overBudgets = budgets.filter((b) => {
        const spent = spendingMap.get(b.category.toLowerCase()) || 0;
        return spent > b.monthlyLimit;
      });
      if (overBudgets.length > 0) {
        insights.push(`You've exceeded the budget for ${overBudgets.map(b => b.category).join(', ')}.`);
      }
    } else if (budgetsUsedCount > 0) {
      insights.push("You stayed within every budget this month. Keep up the discipline!");
    }

    // Budget almost exhausted
    budgets.forEach((b) => {
      const spent = spendingMap.get(b.category.toLowerCase()) || 0;
      const pct = b.monthlyLimit > 0 ? (spent / b.monthlyLimit) * 100 : 0;
      if (pct >= 80 && pct < 100) {
        insights.push(`${b.category} budget is almost exhausted at ${Math.round(pct)}% used.`);
      }
    });

    // Spending consistency
    if (spendingConsistencyScore >= 70) {
      insights.push("Your spending is consistent across the month — a sign of good financial habits.");
    } else if (spendingConsistencyScore < 50) {
      insights.push("Your spending is volatile. Consider smoothing out purchases for better predictability.");
    }

    // Limit to 5 insights
    const finalInsights = insights.slice(0, 5);

    // 10. Spending Heatmap (last 30 days daily totals)
    const heatmapData: { date: string; amount: number }[] = [];
    const heatmapDate = new Date(thirtyDaysAgo);
    for (let i = 0; i < 30; i++) {
      const dateStr = heatmapDate.toISOString().split('T')[0];
      heatmapData.push({
        date: dateStr,
        amount: dailySpending[dateStr] || 0
      });
      heatmapDate.setDate(heatmapDate.getDate() + 1);
    }

    return {
      expensesByCategory,
      monthlyCashFlow,
      savingsRate: parseFloat(savingsRate.toFixed(1)),
      largestExpense: largestExpense || null,
      financialHealthScore: healthScore,
      healthBreakdown,
      smartSpendingInsights: finalInsights,
      heatmapData,
      budgetOverruns,
      spendingConsistency: parseFloat(spendingConsistencyScore.toFixed(1))
    };
  }
}

export const analyticsService = new AnalyticsService();

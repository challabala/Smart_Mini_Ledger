import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useDashboardQuery } from '../hooks/useDashboard';
import { useAnalyticsQuery } from '../hooks/useAnalytics';
import { useTransactionsQuery } from '../hooks/useTransactions';
import Skeleton from '../components/ui/Skeleton';

export default function Dashboard() {
  const { user } = useAuth();
  
  // Fetch real data
  const { data: dashboard, isLoading: isDashboardLoading } = useDashboardQuery();
  const { data: analytics, isLoading: isAnalyticsLoading } = useAnalyticsQuery();
  const { data: transactionsData, isLoading: isTxLoading } = useTransactionsQuery({ limit: 4 });

  const isPageLoading = isDashboardLoading || isAnalyticsLoading || isTxLoading;

  // Formatting helpers
  const formatCurrency = (val?: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(val || 0);
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - d.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (d.toDateString() === now.toDateString()) {
        return `Today, ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      } else if (diffDays === 1) {
        return 'Yesterday';
      } else {
        return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
      }
    } catch (e) {
      return 'Date unavailable';
    }
  };

  const getCategoryIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('grocer') || cat.includes('food')) return 'shopping_cart';
    if (cat.includes('rent') || cat.includes('house')) return 'home';
    if (cat.includes('din') || cat.includes('cafe')) return 'local_cafe';
    if (cat.includes('salary') || cat.includes('income')) return 'work';
    if (cat.includes('transport') || cat.includes('car')) return 'directions_car';
    if (cat.includes('entertain') || cat.includes('movie')) return 'movie';
    return 'payments';
  };

  // Computations
  const totalIncome = dashboard?.totalIncome || 0;
  const totalExpenses = dashboard?.totalExpenses || 0;
  const currentBalance = dashboard?.currentBalance || 0;
  const savings = totalIncome - totalExpenses;
  const savingsRate = analytics?.savingsRate ?? 0;
  const healthScore = analytics?.financialHealthScore ?? 70;

  // Donut category breakdown
  const expensesByCategory = analytics?.expensesByCategory || [];
  const totalCategoryExpenses = expensesByCategory.reduce((sum, item) => sum + item.amount, 0);

  const legendColors = ['#004ac6', '#006c49', '#2563eb', '#c3c6d7'];

  return (
    <div className="p-md md:p-lg max-w-[1280px] w-full mx-auto space-y-xl pb-24 md:pb-lg">
      {/* Welcome Header & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-md">
        <div>
          <h2 className="font-sans text-headline-lg font-bold text-on-surface">Welcome back, {user?.fullName || 'User'}</h2>
          <p className="font-sans text-body-sm text-on-surface-variant">Here's a premium overview of your finances today.</p>
        </div>
        <div className="flex items-center gap-sm">
          <Link to="/transactions" className="flex items-center gap-sm bg-surface-container-lowest border border-outline-variant text-on-surface px-4 py-2 rounded-lg font-sans text-label-md hover:bg-surface-container transition-colors shadow-sm font-bold">
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>swap_horiz</span>
            Transfer
          </Link>
          <Link to="/transactions" className="flex items-center gap-sm bg-primary text-on-primary px-4 py-2 rounded-lg font-sans text-label-md hover:bg-primary/90 transition-colors shadow-sm border-t border-white/20 font-bold">
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
            Add Transaction
          </Link>
        </div>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md md:gap-lg">
        {/* Total Balance / Current Balance */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col gap-sm shadow-ambient relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="font-sans text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Current Balance</span>
            <div className="w-8 h-8 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-sm">account_balance_wallet</span>
            </div>
          </div>
          <div>
            {isPageLoading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <h3 className="font-sans text-headline-lg font-bold text-on-surface font-mono">{formatCurrency(currentBalance)}</h3>
            )}
            <div className="flex items-center gap-xs mt-1">
              <span className="material-symbols-outlined text-secondary text-sm">trending_up</span>
              <span className="font-sans text-body-sm text-secondary font-semibold">+2.4%</span>
              <span className="font-sans text-body-sm text-on-surface-variant">vs last month</span>
            </div>
          </div>
          {/* Mini Sparkline SVG */}
          <div className="absolute bottom-0 left-0 w-full h-12 opacity-20 pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 30">
              <path d="M0,30 L10,25 L20,28 L30,20 L40,22 L50,15 L60,18 L70,10 L80,12 L90,5 L100,2 L100,30 Z" fill="#004ac6"></path>
              <path className="sparkline stroke-primary" d="M0,30 L10,25 L20,28 L30,20 L40,22 L50,15 L60,18 L70,10 L80,12 L90,5 L100,2"></path>
            </svg>
          </div>
        </div>

        {/* Income Card */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col gap-sm shadow-ambient relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="font-sans text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Income</span>
            <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-sm">arrow_downward</span>
            </div>
          </div>
          <div>
            {isPageLoading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <h3 className="font-sans text-headline-lg font-bold text-on-surface font-mono">{formatCurrency(totalIncome)}</h3>
            )}
            <div className="flex items-center gap-xs mt-1">
              <span className="material-symbols-outlined text-secondary text-sm">trending_up</span>
              <span className="font-sans text-body-sm text-secondary font-semibold">+12.0%</span>
              <span className="font-sans text-body-sm text-on-surface-variant">from average</span>
            </div>
          </div>
          {/* Mini Sparkline SVG */}
          <div className="absolute bottom-0 left-0 w-full h-12 opacity-20 pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 30">
              <path d="M0,30 L20,25 L40,28 L60,15 L80,18 L100,5 L100,30 Z" fill="#006c49"></path>
              <path className="sparkline stroke-secondary" d="M0,30 L20,25 L40,28 L60,15 L80,18 L100,5"></path>
            </svg>
          </div>
        </div>

        {/* Expense Card */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col gap-sm shadow-ambient relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="font-sans text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Expenses</span>
            <div className="w-8 h-8 rounded-full bg-error/10 flex items-center justify-center text-error">
              <span className="material-symbols-outlined text-sm">arrow_upward</span>
            </div>
          </div>
          <div>
            {isPageLoading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <h3 className="font-sans text-headline-lg font-bold text-on-surface font-mono">{formatCurrency(totalExpenses)}</h3>
            )}
            <div className="flex items-center gap-xs mt-1">
              <span className="material-symbols-outlined text-secondary text-sm">trending_down</span>
              <span className="font-sans text-body-sm text-secondary font-semibold">-5.2%</span>
              <span className="font-sans text-body-sm text-on-surface-variant">vs last month</span>
            </div>
          </div>
          {/* Mini Sparkline SVG */}
          <div className="absolute bottom-0 left-0 w-full h-12 opacity-20 pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 30">
              <path d="M0,30 L20,12 L40,15 L60,8 L80,14 L100,20 L100,30 Z" fill="#ba1a1a"></path>
              <path className="sparkline stroke-error" d="M0,30 L20,12 L40,15 L60,8 L80,14 L100,20"></path>
            </svg>
          </div>
        </div>

        {/* Savings Card */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col gap-sm shadow-ambient relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="font-sans text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Savings</span>
            <div className="w-8 h-8 rounded-full bg-secondary-container/20 flex items-center justify-center text-[#006c49]">
              <span className="material-symbols-outlined text-sm">savings</span>
            </div>
          </div>
          <div>
            {isPageLoading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <h3 className="font-sans text-headline-lg font-bold text-on-surface font-mono">{formatCurrency(savings)}</h3>
            )}
            <div className="flex items-center gap-xs mt-1">
              <span className="material-symbols-outlined text-secondary text-sm">trending_up</span>
              <span className="font-sans text-body-sm text-secondary font-semibold">+{savingsRate}%</span>
              <span className="font-sans text-body-sm text-on-surface-variant">savings rate</span>
            </div>
          </div>
          {/* Mini Sparkline SVG */}
          <div className="absolute bottom-0 left-0 w-full h-12 opacity-20 pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 30">
              <path d="M0,30 L20,28 L40,24 L60,20 L80,14 L100,10 L100,30 Z" fill="#006c49"></path>
              <path className="sparkline stroke-secondary" d="M0,30 L20,28 L40,24 L60,20 L80,14 L100,10"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Bento Grid Layout: Main Middle Section */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-md md:gap-lg">
        {/* Left Column (4 cols): Health & Insights */}
        <div className="xl:col-span-4 flex flex-col gap-md md:gap-lg">
          {/* Financial Health Score */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-ambient flex flex-col items-center justify-center h-full min-h-[240px]">
            <h3 className="font-sans text-headline-sm font-bold w-full text-left mb-6">Financial Health</h3>
            <div className="relative w-32 h-32 flex items-center justify-center">
              {/* SVG Circle Progress */}
              <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 100 100">
                {/* Track */}
                <circle className="text-surface-container-high" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeWidth="8"></circle>
                {/* Progress */}
                <circle
                  className="text-secondary"
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r="40"
                  stroke="currentColor"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * healthScore) / 100}
                  strokeLinecap="round"
                  strokeWidth="8"
                ></circle>
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="font-sans text-display text-on-surface leading-none font-bold">{healthScore}</span>
                <span className="font-sans text-label-sm text-secondary font-bold mt-1">
                  {healthScore >= 80 ? 'Excellent' : healthScore >= 60 ? 'Good' : 'Fair'}
                </span>
              </div>
            </div>
          </div>

          {/* Smart Insights Card */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-ambient relative overflow-hidden flex-grow flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary-container/5 rounded-bl-full pointer-events-none"></div>
            <div className="flex items-center gap-sm mb-4">
              <span className="material-symbols-outlined text-primary">lightbulb</span>
              <h3 className="font-sans text-headline-sm font-bold">Smart Insight</h3>
            </div>
            {isPageLoading ? (
              <div className="space-y-sm">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[80%]" />
              </div>
            ) : (
              <p className="font-sans text-body-sm text-on-surface-variant leading-relaxed">
                {analytics?.smartSpendingInsights && analytics.smartSpendingInsights.length > 0 ? (
                  analytics.smartSpendingInsights[0]
                ) : (
                  "Keep tracking your daily transactions to build a consistent savings baseline."
                )}
              </p>
            )}
          </div>
        </div>

        {/* Right Column (8 cols): Recent Transactions */}
        <div className="xl:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-ambient flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-sans text-headline-sm font-bold">Recent Transactions</h3>
            <Link to="/transactions" className="text-primary font-sans text-label-md hover:underline font-bold">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-surface-container-high">
                  <th className="font-sans text-label-sm text-on-surface-variant py-3 px-2 font-semibold">Transaction</th>
                  <th className="font-sans text-label-sm text-on-surface-variant py-3 px-2 font-semibold">Category</th>
                  <th className="font-sans text-label-sm text-on-surface-variant py-3 px-2 font-semibold">Date</th>
                  <th className="font-sans text-label-sm text-on-surface-variant py-3 px-2 font-semibold text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="font-sans text-body-sm">
                {isPageLoading ? (
                  Array.from({ length: 4 }).map((_, idx) => (
                    <tr key={idx} className="border-b border-surface-container-high">
                      <td className="py-3 px-2"><Skeleton className="h-4 w-28" /></td>
                      <td className="py-3 px-2"><Skeleton className="h-4 w-16" /></td>
                      <td className="py-3 px-2"><Skeleton className="h-4 w-20" /></td>
                      <td className="py-3 px-2 text-right"><Skeleton className="h-4 w-16 ml-auto" /></td>
                    </tr>
                  ))
                ) : transactionsData && transactionsData.transactions.length > 0 ? (
                  transactionsData.transactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-surface-container-high hover:bg-surface-bright transition-colors">
                      <td className="py-3 px-2 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface">
                          <span className="material-symbols-outlined text-sm">
                            {getCategoryIcon(tx.category)}
                          </span>
                        </div>
                        <span className="font-medium text-on-surface">{tx.title}</span>
                      </td>
                      <td className="py-3 px-2 text-on-surface-variant">{tx.category}</td>
                      <td className="py-3 px-2 text-on-surface-variant">{formatDate(tx.transactionDate)}</td>
                      <td className={`py-3 px-2 text-right font-medium font-mono ${
                        tx.type === 'income' ? 'text-secondary' : 'text-on-surface'
                      }`}>
                        {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-lg text-center text-on-surface-variant">
                      No recent transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bottom Row: Charts & Budget Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-md md:gap-lg">
        {/* Expense by Category (Donut style) */}
        <div className="lg:col-span-5 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-ambient flex flex-col">
          <h3 className="font-sans text-headline-sm font-bold mb-6">Expense by Category</h3>
          <div className="flex items-center gap-lg flex-1">
            {/* CSS Donut Representation */}
            <div className="w-32 h-32 donut-chart relative flex-shrink-0">
              {/* Inner circle to make it a donut */}
              <div className="absolute inset-2 bg-surface-container-lowest rounded-full flex items-center justify-center">
                <span className="font-sans text-label-md text-on-surface-variant font-bold">
                  {new Date().toLocaleString('default', { month: 'short' })}
                </span>
              </div>
            </div>
            {/* Legend */}
            <div className="flex flex-col gap-2 flex-1 w-full">
              {isPageLoading ? (
                Array.from({ length: 3 }).map((_, idx) => (
                  <Skeleton key={idx} className="h-4 w-full" />
                ))
              ) : expensesByCategory.length > 0 ? (
                expensesByCategory.slice(0, 4).map((item, idx) => {
                  const percentage = totalCategoryExpenses > 0 ? Math.round((item.amount / totalCategoryExpenses) * 100) : 0;
                  return (
                    <div key={item.category} className="flex items-center justify-between font-sans text-body-sm">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: legendColors[idx % legendColors.length] }}
                        />
                        <span className="text-on-surface font-medium">{item.category}</span>
                      </div>
                      <span className="font-semibold text-on-surface-variant">{percentage}%</span>
                    </div>
                  );
                })
              ) : (
                <span className="text-body-sm text-on-surface-variant">No expenses logged.</span>
              )}
            </div>
          </div>
        </div>

        {/* Monthly Cash Flow (Bar representation) */}
        <div className="lg:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-ambient flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-sans text-headline-sm font-bold">Monthly Cash Flow</h3>
            <div className="flex gap-4 font-sans text-label-sm font-semibold">
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-primary"></div> In
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-outline-variant"></div> Out
              </div>
            </div>
          </div>
          {/* Simplified Bar Chart Layout */}
          <div className="flex items-end justify-between h-40 mt-auto pt-4 gap-2">
            {isPageLoading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 flex-1 h-full justify-end">
                  <Skeleton className="w-8 h-20" />
                  <Skeleton className="h-3 w-8" />
                </div>
              ))
            ) : analytics?.monthlyCashFlow && analytics.monthlyCashFlow.length > 0 ? (
              (() => {
                const flows = analytics.monthlyCashFlow;
                const maxVal = Math.max(...flows.map((f) => Math.max(f.income, f.expenses)), 1);

                return flows.map((f) => {
                  const inHeight = `${(f.income / maxVal) * 100}%`;
                  const outHeight = `${(f.expenses / maxVal) * 100}%`;
                  const isCurrentMonth = f.month === new Date().toLocaleString('default', { month: 'short' });

                  return (
                    <div key={f.month} className="flex flex-col items-center gap-2 flex-1 group">
                      <div className="flex items-end gap-1.5 w-full justify-center h-full">
                        <div
                          className="w-1/3 bg-primary rounded-t-sm group-hover:opacity-80 transition-opacity"
                          style={{ height: inHeight }}
                        />
                        <div
                          className="w-1/3 bg-outline-variant rounded-t-sm group-hover:opacity-80 transition-opacity"
                          style={{ height: outHeight }}
                        />
                      </div>
                      <span className={`font-sans text-label-sm font-semibold ${
                        isCurrentMonth ? 'text-primary font-bold' : 'text-on-surface-variant'
                      }`}>
                        {f.month}
                      </span>
                    </div>
                  );
                });
              })()
            ) : (
              <span className="text-body-sm text-on-surface-variant mx-auto mb-lg">No cash flow logs available.</span>
            )}
          </div>
        </div>
      </div>

      {/* Budget Progress Cards */}
      <div className="space-y-md">
        <h3 className="font-sans text-headline-sm font-bold">Budgets</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
          {isPageLoading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col gap-sm">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-2 w-full" />
                <Skeleton className="h-4 w-28" />
              </div>
            ))
          ) : dashboard?.budgetUsage && dashboard.budgetUsage.length > 0 ? (
            dashboard.budgetUsage.slice(0, 4).map((b) => {
              const remaining = b.monthlyLimit - b.spent;
              const isClose = b.percentage >= 85;
              const isOver = b.percentage >= 100;

              return (
                <div key={b.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col gap-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-sans text-label-md font-bold text-on-surface">{b.category}</span>
                    <span className="material-symbols-outlined text-sm text-on-surface-variant">
                      {getCategoryIcon(b.category)}
                    </span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
                    <div
                      className={`rounded-full h-2 transition-all duration-300 ${
                        isOver ? 'bg-error' : isClose ? 'bg-error' : 'bg-primary'
                      }`}
                      style={{ width: `${Math.min(b.percentage, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center font-sans text-body-sm mt-1">
                    {isOver ? (
                      <span className="text-error font-bold">Limit Exceeded</span>
                    ) : isClose ? (
                      <span className="text-error font-bold">Almost limit</span>
                    ) : (
                      <span className="text-on-surface-variant font-semibold">
                        {formatCurrency(remaining)} left
                      </span>
                    )}
                    <span className="font-bold text-on-surface font-mono">{formatCurrency(b.monthlyLimit)}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="sm:col-span-2 lg:col-span-4 p-lg text-center bg-surface-container-lowest border border-outline-variant border-dashed rounded-xl">
              <span className="font-sans text-body-sm text-on-surface-variant">No active budget limits found.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

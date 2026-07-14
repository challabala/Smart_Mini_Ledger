import { useDashboardQuery } from '../hooks/useDashboard';
import { useAnalyticsQuery } from '../hooks/useAnalytics';
import Skeleton from '../components/ui/Skeleton';

export default function Analytics() {
  const { data: dashboard, isLoading: isDashboardLoading } = useDashboardQuery();
  const { data: analytics, isLoading: isAnalyticsLoading } = useAnalyticsQuery();

  const isPageLoading = isDashboardLoading || isAnalyticsLoading;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(val);
  };

  // Computations
  const totalBalance = dashboard?.currentBalance ?? 0;
  const totalIncome = dashboard?.totalIncome ?? 0;
  const totalExpenses = dashboard?.totalExpenses ?? 0;
  const savingsRate = analytics?.savingsRate ?? 0;
  const expensesByCategory = analytics?.expensesByCategory || [];
  const totalCategoryExpenses = expensesByCategory.reduce((sum, item) => sum + item.amount, 0);

  // Dynamic Chart Clip Paths
  const monthlyCashFlow = analytics?.monthlyCashFlow || [];
  const maxFlowVal = Math.max(
    ...monthlyCashFlow.map((f) => Math.max(f.income, f.expenses)),
    1
  );

  const incomePointsStr = monthlyCashFlow.map((f, i) => {
    const x = monthlyCashFlow.length > 1 ? (i / (monthlyCashFlow.length - 1)) * 100 : 0;
    const y = 100 - (f.income / maxFlowVal) * 80 - 10;
    return `${x}% ${y}%`;
  });
  const incomePolygon = incomePointsStr.length > 0
    ? `polygon(${incomePointsStr.join(', ')}, 100% 100%, 0% 100%)`
    : 'polygon(0% 100%, 100% 100%)';

  const expensePointsStr = monthlyCashFlow.map((f, i) => {
    const x = monthlyCashFlow.length > 1 ? (i / (monthlyCashFlow.length - 1)) * 100 : 0;
    const y = 100 - (f.expenses / maxFlowVal) * 80 - 10;
    return `${x}% ${y}%`;
  });
  const expensePolygon = expensePointsStr.length > 0
    ? `polygon(${expensePointsStr.join(', ')}, 100% 100%, 0% 100%)`
    : 'polygon(0% 100%, 100% 100%)';

  const categoryProgressColors = ['bg-primary', 'bg-secondary', 'bg-[#6b6e70]', 'bg-[#c3c6d7]'];

  return (
    <main className="flex-grow p-margin-mobile md:p-xl w-full max-w-container-max mx-auto flex flex-col gap-lg pb-[100px] md:pb-xl">
      {/* Title */}
      <div>
        <h1 className="font-sans text-headline-lg-mobile md:text-headline-lg font-bold text-on-surface mb-xs">Analytics</h1>
        <p className="font-sans text-body-sm text-on-surface-variant">Analyze your financial history and savings rates.</p>
      </div>

      {/* Grid containing all components */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-md md:gap-lg">
        {/* Metric Cards */}
        <div className="md:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-md md:gap-lg mb-md">
          {/* Total Balance */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col shadow-sm">
            <span className="font-sans text-label-md text-on-surface-variant mb-xs font-semibold">Total Balance</span>
            {isPageLoading ? (
              <Skeleton className="h-7 w-28" />
            ) : (
              <span className="font-sans text-headline-md font-bold text-on-background font-mono">{formatCurrency(totalBalance)}</span>
            )}
            <div className="flex items-center gap-xs mt-sm text-secondary">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span className="font-sans text-label-sm font-semibold">+4.2%</span>
            </div>
          </div>
          {/* Monthly Income */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col shadow-sm">
            <span className="font-sans text-label-md text-on-surface-variant mb-xs font-semibold">Monthly Income</span>
            {isPageLoading ? (
              <Skeleton className="h-7 w-28" />
            ) : (
              <span className="font-sans text-headline-md font-bold text-on-background font-mono">{formatCurrency(totalIncome)}</span>
            )}
            <div className="flex items-center gap-xs mt-sm text-secondary">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span className="font-sans text-label-sm font-semibold">+1.5%</span>
            </div>
          </div>
          {/* Monthly Expenses */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col shadow-sm">
            <span className="font-sans text-label-md text-on-surface-variant mb-xs font-semibold">Monthly Expenses</span>
            {isPageLoading ? (
              <Skeleton className="h-7 w-28" />
            ) : (
              <span className="font-sans text-headline-md font-bold text-on-background font-mono">{formatCurrency(totalExpenses)}</span>
            )}
            <div className="flex items-center gap-xs mt-sm text-error">
              <span className="material-symbols-outlined text-sm">trending_down</span>
              <span className="font-sans text-label-sm font-semibold">-2.1%</span>
            </div>
          </div>
          {/* Savings Rate */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col shadow-sm">
            <span className="font-sans text-label-md text-on-surface-variant mb-xs font-semibold">Savings Rate</span>
            {isPageLoading ? (
              <Skeleton className="h-7 w-28" />
            ) : (
              <span className="font-sans text-headline-md font-bold text-on-background font-mono">{savingsRate}%</span>
            )}
            <div className="flex items-center gap-xs mt-sm text-secondary">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span className="font-sans text-label-sm font-semibold">+5.0%</span>
            </div>
          </div>
        </div>

        {/* Large Area Chart (Income vs Expense) */}
        <div className="md:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
          <div className="flex justify-between items-center mb-lg">
            <h3 className="font-sans text-headline-sm font-bold text-on-background">Cash Flow Overview</h3>
            <button className="text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
          {/* Chart Area */}
          <div className="w-full h-64 border-b border-l border-outline-variant relative flex items-end px-2 pb-2">
            {/* Y Axis Labels */}
            <div className="absolute -left-8 top-0 h-full flex flex-col justify-between text-xs text-outline py-2 font-semibold">
              <span>{formatCurrency(maxFlowVal)}</span>
              <span>{formatCurrency(maxFlowVal / 2)}</span>
              <span>$0</span>
            </div>
            {/* Chart Graphic Representation */}
            <div className="w-full h-full relative overflow-hidden">
              {isPageLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-sans text-body-sm text-outline animate-pulse">Drawing cash flow map...</span>
                </div>
              ) : monthlyCashFlow.length > 0 ? (
                <>
                  {/* Income Area */}
                  <div
                    className="absolute bottom-0 w-full h-[100%] bg-primary-container/20 border-t-2 border-primary transition-all duration-500"
                    style={{ clipPath: incomePolygon }}
                  />
                  {/* Expense Line */}
                  <div
                    className="absolute bottom-0 w-full h-[100%] border-t-2 border-secondary border-dashed transition-all duration-500"
                    style={{ clipPath: expensePolygon }}
                  />
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-sans text-body-sm text-outline">No chart data available.</span>
                </div>
              )}
            </div>
            {/* X Axis Labels */}
            <div className="absolute -bottom-6 w-full flex justify-between text-xs text-outline font-semibold">
              {monthlyCashFlow.length > 0 ? (
                monthlyCashFlow.map((f) => <span key={f.month}>{f.month}</span>)
              ) : (
                <>
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                </>
              )}
            </div>
          </div>
          <div className="flex gap-md mt-8 justify-center">
            <div className="flex items-center gap-xs">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="font-sans text-label-sm text-on-surface-variant font-bold">Income</span>
            </div>
            <div className="flex items-center gap-xs">
              <div className="w-3 h-3 rounded-full bg-secondary border-2 border-dashed"></div>
              <span className="font-sans text-label-sm text-on-surface-variant font-bold">Expenses</span>
            </div>
          </div>
        </div>

        {/* Spending Analysis Breakdown */}
        <div className="md:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm flex flex-col justify-between">
          <h3 className="font-sans text-headline-sm font-bold text-on-background mb-lg">Spending by Category</h3>
          <div className="flex-grow flex flex-col justify-center gap-md">
            {isPageLoading ? (
              Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="space-y-sm">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-2 w-full" />
                </div>
              ))
            ) : expensesByCategory.length > 0 ? (
              expensesByCategory.slice(0, 4).map((item, idx) => {
                const percent = totalCategoryExpenses > 0 ? Math.round((item.amount / totalCategoryExpenses) * 100) : 0;
                return (
                  <div key={item.category}>
                    <div className="flex justify-between mb-xs">
                      <span className="font-sans text-label-md text-on-surface font-bold">{item.category}</span>
                      <span className="font-sans text-label-md text-on-surface-variant font-mono font-bold">{formatCurrency(item.amount)}</span>
                    </div>
                    <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                      <div
                        className={`${categoryProgressColors[idx % categoryProgressColors.length]} h-full rounded-full`}
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })
            ) : (
              <span className="text-body-sm text-on-surface-variant text-center">No categories recorded.</span>
            )}
          </div>
          <button className="w-full mt-lg py-2 border border-outline-variant rounded-lg font-sans text-label-md text-on-surface hover:bg-surface-variant transition-colors active:scale-[0.99] font-bold">
            View All Categories
          </button>
        </div>

        {/* Savings Trend */}
        <div className="md:col-span-6 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
          <h3 className="font-sans text-headline-sm font-bold text-on-background mb-lg">Savings Growth</h3>
          <div className="w-full h-48 relative flex items-end pb-2">
            {/* Simple Line Chart Representation */}
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 50">
              <path
                className="text-secondary"
                d="M0,45 Q20,40 40,30 T80,15 T100,5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
              {/* Points */}
              <circle className="text-secondary" cx="0" cy="45" fill="currentColor" r="2" />
              <circle className="text-secondary" cx="40" cy="30" fill="currentColor" r="2" />
              <circle className="text-secondary" cx="80" cy="15" fill="currentColor" r="2" />
              <circle className="text-secondary" cx="100" cy="5" fill="currentColor" r="2" />
            </svg>
          </div>
        </div>

        {/* Weekly Spending Heatmap */}
        <div className="md:col-span-6 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
          <h3 className="font-sans text-headline-sm font-bold text-on-background mb-lg">Weekly Intensity</h3>
          <div className="grid grid-cols-7 gap-sm h-48">
            {/* Columns representing days */}
            <div className="flex flex-col justify-end gap-xs h-full pb-6 relative">
              <div className="w-full bg-primary/20 rounded-sm h-1/4"></div>
              <div className="w-full bg-primary/40 rounded-sm h-1/2"></div>
              <div className="w-full bg-primary/10 rounded-sm h-1/4"></div>
              <span className="absolute bottom-0 w-full text-center text-xs text-outline font-sans text-label-sm font-semibold">M</span>
            </div>
            <div className="flex flex-col justify-end gap-xs h-full pb-6 relative">
              <div className="w-full bg-primary/60 rounded-sm h-1/3"></div>
              <div className="w-full bg-primary/80 rounded-sm h-2/3"></div>
              <span className="absolute bottom-0 w-full text-center text-xs text-outline font-sans text-label-sm font-semibold">T</span>
            </div>
            <div className="flex flex-col justify-end gap-xs h-full pb-6 relative">
              <div className="w-full bg-primary/20 rounded-sm h-1/2"></div>
              <div className="w-full bg-primary/30 rounded-sm h-1/2"></div>
              <span className="absolute bottom-0 w-full text-center text-xs text-outline font-sans text-label-sm font-semibold">W</span>
            </div>
            <div className="flex flex-col justify-end gap-xs h-full pb-6 relative">
              <div className="w-full bg-primary rounded-sm h-full"></div>
              <span className="absolute bottom-0 w-full text-center text-xs text-outline font-sans text-label-sm font-semibold">T</span>
            </div>
            <div className="flex flex-col justify-end gap-xs h-full pb-6 relative">
              <div className="w-full bg-primary/40 rounded-sm h-1/3"></div>
              <div className="w-full bg-primary/20 rounded-sm h-1/3"></div>
              <div className="w-full bg-primary/10 rounded-sm h-1/3"></div>
              <span className="absolute bottom-0 w-full text-center text-xs text-outline font-sans text-label-sm font-semibold">F</span>
            </div>
            <div className="flex flex-col justify-end gap-xs h-full pb-6 relative">
              <div className="w-full bg-primary/80 rounded-sm h-3/4"></div>
              <span className="absolute bottom-0 w-full text-center text-xs text-outline font-sans text-label-sm font-semibold">S</span>
            </div>
            <div className="flex flex-col justify-end gap-xs h-full pb-6 relative">
              <div className="w-full bg-primary/10 rounded-sm h-1/4"></div>
              <span className="absolute bottom-0 w-full text-center text-xs text-outline font-sans text-label-sm font-semibold">S</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

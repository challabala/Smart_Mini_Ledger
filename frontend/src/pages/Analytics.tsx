import {
  TrendingUp, TrendingDown, Wallet, PiggyBank,
  ShoppingCart, Home, Coffee, Car, Clapperboard, CreditCard,
  Zap, Stethoscope, Package, Lightbulb, BarChart3, Target,
} from 'lucide-react';
import { useDashboardQuery } from '../hooks/useDashboard';
import { useAnalyticsQuery } from '../hooks/useAnalytics';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);
const fmtFull = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v);

const getCatIcon = (cat: string) => {
  const c = cat.toLowerCase();
  if (c.includes('food') || c.includes('grocer')) return ShoppingCart;
  if (c.includes('rent') || c.includes('house')) return Home;
  if (c.includes('din') || c.includes('cafe') || c.includes('coffee')) return Coffee;
  if (c.includes('transport') || c.includes('car')) return Car;
  if (c.includes('entertain') || c.includes('movie')) return Clapperboard;
  if (c.includes('util') || c.includes('electric')) return Zap;
  if (c.includes('health') || c.includes('medical')) return Stethoscope;
  if (c.includes('shop')) return Package;
  return CreditCard;
};

const CAT_COLORS = ['#10B981', '#14B8A6', '#3B82F6', '#6366F1', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

function Sk({ className }: { className?: string }) {
  return <div className={`skeleton rounded-xl ${className}`} />;
}

export default function Analytics() {
  const { data: dashboard, isLoading: isDashLoading } = useDashboardQuery();
  const { data: analytics, isLoading: isAnalyticsLoading } = useAnalyticsQuery();
  const isLoading = isDashLoading || isAnalyticsLoading;

  const totalBalance  = dashboard?.currentBalance ?? 0;
  const totalIncome   = dashboard?.totalIncome    ?? 0;
  const totalExpenses = dashboard?.totalExpenses   ?? 0;
  const savings       = totalIncome - totalExpenses;
  const savingsRate   = analytics?.savingsRate         ?? 0;
  const healthScore   = analytics?.financialHealthScore ?? 70;
  const expByCat      = analytics?.expensesByCategory   ?? [];
  const cashFlow      = analytics?.monthlyCashFlow      ?? [];
  const insights      = analytics?.smartSpendingInsights ?? [];
  const largestExp    = analytics?.largestExpense;

  const totalCatExp = expByCat.reduce((s, i) => s + i.amount, 0);
  const maxFlowVal  = Math.max(...cashFlow.map(f => Math.max(f.income, f.expenses)), 1);
  const curMonth    = new Date().toLocaleString('default', { month: 'short' });

  const healthColor  = healthScore >= 80 ? '#10B981' : healthScore >= 60 ? '#F59E0B' : '#EF4444';
  const healthLabel  = healthScore >= 80 ? 'Excellent' : healthScore >= 60 ? 'Good' : 'Fair';
  const healthTextCl = healthScore >= 80 ? 'text-primary-600' : healthScore >= 60 ? 'text-amber-500' : 'text-error';

  // Build SVG polyline points for cash flow chart
  const buildPoints = (vals: number[], total: number) =>
    vals.map((v, i) => {
      const x = vals.length > 1 ? (i / (vals.length - 1)) * 280 : 0;
      const y = 90 - (v / total) * 80;
      return `${x},${y}`;
    }).join(' ');

  const incomePoints  = cashFlow.length ? buildPoints(cashFlow.map(f => f.income),   maxFlowVal) : '';
  const expensePoints = cashFlow.length ? buildPoints(cashFlow.map(f => f.expenses), maxFlowVal) : '';

  return (
    <div className="p-4 md:p-6 max-w-[1280px] w-full mx-auto space-y-6 pb-24 md:pb-8 animate-fade-up">

      {/* ── Header ── */}
      <div>
        <h2 className="text-2xl font-bold text-text-primary tracking-tight">Analytics</h2>
        <p className="text-sm text-text-muted mt-0.5">Deep-dive into your financial history and savings trends</p>
      </div>

      {/* ── Summary Metrics ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Net Balance', value: fmt(totalBalance), icon: Wallet, color: 'text-primary-600', bg: 'bg-primary-50', trend: '+4.2%', up: true },
          { label: 'Total Income', value: fmt(totalIncome), icon: TrendingUp, color: 'text-teal-600', bg: 'bg-teal-50', trend: '+1.5%', up: true },
          { label: 'Total Expenses', value: fmt(totalExpenses), icon: TrendingDown, color: 'text-red-500', bg: 'bg-error-bg', trend: '-5.2%', up: true },
          { label: 'Net Savings', value: fmt(savings), icon: PiggyBank, color: 'text-accent-600', bg: 'bg-accent-50', trend: `${savingsRate}%`, up: savings >= 0 },
        ].map(({ label, value, icon: Icon, color, bg, trend, up }) => (
          <div key={label} className="bg-white rounded-2xl border border-border shadow-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center`}>
                <Icon className={`w-4.5 h-4.5 ${color}`} style={{ width: 18, height: 18 }} />
              </div>
              <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full ${up ? 'bg-primary-50 text-primary-700' : 'bg-error-bg text-red-600'}`}>
                {trend}
              </span>
            </div>
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">{label}</p>
            {isLoading ? <Sk className="h-7 w-28" /> : (
              <p className="text-xl font-bold text-text-primary font-mono">{value}</p>
            )}
          </div>
        ))}
      </div>

      {/* ── Cash Flow Chart + Health Score ── */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">

        {/* Cash Flow SVG line chart */}
        <div className="xl:col-span-8 bg-white rounded-2xl border border-border shadow-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-text-primary">Monthly Cash Flow</h3>
              <p className="text-xs text-text-muted mt-0.5">Income vs expenses over time</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold text-text-muted">
              <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded-full bg-primary-500 inline-block" />Income</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded-full bg-red-400 inline-block" />Expenses</span>
            </div>
          </div>

          {isLoading ? (
            <Sk className="h-44 w-full" />
          ) : cashFlow.length > 0 ? (
            <div className="relative">
              {/* SVG Chart */}
              <svg viewBox="0 0 280 100" className="w-full h-44" preserveAspectRatio="none">
                {/* Grid lines */}
                {[0, 25, 50, 75, 100].map((y) => (
                  <line key={y} x1="0" y1={y * 0.9 + 5} x2="280" y2={y * 0.9 + 5} stroke="#F1F5F9" strokeWidth="0.5" />
                ))}
                {/* Income area */}
                {incomePoints && (
                  <>
                    <defs>
                      <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#EF4444" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <polygon points={`${incomePoints} ${cashFlow.length > 1 ? 280 : 0},95 0,95`} fill="url(#incomeGrad)" />
                    <polyline points={incomePoints} fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </>
                )}
                {/* Expense area */}
                {expensePoints && (
                  <>
                    <polygon points={`${expensePoints} ${cashFlow.length > 1 ? 280 : 0},95 0,95`} fill="url(#expGrad)" />
                    <polyline points={expensePoints} fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </>
                )}
                {/* Month labels */}
                {cashFlow.map((f, i) => {
                  const x = cashFlow.length > 1 ? (i / (cashFlow.length - 1)) * 280 : 0;
                  return (
                    <text key={f.month} x={x} y="100" textAnchor="middle" fontSize="5" fill={f.month === curMonth ? '#10B981' : '#94A3B8'} fontWeight={f.month === curMonth ? '700' : '500'}>
                      {f.month}
                    </text>
                  );
                })}
              </svg>
            </div>
          ) : (
            <div className="h-44 flex items-center justify-center">
              <p className="text-sm text-text-muted">No cash flow data available</p>
            </div>
          )}
        </div>

        {/* Health Score */}
        <div className="xl:col-span-4 bg-white rounded-2xl border border-border shadow-card p-5 flex flex-col items-center justify-center">
          <div className="flex items-center justify-between w-full mb-4">
            <h3 className="text-sm font-bold text-text-primary">Financial Health</h3>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
              healthScore >= 80 ? 'bg-primary-50 text-primary-700' : healthScore >= 60 ? 'bg-warning-bg text-amber-700' : 'bg-error-bg text-red-700'
            }`}>{healthLabel}</span>
          </div>
          {isLoading ? (
            <Sk className="w-32 h-32 rounded-full mx-auto" />
          ) : (
            <div className="relative w-36 h-36 mx-auto">
              <svg className="-rotate-90 w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F1F5F9" strokeWidth="10" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke={healthColor} strokeWidth="10"
                  strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * healthScore) / 100} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-text-primary">{healthScore}</span>
                <span className={`text-xs font-bold ${healthTextCl}`}>{healthLabel}</span>
              </div>
            </div>
          )}
          <div className="mt-5 w-full">
            <div className="progress-bar mb-2">
              <div className="progress-bar-fill bg-gradient-primary" style={{ width: `${savingsRate}%` }} />
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-text-muted font-medium">Savings Rate</span>
              <span className="font-bold text-primary-600">{savingsRate}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Category Breakdown + Largest Expense + Insights ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

        {/* Category Breakdown */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-border shadow-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-primary-600" />
            </div>
            <h3 className="text-sm font-bold text-text-primary">Spending by Category</h3>
          </div>
          <div className="space-y-3">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => <Sk key={i} className="h-10 w-full" />)
            ) : expByCat.length > 0 ? (
              expByCat.slice(0, 7).map((item, i) => {
                const CatIcon = getCatIcon(item.category);
                const pct = totalCatExp > 0 ? (item.amount / totalCatExp) * 100 : 0;
                const color = CAT_COLORS[i % CAT_COLORS.length];
                return (
                  <div key={item.category}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: color + '20' }}>
                          <CatIcon className="w-3.5 h-3.5" style={{ color }} />
                        </div>
                        <span className="text-xs font-semibold text-text-primary">{item.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-text-secondary font-mono">{fmtFull(item.amount)}</span>
                        <span className="text-[10px] font-bold text-text-muted w-8 text-right">{Math.round(pct)}%</span>
                      </div>
                    </div>
                    <div className="h-1.5 rounded-full bg-surface-muted overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: color }} />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-text-muted py-4 text-center">No expense data available</p>
            )}
          </div>
        </div>

        {/* Right column: Largest Expense + Insights */}
        <div className="lg:col-span-7 flex flex-col gap-4">

          {/* Largest Expense */}
          <div className="bg-white rounded-2xl border border-border shadow-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-error-bg flex items-center justify-center">
                <Target className="w-4 h-4 text-error" />
              </div>
              <h3 className="text-sm font-bold text-text-primary">Largest Expense</h3>
            </div>
            {isLoading ? (
              <div className="space-y-2"><Sk className="h-6 w-36" /><Sk className="h-4 w-24" /></div>
            ) : largestExp ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-error-bg flex items-center justify-center">
                    {(() => { const I = getCatIcon(largestExp.category); return <I className="w-5 h-5 text-error" />; })()}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-primary">{largestExp.title}</p>
                    <p className="text-xs text-text-muted">{largestExp.category} · {new Date(largestExp.transactionDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}</p>
                  </div>
                </div>
                <p className="text-lg font-bold text-expense font-mono">{fmtFull(largestExp.amount)}</p>
              </div>
            ) : (
              <p className="text-sm text-text-muted">No expense data yet</p>
            )}
          </div>

          {/* Smart Insights */}
          <div className="bg-white rounded-2xl border border-border shadow-card p-5 flex-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
                <Lightbulb className="w-4 h-4 text-amber-500" />
              </div>
              <h3 className="text-sm font-bold text-text-primary">Smart Insights</h3>
            </div>
            {isLoading ? (
              <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <Sk key={i} className="h-12 w-full" />)}</div>
            ) : insights.length > 0 ? (
              <div className="space-y-3">
                {insights.slice(0, 4).map((insight, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-surface-muted/60">
                    <div className="w-6 h-6 rounded-lg bg-amber-50 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-amber-500 text-xs font-bold">{i + 1}</span>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">{insight}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-text-muted">Add more transactions to unlock personalized insights</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

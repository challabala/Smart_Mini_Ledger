import React from 'react';
import { Link } from 'react-router-dom';
import {
  Wallet, TrendingUp, TrendingDown, PiggyBank,
  ArrowRight, Lightbulb, ShoppingCart, Home, Coffee,
  Briefcase, Car, Clapperboard, CreditCard, Plus,
  Activity, Info,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useDashboardQuery } from '../hooks/useDashboard';
import { useAnalyticsQuery } from '../hooks/useAnalytics';
import { useTransactionsQuery } from '../hooks/useTransactions';

// ─── Skeleton ────────────────────────────────────────────────────────────────
function Sk({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return <div className={`skeleton rounded-lg ${className ?? ''}`} style={style} />;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const fmt = (val?: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val || 0);

const fmtFull = (val?: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val || 0);

const relativeDate = (dateStr: string) => {
  try {
    const d = new Date(dateStr);
    const now = new Date();
    if (d.toDateString() === now.toDateString()) return `Today, ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const diff = Math.ceil((now.getTime() - d.getTime()) / 86400000);
    if (diff === 1) return 'Yesterday';
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
  } catch { return '—'; }
};

const getCategoryIcon = (category: string) => {
  const c = category.toLowerCase();
  if (c.includes('grocer') || c.includes('food')) return ShoppingCart;
  if (c.includes('rent') || c.includes('house')) return Home;
  if (c.includes('din') || c.includes('cafe') || c.includes('coffee')) return Coffee;
  if (c.includes('salary') || c.includes('income')) return Briefcase;
  if (c.includes('transport') || c.includes('car')) return Car;
  if (c.includes('entertain') || c.includes('movie')) return Clapperboard;
  return CreditCard;
};

const LEGEND_COLORS = ['#10B981', '#14B8A6', '#3B82F6', '#6366F1', '#F59E0B', '#EF4444'];

// ─── Stat Card ───────────────────────────────────────────────────────────────
function StatCard({
  label, value, sub, subPositive, icon: Icon, iconBg, iconColor, sparkPath, sparkColor, loading,
}: {
  label: string; value: string; sub?: string; subPositive?: boolean;
  icon: React.ElementType; iconBg: string; iconColor: string;
  sparkPath: string; sparkColor: string; loading: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl border border-border shadow-card p-5 relative overflow-hidden group hover:shadow-card-hover transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">{label}</p>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${iconBg}`}>
          <Icon className={`w-4.5 h-4.5 ${iconColor}`} style={{ width: 18, height: 18 }} />
        </div>
      </div>
      {loading ? (
        <div className="space-y-2">
          <Sk className="h-7 w-32" />
          <Sk className="h-4 w-24" />
        </div>
      ) : (
        <>
          <p className="text-2xl font-bold text-text-primary font-mono tracking-tight">{value}</p>
          {sub && (
            <p className={`text-xs font-semibold mt-1 ${subPositive ? 'text-primary-600' : 'text-red-500'}`}>
              {sub}
            </p>
          )}
        </>
      )}
      {/* Subtle sparkline */}
      <div className="absolute bottom-0 left-0 w-full h-10 opacity-10 pointer-events-none">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 30">
          <path d={`${sparkPath} L100,30 L0,30 Z`} fill={sparkColor} />
          <path d={sparkPath} fill="none" stroke={sparkColor} strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function Dashboard() {
  const { user } = useAuth();
  const { data: dashboard, isLoading: isDashLoading } = useDashboardQuery();
  const { data: analytics, isLoading: isAnalyticsLoading } = useAnalyticsQuery();
  const { data: txData, isLoading: isTxLoading } = useTransactionsQuery({ limit: 5 });

  const isLoading = isDashLoading || isAnalyticsLoading || isTxLoading;

  const totalIncome    = dashboard?.totalIncome    ?? 0;
  const totalExpenses  = dashboard?.totalExpenses  ?? 0;
  const currentBalance = dashboard?.currentBalance ?? 0;
  const savings        = totalIncome - totalExpenses;
  const savingsRate    = analytics?.savingsRate         ?? 0;
  const healthScore    = analytics?.financialHealthScore ?? 70;
  const expByCategory  = analytics?.expensesByCategory  ?? [];
  const totalCatExp    = expByCategory.reduce((s, i) => s + i.amount, 0);

  const healthLabel = healthScore >= 90 ? 'Excellent' : healthScore >= 75 ? 'Good' : healthScore >= 60 ? 'Average' : healthScore >= 40 ? 'Needs Improvement' : 'Critical';
  const healthColor = healthScore >= 75 ? 'text-primary-600' : healthScore >= 60 ? 'text-amber-500' : healthScore >= 40 ? 'text-orange-500' : 'text-red-500';
  const healthStroke = healthScore >= 75 ? '#10B981' : healthScore >= 60 ? '#F59E0B' : healthScore >= 40 ? '#F97316' : '#EF4444';

  const firstName = user?.fullName?.split(' ')[0] || 'there';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="p-4 md:p-6 max-w-[1280px] w-full mx-auto space-y-6 pb-24 md:pb-8 animate-fade-up">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-primary-600 uppercase tracking-widest mb-1">{greeting} 👋</p>
          <h2 className="text-2xl font-bold text-text-primary tracking-tight">
            Welcome back, <span className="text-primary-600">{firstName}</span>
          </h2>
          <p className="text-sm text-text-muted mt-0.5">Here's your financial overview for today.</p>
        </div>
        <div className="flex items-center gap-2.5">
          <Link
            to="/transactions"
            className="btn-secondary text-sm py-2 px-4"
          >
            <Activity className="w-4 h-4" />
            Activity
          </Link>
          <Link
            to="/transactions"
            className="btn-primary text-sm py-2 px-4"
          >
            <Plus className="w-4 h-4" />
            Add Transaction
          </Link>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Current Balance" loading={isLoading}
          value={fmt(currentBalance)}
          sub="+2.4% vs last month" subPositive
          icon={Wallet}
          iconBg="bg-primary-50" iconColor="text-primary-600"
          sparkPath="M0,28 L15,22 L30,25 L45,16 L60,18 L75,10 L90,12 L100,4"
          sparkColor="#10B981"
        />
        <StatCard
          label="Total Income" loading={isLoading}
          value={fmt(totalIncome)}
          sub="+12.0% from average" subPositive
          icon={TrendingUp}
          iconBg="bg-teal-50" iconColor="text-teal-600"
          sparkPath="M0,28 L20,22 L40,25 L60,12 L80,15 L100,4"
          sparkColor="#14B8A6"
        />
        <StatCard
          label="Total Expenses" loading={isLoading}
          value={fmt(totalExpenses)}
          sub="-5.2% vs last month" subPositive={false}
          icon={TrendingDown}
          iconBg="bg-error-bg" iconColor="text-error"
          sparkPath="M0,28 L20,10 L40,14 L60,6 L80,12 L100,18"
          sparkColor="#EF4444"
        />
        <StatCard
          label="Net Savings" loading={isLoading}
          value={fmt(savings)}
          sub={`${savingsRate}% savings rate`} subPositive={savings >= 0}
          icon={PiggyBank}
          iconBg="bg-accent-50" iconColor="text-accent-600"
          sparkPath="M0,28 L20,26 L40,22 L60,18 L80,12 L100,8"
          sparkColor="#3B82F6"
        />
      </div>

      {/* ── Mid Grid: Health + Recent Transactions ── */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">

        {/* Left: Health Score + Smart Insight */}
        <div className="xl:col-span-4 flex flex-col gap-4">

          {/* Financial Health */}
          <div className="bg-white rounded-2xl border border-border shadow-card p-5 flex flex-col items-center">
            <div className="flex items-center justify-between w-full mb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-text-primary">Financial Health</h3>
                <div className="group relative">
                  <Info className="w-3.5 h-3.5 text-text-muted cursor-help" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-2.5 bg-text-primary text-text-inverse text-[11px] rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none leading-relaxed shadow-lg">
                    Score factors: Savings Rate (30pts), Income vs Expense (25pts), Budget Utilization (20pts), Budget Overruns (15pts), Spending Consistency (10pts)
                  </div>
                </div>
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                healthScore >= 75 ? 'bg-primary-50 text-primary-700' :
                healthScore >= 60 ? 'bg-warning-bg text-amber-700' : healthScore >= 40 ? 'bg-orange-50 text-orange-700' : 'bg-error-bg text-red-700'
              }`}>{healthLabel}</span>
            </div>
            {isLoading ? (
              <Sk className="w-32 h-32 rounded-full" />
            ) : (
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="-rotate-90 w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F1F5F9" strokeWidth="8" />
                  <circle
                    cx="50" cy="50" r="40" fill="transparent"
                    stroke={healthStroke} strokeWidth="8"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * healthScore) / 100}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-bold text-text-primary">{healthScore}</span>
                  <span className={`text-xs font-bold mt-0.5 ${healthColor}`}>{healthLabel}</span>
                </div>
              </div>
            )}
            <div className="mt-4 w-full grid grid-cols-3 gap-2 text-center">
              {[
                { label: 'Income', val: fmt(totalIncome)   },
                { label: 'Spent',  val: fmt(totalExpenses) },
                { label: 'Saved',  val: fmt(savings)       },
              ].map(({ label, val }) => (
                <div key={label} className="bg-surface-muted rounded-xl p-2">
                  <p className="text-[10px] font-semibold text-text-muted uppercase">{label}</p>
                  <p className="text-xs font-bold text-text-primary mt-0.5 font-mono">{val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Smart Insights */}
          <div className="bg-white rounded-2xl border border-border shadow-card p-5 flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
                <Lightbulb className="w-4 h-4 text-amber-500" />
              </div>
              <h3 className="text-sm font-bold text-text-primary">Smart Insights</h3>
            </div>
            {isLoading ? (
              <div className="space-y-2">
                <Sk className="h-3 w-full" />
                <Sk className="h-3 w-4/5" />
                <Sk className="h-3 w-3/5" />
              </div>
            ) : analytics?.smartSpendingInsights && analytics.smartSpendingInsights.length > 0 ? (
              <div className="space-y-2.5">
                {analytics.smartSpendingInsights.slice(0, 3).map((insight, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-surface-muted/60">
                    <div className="w-5 h-5 rounded-md bg-amber-50 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-amber-500 text-[10px] font-bold">{i + 1}</span>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">{insight}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-text-secondary leading-relaxed">
                Keep tracking your daily transactions to build a consistent savings baseline and improve your score.
              </p>
            )}
          </div>
        </div>

        {/* Right: Recent Transactions */}
        <div className="xl:col-span-8 bg-white rounded-2xl border border-border shadow-card p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-text-primary">Recent Transactions</h3>
            <Link to="/transactions" className="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="overflow-x-auto -mx-1">
            <table className="data-table w-full">
              <thead>
                <tr>
                  <th>Transaction</th>
                  <th className="hidden sm:table-cell">Category</th>
                  <th className="hidden md:table-cell">Date</th>
                  <th className="text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      <td><Sk className="h-4 w-36" /></td>
                      <td className="hidden sm:table-cell"><Sk className="h-4 w-20" /></td>
                      <td className="hidden md:table-cell"><Sk className="h-4 w-24" /></td>
                      <td className="text-right"><Sk className="h-4 w-16 ml-auto" /></td>
                    </tr>
                  ))
                ) : txData?.transactions && txData.transactions.length > 0 ? (
                  txData.transactions.map((tx) => {
                    const CatIcon = getCategoryIcon(tx.category);
                    return (
                      <tr key={tx.id}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                              tx.type === 'income' ? 'bg-primary-50' : 'bg-surface-muted'
                            }`}>
                              <CatIcon className={`w-4 h-4 ${tx.type === 'income' ? 'text-primary-600' : 'text-text-muted'}`} />
                            </div>
                            <span className="font-semibold text-text-primary text-sm truncate max-w-[140px]">{tx.title}</span>
                          </div>
                        </td>
                        <td className="hidden sm:table-cell">
                          <span className="badge badge-neutral">{tx.category}</span>
                        </td>
                        <td className="hidden md:table-cell text-text-muted text-xs">{relativeDate(tx.transactionDate)}</td>
                        <td className={`text-right font-semibold font-mono text-sm ${tx.type === 'income' ? 'text-income' : 'text-expense'}`}>
                          {tx.type === 'income' ? '+' : '-'}{fmtFull(tx.amount)}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-10 text-text-muted text-sm">
                      No recent transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Bottom Row: Category Donut + Cash Flow ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

        {/* Expense by Category */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-border shadow-card p-5 flex flex-col">
          <h3 className="text-sm font-bold text-text-primary mb-4">Expense by Category</h3>
          <div className="flex items-center gap-5 flex-1">
            {/* Donut */}
            <div className="w-28 h-28 donut-chart relative shrink-0 shadow-card">
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-text-secondary">
                  {new Date().toLocaleString('default', { month: 'short' })}
                </span>
              </div>
            </div>
            {/* Legend */}
            <div className="flex flex-col gap-2.5 flex-1">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => <Sk key={i} className="h-4 w-full" />)
              ) : expByCategory.length > 0 ? (
                expByCategory.slice(0, 5).map((item, i) => {
                  const pct = totalCatExp > 0 ? Math.round((item.amount / totalCatExp) * 100) : 0;
                  return (
                    <div key={item.category} className="flex items-center gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: LEGEND_COLORS[i % LEGEND_COLORS.length] }} />
                      <span className="text-xs text-text-primary font-medium flex-1 truncate">{item.category}</span>
                      <span className="text-xs font-bold text-text-secondary">{pct}%</span>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-text-muted">No expenses logged.</p>
              )}
            </div>
          </div>
        </div>

        {/* Monthly Cash Flow */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-border shadow-card p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-text-primary">Monthly Cash Flow</h3>
            <div className="flex items-center gap-3 text-xs font-semibold text-text-muted">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-primary-500 inline-block" />Income</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-border-muted inline-block" />Expenses</span>
            </div>
          </div>
          <div className="flex items-end justify-between h-36 gap-1.5 mt-auto">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <Sk className="w-full" style={{ height: `${40 + i * 12}%` } as React.CSSProperties} />
                  <Sk className="h-3 w-6" />
                </div>
              ))
            ) : analytics?.monthlyCashFlow && analytics.monthlyCashFlow.length > 0 ? (
              (() => {
                const flows = analytics.monthlyCashFlow;
                const maxVal = Math.max(...flows.map(f => Math.max(f.income, f.expenses)), 1);
                const curMonth = new Date().toLocaleString('default', { month: 'short' });
                return flows.map(f => {
                  const iH = `${(f.income   / maxVal) * 100}%`;
                  const eH = `${(f.expenses / maxVal) * 100}%`;
                  const isCurrent = f.month === curMonth;
                  return (
                    <div key={f.month} className="flex flex-col items-center gap-1.5 flex-1 group">
                      <div className="flex items-end gap-0.5 w-full justify-center h-full">
                        <div className="w-2/5 bg-primary-400 rounded-t-sm group-hover:bg-primary-500 transition-colors" style={{ height: iH }} />
                        <div className="w-2/5 bg-border-muted rounded-t-sm group-hover:bg-text-muted transition-colors" style={{ height: eH }} />
                      </div>
                      <span className={`text-[10px] font-bold ${isCurrent ? 'text-primary-600' : 'text-text-muted'}`}>{f.month}</span>
                    </div>
                  );
                });
              })()
            ) : (
              <p className="text-sm text-text-muted mx-auto">No cash flow data.</p>
            )}
          </div>
        </div>
      </div>

      {/* ── Budget Progress ── */}
      {(isLoading || (dashboard?.budgetUsage && dashboard.budgetUsage.length > 0)) && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-text-primary">Budget Overview</h3>
            <Link to="/budgets" className="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1">
              Manage <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-border shadow-card p-4 space-y-3">
                  <Sk className="h-4 w-20" />
                  <Sk className="h-2 w-full" />
                  <Sk className="h-4 w-28" />
                </div>
              ))
            ) : dashboard!.budgetUsage.slice(0, 4).map((b) => {
              const remaining = b.monthlyLimit - b.spent;
              const isOver  = b.percentage >= 100;
              const isClose = b.percentage >= 80;
              const barColor = isOver ? 'bg-error' : isClose ? 'bg-warning' : 'bg-gradient-primary';
              const CatIcon = getCategoryIcon(b.category);
              return (
                <div key={b.id} className="bg-white rounded-2xl border border-border shadow-card p-4 hover:shadow-card-hover transition-all duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isOver ? 'bg-error-bg' : 'bg-primary-50'}`}>
                        <CatIcon className={`w-3.5 h-3.5 ${isOver ? 'text-error' : 'text-primary-600'}`} />
                      </div>
                      <span className="text-xs font-bold text-text-primary">{b.category}</span>
                    </div>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      isOver ? 'bg-error-bg text-red-600' : isClose ? 'bg-warning-bg text-amber-600' : 'bg-primary-50 text-primary-700'
                    }`}>
                      {Math.round(b.percentage)}%
                    </span>
                  </div>
                  <div className="progress-bar mb-2">
                    <div className={`progress-bar-fill ${barColor}`} style={{ width: `${Math.min(b.percentage, 100)}%` }} />
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className={`font-semibold ${isOver ? 'text-error' : 'text-text-muted'}`}>
                      {isOver ? 'Over by ' + fmt(Math.abs(remaining)) : fmt(remaining) + ' left'}
                    </span>
                    <span className="font-bold text-text-secondary font-mono">{fmt(b.monthlyLimit)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

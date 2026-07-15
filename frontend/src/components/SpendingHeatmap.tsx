import { useMemo } from 'react';
import { useAnalyticsQuery } from '../hooks/useAnalytics';

function getHeatColor(amount: number, maxAmount: number): string {
  if (amount === 0) return 'bg-surface-muted';
  const ratio = amount / maxAmount;
  if (ratio <= 0.25) return 'bg-primary-200 dark:bg-primary-900/40';
  if (ratio <= 0.5) return 'bg-primary-400 dark:bg-primary-700/60';
  if (ratio <= 0.75) return 'bg-primary-500 dark:bg-primary-600/80';
  return 'bg-primary-700 dark:bg-primary-500';
}

function getHeatTooltip(amount: number): string {
  if (amount === 0) return 'No spending';
  return `$${amount.toFixed(2)} spent`;
}

export default function SpendingHeatmap() {
  const { data: analytics, isLoading } = useAnalyticsQuery();

  const { maxAmount, totalSpent, activeDays, avgDaily, weeks } = useMemo(() => {
    const heatmapData = analytics?.heatmapData;
    if (!heatmapData || heatmapData.length === 0) {
      return { maxAmount: 1, totalSpent: 0, activeDays: 0, avgDaily: 0, weeks: [] };
    }
    const max = Math.max(...heatmapData.map(d => d.amount), 1);
    const total = heatmapData.reduce((sum, d) => sum + d.amount, 0);
    const active = heatmapData.filter(d => d.amount > 0).length;
    const avg = active > 0 ? total / active : 0;

    const result: { date: string; amount: number; dayOfWeek: number }[][] = [];
    let currentWeek: { date: string; amount: number; dayOfWeek: number }[] = [];

    heatmapData.forEach((d) => {
      const date = new Date(d.date);
      const dayOfWeek = date.getDay();
      if (dayOfWeek === 0 && currentWeek.length > 0) {
        result.push(currentWeek);
        currentWeek = [];
      }
      currentWeek.push({ ...d, dayOfWeek });
    });
    if (currentWeek.length > 0) result.push(currentWeek);

    return { maxAmount: max, totalSpent: total, activeDays: active, avgDaily: avg, weeks: result };
  }, [analytics?.heatmapData]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-border shadow-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="skeleton w-7 h-7 rounded-lg" />
          <div className="skeleton h-4 w-32" />
        </div>
        <div className="skeleton h-40 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-border shadow-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-text-primary">Spending Heatmap</h3>
          <p className="text-xs text-text-muted mt-0.5">Daily spending intensity (last 30 days)</p>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-text-muted">
          <span>Less</span>
          <div className="w-3 h-3 rounded-sm bg-surface-muted" />
          <div className="w-3 h-3 rounded-sm bg-primary-200 dark:bg-primary-900/40" />
          <div className="w-3 h-3 rounded-sm bg-primary-400 dark:bg-primary-700/60" />
          <div className="w-3 h-3 rounded-sm bg-primary-500 dark:bg-primary-600/80" />
          <div className="w-3 h-3 rounded-sm bg-primary-700 dark:bg-primary-500" />
          <span>More</span>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="flex gap-1 overflow-x-auto pb-2 custom-scrollbar">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((day) => (
              <div
                key={day.date}
                title={`${new Date(day.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}: ${getHeatTooltip(day.amount)}`}
                className={`w-4 h-4 rounded-sm transition-all duration-200 hover:ring-2 hover:ring-primary-300 cursor-pointer ${getHeatColor(day.amount, maxAmount)}`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-border">
        <div className="text-center">
          <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">Total Spent</p>
          <p className="text-sm font-bold text-text-primary font-mono mt-0.5">${totalSpent.toFixed(0)}</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">Active Days</p>
          <p className="text-sm font-bold text-text-primary font-mono mt-0.5">{activeDays}/30</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">Daily Avg</p>
          <p className="text-sm font-bold text-text-primary font-mono mt-0.5">${avgDaily.toFixed(0)}</p>
        </div>
      </div>
    </div>
  );
}

import { useState, useMemo, useCallback } from 'react';
import {
  Calculator, TrendingUp, TrendingDown, PiggyBank, Wallet,
  ShoppingCart, Car, Clapperboard,
  Stethoscope, Package, Info, RotateCcw,
} from 'lucide-react';
import { useDashboardQuery } from '../hooks/useDashboard';
import { useAnalyticsQuery } from '../hooks/useAnalytics';

const fmtFull = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v);

const SIMULATED_CATEGORIES = [
  { key: 'food', label: 'Food & Dining', icon: ShoppingCart, default: 400 },
  { key: 'shopping', label: 'Shopping', icon: Package, default: 200 },
  { key: 'entertainment', label: 'Entertainment', icon: Clapperboard, default: 150 },
  { key: 'travel', label: 'Travel', icon: Car, default: 100 },
  { key: 'healthcare', label: 'Healthcare', icon: Stethoscope, default: 100 },
];

function simulateHealthScore(params: {
  savingsRate: number;
  incomeVsExpenseRatio: number;
  budgetUtilization: number;
  budgetOverruns: number;
  spendingConsistency: number;
}): number {
  let score = 50;
  const { savingsRate, incomeVsExpenseRatio, budgetUtilization, budgetOverruns, spendingConsistency } = params;

  if (savingsRate >= 30) score += 30;
  else if (savingsRate >= 20) score += 25;
  else if (savingsRate >= 10) score += 15;
  else if (savingsRate >= 0) score += 5;
  else score -= 15;

  if (incomeVsExpenseRatio <= 0.5) score += 25;
  else if (incomeVsExpenseRatio <= 0.7) score += 20;
  else if (incomeVsExpenseRatio <= 0.85) score += 12;
  else if (incomeVsExpenseRatio <= 1.0) score += 5;
  else score -= 10;

  if (budgetUtilization <= 80) score += 20;
  else if (budgetUtilization <= 90) score += 12;
  else if (budgetUtilization <= 100) score += 5;
  else score -= 10;

  if (budgetOverruns === 0) score += 5;
  else if (budgetOverruns === 1) score -= 5;
  else score -= 15;

  if (spendingConsistency >= 70) score += 10;
  else if (spendingConsistency >= 50) score += 5;
  else score -= 5;

  return Math.max(0, Math.min(100, Math.round(score)));
}

function getHealthLabel(score: number): string {
  if (score >= 90) return 'Excellent';
  if (score >= 75) return 'Good';
  if (score >= 60) return 'Average';
  if (score >= 40) return 'Needs Improvement';
  return 'Critical';
}

function getHealthColor(score: number): { stroke: string; text: string; bg: string } {
  if (score >= 75) return { stroke: '#10B981', text: 'text-primary-600', bg: 'bg-primary-50 text-primary-700' };
  if (score >= 60) return { stroke: '#F59E0B', text: 'text-amber-500', bg: 'bg-warning-bg text-amber-700' };
  if (score >= 40) return { stroke: '#F97316', text: 'text-orange-500', bg: 'bg-orange-50 text-orange-700' };
  return { stroke: '#EF4444', text: 'text-red-500', bg: 'bg-error-bg text-red-700' };
}

function Slider({
  label, icon: Icon, value, onChange, min, max, step = 10,
}: {
  label: string; icon: React.ElementType; value: number; onChange: (v: number) => void;
  min: number; max: number; step?: number;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-text-muted" />
          <span className="text-sm font-semibold text-text-primary">{label}</span>
        </div>
        <span className="text-sm font-bold text-primary-600 font-mono">{fmtFull(value)}</span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer bg-border transition-all
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500
            [&::-webkit-slider-thumb]:shadow-primary [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110
            [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-primary-500 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
          style={{
            background: `linear-gradient(to right, #10B981 0%, #10B981 ${pct}%, var(--color-border) ${pct}%, var(--color-border) 100%)`
          }}
        />
        <div className="flex justify-between text-[10px] text-text-muted mt-1">
          <span>{fmtFull(min)}</span>
          <span>{fmtFull(max)}</span>
        </div>
      </div>
    </div>
  );
}

function Sk({ className }: { className?: string }) {
  return <div className={`skeleton rounded-xl ${className}`} />;
}

export default function Simulator() {
  const { data: dashboard, isLoading: isDashLoading } = useDashboardQuery();
  const { isLoading: isAnalyticsLoading } = useAnalyticsQuery();
  const isLoading = isDashLoading || isAnalyticsLoading;

  const totalIncome = dashboard?.totalIncome ?? 0;

  const [sliders, setSliders] = useState<Record<string, number>>({
    food: 400,
    shopping: 200,
    entertainment: 150,
    travel: 100,
    healthcare: 100,
  });

  const handleSliderChange = useCallback((key: string, value: number) => {
    setSliders(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetSliders = useCallback(() => {
    setSliders({
      food: 400,
      shopping: 200,
      entertainment: 150,
      travel: 100,
      healthcare: 100,
    });
  }, []);

  const simulatedResults = useMemo(() => {
    const totalBudgeted = Object.values(sliders).reduce((s, v) => s + v, 0);
    const remaining = totalIncome - totalBudgeted;
    const savings = remaining;
    const savingsRate = totalIncome > 0 ? (savings / totalIncome) * 100 : 0;
    const budgetUtilization = totalBudgeted > 0 ? (totalBudgeted / (totalIncome * 0.8)) * 100 : 0;
    const overruns = Object.values(sliders).filter(v => v > totalIncome * 0.3).length;
    const consistency = 75;

    const score = simulateHealthScore({
      savingsRate,
      incomeVsExpenseRatio: totalIncome > 0 ? totalBudgeted / totalIncome : 0,
      budgetUtilization: Math.min(budgetUtilization, 120),
      budgetOverruns: overruns,
      spendingConsistency: consistency,
    });

    return {
      totalBudgeted,
      remaining,
      savings,
      savingsRate: parseFloat(savingsRate.toFixed(1)),
      healthScore: score,
      monthlyBalance: remaining,
    };
  }, [sliders, totalIncome]);

  const hColor = getHealthColor(simulatedResults.healthScore);

  return (
    <div className="p-4 md:p-6 max-w-[1280px] w-full mx-auto space-y-6 pb-24 md:pb-8 animate-fade-up">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl bg-gradient-accent flex items-center justify-center">
              <Calculator className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary tracking-tight">What-if Simulator</h2>
          </div>
          <p className="text-sm text-text-muted mt-0.5">Adjust budget sliders to see how changes affect your financial health</p>
        </div>
        <button onClick={resetSliders} className="btn-secondary py-2 px-4 text-sm self-start sm:self-auto">
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

        {/* Left: Sliders */}
        <div className="xl:col-span-7">
          <div className="bg-white rounded-2xl border border-border shadow-card p-5">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center">
                <Wallet className="w-4 h-4 text-primary-600" />
              </div>
              <h3 className="text-sm font-bold text-text-primary">Budget Allocation</h3>
            </div>

            {isLoading ? (
              <div className="space-y-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between"><Sk className="h-4 w-24" /><Sk className="h-4 w-16" /></div>
                    <Sk className="h-2 w-full" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {SIMULATED_CATEGORIES.map((cat) => (
                  <Slider
                    key={cat.key}
                    label={cat.label}
                    icon={cat.icon}
                    value={sliders[cat.key]}
                    onChange={(v) => handleSliderChange(cat.key, v)}
                    min={0}
                    max={Math.max(totalIncome * 0.5, 1000)}
                    step={10}
                  />
                ))}
              </div>
            )}

            {/* Total Budgeted */}
            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-text-secondary">Total Budgeted</span>
                <span className="text-lg font-bold text-text-primary font-mono">{fmtFull(simulatedResults.totalBudgeted)}</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-border overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 bg-gradient-primary"
                  style={{ width: `${Math.min((simulatedResults.totalBudgeted / (totalIncome || 1)) * 100, 100)}%` }}
                />
              </div>
              <p className="text-[10px] text-text-muted mt-1">
                {((simulatedResults.totalBudgeted / (totalIncome || 1)) * 100).toFixed(0)}% of income allocated
              </p>
            </div>
          </div>
        </div>

        {/* Right: Results */}
        <div className="xl:col-span-5 flex flex-col gap-4">

          {/* Health Score */}
          <div className="bg-white rounded-2xl border border-border shadow-card p-5 flex flex-col items-center">
            <div className="flex items-center justify-between w-full mb-4">
              <h3 className="text-sm font-bold text-text-primary">Projected Health Score</h3>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${hColor.bg}`}>
                {getHealthLabel(simulatedResults.healthScore)}
              </span>
            </div>
            <div className="relative w-36 h-36">
              <svg className="-rotate-90 w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F1F5F9" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="40" fill="transparent"
                  stroke={hColor.stroke} strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * simulatedResults.healthScore) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-700"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-text-primary">{simulatedResults.healthScore}</span>
                <span className={`text-xs font-bold mt-0.5 ${hColor.text}`}>{getHealthLabel(simulatedResults.healthScore)}</span>
              </div>
            </div>
          </div>

          {/* Results Cards */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Monthly Balance', value: fmtFull(simulatedResults.monthlyBalance), icon: TrendingUp, color: simulatedResults.monthlyBalance >= 0 ? 'text-primary-600' : 'text-red-500', bg: simulatedResults.monthlyBalance >= 0 ? 'bg-primary-50' : 'bg-error-bg' },
              { label: 'Savings', value: fmtFull(simulatedResults.savings), icon: PiggyBank, color: simulatedResults.savings >= 0 ? 'text-primary-600' : 'text-red-500', bg: simulatedResults.savings >= 0 ? 'bg-primary-50' : 'bg-error-bg' },
              { label: 'Savings Rate', value: `${simulatedResults.savingsRate}%`, icon: TrendingDown, color: simulatedResults.savingsRate >= 20 ? 'text-primary-600' : simulatedResults.savingsRate >= 0 ? 'text-amber-500' : 'text-red-500', bg: simulatedResults.savingsRate >= 20 ? 'bg-primary-50' : 'bg-warning-bg' },
              { label: 'Remaining', value: fmtFull(simulatedResults.remaining), icon: Wallet, color: simulatedResults.remaining >= 0 ? 'text-accent-600' : 'text-red-500', bg: simulatedResults.remaining >= 0 ? 'bg-accent-50' : 'bg-error-bg' },
            ].map(({ label, value, icon: Icon, color, bg }) => (
              <div key={label} className="bg-white rounded-2xl border border-border shadow-card p-4">
                <div className={`w-8 h-8 rounded-xl ${bg} flex items-center justify-center mb-2`}>
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">{label}</p>
                <p className={`text-lg font-bold font-mono mt-0.5 ${color}`}>{value}</p>
              </div>
            ))}
          </div>

          {/* Tip */}
          <div className="bg-accent-50 rounded-2xl border border-accent-200 p-4 flex items-start gap-3">
            <Info className="w-4 h-4 text-accent-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-accent-700">Simulation Tip</p>
              <p className="text-xs text-accent-600 mt-0.5 leading-relaxed">
                Try to keep total budgeted expenses below 70% of income for a healthy savings rate. The ideal split is 50% needs, 30% wants, and 20% savings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

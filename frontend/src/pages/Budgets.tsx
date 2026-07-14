import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Plus, Pencil, Trash2, Wallet, ShoppingCart, Home, Coffee,
  Car, Clapperboard, CreditCard, Zap, Stethoscope, Package,
  X, TrendingUp, AlertTriangle, CheckCircle2,
} from 'lucide-react';
import { useDashboardQuery } from '../hooks/useDashboard';
import { useCreateBudgetMutation, useUpdateBudgetMutation, useDeleteBudgetMutation } from '../hooks/useBudgets';

// ─── Schema ───────────────────────────────────────────────────────────────────
const budgetSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  monthlyLimit: z.coerce.number().positive('Limit must be positive'),
});
type BudgetForm = z.infer<typeof budgetSchema>;

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

const CATEGORIES = [
  'Food & Dining','Groceries','Rent & Housing','Transportation','Entertainment',
  'Healthcare','Shopping','Utilities','Salary','Freelance','Investment','Other',
];

function Sk({ className }: { className?: string }) {
  return <div className={`skeleton rounded-xl ${className}`} />;
}

// ─── Budget Modal ─────────────────────────────────────────────────────────────
function BudgetModal({
  editing,
  onClose,
}: {
  editing: { id: string; category: string; monthlyLimit: number } | null;
  onClose: () => void;
}) {
  const createMutation = useCreateBudgetMutation();
  const updateMutation = useUpdateBudgetMutation();
  const isBusy = createMutation.isPending || updateMutation.isPending;

  const { register, handleSubmit, formState: { errors } } = useForm<BudgetForm>({
    resolver: zodResolver(budgetSchema),
    defaultValues: editing ? { category: editing.category, monthlyLimit: editing.monthlyLimit } : { category: '', monthlyLimit: undefined as any },
  });

  const onSubmit = async (data: BudgetForm) => {
    try {
      if (editing) {
        await updateMutation.mutateAsync({ id: editing.id, data });
      } else {
        await createMutation.mutateAsync(data);
      }
      onClose();
    } catch (e) { console.error('Budget save error', e); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-modal w-full max-w-sm animate-scale-in">
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-border">
          <div>
            <h2 className="text-base font-bold text-text-primary">{editing ? 'Edit Budget' : 'New Budget Limit'}</h2>
            <p className="text-xs text-text-muted mt-0.5">{editing ? 'Update your monthly spending limit' : 'Set a monthly limit for a category'}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-surface-muted transition-colors text-text-muted">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-5 space-y-4">
          <div>
            <label className="text-xs font-semibold text-text-secondary mb-1.5 block">Category</label>
            <select {...register('category')} disabled={!!editing} className={`input-field ${errors.category ? 'error' : ''} ${editing ? 'opacity-70 cursor-not-allowed' : ''}`}>
              <option value="">Select category…</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.category && <p className="text-xs text-error mt-1">{errors.category.message}</p>}
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary mb-1.5 block">Monthly Limit ($)</label>
            <input {...register('monthlyLimit')} type="number" step="0.01" placeholder="e.g. 500" className={`input-field ${errors.monthlyLimit ? 'error' : ''}`} />
            {errors.monthlyLimit && <p className="text-xs text-error mt-1">{errors.monthlyLimit.message}</p>}
          </div>
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="btn-secondary flex-1 py-2.5 text-sm">Cancel</button>
            <button type="submit" disabled={isBusy} className="btn-primary flex-1 py-2.5 text-sm">
              {isBusy ? (
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (editing ? <><Pencil className="w-4 h-4" />Update</> : <><Plus className="w-4 h-4" />Create</>)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Budget Card ──────────────────────────────────────────────────────────────
function BudgetCard({ b, onEdit, onDelete }: {
  b: { id: string; category: string; monthlyLimit: number; spent: number; percentage: number };
  onEdit: () => void;
  onDelete: () => void;
}) {
  const CatIcon = getCatIcon(b.category);
  const remaining = b.monthlyLimit - b.spent;
  const pct = Math.min(b.percentage, 100);
  const isOver  = b.percentage >= 100;
  const isClose = b.percentage >= 80 && !isOver;
  const isSafe  = b.percentage < 80;

  const barColor = isOver ? 'bg-error' : isClose ? 'bg-warning' : 'bg-gradient-primary';
  const statusIcon = isOver
    ? <AlertTriangle className="w-4 h-4 text-error" />
    : isClose
    ? <AlertTriangle className="w-4 h-4 text-warning" />
    : <CheckCircle2 className="w-4 h-4 text-primary-500" />;

  const statusText = isOver ? 'Over budget' : isClose ? 'Nearly at limit' : 'On track';
  const statusColor = isOver ? 'text-error' : isClose ? 'text-amber-600' : 'text-primary-600';
  const statusBg    = isOver ? 'bg-error-bg' : isClose ? 'bg-warning-bg' : 'bg-primary-50';

  return (
    <div className="bg-white rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-all duration-300 p-5 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isOver ? 'bg-error-bg' : isClose ? 'bg-warning-bg' : 'bg-primary-50'}`}>
            <CatIcon className={`w-5 h-5 ${isOver ? 'text-error' : isClose ? 'text-amber-600' : 'text-primary-600'}`} />
          </div>
          <div>
            <p className="text-sm font-bold text-text-primary">{b.category}</p>
            <div className={`flex items-center gap-1 mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusBg} ${statusColor} w-fit`}>
              {statusIcon}
              {statusText}
            </div>
          </div>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
          <button onClick={onEdit} className="p-1.5 rounded-lg hover:bg-primary-50 text-text-muted hover:text-primary-600 transition-colors" title="Edit">
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button onClick={onDelete} className="p-1.5 rounded-lg hover:bg-error-bg text-text-muted hover:text-error transition-colors" title="Delete">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold text-text-muted">{Math.round(b.percentage)}% used</span>
          <span className="text-xs font-bold text-text-secondary font-mono">{fmtFull(b.spent)} / {fmtFull(b.monthlyLimit)}</span>
        </div>
        <div className="progress-bar">
          <div className={`progress-bar-fill ${barColor}`} style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Bottom stat */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div>
          <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wide">
            {isOver ? 'Over by' : 'Remaining'}
          </p>
          <p className={`text-sm font-bold font-mono ${isOver ? 'text-error' : isSafe ? 'text-primary-700' : 'text-amber-600'}`}>
            {fmtFull(Math.abs(remaining))}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wide">Limit</p>
          <p className="text-sm font-bold font-mono text-text-primary">{fmt(b.monthlyLimit)}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Budgets() {
  const { data: dashboard, isLoading } = useDashboardQuery();
  const deleteMutation = useDeleteBudgetMutation();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<{ id: string; category: string; monthlyLimit: number } | null>(null);

  const budgets = dashboard?.budgetUsage ?? [];

  const openCreate = () => { setEditingBudget(null); setModalOpen(true); };
  const openEdit = (b: { id: string; category: string; monthlyLimit: number }) => { setEditingBudget(b); setModalOpen(true); };
  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this budget limit?')) {
      try { await deleteMutation.mutateAsync(id); } catch (e) { console.error(e); }
    }
  };

  const totalLimit = budgets.reduce((s, b) => s + b.monthlyLimit, 0);
  const totalSpent = budgets.reduce((s, b) => s + b.spent, 0);
  const overBudget = budgets.filter(b => b.percentage >= 100).length;

  return (
    <div className="p-4 md:p-6 max-w-[1280px] w-full mx-auto space-y-6 pb-24 md:pb-8 animate-fade-up">
      {modalOpen && (
        <BudgetModal editing={editingBudget} onClose={() => setModalOpen(false)} />
      )}

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary tracking-tight">Budgets</h2>
          <p className="text-sm text-text-muted mt-0.5">Set and track your monthly spending limits</p>
        </div>
        <button onClick={openCreate} className="btn-primary py-2.5 px-5 text-sm self-start sm:self-auto">
          <Plus className="w-4 h-4" /> New Budget
        </button>
      </div>

      {/* ── Summary Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Budget', value: fmt(totalLimit), icon: Wallet, color: 'text-primary-600', bg: 'bg-primary-50' },
          { label: 'Total Spent',  value: fmt(totalSpent), icon: TrendingUp, color: 'text-red-500', bg: 'bg-error-bg' },
          { label: 'Over Budget',  value: `${overBudget} category${overBudget !== 1 ? 'ies' : 'y'}`, icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-warning-bg' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-2xl border border-border shadow-card p-5 flex items-center gap-4">
            <div className={`w-11 h-11 rounded-2xl ${bg} flex items-center justify-center`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div>
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wide">{label}</p>
              {isLoading ? <Sk className="h-6 w-24 mt-1" /> : <p className="text-lg font-bold text-text-primary font-mono mt-0.5">{value}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* ── Budget Cards Grid ── */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-border shadow-card p-5 space-y-4">
              <div className="flex items-center gap-3"><Sk className="w-10 h-10" /><div className="space-y-2"><Sk className="h-4 w-24" /><Sk className="h-3 w-16" /></div></div>
              <Sk className="h-2 w-full rounded-full" />
              <div className="flex justify-between"><Sk className="h-5 w-20" /><Sk className="h-5 w-20" /></div>
            </div>
          ))}
        </div>
      ) : budgets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {budgets.map((b) => (
            <BudgetCard
              key={b.id} b={b}
              onEdit={() => openEdit({ id: b.id, category: b.category, monthlyLimit: b.monthlyLimit })}
              onDelete={() => handleDelete(b.id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-dashed border-border p-12 text-center">
          <div className="w-14 h-14 bg-surface-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Wallet className="w-7 h-7 text-text-muted" />
          </div>
          <h3 className="text-sm font-bold text-text-primary">No budgets yet</h3>
          <p className="text-xs text-text-muted mt-1 mb-5">Create your first budget limit to start tracking spending</p>
          <button onClick={openCreate} className="btn-primary py-2 px-5 text-sm mx-auto">
            <Plus className="w-4 h-4" /> Create Budget
          </button>
        </div>
      )}
    </div>
  );
}

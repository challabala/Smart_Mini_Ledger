import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Plus, Search, Filter, ChevronLeft, ChevronRight,
  Trash2, TrendingUp, TrendingDown, ShoppingCart,
  Home, Coffee, Briefcase, Car, Clapperboard, CreditCard,
  X, ArrowUpDown, SlidersHorizontal,
} from 'lucide-react';
import {
  useTransactionsQuery,
  useCreateTransactionMutation,
  useDeleteTransactionMutation,
} from '../hooks/useTransactions';

// ─── Schema ──────────────────────────────────────────────────────────────────
const txSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  amount: z.coerce.number().positive('Must be a positive number'),
  category: z.string().min(1, 'Category is required'),
  transactionDate: z.string().min(1, 'Date is required'),
  notes: z.string().optional(),
});
type TxForm = z.infer<typeof txSchema>;

// ─── Helpers ─────────────────────────────────────────────────────────────────
const fmt = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v);

const relDate = (d: string) => {
  try {
    const dt = new Date(d);
    const now = new Date();
    if (dt.toDateString() === now.toDateString()) return 'Today';
    if (Math.ceil((now.getTime() - dt.getTime()) / 86400000) === 1) return 'Yesterday';
    return dt.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  } catch { return '—'; }
};

const getCatIcon = (cat: string) => {
  const c = cat.toLowerCase();
  if (c.includes('grocer') || c.includes('food')) return ShoppingCart;
  if (c.includes('rent') || c.includes('house')) return Home;
  if (c.includes('din') || c.includes('cafe') || c.includes('coffee')) return Coffee;
  if (c.includes('salary') || c.includes('income')) return Briefcase;
  if (c.includes('transport') || c.includes('car')) return Car;
  if (c.includes('entertain') || c.includes('movie')) return Clapperboard;
  return CreditCard;
};

const CATEGORIES = ['Food & Dining', 'Groceries', 'Rent & Housing', 'Transportation', 'Entertainment', 'Healthcare', 'Shopping', 'Utilities', 'Salary', 'Freelance', 'Investment', 'Other'];

function Sk({ className }: { className?: string }) {
  return <div className={`skeleton rounded-lg ${className}`} />;
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function AddTransactionModal({ onClose }: { onClose: () => void }) {
  const [txType, setTxType] = useState<'expense' | 'income'>('expense');
  const createMutation = useCreateTransactionMutation();

  const { register, handleSubmit, formState: { errors } } = useForm<TxForm>({
    resolver: zodResolver(txSchema),
    defaultValues: { transactionDate: new Date().toISOString().split('T')[0], notes: '' },
  });

  const onSubmit = async (data: TxForm) => {
    try {
      await createMutation.mutateAsync({ ...data, type: txType });
      onClose();
    } catch (e) {
      console.error('Create transaction error', e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-modal w-full max-w-md animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-border">
          <div>
            <h2 className="text-base font-bold text-text-primary">Add Transaction</h2>
            <p className="text-xs text-text-muted mt-0.5">Record a new income or expense</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-surface-muted transition-colors text-text-muted">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-5 space-y-4">
          {/* Type Toggle */}
          <div className="flex rounded-xl border border-border p-1 bg-surface-muted">
            {(['expense', 'income'] as const).map((t) => (
              <button
                key={t} type="button"
                onClick={() => setTxType(t)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  txType === t
                    ? t === 'expense'
                      ? 'bg-white shadow-ambient text-red-600'
                      : 'bg-white shadow-ambient text-primary-700'
                    : 'text-text-muted'
                }`}
              >
                {t === 'income' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {/* Title */}
          <div>
            <label className="text-xs font-semibold text-text-secondary mb-1.5 block">Title</label>
            <input
              {...register('title')}
              placeholder="e.g. Grocery run at Walmart"
              className={`input-field ${errors.title ? 'error' : ''}`}
            />
            {errors.title && <p className="text-xs text-error mt-1">{errors.title.message}</p>}
          </div>

          {/* Amount + Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-text-secondary mb-1.5 block">Amount ($)</label>
              <input
                {...register('amount')}
                type="number" step="0.01" placeholder="0.00"
                className={`input-field ${errors.amount ? 'error' : ''}`}
              />
              {errors.amount && <p className="text-xs text-error mt-1">{errors.amount.message}</p>}
            </div>
            <div>
              <label className="text-xs font-semibold text-text-secondary mb-1.5 block">Category</label>
              <select {...register('category')} className={`input-field ${errors.category ? 'error' : ''}`}>
                <option value="">Select…</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.category && <p className="text-xs text-error mt-1">{errors.category.message}</p>}
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="text-xs font-semibold text-text-secondary mb-1.5 block">Date</label>
            <input {...register('transactionDate')} type="date" className="input-field" />
            {errors.transactionDate && <p className="text-xs text-error mt-1">{errors.transactionDate.message}</p>}
          </div>

          {/* Notes */}
          <div>
            <label className="text-xs font-semibold text-text-secondary mb-1.5 block">Notes <span className="text-text-muted font-normal">(optional)</span></label>
            <textarea
              {...register('notes')}
              rows={2} placeholder="Any additional details…"
              className="input-field resize-none h-auto py-2.5"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="btn-secondary flex-1 py-2.5 text-sm">Cancel</button>
            <button
              type="submit" disabled={createMutation.isPending}
              className="btn-primary flex-1 py-2.5 text-sm"
            >
              {createMutation.isPending ? (
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <><Plus className="w-4 h-4" /> Add Transaction</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Transactions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedSort, setSelectedSort] = useState('newest');
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const limit = 10;

  const sortMap: Record<string, string> = {
    newest: 'date_desc', oldest: 'date_asc', amount: 'amount_desc',
  };

  const { data, isLoading } = useTransactionsQuery({
    search: searchQuery || undefined,
    category: selectedCategory || undefined,
    type: selectedType || undefined,
    sortBy: sortMap[selectedSort],
    page, limit,
  });

  const deleteMutation = useDeleteTransactionMutation();

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this transaction?')) {
      try { await deleteMutation.mutateAsync(id); }
      catch (e) { console.error(e); }
    }
  };

  const transactions = data?.transactions ?? [];
  const meta = data?.meta;
  const totalPages = meta?.pages ?? 1;

  const clearFilters = () => {
    setSearchQuery(''); setSelectedCategory(''); setSelectedType(''); setSelectedSort('newest'); setPage(1);
  };
  const hasFilters = searchQuery || selectedCategory || selectedType || selectedSort !== 'newest';

  return (
    <div className="p-4 md:p-6 max-w-[1280px] w-full mx-auto space-y-5 pb-24 md:pb-8 animate-fade-up">
      {isModalOpen && <AddTransactionModal onClose={() => setIsModalOpen(false)} />}

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary tracking-tight">Transactions</h2>
          <p className="text-sm text-text-muted mt-0.5">
            {meta ? `${meta.total} transaction${meta.total !== 1 ? 's' : ''} total` : 'Track every rupee, every time'}
          </p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary py-2.5 px-5 text-sm self-start sm:self-auto">
          <Plus className="w-4 h-4" /> Add Transaction
        </button>
      </div>

      {/* ── Filters Bar ── */}
      <div className="bg-white rounded-2xl border border-border shadow-card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              id="tx-search"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
              placeholder="Search by title or category…"
              className="input-field pl-9"
            />
          </div>

          {/* Filter toggle (mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`sm:hidden btn-secondary py-2.5 px-4 text-sm gap-2 ${showFilters ? 'border-primary-500 text-primary-600 bg-primary-50' : ''}`}
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
            {hasFilters && <span className="w-2 h-2 bg-primary-500 rounded-full" />}
          </button>

          {/* Desktop filters */}
          <div className="hidden sm:flex items-center gap-2">
            <select
              value={selectedType}
              onChange={(e) => { setSelectedType(e.target.value); setPage(1); }}
              className="input-field w-36"
              id="filter-type"
            >
              <option value="">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <select
              value={selectedCategory}
              onChange={(e) => { setSelectedCategory(e.target.value); setPage(1); }}
              className="input-field w-44"
              id="filter-category"
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select
              value={selectedSort}
              onChange={(e) => { setSelectedSort(e.target.value); setPage(1); }}
              className="input-field w-36"
              id="filter-sort"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="amount">Highest Amount</option>
            </select>
            {hasFilters && (
              <button onClick={clearFilters} className="text-xs font-semibold text-text-muted hover:text-error transition-colors flex items-center gap-1 px-2">
                <X className="w-3.5 h-3.5" /> Clear
              </button>
            )}
          </div>
        </div>

        {/* Mobile expanded filters */}
        {showFilters && (
          <div className="sm:hidden mt-3 pt-3 border-t border-border grid grid-cols-2 gap-2">
            <select value={selectedType} onChange={(e) => { setSelectedType(e.target.value); setPage(1); }} className="input-field text-xs">
              <option value="">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <select value={selectedSort} onChange={(e) => { setSelectedSort(e.target.value); setPage(1); }} className="input-field text-xs">
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="amount">Amount ↓</option>
            </select>
            <div className="col-span-2">
              <select value={selectedCategory} onChange={(e) => { setSelectedCategory(e.target.value); setPage(1); }} className="input-field text-xs w-full">
                <option value="">All Categories</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* ── Table Card ── */}
      <div className="bg-white rounded-2xl border border-border shadow-card overflow-hidden">
        {/* Summary strip */}
        {!isLoading && transactions.length > 0 && (
          <div className="px-5 py-3 border-b border-border bg-surface-muted/50 flex flex-wrap gap-x-6 gap-y-1">
            <span className="text-xs text-text-muted">
              Showing <span className="font-semibold text-text-primary">{transactions.length}</span> of{' '}
              <span className="font-semibold text-text-primary">{meta?.total}</span> results
            </span>
            <span className="text-xs text-income font-semibold">
              Income: {fmt(transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0))}
            </span>
            <span className="text-xs text-expense font-semibold">
              Expenses: {fmt(transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0))}
            </span>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th><div className="flex items-center gap-1">Transaction <ArrowUpDown className="w-3 h-3 opacity-40" /></div></th>
                <th className="hidden sm:table-cell">Category</th>
                <th className="hidden md:table-cell">Date</th>
                <th>Type</th>
                <th className="text-right">Amount</th>
                <th className="text-right w-12"></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i}>
                    <td><div className="flex items-center gap-3"><Sk className="w-8 h-8 rounded-xl" /><Sk className="h-4 w-32" /></div></td>
                    <td className="hidden sm:table-cell"><Sk className="h-5 w-20 rounded-full" /></td>
                    <td className="hidden md:table-cell"><Sk className="h-4 w-24" /></td>
                    <td><Sk className="h-5 w-16 rounded-full" /></td>
                    <td className="text-right"><Sk className="h-4 w-16 ml-auto" /></td>
                    <td></td>
                  </tr>
                ))
              ) : transactions.length > 0 ? (
                transactions.map((tx) => {
                  const CatIcon = getCatIcon(tx.category);
                  return (
                    <tr key={tx.id} className="group">
                      <td>
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            tx.type === 'income' ? 'bg-primary-50' : 'bg-surface-muted'
                          }`}>
                            <CatIcon className={`w-4 h-4 ${tx.type === 'income' ? 'text-primary-600' : 'text-text-muted'}`} />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-text-primary text-sm truncate max-w-[160px]">{tx.title}</p>
                            {tx.notes && <p className="text-xs text-text-muted truncate max-w-[160px]">{tx.notes}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="hidden sm:table-cell">
                        <span className="badge badge-neutral">{tx.category}</span>
                      </td>
                      <td className="hidden md:table-cell text-text-muted text-xs">{relDate(tx.transactionDate)}</td>
                      <td>
                        {tx.type === 'income' ? (
                          <span className="badge badge-success"><TrendingUp className="w-3 h-3" />Income</span>
                        ) : (
                          <span className="badge badge-error"><TrendingDown className="w-3 h-3" />Expense</span>
                        )}
                      </td>
                      <td className={`text-right font-bold font-mono text-sm ${tx.type === 'income' ? 'text-income' : 'text-expense'}`}>
                        {tx.type === 'income' ? '+' : '-'}{fmt(tx.amount)}
                      </td>
                      <td className="text-right">
                        <button
                          onClick={() => handleDelete(tx.id)}
                          disabled={deleteMutation.isPending}
                          className="p-1.5 rounded-lg text-text-muted hover:text-error hover:bg-error-bg transition-all opacity-0 group-hover:opacity-100"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-16">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-14 h-14 bg-surface-muted rounded-2xl flex items-center justify-center">
                        <Filter className="w-6 h-6 text-text-muted" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-text-primary">No transactions found</p>
                        <p className="text-xs text-text-muted mt-1">
                          {hasFilters ? 'Try adjusting your filters' : 'Add your first transaction to get started'}
                        </p>
                      </div>
                      {hasFilters && (
                        <button onClick={clearFilters} className="text-xs font-semibold text-primary-600 hover:text-primary-700">
                          Clear all filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="px-5 py-4 border-t border-border flex items-center justify-between">
            <p className="text-xs text-text-muted">
              Page <span className="font-semibold">{page}</span> of <span className="font-semibold">{totalPages}</span>
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="p-2 rounded-xl border border-border text-text-muted hover:bg-surface-muted disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const p = totalPages <= 5 ? i + 1 : Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
                return (
                  <button
                    key={p} onClick={() => setPage(p)}
                    className={`w-8 h-8 rounded-xl text-xs font-semibold transition-all ${
                      p === page
                        ? 'bg-primary-500 text-white shadow-primary'
                        : 'text-text-secondary hover:bg-surface-muted border border-border'
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="p-2 rounded-xl border border-border text-text-muted hover:bg-surface-muted disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

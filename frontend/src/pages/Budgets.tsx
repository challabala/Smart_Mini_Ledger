import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDashboardQuery } from '../hooks/useDashboard';
import {
  useCreateBudgetMutation,
  useUpdateBudgetMutation,
  useDeleteBudgetMutation
} from '../hooks/useBudgets';
import Dialog from '../components/ui/Dialog';
import Skeleton from '../components/ui/Skeleton';

const budgetFormSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  monthlyLimit: z.coerce.number().positive('Limit must be positive')
});

type BudgetFormValues = z.infer<typeof budgetFormSchema>;

export default function Budgets() {
  const { data: dashboard, isLoading } = useDashboardQuery();
  const createMutation = useCreateBudgetMutation();
  const updateMutation = useUpdateBudgetMutation();
  const deleteMutation = useDeleteBudgetMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<{ id: string; category: string; monthlyLimit: number } | null>(null);

  // Form setup
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<BudgetFormValues>({
    resolver: zodResolver(budgetFormSchema)
  });

  const handleOpenCreate = () => {
    setEditingBudget(null);
    reset({ category: '', monthlyLimit: undefined });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (b: { id: string; category: string; monthlyLimit: number }) => {
    setEditingBudget(b);
    setValue('category', b.category);
    setValue('monthlyLimit', b.monthlyLimit);
    setIsModalOpen(true);
  };

  const handleSaveBudget = async (data: BudgetFormValues) => {
    try {
      if (editingBudget) {
        await updateMutation.mutateAsync({
          id: editingBudget.id,
          data: {
            category: data.category,
            monthlyLimit: data.monthlyLimit
          }
        });
      } else {
        await createMutation.mutateAsync(data);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error('Save budget error', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this budget limit?')) {
      try {
        await deleteMutation.mutateAsync(id);
      } catch (err) {
        console.error('Delete budget error', err);
      }
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(val);
  };

  const getCategoryIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('food') || cat.includes('grocer')) return 'shopping_cart';
    if (cat.includes('rent') || cat.includes('house')) return 'home';
    if (cat.includes('din') || cat.includes('cafe')) return 'restaurant';
    if (cat.includes('transport') || cat.includes('car')) return 'directions_car';
    if (cat.includes('entertain') || cat.includes('movie')) return 'movie';
    return 'payments';
  };

  const budgets = dashboard?.budgetUsage || [];

  return (
    <main className="p-margin-mobile md:p-xl max-w-container-max mx-auto pb-3xl md:pb-xl">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-md mb-xl">
        <div>
          <h2 className="font-sans text-headline-lg-mobile md:text-headline-lg font-bold text-on-background">Budgets</h2>
          <p className="font-sans text-body-sm text-on-surface-variant mt-xs">Manage your spending limits for this month.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-primary text-on-primary font-sans text-label-md px-lg py-sm rounded-lg flex items-center justify-center gap-sm border-t border-white/20 hover:bg-on-primary-fixed-variant transition-colors shadow-sm w-full md:w-auto active:scale-[0.99] font-bold"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add Budget
        </button>
      </div>

      {/* Budget Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-md">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col gap-sm">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-2 w-full" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))
        ) : budgets.length > 0 ? (
          budgets.map((budget) => {
            const percent = Math.min(budget.percentage, 100);
            const remaining = budget.monthlyLimit - budget.spent;
            const status = budget.percentage >= 100 ? 'critical' : budget.percentage >= 80 ? 'warning' : 'safe';

            return (
              <div key={budget.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative group">
                <div className="flex justify-between items-start mb-md">
                  <div className="flex items-center gap-sm">
                    <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">{getCategoryIcon(budget.category)}</span>
                    </div>
                    <div>
                      <h3 className="font-sans text-headline-sm font-bold text-on-surface">{budget.category}</h3>
                      <p className="font-sans text-label-sm text-on-surface-variant">Monthly limit</p>
                    </div>
                  </div>
                  <div className="flex gap-xs">
                    <button
                      onClick={() => handleOpenEdit({ id: budget.id, category: budget.category, monthlyLimit: budget.monthlyLimit })}
                      className="text-on-surface-variant hover:text-primary transition-colors p-1"
                      title="Edit Budget"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(budget.id)}
                      className="text-on-surface-variant hover:text-error transition-colors p-1"
                      title="Delete Budget"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>

                <div className="mb-sm flex justify-between items-end">
                  <div className="font-sans text-headline-md font-bold text-on-surface font-mono">{formatCurrency(budget.spent)}</div>
                  <div className="font-sans text-body-sm text-on-surface-variant font-mono">of {formatCurrency(budget.monthlyLimit)}</div>
                </div>

                <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden mb-sm">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      status === 'safe'
                        ? 'bg-primary'
                        : status === 'warning'
                        ? 'bg-amber-500'
                        : 'bg-error'
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>

                <div className="flex justify-between items-center font-sans text-label-sm">
                  <span className="text-on-surface-variant font-mono">Remaining: {formatCurrency(remaining)}</span>
                  {status === 'safe' && (
                    <span className="text-secondary bg-secondary-container/20 px-2 py-0.5 rounded-sm flex items-center gap-xs font-semibold">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      Safe to spend
                    </span>
                  )}
                  {status === 'warning' && (
                    <span className="text-amber-700 bg-amber-100 px-2 py-0.5 rounded-sm flex items-center gap-xs font-semibold">
                      <span className="material-symbols-outlined text-[14px]">warning</span>
                      Watch details
                    </span>
                  )}
                  {status === 'critical' && (
                    <span className="text-error bg-error-container/30 px-2 py-0.5 rounded-sm flex items-center gap-xs font-semibold">
                      <span className="material-symbols-outlined text-[14px]">warning</span>
                      Almost limit
                    </span>
                  )}
                </div>
              </div>
            );
          })
        ) : null}

        {/* Budget Card (Empty State Variant) */}
        <div
          onClick={handleOpenCreate}
          className="bg-surface-bright border border-dashed border-outline-variant rounded-xl p-md flex flex-col items-center justify-center text-center min-h-[200px] hover:bg-surface transition-colors cursor-pointer group shadow-sm"
        >
          <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary mb-sm group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined">add</span>
          </div>
          <h3 className="font-sans text-headline-sm font-bold text-on-surface mb-xs">Create New Budget</h3>
          <p className="font-sans text-body-sm text-on-surface-variant">Track another spending category</p>
        </div>
      </div>

      {/* Add / Edit Budget Dialog */}
      <Dialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingBudget ? 'Edit Budget' : 'New Budget'}
      >
        <form onSubmit={handleSubmit(handleSaveBudget)} className="space-y-gutter flex flex-col justify-between h-full">
          <div className="space-y-md">
            {/* Category Select */}
            <div className="space-y-1">
              <label className="font-sans text-label-sm text-on-surface-variant block font-bold" htmlFor="category">Category</label>
              <div className="relative border border-outline-variant rounded-lg bg-surface-container-lowest flex items-center h-10 px-3 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                <span className="material-symbols-outlined text-[18px] text-outline mr-2">category</span>
                <select
                  className="w-full bg-transparent border-none p-0 text-body-md font-sans text-on-surface focus:ring-0 focus:outline-none pr-8 appearance-none"
                  id="category"
                  {...register('category')}
                  disabled={!!editingBudget} // Cannot change category of existing budget to prevent key collision
                >
                  <option value="">Select category</option>
                  <option value="Food & Dining">Food & Dining</option>
                  <option value="Housing">Housing</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Shopping">Shopping</option>
                </select>
                <div className="absolute right-3 pointer-events-none text-outline flex items-center">
                  <span className="material-symbols-outlined text-[18px]">expand_more</span>
                </div>
              </div>
              {errors.category && (
                <p className="text-error font-sans text-body-sm mt-xs">{errors.category.message}</p>
              )}
            </div>

            {/* Limit Input */}
            <div className="space-y-1">
              <label className="font-sans text-label-sm text-on-surface-variant block font-bold" htmlFor="monthlyLimit">Monthly Limit</label>
              <div className="relative border border-outline-variant rounded-lg bg-surface-container-lowest flex items-center h-10 px-3 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                <span className="text-outline font-sans text-body-md mr-2">$</span>
                <input
                  className="w-full bg-transparent border-none p-0 text-body-md font-sans text-on-surface placeholder:text-outline focus:ring-0 focus:outline-none font-mono"
                  id="monthlyLimit"
                  placeholder="e.g. 500"
                  type="number"
                  step="0.01"
                  {...register('monthlyLimit')}
                />
              </div>
              {errors.monthlyLimit && (
                <p className="text-error font-sans text-body-sm mt-xs">{errors.monthlyLimit.message}</p>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-md pt-6 border-t border-outline-variant mt-6 bg-surface-bright rounded-b-xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-md py-2 font-sans text-label-md rounded-lg bg-surface-container-lowest text-on-surface border border-outline-variant hover:bg-surface-container transition-colors focus:outline-none font-bold"
              type="button"
            >
              Cancel
            </button>
            <button
              className="px-md py-2 font-sans text-label-md rounded-lg bg-primary text-on-primary border border-transparent hover:bg-on-primary-fixed-variant transition-colors shadow-sm focus:outline-none flex items-center gap-2 font-bold"
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              {createMutation.isPending || updateMutation.isPending ? 'Saving...' : 'Save Budget'}
            </button>
          </div>
        </form>
      </Dialog>
    </main>
  );
}

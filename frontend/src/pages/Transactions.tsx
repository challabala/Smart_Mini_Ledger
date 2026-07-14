import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  useTransactionsQuery,
  useCreateTransactionMutation,
  useDeleteTransactionMutation
} from '../hooks/useTransactions';
import Dialog from '../components/ui/Dialog';

const transactionFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  amount: z.coerce.number().positive('Amount must be positive'),
  category: z.string().min(1, 'Category is required'),
  transactionDate: z.string().min(1, 'Date is required'),
  notes: z.string().optional()
});

type TransactionFormValues = z.infer<typeof transactionFormSchema>;

export default function Transactions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<'expense' | 'income'>('expense');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  
  // Sort State
  const [selectedSort, setSelectedSort] = useState('newest'); // 'newest' | 'oldest' | 'amount'
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Pagination State
  const [page, setPage] = useState(1);
  const limit = 10;

  // React Query Fetch
  const queryParams = {
    search: searchQuery || undefined,
    category: selectedCategory || undefined,
    type: selectedType || undefined,
    sortBy: selectedSort === 'newest' ? 'date_desc' : selectedSort === 'oldest' ? 'date_asc' : 'amount_desc',
    page,
    limit
  };

  const { data, isLoading } = useTransactionsQuery(queryParams);
  const createMutation = useCreateTransactionMutation();
  const deleteMutation = useDeleteTransactionMutation();

  // Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      transactionDate: new Date().toISOString().split('T')[0],
      notes: ''
    }
  });

  const handleSaveTransaction = async (formData: TransactionFormValues) => {
    try {
      await createMutation.mutateAsync({
        ...formData,
        type: transactionType
      });
      setIsModalOpen(false);
      reset({
        title: '',
        amount: undefined,
        category: '',
        transactionDate: new Date().toISOString().split('T')[0],
        notes: ''
      });
    } catch (err) {
      console.error('Create transaction error', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await deleteMutation.mutateAsync(id);
      } catch (err) {
        console.error('Delete transaction error', err);
      }
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(val);
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
    } catch (e) {
      return dateStr;
    }
  };

  const getCategoryIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('food') || cat.includes('grocer')) return 'shopping_cart';
    if (cat.includes('rent') || cat.includes('house')) return 'home';
    if (cat.includes('entertain') || cat.includes('movie')) return 'movie';
    if (cat.includes('din') || cat.includes('cafe')) return 'local_cafe';
    if (cat.includes('transport') || cat.includes('car')) return 'directions_car';
    if (cat.includes('salary') || cat.includes('income')) return 'work';
    return 'payments';
  };

  const transactions = data?.transactions || [];
  const meta = data?.meta || { total: 0, page: 1, limit: 10, pages: 1 };

  return (
    <main className="flex-grow p-margin-mobile md:p-xl w-full max-w-container-max mx-auto flex flex-col gap-lg pb-[100px] md:pb-xl relative">
      {/* Page Header & Filters */}
      <div className="flex flex-col gap-md">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="font-sans text-headline-lg-mobile md:text-headline-lg font-bold text-on-surface mb-xs">Transactions</h1>
            <p className="font-sans text-body-sm text-on-surface-variant">Review and manage your financial activity.</p>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col sm:flex-row gap-sm items-start sm:items-center bg-surface-container-lowest p-sm rounded-xl border border-outline-variant shadow-sm w-full">
          {/* Mobile Search */}
          <div className="flex w-full sm:flex-1 items-center bg-surface-container rounded-lg px-md h-10 border border-outline-variant focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
            <span className="material-symbols-outlined text-outline mr-sm text-[20px]">search</span>
            <input
              className="bg-transparent border-none focus:ring-0 text-body-sm font-sans w-full placeholder:text-outline text-on-surface focus:outline-none"
              placeholder="Search by title or description..."
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1); // Reset to first page
              }}
            />
          </div>

          <div className="flex gap-sm w-full sm:w-auto overflow-x-auto pb-xs sm:pb-0 no-scrollbar flex-nowrap items-center">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setPage(1);
              }}
              className="bg-surface-container px-md py-sm rounded-lg border border-outline-variant text-label-sm font-sans text-on-surface outline-none cursor-pointer"
            >
              <option value="">All Categories</option>
              <option value="Food & Dining">Food & Dining</option>
              <option value="Housing">Housing</option>
              <option value="Transportation">Transportation</option>
              <option value="Utilities">Utilities</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Shopping">Shopping</option>
              <option value="Income">Income</option>
            </select>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setPage(1);
              }}
              className="bg-surface-container px-md py-sm rounded-lg border border-outline-variant text-label-sm font-sans text-on-surface outline-none cursor-pointer"
            >
              <option value="">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="ml-auto w-full sm:w-auto flex justify-end mt-sm sm:mt-0 relative">
            <div>
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-xs px-md py-sm bg-transparent rounded-lg border border-transparent text-label-sm font-sans font-bold text-primary hover:bg-surface-container-low transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">sort</span>
                Sort by: {selectedSort === 'newest' ? 'Date (Newest)' : selectedSort === 'oldest' ? 'Date (Oldest)' : 'Amount'}
                <span className="material-symbols-outlined text-[16px]">expand_more</span>
              </button>
              
              {isSortOpen && (
                <div className="absolute right-0 top-full mt-xs w-48 bg-surface-container-lowest border border-outline-variant rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => { setSelectedSort('newest'); setIsSortOpen(false); setPage(1); }}
                    className="w-full text-left block px-md py-sm text-body-sm font-sans text-on-surface hover:bg-surface-container-high first:rounded-t-lg"
                  >
                    Date (Newest)
                  </button>
                  <button
                    onClick={() => { setSelectedSort('oldest'); setIsSortOpen(false); setPage(1); }}
                    className="w-full text-left block px-md py-sm text-body-sm font-sans text-on-surface hover:bg-surface-container-high"
                  >
                    Date (Oldest)
                  </button>
                  <button
                    onClick={() => { setSelectedSort('amount'); setIsSortOpen(false); setPage(1); }}
                    className="w-full text-left block px-md py-sm text-body-sm font-sans text-on-surface hover:bg-surface-container-high last:rounded-b-lg"
                  >
                    Amount
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Data Table Card */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden shadow-sm flex-grow flex flex-col justify-between min-h-[300px]">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="py-sm px-md font-sans text-label-sm text-tertiary font-semibold">Date</th>
                <th className="py-sm px-md font-sans text-label-sm text-tertiary font-semibold">Description</th>
                <th className="py-sm px-md font-sans text-label-sm text-tertiary font-semibold">Category</th>
                <th className="py-sm px-md font-sans text-label-sm text-tertiary font-semibold text-right">Amount</th>
                <th className="py-sm px-md font-sans text-label-sm text-tertiary font-semibold text-center">Status</th>
                <th className="py-sm px-md font-sans text-label-sm text-tertiary font-semibold text-center w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/50">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="py-md px-md"><div className="h-4 bg-outline-variant/30 rounded w-20"></div></td>
                    <td className="py-md px-md">
                      <div className="h-5 bg-outline-variant/30 rounded w-32 mb-1"></div>
                      <div className="h-3 bg-outline-variant/30 rounded w-24"></div>
                    </td>
                    <td className="py-md px-md">
                      <div className="flex items-center gap-xs">
                        <div className="w-8 h-8 rounded-full bg-outline-variant/30"></div>
                        <div className="h-4 bg-outline-variant/30 rounded w-20"></div>
                      </div>
                    </td>
                    <td className="py-md px-md flex justify-end"><div className="h-5 bg-outline-variant/30 rounded w-16 mt-2"></div></td>
                    <td className="py-md px-md"><div className="h-5 bg-outline-variant/30 rounded-full w-16 mx-auto"></div></td>
                    <td className="py-md px-md"></td>
                  </tr>
                ))
              ) : transactions.length > 0 ? (
                transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-surface-container-low transition-colors group">
                    <td className="py-md px-md text-body-sm font-sans text-on-surface-variant whitespace-nowrap">
                      {formatDate(tx.transactionDate)}
                    </td>
                    <td className="py-md px-md">
                      <p className="text-body-md font-sans text-on-surface font-bold">{tx.title}</p>
                      <p className="text-label-sm font-sans text-on-surface-variant">{tx.notes || 'No description'}</p>
                    </td>
                    <td className="py-md px-md">
                      <div className="flex items-center gap-xs">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          tx.type === 'income' ? 'bg-secondary-container/20 text-secondary' : 'bg-surface-variant text-on-surface-variant'
                        }`}>
                          <span className="material-symbols-outlined text-[18px]">{getCategoryIcon(tx.category)}</span>
                        </div>
                        <span className="text-body-sm font-sans text-on-surface font-semibold">{tx.category}</span>
                      </div>
                    </td>
                    <td className={`py-md px-md text-right text-body-md font-sans font-bold whitespace-nowrap font-mono ${
                      tx.type === 'income' ? 'text-secondary' : 'text-on-surface'
                    }`}>
                      {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                    </td>
                    <td className="py-md px-md text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-label-sm font-semibold border bg-secondary-container/20 text-secondary border-secondary/20">
                        Completed
                      </span>
                    </td>
                    <td className="py-md px-md text-center">
                      <button
                        onClick={() => handleDelete(tx.id)}
                        className="text-outline hover:text-error transition-colors opacity-0 group-hover:opacity-100 p-1 rounded"
                        title="Delete Transaction"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-xl text-center text-on-surface-variant font-sans text-body-md">
                    No transactions match your current search/filter parameters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination / Footer */}
        <div className="px-md py-sm border-t border-outline-variant bg-surface-container-low flex items-center justify-between">
          <span className="text-label-sm font-sans font-semibold text-on-surface-variant">
            Showing {transactions.length > 0 ? (page - 1) * limit + 1 : 0}-
            {Math.min(page * limit, meta.total)} of {meta.total}
          </span>
          <div className="flex gap-xs">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1 || isTxLoading}
              className="p-xs text-outline hover:text-primary transition-colors disabled:opacity-40 flex items-center"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, meta.pages))}
              disabled={page >= meta.pages || isTxLoading}
              className="p-xs text-outline hover:text-primary transition-colors disabled:opacity-40 flex items-center"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-[84px] md:bottom-lg right-margin-mobile md:right-lg w-14 h-14 bg-primary text-on-primary rounded-full shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1)] flex items-center justify-center hover:bg-on-primary-fixed transition-colors z-30 focus:outline-none focus:ring-4 focus:ring-primary-container/30 active:scale-95"
      >
        <span className="material-symbols-outlined text-[24px]">add</span>
      </button>

      {/* Add Transaction Dialog Wrapper */}
      <Dialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="New Transaction"
      >
        <form onSubmit={handleSubmit(handleSaveTransaction)} className="space-y-gutter flex flex-col justify-between h-full">
          <div className="space-y-6">
            {/* Income / Expense Toggle */}
            <div className="flex rounded-lg border border-outline-variant p-1 bg-surface-container-low w-full overflow-hidden" role="group">
              <button
                type="button"
                onClick={() => setTransactionType('expense')}
                className={`flex-1 py-2 font-sans text-label-md rounded-md flex items-center justify-center gap-2 transition-all ${
                  transactionType === 'expense'
                    ? 'bg-surface-container-lowest text-primary shadow-sm border border-outline-variant/30'
                    : 'text-on-surface-variant hover:bg-surface-container/50'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
                Expense
              </button>
              <button
                type="button"
                onClick={() => setTransactionType('income')}
                className={`flex-1 py-2 font-sans text-label-md rounded-md flex items-center justify-center gap-2 transition-all ${
                  transactionType === 'income'
                    ? 'bg-surface-container-lowest text-primary shadow-sm border border-outline-variant/30'
                    : 'text-on-surface-variant hover:bg-surface-container/50'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
                Income
              </button>
            </div>

            {/* Amount Input */}
            <div className="flex flex-col items-center justify-center py-sm">
              <label className="sr-only" htmlFor="amount">Amount</label>
              <div className="relative flex items-center group">
                <span className="text-on-surface-variant font-sans text-display absolute left-4 pointer-events-none">$</span>
                <input
                  className="w-full bg-transparent border-none focus:ring-0 text-center font-sans text-display text-on-surface placeholder:text-outline-variant py-2 pl-12 pr-4 outline-none font-bold font-mono"
                  id="amount"
                  step="0.01"
                  type="number"
                  placeholder="0.00"
                  {...register('amount')}
                />
              </div>
              <div className="h-[2px] w-32 bg-outline-variant mt-1 rounded-full group-focus-within:bg-primary transition-all duration-300"></div>
              {errors.amount && (
                <p className="text-error font-sans text-body-sm mt-xs">{errors.amount.message}</p>
              )}
            </div>

            {/* Fields List */}
            <div className="grid grid-cols-1 gap-md">
              {/* Title */}
              <div className="space-y-1">
                <label className="font-sans text-label-sm text-on-surface-variant block font-semibold" htmlFor="title">Title</label>
                <div className="relative border border-outline-variant rounded-lg bg-surface-container-lowest flex items-center h-10 px-3 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                  <span className="material-symbols-outlined text-[18px] text-outline mr-2">title</span>
                  <input
                    className="w-full bg-transparent border-none p-0 text-body-md font-sans text-on-surface placeholder:text-outline focus:ring-0 focus:outline-none"
                    id="title"
                    placeholder="e.g. Grocery Run"
                    type="text"
                    {...register('title')}
                  />
                </div>
                {errors.title && (
                  <p className="text-error font-sans text-body-sm mt-xs">{errors.title.message}</p>
                )}
              </div>

              {/* Category & Date Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                {/* Category */}
                <div className="space-y-1">
                  <label className="font-sans text-label-sm text-on-surface-variant block font-semibold" htmlFor="category">Category</label>
                  <div className="relative border border-outline-variant rounded-lg bg-surface-container-lowest flex items-center h-10 px-3 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                    <span className="material-symbols-outlined text-[18px] text-outline mr-2">category</span>
                    <select
                      className="w-full bg-transparent border-none p-0 text-body-md font-sans text-on-surface focus:ring-0 focus:outline-none pr-8 appearance-none"
                      id="category"
                      {...register('category')}
                    >
                      <option value="">Select category</option>
                      <option value="Food & Dining">Food & Dining</option>
                      <option value="Housing">Housing</option>
                      <option value="Transportation">Transportation</option>
                      <option value="Utilities">Utilities</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Shopping">Shopping</option>
                      <option value="Income">Income</option>
                    </select>
                    <div className="absolute right-3 pointer-events-none text-outline flex items-center">
                      <span className="material-symbols-outlined text-[18px]">expand_more</span>
                    </div>
                  </div>
                  {errors.category && (
                    <p className="text-error font-sans text-body-sm mt-xs">{errors.category.message}</p>
                  )}
                </div>

                {/* Date */}
                <div className="space-y-1">
                  <label className="font-sans text-label-sm text-on-surface-variant block font-semibold" htmlFor="transactionDate">Date</label>
                  <div className="relative border border-outline-variant rounded-lg bg-surface-container-lowest flex items-center h-10 px-3 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                    <span className="material-symbols-outlined text-[18px] text-outline mr-2">calendar_today</span>
                    <input
                      className="w-full bg-transparent border-none p-0 text-body-md font-sans text-on-surface focus:ring-0 focus:outline-none [color-scheme:light]"
                      id="transactionDate"
                      type="date"
                      {...register('transactionDate')}
                    />
                  </div>
                  {errors.transactionDate && (
                    <p className="text-error font-sans text-body-sm mt-xs">{errors.transactionDate.message}</p>
                  )}
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1">
                <label className="font-sans text-label-sm text-on-surface-variant block font-semibold" htmlFor="notes">Notes (Optional)</label>
                <textarea
                  className="block w-full p-3 font-sans text-body-md rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                  id="notes"
                  placeholder="Add any extra details here..."
                  rows={3}
                  {...register('notes')}
                />
              </div>
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
              disabled={createMutation.isPending}
            >
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              {createMutation.isPending ? 'Saving...' : 'Save Transaction'}
            </button>
          </div>
        </form>
      </Dialog>
    </main>
  );
}

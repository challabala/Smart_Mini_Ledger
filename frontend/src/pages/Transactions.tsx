import React, { useState } from 'react';

interface Transaction {
  id: string;
  date: string;
  description: string;
  details: string;
  category: string;
  categoryIcon: string;
  amount: number;
  type: 'income' | 'expense';
  status: 'Completed' | 'Pending';
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: 'Oct 24, 2023',
    description: 'Acme Corp Payroll',
    details: 'Direct Deposit',
    category: 'Income',
    categoryIcon: 'work',
    amount: 4250.00,
    type: 'income',
    status: 'Completed'
  },
  {
    id: '2',
    date: 'Oct 23, 2023',
    description: 'Whole Foods Market',
    details: 'Debit Card ending 4421',
    category: 'Groceries',
    categoryIcon: 'shopping_cart',
    amount: -142.30,
    type: 'expense',
    status: 'Completed'
  },
  {
    id: '3',
    date: 'Oct 22, 2023',
    description: 'Netflix Subscription',
    details: 'Recurring',
    category: 'Entertainment',
    categoryIcon: 'movie',
    amount: -15.99,
    type: 'expense',
    status: 'Pending'
  },
  {
    id: '4',
    date: 'Oct 20, 2023',
    description: 'Starbucks Coffee',
    details: 'Mobile Order',
    category: 'Dining',
    categoryIcon: 'local_cafe',
    amount: -5.40,
    type: 'expense',
    status: 'Completed'
  },
  {
    id: '5',
    date: 'Oct 18, 2023',
    description: 'Chevron Gas Station',
    details: 'Pay at Pump',
    category: 'Transport',
    categoryIcon: 'directions_car',
    amount: -45.00,
    type: 'expense',
    status: 'Completed'
  }
];

export default function Transactions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<'expense' | 'income'>('expense');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSort, setSelectedSort] = useState('newest');
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Form State
  const [formAmount, setFormAmount] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formDate, setFormDate] = useState(new Date().toISOString().split('T')[0]);
  const [formNotes, setFormNotes] = useState('');

  const handleSaveTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    // Non-functional mock closing
    setIsModalOpen(false);
    // Reset form
    setFormAmount('');
    setFormTitle('');
    setFormCategory('');
    setFormNotes('');
  };

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
          <div className="flex md:hidden w-full items-center bg-surface-container rounded-lg px-md h-10 border border-outline-variant focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all mb-sm sm:mb-0">
            <span className="material-symbols-outlined text-outline mr-sm text-[20px]">search</span>
            <input
              className="bg-transparent border-none focus:ring-0 text-body-sm font-sans w-full placeholder:text-outline text-on-surface focus:outline-none"
              placeholder="Search..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-sm w-full sm:w-auto overflow-x-auto pb-xs sm:pb-0 no-scrollbar flex-nowrap">
            <button className="flex items-center gap-xs px-md py-sm bg-surface-container rounded-lg border border-outline-variant text-label-sm font-sans text-on-surface hover:bg-surface-container-high transition-colors whitespace-nowrap">
              <span className="material-symbols-outlined text-[16px]">calendar_today</span>
              Date Range
            </button>
            <button className="flex items-center gap-xs px-md py-sm bg-surface-container rounded-lg border border-outline-variant text-label-sm font-sans text-on-surface hover:bg-surface-container-high transition-colors whitespace-nowrap">
              <span className="material-symbols-outlined text-[16px]">category</span>
              Category
            </button>
            <button className="flex items-center gap-xs px-md py-sm bg-surface-container rounded-lg border border-outline-variant text-label-sm font-sans text-on-surface hover:bg-surface-container-high transition-colors whitespace-nowrap">
              <span className="material-symbols-outlined text-[16px]">filter_list</span>
              Type
            </button>
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
                    onClick={() => { setSelectedSort('newest'); setIsSortOpen(false); }}
                    className="w-full text-left block px-md py-sm text-body-sm font-sans text-on-surface hover:bg-surface-container-high first:rounded-t-lg"
                  >
                    Date (Newest)
                  </button>
                  <button
                    onClick={() => { setSelectedSort('oldest'); setIsSortOpen(false); }}
                    className="w-full text-left block px-md py-sm text-body-sm font-sans text-on-surface hover:bg-surface-container-high"
                  >
                    Date (Oldest)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Data Table Card */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden shadow-sm flex-grow">
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
              {mockTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-surface-container-low transition-colors group">
                  <td className="py-md px-md text-body-sm font-sans text-on-surface-variant whitespace-nowrap">{tx.date}</td>
                  <td className="py-md px-md">
                    <p className="text-body-md font-sans text-on-surface font-semibold">{tx.description}</p>
                    <p className="text-label-sm font-sans text-on-surface-variant">{tx.details}</p>
                  </td>
                  <td className="py-md px-md">
                    <div className="flex items-center gap-xs">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        tx.type === 'income' ? 'bg-secondary-container/20 text-secondary' : 'bg-surface-variant text-on-surface-variant'
                      }`}>
                        <span className="material-symbols-outlined text-[18px]">{tx.categoryIcon}</span>
                      </div>
                      <span className="text-body-sm font-sans text-on-surface">{tx.category}</span>
                    </div>
                  </td>
                  <td className={`py-md px-md text-right text-body-md font-sans font-bold whitespace-nowrap font-mono ${
                    tx.type === 'income' ? 'text-secondary' : 'text-on-surface'
                  }`}>
                    {tx.type === 'income' ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                  </td>
                  <td className="py-md px-md text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-label-sm font-semibold border ${
                      tx.status === 'Completed'
                        ? 'bg-secondary-container/20 text-secondary border-secondary/20'
                        : 'bg-surface-variant text-on-surface-variant border-outline-variant'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-md px-md text-center">
                    <button className="text-outline hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}

              {/* Skeleton Rows (Simulated loading animation states) */}
              <tr className="animate-pulse">
                <td className="py-md px-md"><div class="h-4 bg-outline-variant/30 rounded w-20"></div></td>
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
              <tr className="animate-pulse">
                <td className="py-md px-md"><div class="h-4 bg-outline-variant/30 rounded w-20"></div></td>
                <td className="py-md px-md">
                  <div className="h-5 bg-outline-variant/30 rounded w-28 mb-1"></div>
                  <div className="h-3 bg-outline-variant/30 rounded w-16"></div>
                </td>
                <td className="py-md px-md">
                  <div className="flex items-center gap-xs">
                    <div className="w-8 h-8 rounded-full bg-outline-variant/30"></div>
                    <div className="h-4 bg-outline-variant/30 rounded w-24"></div>
                  </div>
                </td>
                <td className="py-md px-md flex justify-end"><div className="h-5 bg-outline-variant/30 rounded w-20 mt-2"></div></td>
                <td className="py-md px-md"><div className="h-5 bg-outline-variant/30 rounded-full w-16 mx-auto"></div></td>
                <td className="py-md px-md"></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination / Footer */}
        <div className="px-md py-sm border-t border-outline-variant bg-surface-container-low flex items-center justify-between">
          <span className="text-label-sm font-sans font-semibold text-on-surface-variant">Showing 1-5 of 245</span>
          <div className="flex gap-xs">
            <button className="p-xs text-outline hover:text-primary transition-colors disabled:opacity-50" disabled>
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            <button className="p-xs text-outline hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-[84px] md:bottom-lg right-margin-mobile md:right-lg w-14 h-14 bg-primary text-on-primary rounded-full shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1)] flex items-center justify-center hover:bg-on-primary-fixed transition-colors z-30 focus:outline-none focus:ring-4 focus:ring-primary-container/30"
      >
        <span className="material-symbols-outlined text-[24px]">add</span>
      </button>

      {/* Add Transaction Modal Placeholder */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-margin-mobile md:px-0 py-lg overflow-y-auto">
          {/* Backdrop */}
          <div
            onClick={() => setIsModalOpen(false)}
            className="absolute inset-0 bg-on-background/20 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-lg bg-surface-container-lowest rounded-xl shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] border border-outline-variant overflow-hidden flex flex-col max-h-[90vh] z-10 animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-lg py-md border-b border-outline-variant bg-surface-bright">
              <h2 className="font-sans text-headline-sm font-bold text-on-surface">New Transaction</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-on-surface-variant hover:text-on-surface transition-colors rounded-full p-1 focus:outline-none"
                type="button"
                aria-label="Close modal"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Scrollable Content */}
            <form onSubmit={handleSaveTransaction} className="flex-1 overflow-y-auto p-lg space-y-gutter flex flex-col justify-between">
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
                      min="0"
                      step="0.01"
                      type="number"
                      placeholder="0.00"
                      value={formAmount}
                      onChange={(e) => setFormAmount(e.target.value)}
                      required
                    />
                  </div>
                  <div className="h-[2px] w-32 bg-outline-variant mt-1 rounded-full group-focus-within:bg-primary transition-all duration-300"></div>
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
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        required
                      />
                    </div>
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
                          value={formCategory}
                          onChange={(e) => setFormCategory(e.target.value)}
                          required
                        >
                          <option value="" disabled>Select category</option>
                          <option value="food">Food & Dining</option>
                          <option value="transport">Transportation</option>
                          <option value="utilities">Utilities</option>
                          <option value="entertainment">Entertainment</option>
                          <option value="shopping">Shopping</option>
                        </select>
                        <div className="absolute right-3 pointer-events-none text-outline flex items-center">
                          <span className="material-symbols-outlined text-[18px]">expand_more</span>
                        </div>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="space-y-1">
                      <label className="font-sans text-label-sm text-on-surface-variant block font-semibold" htmlFor="date">Date</label>
                      <div className="relative border border-outline-variant rounded-lg bg-surface-container-lowest flex items-center h-10 px-3 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                        <span className="material-symbols-outlined text-[18px] text-outline mr-2">calendar_today</span>
                        <input
                          className="w-full bg-transparent border-none p-0 text-body-md font-sans text-on-surface focus:ring-0 focus:outline-none [color-scheme:light]"
                          id="date"
                          type="date"
                          value={formDate}
                          onChange={(e) => setFormDate(e.target.value)}
                          required
                        />
                      </div>
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
                      value={formNotes}
                      onChange={(e) => setFormNotes(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-end gap-md pt-6 border-t border-outline-variant mt-6 bg-surface-bright rounded-b-xl">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-md py-2 font-sans text-label-md rounded-lg bg-surface-container-lowest text-on-surface border border-outline-variant hover:bg-surface-container transition-colors focus:outline-none"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="px-md py-2 font-sans text-label-md rounded-lg bg-primary text-on-primary border border-transparent hover:bg-on-primary-fixed-variant transition-colors shadow-sm focus:outline-none flex items-center gap-2"
                  type="submit"
                >
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  Save Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

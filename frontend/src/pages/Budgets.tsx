import React from 'react';

interface Budget {
  id: string;
  category: string;
  icon: string;
  spent: number;
  limit: number;
  status: 'safe' | 'warning' | 'critical';
}

const mockBudgets: Budget[] = [
  {
    id: '1',
    category: 'Groceries',
    icon: 'shopping_cart',
    spent: 450.00,
    limit: 800.00,
    status: 'safe'
  },
  {
    id: '2',
    category: 'Dining Out',
    icon: 'restaurant',
    spent: 280.00,
    limit: 300.00,
    status: 'warning'
  },
  {
    id: '3',
    category: 'Entertainment',
    icon: 'movie',
    spent: 190.00,
    limit: 200.00,
    status: 'critical'
  },
  {
    id: '4',
    category: 'Transport',
    icon: 'directions_car',
    spent: 45.00,
    limit: 150.00,
    status: 'safe'
  }
];

export default function Budgets() {
  return (
    <main className="p-margin-mobile md:p-xl max-w-container-max mx-auto pb-3xl md:pb-xl">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-md mb-xl">
        <div>
          <h2 className="font-sans text-headline-lg-mobile md:text-headline-lg font-bold text-on-background">Budgets</h2>
          <p className="font-sans text-body-sm text-on-surface-variant mt-xs">Manage your spending limits for this month.</p>
        </div>
        <button className="bg-primary text-on-primary font-sans text-label-md px-lg py-sm rounded-lg flex items-center justify-center gap-sm border-t border-white/20 hover:bg-on-primary-fixed-variant transition-colors shadow-sm w-full md:w-auto active:scale-[0.99]">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add Budget
        </button>
      </div>

      {/* Budget Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-md">
        {mockBudgets.map((budget) => {
          const percent = Math.min((budget.spent / budget.limit) * 100, 100);
          const remaining = budget.limit - budget.spent;

          return (
            <div key={budget.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-between items-start mb-md">
                <div className="flex items-center gap-sm">
                  <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">{budget.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-sans text-headline-sm font-bold text-on-surface">{budget.category}</h3>
                    <p className="font-sans text-label-sm text-on-surface-variant">Monthly limit</p>
                  </div>
                </div>
                <button className="text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </div>

              <div className="mb-sm flex justify-between items-end">
                <div className="font-sans text-headline-md font-bold text-on-surface font-mono">${budget.spent.toFixed(2)}</div>
                <div className="font-sans text-body-sm text-on-surface-variant font-mono">of ${budget.limit.toFixed(2)}</div>
              </div>

              <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden mb-sm">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    budget.status === 'safe'
                      ? 'bg-primary'
                      : budget.status === 'warning'
                      ? 'bg-amber-500'
                      : 'bg-error'
                  }`}
                  style={{ width: `${percent}%` }}
                />
              </div>

              <div className="flex justify-between items-center font-sans text-label-sm">
                <span className="text-on-surface-variant font-mono">Remaining: ${remaining.toFixed(2)}</span>
                {budget.status === 'safe' && (
                  <span className="text-secondary bg-secondary-container/20 px-2 py-0.5 rounded-sm flex items-center gap-xs font-semibold">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    Safe to spend
                  </span>
                )}
                {budget.status === 'warning' && (
                  <span className="text-amber-700 bg-amber-100 px-2 py-0.5 rounded-sm flex items-center gap-xs font-semibold">
                    <span className="material-symbols-outlined text-[14px]">warning</span>
                    Watch details
                  </span>
                )}
                {budget.status === 'critical' && (
                  <span className="text-error bg-error-container/30 px-2 py-0.5 rounded-sm flex items-center gap-xs font-semibold">
                    <span className="material-symbols-outlined text-[14px]">warning</span>
                    Almost limit
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {/* Budget Card 3 (Empty State Variant) */}
        <div className="bg-surface-bright border border-dashed border-outline-variant rounded-xl p-md flex flex-col items-center justify-center text-center min-h-[200px] hover:bg-surface transition-colors cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary mb-sm group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined">add</span>
          </div>
          <h3 className="font-sans text-headline-sm font-bold text-on-surface mb-xs">Create New Budget</h3>
          <p className="font-sans text-body-sm text-on-surface-variant">Track another spending category</p>
        </div>
      </div>
    </main>
  );
}

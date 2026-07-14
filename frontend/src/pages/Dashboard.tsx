import React from 'react';

export default function Dashboard() {
  return (
    <div className="p-md md:p-lg max-w-[1280px] w-full mx-auto space-y-xl pb-24 md:pb-lg">
      {/* Welcome Header & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-md">
        <div>
          <h2 className="font-sans text-headline-lg font-bold text-on-surface">Welcome back, Alex</h2>
          <p className="font-sans text-body-sm text-on-surface-variant">Here's a premium overview of your finances today.</p>
        </div>
        <div className="flex items-center gap-sm">
          <button className="flex items-center gap-sm bg-surface-container-lowest border border-outline-variant text-on-surface px-4 py-2 rounded-lg font-sans text-label-md hover:bg-surface-container transition-colors shadow-sm">
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>swap_horiz</span>
            Transfer
          </button>
          <button className="flex items-center gap-sm bg-primary text-on-primary px-4 py-2 rounded-lg font-sans text-label-md hover:bg-primary/90 transition-colors shadow-sm border-t border-white/20">
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
            Add Transaction
          </button>
        </div>
      </div>

      {/* Summary Cards Grid (4 Columns for Balance, Income, Expense, Savings) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md md:gap-lg">
        {/* Total Balance / Current Balance */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col gap-sm shadow-ambient relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="font-sans text-label-sm text-on-surface-variant uppercase tracking-wider">Current Balance</span>
            <div className="w-8 h-8 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-sm">account_balance_wallet</span>
            </div>
          </div>
          <div>
            <h3 className="font-sans text-headline-lg font-bold text-on-surface">$24,562.00</h3>
            <div className="flex items-center gap-xs mt-1">
              <span className="material-symbols-outlined text-secondary text-sm">trending_up</span>
              <span className="font-sans text-body-sm text-secondary font-semibold">+2.4%</span>
              <span className="font-sans text-body-sm text-on-surface-variant">vs last month</span>
            </div>
          </div>
          {/* Mini Sparkline SVG */}
          <div className="absolute bottom-0 left-0 w-full h-12 opacity-20 pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 30">
              <path d="M0,30 L10,25 L20,28 L30,20 L40,22 L50,15 L60,18 L70,10 L80,12 L90,5 L100,2 L100,30 Z" fill="#004ac6"></path>
              <path className="sparkline stroke-primary" d="M0,30 L10,25 L20,28 L30,20 L40,22 L50,15 L60,18 L70,10 L80,12 L90,5 L100,2"></path>
            </svg>
          </div>
        </div>

        {/* Income Card */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col gap-sm shadow-ambient relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="font-sans text-label-sm text-on-surface-variant uppercase tracking-wider">Income</span>
            <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-sm">arrow_downward</span>
            </div>
          </div>
          <div>
            <h3 className="font-sans text-headline-lg font-bold text-on-surface">$8,450.00</h3>
            <div className="flex items-center gap-xs mt-1">
              <span className="material-symbols-outlined text-secondary text-sm">trending_up</span>
              <span className="font-sans text-body-sm text-secondary font-semibold">+12.0%</span>
              <span className="font-sans text-body-sm text-on-surface-variant">from average</span>
            </div>
          </div>
          {/* Mini Sparkline SVG */}
          <div className="absolute bottom-0 left-0 w-full h-12 opacity-20 pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 30">
              <path d="M0,30 L20,25 L40,28 L60,15 L80,18 L100,5 L100,30 Z" fill="#006c49"></path>
              <path className="sparkline stroke-secondary" d="M0,30 L20,25 L40,28 L60,15 L80,18 L100,5"></path>
            </svg>
          </div>
        </div>

        {/* Expense Card */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col gap-sm shadow-ambient relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="font-sans text-label-sm text-on-surface-variant uppercase tracking-wider">Expenses</span>
            <div className="w-8 h-8 rounded-full bg-error/10 flex items-center justify-center text-error">
              <span className="material-symbols-outlined text-sm">arrow_upward</span>
            </div>
          </div>
          <div>
            <h3 className="font-sans text-headline-lg font-bold text-on-surface">$3,210.50</h3>
            <div className="flex items-center gap-xs mt-1">
              <span className="material-symbols-outlined text-secondary text-sm">trending_down</span>
              <span className="font-sans text-body-sm text-secondary font-semibold">-5.2%</span>
              <span className="font-sans text-body-sm text-on-surface-variant">vs last month</span>
            </div>
          </div>
          {/* Mini Sparkline SVG */}
          <div className="absolute bottom-0 left-0 w-full h-12 opacity-20 pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 30">
              <path d="M0,30 L20,12 L40,15 L60,8 L80,14 L100,20 L100,30 Z" fill="#ba1a1a"></path>
              <path className="sparkline stroke-error" d="M0,30 L20,12 L40,15 L60,8 L80,14 L100,20"></path>
            </svg>
          </div>
        </div>

        {/* Savings Card */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col gap-sm shadow-ambient relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="font-sans text-label-sm text-on-surface-variant uppercase tracking-wider">Savings</span>
            <div className="w-8 h-8 rounded-full bg-secondary-container/20 flex items-center justify-center text-[#006c49]">
              <span className="material-symbols-outlined text-sm">savings</span>
            </div>
          </div>
          <div>
            <h3 className="font-sans text-headline-lg font-bold text-on-surface">$5,239.50</h3>
            <div className="flex items-center gap-xs mt-1">
              <span className="material-symbols-outlined text-secondary text-sm">trending_up</span>
              <span className="font-sans text-body-sm text-secondary font-semibold">+8.7%</span>
              <span className="font-sans text-body-sm text-on-surface-variant">vs last month</span>
            </div>
          </div>
          {/* Mini Sparkline SVG */}
          <div className="absolute bottom-0 left-0 w-full h-12 opacity-20 pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 30">
              <path d="M0,30 L20,28 L40,24 L60,20 L80,14 L100,10 L100,30 Z" fill="#006c49"></path>
              <path className="sparkline stroke-secondary" d="M0,30 L20,28 L40,24 L60,20 L80,14 L100,10"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Bento Grid Layout: Main Middle Section */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-md md:gap-lg">
        {/* Left Column (4 cols): Health & Insights */}
        <div className="xl:col-span-4 flex flex-col gap-md md:gap-lg">
          {/* Financial Health Score */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-ambient flex flex-col items-center justify-center h-full min-h-[240px]">
            <h3 className="font-sans text-headline-sm font-bold w-full text-left mb-6">Financial Health</h3>
            <div className="relative w-32 h-32 flex items-center justify-center">
              {/* SVG Circle Progress */}
              <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 100 100">
                {/* Track */}
                <circle className="text-surface-container-high" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeWidth="8"></circle>
                {/* Progress (85%) */}
                <circle className="text-secondary" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251.2" strokeDashoffset="37.68" strokeLinecap="round" strokeWidth="8"></circle>
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="font-sans text-display text-on-surface leading-none">85</span>
                <span className="font-sans text-label-sm text-secondary font-bold mt-1">Excellent</span>
              </div>
            </div>
          </div>

          {/* Smart Insights Card */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-ambient relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary-container/5 rounded-bl-full pointer-events-none"></div>
            <div className="flex items-center gap-sm mb-4">
              <span className="material-symbols-outlined text-primary">lightbulb</span>
              <h3 className="font-sans text-headline-sm font-bold">Smart Insight</h3>
            </div>
            <p className="font-sans text-body-sm text-on-surface-variant leading-relaxed">
              Your discretionary spending in "Dining" is down 15% this month. You're on track to save an extra <strong className="text-on-surface font-medium">$120</strong> toward your emergency fund goal.
            </p>
          </div>
        </div>

        {/* Right Column (8 cols): Recent Transactions */}
        <div className="xl:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-ambient flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-sans text-headline-sm font-bold">Recent Transactions</h3>
            <button className="text-primary font-sans text-label-md hover:underline font-bold">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-surface-container-high">
                  <th className="font-sans text-label-sm text-on-surface-variant py-3 px-2 font-medium">Transaction</th>
                  <th className="font-sans text-label-sm text-on-surface-variant py-3 px-2 font-medium">Category</th>
                  <th className="font-sans text-label-sm text-on-surface-variant py-3 px-2 font-medium">Date</th>
                  <th className="font-sans text-label-sm text-on-surface-variant py-3 px-2 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="font-sans text-body-sm">
                <tr className="border-b border-surface-container-high hover:bg-surface-bright transition-colors">
                  <td className="py-3 px-2 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface">
                      <span className="material-symbols-outlined text-sm">shopping_cart</span>
                    </div>
                    <span className="font-medium text-on-surface">Whole Foods Market</span>
                  </td>
                  <td className="py-3 px-2 text-on-surface-variant">Groceries</td>
                  <td className="py-3 px-2 text-on-surface-variant">Today, 2:45 PM</td>
                  <td className="py-3 px-2 text-right font-medium text-on-surface font-mono">-$84.20</td>
                </tr>
                <tr className="border-b border-surface-container-high hover:bg-surface-bright transition-colors">
                  <td className="py-3 px-2 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface">
                      <span className="material-symbols-outlined text-sm">work</span>
                    </div>
                    <span className="font-medium text-on-surface">TechCorp Inc. Salary</span>
                  </td>
                  <td className="py-3 px-2 text-on-surface-variant">Income</td>
                  <td className="py-3 px-2 text-on-surface-variant">Yesterday</td>
                  <td className="py-3 px-2 text-right font-medium text-secondary font-mono">+$4,250.00</td>
                </tr>
                <tr className="border-b border-surface-container-high hover:bg-surface-bright transition-colors">
                  <td className="py-3 px-2 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface">
                      <span className="material-symbols-outlined text-sm">local_cafe</span>
                    </div>
                    <span className="font-medium text-on-surface">Starbucks</span>
                  </td>
                  <td className="py-3 px-2 text-on-surface-variant">Dining</td>
                  <td className="py-3 px-2 text-on-surface-variant">Oct 24</td>
                  <td className="py-3 px-2 text-right font-medium text-on-surface font-mono">-$5.40</td>
                </tr>
                <tr className="border-b border-surface-container-high hover:bg-surface-bright transition-colors">
                  <td className="py-3 px-2 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface">
                      <span className="material-symbols-outlined text-sm">home</span>
                    </div>
                    <span className="font-medium text-on-surface">Monthly Rent</span>
                  </td>
                  <td className="py-3 px-2 text-on-surface-variant">Housing</td>
                  <td className="py-3 px-2 text-on-surface-variant">Oct 1</td>
                  <td className="py-3 px-2 text-right font-medium text-on-surface font-mono">-$1,800.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bottom Row: Charts & Budget Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-md md:gap-lg">
        {/* Expense by Category (Donut style) (5 cols) */}
        <div className="lg:col-span-5 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-ambient flex flex-col">
          <h3 className="font-sans text-headline-sm font-bold mb-6">Expense by Category</h3>
          <div className="flex items-center gap-lg flex-1">
            {/* CSS Donut Representation */}
            <div className="w-32 h-32 donut-chart relative flex-shrink-0">
              {/* Inner circle to make it a donut */}
              <div className="absolute inset-2 bg-surface-container-lowest rounded-full flex items-center justify-center">
                <span className="font-sans text-label-md text-on-surface-variant font-bold">Oct</span>
              </div>
            </div>
            {/* Legend */}
            <div className="flex flex-col gap-2 flex-1 w-full">
              <div className="flex items-center justify-between font-sans text-body-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#004ac6]"></div>
                  <span className="text-on-surface font-medium">Housing</span>
                </div>
                <span className="font-semibold text-on-surface-variant">35%</span>
              </div>
              <div className="flex items-center justify-between font-sans text-body-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#006c49]"></div>
                  <span className="text-on-surface font-medium">Groceries</span>
                </div>
                <span className="font-semibold text-on-surface-variant">25%</span>
              </div>
              <div className="flex items-center justify-between font-sans text-body-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#2563eb]"></div>
                  <span className="text-on-surface font-medium">Transport</span>
                </div>
                <span className="font-semibold text-on-surface-variant">25%</span>
              </div>
              <div className="flex items-center justify-between font-sans text-body-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#c3c6d7]"></div>
                  <span className="text-on-surface font-medium">Other</span>
                </div>
                <span className="font-semibold text-on-surface-variant">15%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Cash Flow (Bar representation) (7 cols) */}
        <div className="lg:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-ambient flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-sans text-headline-sm font-bold">Monthly Cash Flow</h3>
            <div className="flex gap-4 font-sans text-label-sm font-semibold">
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-primary"></div> In
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-outline-variant"></div> Out
              </div>
            </div>
          </div>
          {/* Simplified Bar Chart Layout */}
          <div className="flex items-end justify-between h-40 mt-auto pt-4 gap-2">
            {/* Jun */}
            <div className="flex flex-col items-center gap-2 flex-1 group">
              <div className="flex items-end gap-1.5 w-full justify-center h-full">
                <div className="w-1/3 bg-primary rounded-t-sm h-[60%] group-hover:opacity-80 transition-opacity"></div>
                <div className="w-1/3 bg-outline-variant rounded-t-sm h-[40%] group-hover:opacity-80 transition-opacity"></div>
              </div>
              <span className="font-sans text-label-sm text-on-surface-variant font-semibold">Jun</span>
            </div>
            {/* Jul */}
            <div className="flex flex-col items-center gap-2 flex-1 group">
              <div className="flex items-end gap-1.5 w-full justify-center h-full">
                <div className="w-1/3 bg-primary rounded-t-sm h-[75%] group-hover:opacity-80 transition-opacity"></div>
                <div className="w-1/3 bg-outline-variant rounded-t-sm h-[50%] group-hover:opacity-80 transition-opacity"></div>
              </div>
              <span className="font-sans text-label-sm text-on-surface-variant font-semibold">Jul</span>
            </div>
            {/* Aug */}
            <div className="flex flex-col items-center gap-2 flex-1 group">
              <div className="flex items-end gap-1.5 w-full justify-center h-full">
                <div className="w-1/3 bg-primary rounded-t-sm h-[65%] group-hover:opacity-80 transition-opacity"></div>
                <div className="w-1/3 bg-outline-variant rounded-t-sm h-[80%] group-hover:opacity-80 transition-opacity"></div>
              </div>
              <span className="font-sans text-label-sm text-on-surface-variant font-semibold">Aug</span>
            </div>
            {/* Sep */}
            <div className="flex flex-col items-center gap-2 flex-1 group">
              <div className="flex items-end gap-1.5 w-full justify-center h-full">
                <div className="w-1/3 bg-primary rounded-t-sm h-[90%] group-hover:opacity-80 transition-opacity"></div>
                <div className="w-1/3 bg-outline-variant rounded-t-sm h-[45%] group-hover:opacity-80 transition-opacity"></div>
              </div>
              <span className="font-sans text-label-sm text-on-surface-variant font-semibold">Sep</span>
            </div>
            {/* Oct */}
            <div className="flex flex-col items-center gap-2 flex-1 group">
              <div className="flex items-end gap-1.5 w-full justify-center h-full">
                <div className="w-1/3 bg-primary rounded-t-sm h-[40%] group-hover:opacity-80 transition-opacity"></div>
                <div className="w-1/3 bg-outline-variant rounded-t-sm h-[20%] group-hover:opacity-80 transition-opacity"></div>
              </div>
              <span className="font-sans text-label-sm text-primary font-bold">Oct</span>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Progress Cards */}
      <div className="space-y-md">
        <h3 className="font-sans text-headline-sm font-bold">Budgets</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
          {/* Groceries Budget */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col gap-sm">
            <div className="flex justify-between items-center mb-1">
              <span className="font-sans text-label-md font-medium text-on-surface">Groceries</span>
              <span className="material-symbols-outlined text-sm text-on-surface-variant">shopping_bag</span>
            </div>
            <div className="w-full bg-surface-container rounded-full h-2">
              <div className="bg-primary rounded-full h-2" style={{ width: '65%' }}></div>
            </div>
            <div className="flex justify-between items-center font-sans text-body-sm mt-1">
              <span className="text-on-surface-variant">$325 spent</span>
              <span className="font-semibold text-on-surface">$500</span>
            </div>
          </div>

          {/* Dining Out Budget */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col gap-sm">
            <div className="flex justify-between items-center mb-1">
              <span className="font-sans text-label-md font-medium text-on-surface">Dining Out</span>
              <span className="material-symbols-outlined text-sm text-on-surface-variant">restaurant</span>
            </div>
            <div className="w-full bg-surface-container rounded-full h-2">
              <div className="bg-secondary rounded-full h-2" style={{ width: '40%' }}></div>
            </div>
            <div className="flex justify-between items-center font-sans text-body-sm mt-1">
              <span className="text-on-surface-variant">$120 spent</span>
              <span className="font-semibold text-on-surface">$300</span>
            </div>
          </div>

          {/* Entertainment Budget (Warning State) */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col gap-sm">
            <div className="flex justify-between items-center mb-1">
              <span className="font-sans text-label-md font-medium text-on-surface">Entertainment</span>
              <span className="material-symbols-outlined text-sm text-on-surface-variant">movie</span>
            </div>
            <div className="w-full bg-surface-container rounded-full h-2">
              <div className="bg-error rounded-full h-2" style={{ width: '90%' }}></div>
            </div>
            <div className="flex justify-between items-center font-sans text-body-sm mt-1">
              <span className="text-error font-semibold">Almost limit</span>
              <span className="font-semibold text-on-surface">$200</span>
            </div>
          </div>

          {/* Transport Budget */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col gap-sm">
            <div className="flex justify-between items-center mb-1">
              <span className="font-sans text-label-md font-medium text-on-surface">Transport</span>
              <span className="material-symbols-outlined text-sm text-on-surface-variant">directions_car</span>
            </div>
            <div className="w-full bg-surface-container rounded-full h-2">
              <div className="bg-primary rounded-full h-2" style={{ width: '30%' }}></div>
            </div>
            <div className="flex justify-between items-center font-sans text-body-sm mt-1">
              <span className="text-on-surface-variant">$45 spent</span>
              <span className="font-semibold text-on-surface">$150</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

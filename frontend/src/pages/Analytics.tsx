import React from 'react';

export default function Analytics() {
  return (
    <main className="flex-grow p-margin-mobile md:p-xl w-full max-w-container-max mx-auto flex flex-col gap-lg pb-[100px] md:pb-xl">
      {/* Title */}
      <div>
        <h1 className="font-sans text-headline-lg-mobile md:text-headline-lg font-bold text-on-surface mb-xs">Analytics</h1>
        <p className="font-sans text-body-sm text-on-surface-variant">Analyze your financial history and savings rates.</p>
      </div>

      {/* Grid containing all components */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-md md:gap-lg">
        {/* Metric Cards */}
        <div className="md:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-md md:gap-lg mb-md">
          {/* Total Balance */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col shadow-sm">
            <span className="font-sans text-label-md text-on-surface-variant mb-xs">Total Balance</span>
            <span className="font-sans text-headline-md font-bold text-on-background font-mono">$24,590.00</span>
            <div className="flex items-center gap-xs mt-sm text-secondary">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span className="font-sans text-label-sm font-semibold">+4.2%</span>
            </div>
          </div>
          {/* Monthly Income */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col shadow-sm">
            <span className="font-sans text-label-md text-on-surface-variant mb-xs">Monthly Income</span>
            <span className="font-sans text-headline-md font-bold text-on-background font-mono">$8,250.00</span>
            <div className="flex items-center gap-xs mt-sm text-secondary">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span className="font-sans text-label-sm font-semibold">+1.5%</span>
            </div>
          </div>
          {/* Monthly Expenses */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col shadow-sm">
            <span className="font-sans text-label-md text-on-surface-variant mb-xs">Monthly Expenses</span>
            <span className="font-sans text-headline-md font-bold text-on-background font-mono">$4,120.00</span>
            <div className="flex items-center gap-xs mt-sm text-error">
              <span className="material-symbols-outlined text-sm">trending_down</span>
              <span className="font-sans text-label-sm font-semibold">-2.1%</span>
            </div>
          </div>
          {/* Savings Rate */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col shadow-sm">
            <span className="font-sans text-label-md text-on-surface-variant mb-xs">Savings Rate</span>
            <span className="font-sans text-headline-md font-bold text-on-background font-mono">32%</span>
            <div className="flex items-center gap-xs mt-sm text-secondary">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span className="font-sans text-label-sm font-semibold">+5.0%</span>
            </div>
          </div>
        </div>

        {/* Large Area Chart (Income vs Expense) */}
        <div className="md:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
          <div className="flex justify-between items-center mb-lg">
            <h3 className="font-sans text-headline-sm font-bold text-on-background">Cash Flow Overview</h3>
            <button className="text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
          {/* Mock Chart Area */}
          <div className="w-full h-64 border-b border-l border-outline-variant relative flex items-end px-2 pb-2">
            {/* Y Axis Labels */}
            <div className="absolute -left-8 top-0 h-full flex flex-col justify-between text-xs text-outline py-2 font-semibold">
              <span>10k</span>
              <span>5k</span>
              <span>0</span>
            </div>
            {/* Chart Graphic Representation */}
            <div className="w-full h-full relative overflow-hidden">
              {/* Income Area (Clipped Path) */}
              <div
                className="absolute bottom-0 w-full h-[80%] bg-primary-container/20 border-t-2 border-primary"
                style={{ clipPath: 'polygon(0 40%, 20% 30%, 40% 50%, 60% 20%, 80% 40%, 100% 10%, 100% 100%, 0% 100%)' }}
              />
              {/* Expense Line (Clipped Path) */}
              <div
                className="absolute bottom-0 w-full h-[60%] border-t-2 border-secondary border-dashed"
                style={{ clipPath: 'polygon(0 60%, 20% 50%, 40% 70%, 60% 40%, 80% 50%, 100% 30%, 100% 100%, 0% 100%)' }}
              />
            </div>
            {/* X Axis Labels */}
            <div className="absolute -bottom-6 w-full flex justify-between text-xs text-outline font-semibold">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </div>
          <div className="flex gap-md mt-8 justify-center">
            <div className="flex items-center gap-xs">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="font-sans text-label-sm text-on-surface-variant">Income</span>
            </div>
            <div className="flex items-center gap-xs">
              <div className="w-3 h-3 rounded-full bg-secondary border-2 border-dashed"></div>
              <span className="font-sans text-label-sm text-on-surface-variant">Expenses</span>
            </div>
          </div>
        </div>

        {/* Spending Analysis Breakdown */}
        <div className="md:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col shadow-sm">
          <h3 className="font-sans text-headline-sm font-bold text-on-background mb-lg">Spending by Category</h3>
          <div className="flex-grow flex flex-col justify-center gap-md">
            {/* Category 1 */}
            <div>
              <div className="flex justify-between mb-xs">
                <span className="font-sans text-label-md text-on-surface font-semibold">Housing</span>
                <span className="font-sans text-label-md text-on-surface-variant font-mono">$1,500</span>
              </div>
              <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            {/* Category 2 */}
            <div>
              <div className="flex justify-between mb-xs">
                <span className="font-sans text-label-md text-on-surface font-semibold">Food & Dining</span>
                <span className="font-sans text-label-md text-on-surface-variant font-mono">$850</span>
              </div>
              <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                <div className="bg-secondary h-full rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
            {/* Category 3 */}
            <div>
              <div className="flex justify-between mb-xs">
                <span className="font-sans text-label-md text-on-surface font-semibold">Transportation</span>
                <span className="font-sans text-label-md text-on-surface-variant font-mono">$420</span>
              </div>
              <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                <div className="bg-[#6b6e70] h-full rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
            {/* Category 4 */}
            <div>
              <div className="flex justify-between mb-xs">
                <span className="font-sans text-label-md text-on-surface font-semibold">Entertainment</span>
                <span className="font-sans text-label-md text-on-surface-variant font-mono">$300</span>
              </div>
              <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                <div className="bg-[#c3c6d7] h-full rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
          <button className="w-full mt-lg py-2 border border-outline-variant rounded-lg font-sans text-label-md text-on-surface hover:bg-surface-variant transition-colors active:scale-[0.99]">
            View All Categories
          </button>
        </div>

        {/* Savings Trend */}
        <div className="md:col-span-6 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
          <h3 className="font-sans text-headline-sm font-bold text-on-background mb-lg">Savings Growth</h3>
          <div className="w-full h-48 relative flex items-end pb-2">
            {/* Simple Line Chart Representation */}
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 50">
              <path
                className="text-secondary"
                d="M0,45 Q20,40 40,30 T80,15 T100,5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
              {/* Points */}
              <circle className="text-secondary" cx="0" cy="45" fill="currentColor" r="2" />
              <circle className="text-secondary" cx="40" cy="30" fill="currentColor" r="2" />
              <circle className="text-secondary" cx="80" cy="15" fill="currentColor" r="2" />
              <circle className="text-secondary" cx="100" cy="5" fill="currentColor" r="2" />
            </svg>
          </div>
        </div>

        {/* Weekly Spending Heatmap */}
        <div className="md:col-span-6 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
          <h3 className="font-sans text-headline-sm font-bold text-on-background mb-lg">Weekly Intensity</h3>
          <div className="grid grid-cols-7 gap-sm h-48">
            {/* Columns representing days */}
            <div className="flex flex-col justify-end gap-xs h-full pb-6 relative">
              <div className="w-full bg-primary/20 rounded-sm h-1/4"></div>
              <div className="w-full bg-primary/40 rounded-sm h-1/2"></div>
              <div className="w-full bg-primary/10 rounded-sm h-1/4"></div>
              <span className="absolute bottom-0 w-full text-center text-xs text-outline font-sans text-label-sm font-semibold">M</span>
            </div>
            <div className="flex flex-col justify-end gap-xs h-full pb-6 relative">
              <div className="w-full bg-primary/60 rounded-sm h-1/3"></div>
              <div className="w-full bg-primary/80 rounded-sm h-2/3"></div>
              <span className="absolute bottom-0 w-full text-center text-xs text-outline font-sans text-label-sm font-semibold">T</span>
            </div>
            <div className="flex flex-col justify-end gap-xs h-full pb-6 relative">
              <div className="w-full bg-primary/20 rounded-sm h-1/2"></div>
              <div className="w-full bg-primary/30 rounded-sm h-1/2"></div>
              <span className="absolute bottom-0 w-full text-center text-xs text-outline font-sans text-label-sm font-semibold">W</span>
            </div>
            <div className="flex flex-col justify-end gap-xs h-full pb-6 relative">
              <div className="w-full bg-primary rounded-sm h-full"></div>
              <span className="absolute bottom-0 w-full text-center text-xs text-outline font-sans text-label-sm font-semibold">T</span>
            </div>
            <div className="flex flex-col justify-end gap-xs h-full pb-6 relative">
              <div className="w-full bg-primary/40 rounded-sm h-1/3"></div>
              <div className="w-full bg-primary/20 rounded-sm h-1/3"></div>
              <div className="w-full bg-primary/10 rounded-sm h-1/3"></div>
              <span className="absolute bottom-0 w-full text-center text-xs text-outline font-sans text-label-sm font-semibold">F</span>
            </div>
            <div className="flex flex-col justify-end gap-xs h-full pb-6 relative">
              <div className="w-full bg-primary/80 rounded-sm h-3/4"></div>
              <span className="absolute bottom-0 w-full text-center text-xs text-outline font-sans text-label-sm font-semibold">S</span>
            </div>
            <div className="flex flex-col justify-end gap-xs h-full pb-6 relative">
              <div className="w-full bg-primary/10 rounded-sm h-1/4"></div>
              <span className="absolute bottom-0 w-full text-center text-xs text-outline font-sans text-label-sm font-semibold">S</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

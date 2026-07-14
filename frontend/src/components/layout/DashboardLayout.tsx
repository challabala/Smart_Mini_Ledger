import React from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';

export default function DashboardLayout() {
  return (
    <div className="bg-background text-on-background min-h-screen flex w-full">
      {/* SideNavBar (Hidden on Mobile, Visible on Desktop) */}
      <nav className="bg-surface h-screen w-64 fixed left-0 top-0 hidden md:flex flex-col border-r border-outline-variant z-50">
        <div className="flex flex-col h-full py-lg px-md">
          {/* Brand Header */}
          <div className="mb-xl px-sm flex items-center gap-sm">
            <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center">
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>account_balance</span>
            </div>
            <div>
              <h1 className="font-sans text-headline-sm font-bold text-primary leading-tight">Smart Mini Ledger</h1>
              <p className="text-label-sm text-on-surface-variant font-semibold">Premium FinTech</p>
            </div>
          </div>
          {/* Navigation Links */}
          <ul className="space-y-sm flex-1">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-md px-md py-sm rounded-lg transition-all duration-200 ease-in-out font-medium ${
                    isActive
                      ? 'text-primary font-bold border-r-4 border-primary bg-primary-container/10'
                      : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
                  }`
                }
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
                <span className="text-label-md">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/transactions"
                className={({ isActive }) =>
                  `flex items-center gap-md px-md py-sm rounded-lg transition-all duration-200 ease-in-out font-medium ${
                    isActive
                      ? 'text-primary font-bold border-r-4 border-primary bg-primary-container/10'
                      : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
                  }`
                }
              >
                <span className="material-symbols-outlined">receipt_long</span>
                <span className="text-label-md">Transactions</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/budgets"
                className={({ isActive }) =>
                  `flex items-center gap-md px-md py-sm rounded-lg transition-all duration-200 ease-in-out font-medium ${
                    isActive
                      ? 'text-primary font-bold border-r-4 border-primary bg-primary-container/10'
                      : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
                  }`
                }
              >
                <span className="material-symbols-outlined">account_balance_wallet</span>
                <span className="text-label-md">Budgets</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/analytics"
                className={({ isActive }) =>
                  `flex items-center gap-md px-md py-sm rounded-lg transition-all duration-200 ease-in-out font-medium ${
                    isActive
                      ? 'text-primary font-bold border-r-4 border-primary bg-primary-container/10'
                      : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
                  }`
                }
              >
                <span className="material-symbols-outlined">analytics</span>
                <span className="text-label-md">Analytics</span>
              </NavLink>
            </li>
          </ul>
          {/* Bottom Action */}
          <ul className="mt-auto">
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `flex items-center gap-md px-md py-sm rounded-lg transition-all duration-200 ease-in-out font-medium ${
                    isActive
                      ? 'text-primary font-bold border-r-4 border-primary bg-primary-container/10'
                      : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
                  }`
                }
              >
                <span className="material-symbols-outlined">person</span>
                <span className="text-label-md">Profile</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="flex-1 md:ml-64 flex flex-col min-w-0">
        {/* TopNavBar */}
        <header className="bg-surface/80 top-0 sticky z-45 backdrop-blur-md border-b border-outline-variant flex justify-between items-center w-full h-16 px-lg md:pl-8">
          {/* Search Bar */}
          <div className="flex-1 max-w-md focus-within:ring-2 focus-within:ring-primary rounded-lg transition-all duration-200">
            <div className="relative flex items-center w-full h-10 rounded-lg bg-surface-container-lowest border border-outline-variant overflow-hidden">
              <div className="grid place-items-center h-full w-12 text-on-surface-variant">
                <span className="material-symbols-outlined text-sm">search</span>
              </div>
              <input
                className="peer h-full w-full outline-none text-sm text-on-surface bg-transparent font-sans placeholder-on-surface-variant border-none focus:ring-0"
                id="search"
                placeholder="Search transactions, budgets..."
                type="text"
              />
            </div>
          </div>
          {/* Actions & Profile */}
          <div className="flex items-center gap-md ml-4">
            <button className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-container">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <Link to="/settings" className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-container flex items-center">
              <span className="material-symbols-outlined">settings</span>
            </Link>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant ml-2">
              <img
                alt="User avatar"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqOcEg2_coVmFAjdu0dX-qx1lVIFEatMxk7nuy2Yceb3IvD_iaeMKGmMqje145wELIpfdEnrQIzGmUca8lklf37VsWLyoXbyrXyWwCcs-xnwfiCk7VvldFjmKZmlWheiPoqmqXYQeOU8yqTHDeBlEhSjt68gOY33DaABN0n7ELKc82GE9w_RPoyksNVJ1BvAYnSIITHtyEMluZ0bGtEzpUfx6G2itdB9wUQ1touE-UjNOGEX5XrwbluicpwOrszLgEEehGL0OtsE4"
              />
            </div>
          </div>
        </header>

        {/* Dynamic Nested Content */}
        <div className="flex-1 pb-20 md:pb-0">
          <Outlet />
        </div>
      </main>

      {/* BottomNavBar (Hidden on Desktop, Visible on Mobile) */}
      <nav className="bg-surface/90 fixed bottom-0 w-full md:hidden z-50 backdrop-blur-xl border-t border-outline-variant shadow-lg flex justify-around items-center h-16 px-4 pb-safe">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center scale-95 transition-transform duration-150 active:bg-surface-container-highest rounded-lg p-1 ${
              isActive ? 'text-primary font-bold' : 'text-on-surface-variant'
            }`
          }
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className="text-[10px] mt-1 font-semibold">Home</span>
        </NavLink>
        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center scale-95 transition-transform duration-150 active:bg-surface-container-highest rounded-lg p-1 ${
              isActive ? 'text-primary font-bold' : 'text-on-surface-variant'
            }`
          }
        >
          <span className="material-symbols-outlined">history</span>
          <span className="text-[10px] mt-1 font-semibold font-medium">Activity</span>
        </NavLink>
        <NavLink
          to="/budgets"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center scale-95 transition-transform duration-150 active:bg-surface-container-highest rounded-lg p-1 ${
              isActive ? 'text-primary font-bold' : 'text-on-surface-variant'
            }`
          }
        >
          <span className="material-symbols-outlined">account_balance_wallet</span>
          <span className="text-[10px] mt-1 font-semibold">Wallet</span>
        </NavLink>
        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center scale-95 transition-transform duration-150 active:bg-surface-container-highest rounded-lg p-1 ${
              isActive ? 'text-primary font-bold' : 'text-on-surface-variant'
            }`
          }
        >
          <span className="material-symbols-outlined">bar_chart</span>
          <span className="text-[10px] mt-1 font-semibold">Charts</span>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center scale-95 transition-transform duration-150 active:bg-surface-container-highest rounded-lg p-1 ${
              isActive ? 'text-primary font-bold' : 'text-on-surface-variant'
            }`
          }
        >
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] mt-1 font-semibold font-medium">User</span>
        </NavLink>
      </nav>
    </div>
  );
}

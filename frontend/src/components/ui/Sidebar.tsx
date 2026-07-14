import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
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
  );
}

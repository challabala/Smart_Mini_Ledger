import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, ArrowLeftRight, Wallet, BarChart3,
  User, Settings, LogOut, TrendingUp, ChevronRight, Calculator,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const navItems = [
  { to: '/',             icon: LayoutDashboard, label: 'Dashboard'    },
  { to: '/transactions', icon: ArrowLeftRight,  label: 'Transactions' },
  { to: '/budgets',      icon: Wallet,          label: 'Budgets'      },
  { to: '/analytics',   icon: BarChart3,       label: 'Analytics'    },
  { to: '/simulator',   icon: Calculator,      label: 'Simulator'    },
];

const bottomItems = [
  { to: '/profile',  icon: User,     label: 'Profile'  },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const initials = user?.fullName
    ? user.fullName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <nav className="bg-surface h-screen w-64 fixed left-0 top-0 hidden md:flex flex-col border-r border-border z-50 transition-colors duration-250">
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 h-16 border-b border-border shrink-0">
        <div className="w-8 h-8 rounded-xl bg-gradient-primary flex items-center justify-center shadow-primary shrink-0">
          <TrendingUp className="w-4 h-4 text-white" />
        </div>
        <div className="min-w-0">
          <h1 className="text-sm font-bold text-text-primary leading-none truncate">Smart Mini Ledger</h1>
          <p className="text-[11px] text-text-muted font-medium mt-0.5">Premium FinTech</p>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
        <p className="text-[10px] font-semibold text-text-muted uppercase tracking-widest px-3 mb-2">Main Menu</p>
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-primary-500/10 text-primary-600 font-semibold dark:bg-primary-500/20 dark:text-primary-400'
                  : 'text-text-secondary hover:bg-surface-muted hover:text-text-primary'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={`w-[18px] h-[18px] shrink-0 transition-colors ${
                    isActive ? 'text-primary-600 dark:text-primary-400' : 'text-text-muted group-hover:text-text-secondary'
                  }`}
                />
                <span className="flex-1">{label}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-primary-400" />}
              </>
            )}
          </NavLink>
        ))}

        <div className="pt-4">
          <p className="text-[10px] font-semibold text-text-muted uppercase tracking-widest px-3 mb-2">Account</p>
          {bottomItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-500/10 text-primary-600 font-semibold dark:bg-primary-500/20 dark:text-primary-400'
                    : 'text-text-secondary hover:bg-surface-muted hover:text-text-primary'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-[18px] h-[18px] shrink-0 transition-colors ${
                      isActive ? 'text-primary-600 dark:text-primary-400' : 'text-text-muted group-hover:text-text-secondary'
                    }`}
                  />
                  <span className="flex-1">{label}</span>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-primary-400" />}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      {/* User Profile Footer */}
      <div className="px-3 py-4 border-t border-border shrink-0">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-muted transition-colors group">
          <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-text-primary truncate">{user?.fullName || 'User'}</p>
            <p className="text-[11px] text-text-muted truncate">{user?.email || ''}</p>
          </div>
          <button
            onClick={handleLogout}
            title="Logout"
            className="p-1 rounded-lg text-text-muted hover:text-error hover:bg-error-bg transition-colors opacity-0 group-hover:opacity-100"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </nav>
  );
}

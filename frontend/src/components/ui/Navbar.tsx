import { Link, useNavigate } from 'react-router-dom';
import { Settings, Search, LogOut, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { TrendingUp } from 'lucide-react';

// ─── Theme Toggle Button ──────────────────────────────────────────────────────
function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      id="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative p-2 rounded-xl text-text-muted hover:text-text-primary hover:bg-surface-muted transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none group"
    >
      {/* Sun icon — shown in dark mode */}
      <Sun
        className={`w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
          isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-75'
        }`}
      />
      {/* Moon icon — shown in light mode */}
      <Moon
        className={`w-5 h-5 transition-all duration-300 ${
          isDark ? 'opacity-0 -rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
        }`}
      />
      {/* Tooltip */}
      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-medium bg-text-primary text-background px-2 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
        {isDark ? 'Light Mode' : 'Dark Mode'}
      </span>
    </button>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const initials = user?.fullName
    ? user.fullName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  const savedAvatar = user?.id ? localStorage.getItem(`avatar_${user.id}`) : null;

  return (
    <header className="bg-surface/80 sticky top-0 z-40 backdrop-blur-xl border-b border-border flex items-center justify-between w-full h-16 px-6 transition-all duration-250">
      {/* Mobile Brand */}
      <div className="flex items-center gap-2 md:hidden">
        <div className="w-7 h-7 rounded-lg bg-gradient-primary flex items-center justify-center shadow-primary">
          <TrendingUp className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="text-sm font-bold text-text-primary">Smart Mini Ledger</span>
      </div>

      {/* Search Bar (desktop) */}
      <div className="hidden md:flex flex-1 max-w-sm">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            id="global-search"
            type="text"
            placeholder="Search transactions, budgets..."
            className="w-full h-9 pl-9 pr-4 rounded-xl border border-border bg-surface-muted text-sm text-text-primary placeholder-text-muted transition-all duration-200 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 focus:bg-surface"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-1 ml-auto">

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Settings */}
        <Link
          to="/settings"
          id="settings-link"
          className="p-2 rounded-xl text-text-muted hover:text-text-primary hover:bg-surface-muted transition-all duration-200"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5" />
        </Link>

        {/* Divider */}
        <div className="w-px h-6 bg-border mx-1" />

        {/* User Avatar Menu */}
        <div className="group relative">
          <button
            id="user-menu-btn"
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-surface-muted transition-all duration-200"
            aria-label="User menu"
          >
            {savedAvatar ? (
              <img
                src={savedAvatar}
                alt={user?.fullName || 'User'}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-primary-200"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white text-xs font-bold ring-2 ring-primary-200">
                {initials}
              </div>
            )}
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold text-text-primary leading-none">{user?.fullName || 'User'}</p>
              <p className="text-[11px] text-text-muted mt-0.5 leading-none max-w-[120px] truncate">{user?.email || ''}</p>
            </div>
          </button>

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-52 bg-surface rounded-2xl border border-border shadow-modal opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0 z-50">
            <div className="p-3 border-b border-border">
              <p className="text-xs font-semibold text-text-primary truncate">{user?.fullName || 'User'}</p>
              <p className="text-[11px] text-text-muted mt-0.5 truncate">{user?.email || ''}</p>
            </div>
            <div className="p-2">
              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-text-secondary hover:bg-surface-muted hover:text-text-primary transition-colors"
              >
                View Profile
              </Link>
              <Link
                to="/settings"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-text-secondary hover:bg-surface-muted hover:text-text-primary transition-colors"
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-error hover:bg-error-bg transition-colors mt-1"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

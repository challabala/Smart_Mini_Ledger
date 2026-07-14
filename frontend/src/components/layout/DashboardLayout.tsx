import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, ArrowLeftRight, Wallet, BarChart3, User } from 'lucide-react';
import Sidebar from '../ui/Sidebar';
import Navbar from '../ui/Navbar';

const mobileNav = [
  { to: '/',             icon: LayoutDashboard, label: 'Home'     },
  { to: '/transactions', icon: ArrowLeftRight,  label: 'Activity' },
  { to: '/budgets',      icon: Wallet,          label: 'Budgets'  },
  { to: '/analytics',   icon: BarChart3,       label: 'Charts'   },
  { to: '/profile',     icon: User,            label: 'Profile'  },
];

export default function DashboardLayout() {
  return (
    <div className="bg-background text-on-background min-h-screen flex w-full">
      {/* Sidebar (Desktop) */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 flex flex-col min-w-0">
        {/* Top Navbar */}
        <Navbar />

        {/* Dynamic Nested Content */}
        <div className="flex-1 pb-20 md:pb-0">
          <Outlet />
        </div>
      </main>

      {/* Bottom Navigation Bar — Mobile Only */}
      <nav className="bg-white/95 fixed bottom-0 w-full md:hidden z-50 backdrop-blur-xl border-t border-border shadow-elevated">
        <div className="flex justify-around items-center h-16 px-2">
          {mobileNav.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-xl min-w-[52px] transition-all duration-200 ${
                  isActive
                    ? 'text-primary-600'
                    : 'text-text-muted'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`p-1 rounded-lg transition-all duration-200 ${isActive ? 'bg-primary-50' : ''}`}>
                    <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-primary-600' : 'text-text-muted'}`} />
                  </div>
                  <span className={`text-[10px] font-semibold leading-none ${isActive ? 'text-primary-600' : 'text-text-muted'}`}>
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}

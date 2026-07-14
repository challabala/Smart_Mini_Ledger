import { Outlet, NavLink } from 'react-router-dom';
import Sidebar from '../ui/Sidebar';
import Navbar from '../ui/Navbar';

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

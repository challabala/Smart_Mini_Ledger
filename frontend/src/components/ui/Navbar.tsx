import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="bg-surface/80 top-0 sticky z-40 backdrop-blur-md border-b border-outline-variant flex justify-between items-center w-full h-16 px-lg md:pl-8">
      {/* Search Bar */}
      <div className="flex-1 max-w-md focus-within:ring-2 focus-within:ring-primary rounded-lg transition-all duration-200">
        <div className="relative flex items-center w-full h-10 rounded-lg bg-surface-container-lowest border border-outline-variant overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-on-surface-variant">
            <span className="material-symbols-outlined text-sm">search</span>
          </div>
          <input
            className="peer h-full w-full outline-none text-sm text-on-surface bg-transparent font-sans placeholder-on-surface-variant border-none focus:ring-0 focus:outline-none"
            id="search"
            placeholder="Search transactions, budgets..."
            type="text"
          />
        </div>
      </div>

      {/* Actions & Profile */}
      <div className="flex items-center gap-md ml-4">
        <button className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-container flex items-center">
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
  );
}

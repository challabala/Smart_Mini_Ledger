import React, { useState } from 'react';

export default function Settings() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('en');

  const handleToggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <main className="p-margin-mobile md:p-xl max-w-container-max mx-auto pb-3xl md:pb-xl space-y-xl">
      {/* Header */}
      <div>
        <h2 className="font-sans text-headline-lg-mobile md:text-headline-lg font-bold text-on-background">Settings</h2>
        <p className="font-sans text-body-sm text-on-surface-variant mt-xs">Configure application-wide settings and ledger parameters.</p>
      </div>

      <div className="max-w-3xl space-y-md">
        {/* Preference Settings Card */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
          <div className="p-lg border-b border-outline-variant bg-surface-bright/50 flex items-center gap-md">
            <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">settings_suggest</span>
            </div>
            <div>
              <h4 className="font-sans text-headline-sm font-bold text-on-surface">Application Settings</h4>
              <p className="font-sans text-body-sm text-on-surface-variant">General client options</p>
            </div>
          </div>
          <div className="divide-y divide-outline-variant/30">
            {/* Theme Toggle */}
            <div className="flex items-center justify-between p-lg hover:bg-surface-container-low/50 transition-colors">
              <div>
                <p className="font-sans text-body-md text-on-surface font-semibold">Theme Mode</p>
                <p className="font-sans text-body-sm text-on-surface-variant mt-xs">
                  Switch between light and dark themes (Current: {theme === 'light' ? 'Light' : 'Dark'})
                </p>
              </div>
              <button
                onClick={handleToggleTheme}
                className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant text-on-surface px-4 py-2 rounded-lg font-sans text-label-md hover:bg-surface-container transition-colors shadow-sm font-bold active:scale-[0.99]"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {theme === 'light' ? 'dark_mode' : 'light_mode'}
                </span>
                {theme === 'light' ? 'Use Dark' : 'Use Light'}
              </button>
            </div>

            {/* Currency Choice */}
            <div className="flex items-center justify-between p-lg hover:bg-surface-container-low/50 transition-colors">
              <div>
                <p className="font-sans text-body-md text-on-surface font-semibold">Base Currency</p>
                <p className="font-sans text-body-sm text-on-surface-variant mt-xs">Primary currency for ledgers</p>
              </div>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-surface-container-lowest border border-outline-variant text-on-surface px-4 py-2 rounded-lg font-sans text-label-md hover:bg-surface-container outline-none font-semibold focus:ring-2 focus:ring-primary/20"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
              </select>
            </div>

            {/* Language */}
            <div className="flex items-center justify-between p-lg hover:bg-surface-container-low/50 transition-colors">
              <div>
                <p className="font-sans text-body-md text-on-surface font-semibold">Language</p>
                <p className="font-sans text-body-sm text-on-surface-variant mt-xs">Change client translation interface</p>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-surface-container-lowest border border-outline-variant text-on-surface px-4 py-2 rounded-lg font-sans text-label-md hover:bg-surface-container outline-none font-semibold focus:ring-2 focus:ring-primary/20"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Management Section */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
          <div className="p-lg border-b border-outline-variant bg-surface-bright/50 flex items-center gap-md">
            <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center text-error">
              <span className="material-symbols-outlined">delete_forever</span>
            </div>
            <div>
              <h4 className="font-sans text-headline-sm font-bold text-error">Data Management</h4>
              <p className="font-sans text-body-sm text-on-surface-variant">Danger operations</p>
            </div>
          </div>
          <div className="p-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md">
              <div>
                <p className="font-sans text-body-md text-on-surface font-semibold">Clear Ledger History</p>
                <p className="font-sans text-body-sm text-on-surface-variant mt-xs">
                  Permanently delete all transaction entries, budgets, and saved preferences. This action is irreversible.
                </p>
              </div>
              <button className="bg-error/10 hover:bg-error/20 text-error border border-error/20 font-sans text-label-md py-2 px-lg rounded-lg transition-colors flex items-center justify-center gap-sm active:scale-[0.99] font-bold">
                Clear All Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

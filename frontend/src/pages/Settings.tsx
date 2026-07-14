import { useState } from 'react';
import {
  Settings2, Moon, Sun, Coins, Globe2, Bell, Trash2,
  ChevronRight, CheckCircle2, Shield, Palette, Download,
} from 'lucide-react';

type Theme = 'light' | 'dark';

function Toggle({ on, onChange, id }: { on: boolean; onChange: (v: boolean) => void; id?: string }) {
  return (
    <button
      id={id}
      type="button"
      onClick={() => onChange(!on)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 ${on ? 'bg-primary-500' : 'bg-border-muted'}`}
    >
      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${on ? 'right-1' : 'left-1'}`} />
    </button>
  );
}

function SectionHeader({ icon: Icon, iconBg, iconColor, title, description }: {
  icon: React.ElementType; iconBg: string; iconColor: string; title: string; description: string;
}) {
  return (
    <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
      <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center`}>
        <Icon className={`w-4.5 h-4.5 ${iconColor}`} style={{ width: 18, height: 18 }} />
      </div>
      <div>
        <h4 className="text-sm font-bold text-text-primary">{title}</h4>
        <p className="text-xs text-text-muted">{description}</p>
      </div>
    </div>
  );
}

export default function Settings() {
  const SK = 'settings_app';
  const saved = JSON.parse(localStorage.getItem(SK) || '{}');

  const [theme,        setTheme]        = useState<Theme>(saved.theme        || 'light');
  const [currency,     setCurrency]     = useState<string>(saved.currency     || 'USD');
  const [language,     setLanguage]     = useState<string>(saved.language     || 'en');
  const [compactMode,  setCompactMode]  = useState<boolean>(saved.compactMode ?? false);
  const [emailDigest,  setEmailDigest]  = useState<boolean>(saved.emailDigest ?? false);
  const [budgetAlerts, setBudgetAlerts] = useState<boolean>(saved.budgetAlerts ?? true);
  const [savedMsg,     setSavedMsg]     = useState(false);

  const persist = (patch: Record<string, unknown>) => {
    const cur = JSON.parse(localStorage.getItem(SK) || '{}');
    localStorage.setItem(SK, JSON.stringify({ ...cur, ...patch }));
  };

  const handleTheme = (next: Theme) => {
    setTheme(next);
    persist({ theme: next });
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  const handleSave = () => {
    persist({ currency, language, compactMode, emailDigest, budgetAlerts });
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  return (
    <div className="p-4 md:p-6 max-w-[1280px] w-full mx-auto space-y-6 pb-24 md:pb-8 animate-fade-up">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary tracking-tight">Settings</h2>
          <p className="text-sm text-text-muted mt-0.5">Configure application-wide preferences and ledger parameters</p>
        </div>
        <button onClick={handleSave} className="btn-primary py-2.5 px-5 text-sm self-start sm:self-auto">
          {savedMsg ? <><CheckCircle2 className="w-4 h-4" /> Saved!</> : 'Save Settings'}
        </button>
      </div>

      {savedMsg && (
        <div className="flex items-center gap-2 p-3 bg-primary-50 border border-primary-200 rounded-xl text-xs text-primary-700 font-semibold animate-fade-in">
          <CheckCircle2 className="w-4 h-4" /> Settings saved successfully!
        </div>
      )}

      <div className="max-w-3xl space-y-4">

        {/* ── Appearance ── */}
        <div className="bg-white rounded-2xl border border-border shadow-card overflow-hidden">
          <SectionHeader icon={Palette} iconBg="bg-primary-50" iconColor="text-primary-600" title="Appearance" description="Customize how the app looks and feels" />
          <div className="divide-y divide-border">

            {/* Theme */}
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-surface-muted flex items-center justify-center">
                  {theme === 'light' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-500" />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">Theme Mode</p>
                  <p className="text-xs text-text-muted">Currently: <span className="font-medium text-text-secondary">{theme === 'light' ? 'Light' : 'Dark'}</span></p>
                </div>
              </div>
              <div className="flex gap-2">
                {(['light', 'dark'] as Theme[]).map((t) => (
                  <button
                    key={t}
                    id={`theme-${t}`}
                    onClick={() => handleTheme(t)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      theme === t
                        ? 'bg-primary-500 text-white border-primary-500 shadow-primary'
                        : 'border-border text-text-secondary hover:bg-surface-muted'
                    }`}
                  >
                    {t === 'light' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Compact Mode */}
            <div className="flex items-center justify-between px-5 py-4 hover:bg-surface-muted/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-surface-muted flex items-center justify-center">
                  <Settings2 className="w-4 h-4 text-text-muted" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">Compact Mode</p>
                  <p className="text-xs text-text-muted">Reduce spacing for a denser layout</p>
                </div>
              </div>
              <Toggle on={compactMode} onChange={(v) => { setCompactMode(v); persist({ compactMode: v }); }} id="toggle-compact" />
            </div>
          </div>
        </div>

        {/* ── Localization ── */}
        <div className="bg-white rounded-2xl border border-border shadow-card overflow-hidden">
          <SectionHeader icon={Globe2} iconBg="bg-teal-50" iconColor="text-teal-600" title="Localization" description="Language and currency preferences" />
          <div className="divide-y divide-border">
            {[
              {
                icon: Coins, iconBg: 'bg-primary-50', iconColor: 'text-primary-600',
                label: 'Base Currency', sub: 'Primary currency for all calculations',
                id: 'currency-select',
                control: (
                  <select id="currency-select" value={currency} onChange={e => setCurrency(e.target.value)} className="input-field w-32 text-xs">
                    {[['USD','USD ($)'],['INR','INR (₹)'],['EUR','EUR (€)'],['GBP','GBP (£)'],['AUD','AUD (A$)'],['JPY','JPY (¥)'],['SGD','SGD (S$)'],['AED','AED (د.إ)']].map(([v, l]) => (
                      <option key={v} value={v}>{l}</option>
                    ))}
                  </select>
                ),
              },
              {
                icon: Globe2, iconBg: 'bg-accent-50', iconColor: 'text-accent-600',
                label: 'Language', sub: 'Interface display language',
                id: 'language-select',
                control: (
                  <select id="language-select" value={language} onChange={e => setLanguage(e.target.value)} className="input-field w-32 text-xs">
                    {[['en','English'],['es','Español'],['fr','Français'],['de','Deutsch'],['hi','हिन्दी'],['ja','日本語']].map(([v, l]) => (
                      <option key={v} value={v}>{l}</option>
                    ))}
                  </select>
                ),
              },
            ].map(({ icon: Icon, iconBg, iconColor, label, sub, control }) => (
              <div key={label} className="flex items-center justify-between px-5 py-4 hover:bg-surface-muted/40 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl ${iconBg} flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${iconColor}`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{label}</p>
                    <p className="text-xs text-text-muted">{sub}</p>
                  </div>
                </div>
                {control}
              </div>
            ))}
          </div>
        </div>

        {/* ── Notifications ── */}
        <div className="bg-white rounded-2xl border border-border shadow-card overflow-hidden">
          <SectionHeader icon={Bell} iconBg="bg-warning-bg" iconColor="text-amber-600" title="Notifications" description="Control how and when you get notified" />
          <div className="divide-y divide-border">
            {[
              { icon: Bell, iconBg: 'bg-accent-50', iconColor: 'text-accent-600', label: 'Email Digest', sub: 'Weekly spending summary via email', val: emailDigest, set: (v: boolean) => { setEmailDigest(v); persist({ emailDigest: v }); }, id: 'toggle-digest' },
              { icon: Shield, iconBg: 'bg-warning-bg', iconColor: 'text-amber-600', label: 'Budget Alerts', sub: 'Alert when category limit is reached', val: budgetAlerts, set: (v: boolean) => { setBudgetAlerts(v); persist({ budgetAlerts: v }); }, id: 'toggle-budget-alerts' },
            ].map(({ icon: Icon, iconBg, iconColor, label, sub, val, set, id }) => (
              <div key={label} className="flex items-center justify-between px-5 py-4 hover:bg-surface-muted/40 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl ${iconBg} flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${iconColor}`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{label}</p>
                    <p className="text-xs text-text-muted">{sub}</p>
                  </div>
                </div>
                <Toggle on={val} onChange={set} id={id} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Data Management ── */}
        <div className="bg-white rounded-2xl border border-border shadow-card overflow-hidden">
          <SectionHeader icon={Download} iconBg="bg-surface-muted" iconColor="text-text-muted" title="Data Management" description="Export or clear your ledger data" />
          <div className="divide-y divide-border">
            <div className="flex items-center justify-between px-5 py-4 hover:bg-surface-muted/40 transition-colors">
              <div>
                <p className="text-sm font-semibold text-text-primary">Export Data</p>
                <p className="text-xs text-text-muted">Download all your transactions as CSV</p>
              </div>
              <button id="export-btn" className="btn-secondary py-2 px-4 text-xs">
                <Download className="w-3.5 h-3.5" /> Export CSV
              </button>
            </div>
            <div className="flex items-center justify-between px-5 py-4 bg-error-bg/30">
              <div>
                <p className="text-sm font-semibold text-error">Clear All Data</p>
                <p className="text-xs text-text-muted mt-0.5">Permanently delete all transactions, budgets and preferences. This is irreversible.</p>
              </div>
              <button
                id="clear-data-btn"
                onClick={() => {
                  if (window.confirm('Are you absolutely sure? This will permanently delete all your data.')) {
                    alert('Data cleared (simulation only).');
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-error border border-error/30 hover:bg-error-bg transition-all whitespace-nowrap"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear Data
              </button>
            </div>
          </div>
        </div>

        {/* App Version */}
        <div className="text-center py-2">
          <p className="text-xs text-text-muted">Smart Mini Ledger · v1.0.0 · Premium Edition</p>
        </div>
      </div>
    </div>
  );
}

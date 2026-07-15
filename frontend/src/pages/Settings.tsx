import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import {
  Palette, Sun, Moon, Monitor, Lock, Eye, EyeOff,
  CheckCircle2, Camera, Upload, X, Calendar, LogOut,
  AlertTriangle, Shield, AppWindow,
} from 'lucide-react';

type ThemeMode = 'light' | 'dark' | 'system';

const SK = 'settings_app';

// ─── Section Header ──────────────────────────────────────────────────────────
function SectionHeader({ icon: Icon, iconBg, iconColor, title, description }: {
  icon: React.ElementType; iconBg: string; iconColor: string; title: string; description: string;
}) {
  return (
    <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
      <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center`}>
        <Icon className={`${iconColor}`} style={{ width: 18, height: 18 }} />
      </div>
      <div>
        <h4 className="text-sm font-bold text-text-primary">{title}</h4>
        <p className="text-xs text-text-muted">{description}</p>
      </div>
    </div>
  );
}

// ─── Password Strength ───────────────────────────────────────────────────────
function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: 'At least 8 chars', pass: password.length >= 8 },
    { label: 'Uppercase letter', pass: /[A-Z]/.test(password) },
    { label: 'Number', pass: /[0-9]/.test(password) },
    { label: 'Special char', pass: /[^A-Za-z0-9]/.test(password) },
  ];
  const score = checks.filter(c => c.pass).length;
  const barColor = score <= 1 ? 'bg-error' : score <= 2 ? 'bg-warning' : score <= 3 ? 'bg-accent-500' : 'bg-primary-500';
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];

  if (!password) return null;

  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= score ? barColor : 'bg-border'}`} />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-3 flex-wrap">
          {checks.map((c) => (
            <span key={c.label} className={`text-[10px] font-medium flex items-center gap-0.5 ${c.pass ? 'text-primary-600' : 'text-text-muted'}`}>
              {c.pass ? <CheckCircle2 className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full border border-border-muted" />}
              {c.label}
            </span>
          ))}
        </div>
        <span className={`text-[11px] font-bold ${barColor.replace('bg-', 'text-')}`}>{labels[score]}</span>
      </div>
    </div>
  );
}

// ─── Settings Page ───────────────────────────────────────────────────────────
export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Appearance ───────────────────────────────────────────────────────────
  const savedSettings = JSON.parse(localStorage.getItem(SK) || '{}');
  const [themeMode, setThemeMode] = useState<ThemeMode>(savedSettings.themeMode || theme);

  useEffect(() => {
    if (themeMode === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      setTheme(mq.matches ? 'dark' : 'light');
      const handler = (e: MediaQueryListEvent) => setTheme(e.matches ? 'dark' : 'light');
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
    setTheme(themeMode);
  }, [themeMode, setTheme]);

  const handleThemeMode = (mode: ThemeMode) => {
    setThemeMode(mode);
    const cur = JSON.parse(localStorage.getItem(SK) || '{}');
    localStorage.setItem(SK, JSON.stringify({ ...cur, themeMode: mode }));
  };

  // ── Security ─────────────────────────────────────────────────────────────
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showCurPw, setShowCurPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConPw, setShowConPw] = useState(false);
  const [pwSaving, setPwSaving] = useState(false);

  const handlePasswordChange = () => {
    if (!currentPw) { toast.error('Current password is required.'); return; }
    if (newPw.length < 8) { toast.error('New password must be at least 8 characters.'); return; }
    if (newPw !== confirmPw) { toast.error('New passwords do not match.'); return; }
    setPwSaving(true);
    setTimeout(() => {
      toast.success('Password changed successfully!');
      setCurrentPw(''); setNewPw(''); setConfirmPw('');
      setPwSaving(false);
    }, 800);
  };

  // ── Profile (Avatar) ─────────────────────────────────────────────────────
  const avatarKey = user?.id ? `avatar_${user.id}` : 'avatar_guest';
  const [avatar, setAvatar] = useState<string | null>(() => localStorage.getItem(avatarKey));
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const [avatarUploading, setAvatarUploading] = useState(false);

  const handleAvatarChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setAvatarError('Only image files are allowed.'); return; }
    if (file.size > 5 * 1024 * 1024) { setAvatarError('Image must be under 5MB.'); return; }
    setAvatarError(null);
    setAvatarUploading(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const b64 = ev.target?.result as string;
      localStorage.setItem(avatarKey, b64);
      setAvatar(b64);
      setAvatarUploading(false);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }, [avatarKey]);

  const removeAvatar = () => {
    localStorage.removeItem(avatarKey);
    setAvatar(null);
  };

  // ── Account ──────────────────────────────────────────────────────────────
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString([], { month: 'long', year: 'numeric' })
    : 'N/A';

  const initials = user?.fullName
    ? user.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <div className="p-4 md:p-6 max-w-[1280px] w-full mx-auto space-y-6 pb-24 md:pb-8 animate-fade-up">

      {/* ── Header ── */}
      <div>
        <h2 className="text-2xl font-bold text-text-primary tracking-tight">Settings</h2>
        <p className="text-sm text-text-muted mt-0.5">Manage your preferences and account</p>
      </div>

      <div className="max-w-3xl space-y-5">

        {/* ── Appearance ──────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-border shadow-card overflow-hidden">
          <SectionHeader icon={Palette} iconBg="bg-primary-50" iconColor="text-primary-600" title="Appearance" description="Customize how the app looks and feels" />
          <div className="px-5 py-4">
            <p className="text-xs font-semibold text-text-secondary mb-3">Theme</p>
            <div className="grid grid-cols-3 gap-2">
              {([
                { mode: 'light' as ThemeMode, icon: Sun, label: 'Light', color: 'text-amber-500' },
                { mode: 'dark' as ThemeMode, icon: Moon, label: 'Dark', color: 'text-indigo-500' },
                { mode: 'system' as ThemeMode, icon: Monitor, label: 'System', color: 'text-text-muted' },
              ]).map(({ mode, icon: Icon, label, color }) => (
                <button
                  key={mode}
                  onClick={() => handleThemeMode(mode)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${
                    themeMode === mode
                      ? 'border-primary-500 bg-primary-50 shadow-primary'
                      : 'border-border hover:border-border-muted hover:bg-surface-muted'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${themeMode === mode ? 'text-primary-600' : color}`} />
                  <span className={`text-xs font-semibold ${themeMode === mode ? 'text-primary-600' : 'text-text-secondary'}`}>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Security ────────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-border shadow-card overflow-hidden">
          <SectionHeader icon={Shield} iconBg="bg-accent-50" iconColor="text-accent-600" title="Security" description="Keep your account secure" />
          <div className="p-5 space-y-4">
            {[
              { label: 'Current Password', val: currentPw, set: setCurrentPw, show: showCurPw, setShow: setShowCurPw, id: 'current-pw' },
              { label: 'New Password', val: newPw, set: setNewPw, show: showNewPw, setShow: setShowNewPw, id: 'new-pw' },
              { label: 'Confirm Password', val: confirmPw, set: setConfirmPw, show: showConPw, setShow: setShowConPw, id: 'confirm-pw' },
            ].map(({ label, val, set, show, setShow, id }) => (
              <div key={id}>
                <label className="text-xs font-semibold text-text-secondary mb-1.5 block">{label}</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input
                      id={id} type={show ? 'text' : 'password'} value={val}
                    onChange={e => set(e.target.value)}
                    placeholder="••••••••"
                    className="input-field pl-9 pr-10"
                  />
                  <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary">
                    {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {id === 'new-pw' && <PasswordStrength password={newPw} />}
              </div>
            ))}
            <button onClick={handlePasswordChange} disabled={pwSaving} className="btn-primary py-2.5 px-5 text-sm">
              {pwSaving ? (
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : 'Update Password'}
            </button>
          </div>
        </div>

        {/* ── Profile ─────────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-border shadow-card overflow-hidden">
          <SectionHeader icon={Camera} iconBg="bg-primary-50" iconColor="text-primary-600" title="Profile Photo" description="Upload or change your profile picture" />
          <div className="px-5 py-5">
            <div className="flex items-center gap-5">
              <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-full ring-4 ring-primary-100 overflow-hidden bg-gradient-primary flex items-center justify-center">
                  {avatar ? (
                    <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white text-xl font-bold">{initials}</span>
                  )}
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={avatarUploading}
                  className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary-500 hover:bg-primary-600 text-white flex items-center justify-center shadow-primary transition-all active:scale-95"
                  title="Change photo"
                >
                  {avatarUploading ? (
                    <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (
                    <Camera className="w-3.5 h-3.5" />
                  )}
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-text-primary">{user?.fullName || 'User'}</p>
                <p className="text-xs text-text-muted mt-0.5 truncate">{user?.email || ''}</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => fileInputRef.current?.click()} className="btn-primary py-1.5 px-3 text-xs">
                    <Upload className="w-3.5 h-3.5" /> Upload
                  </button>
                  {avatar && (
                    <button onClick={removeAvatar} className="btn-secondary py-1.5 px-3 text-xs text-error hover:bg-error-bg hover:border-error/30">
                      <X className="w-3.5 h-3.5" /> Remove
                    </button>
                  )}
                </div>
                {avatarError && (
                  <p className="text-[11px] text-error mt-2 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> {avatarError}
                  </p>
                )}
                <p className="text-[10px] text-text-muted mt-2">JPG, PNG, GIF up to 5MB</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Account ─────────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-border shadow-card overflow-hidden">
          <SectionHeader icon={AppWindow} iconBg="bg-surface-muted" iconColor="text-text-muted" title="Account" description="Your account details and session" />
          <div className="divide-y divide-border">
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-surface-muted flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-text-muted" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">Member Since</p>
                  <p className="text-xs text-text-muted">Account creation date</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-text-secondary">{memberSince}</span>
            </div>
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-error-bg flex items-center justify-center">
                  <LogOut className="w-4 h-4 text-error" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">Sign Out</p>
                  <p className="text-xs text-text-muted">End your current session</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-error border border-error/30 hover:bg-error-bg transition-all duration-200"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
            </div>
          </div>
        </div>

        {/* ── About ───────────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-border shadow-card overflow-hidden">
          <SectionHeader icon={AppWindow} iconBg="bg-info-bg" iconColor="text-accent-600" title="About" description="Application information" />
          <div className="divide-y divide-border">
            {[
              { label: 'Application', value: 'Smart Mini Ledger' },
              { label: 'Version', value: 'v1.0.0' },
              { label: 'Environment', value: import.meta.env.MODE || 'development' },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between px-5 py-3.5">
                <span className="text-sm text-text-muted">{label}</span>
                <span className="text-sm font-semibold text-text-secondary">{value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

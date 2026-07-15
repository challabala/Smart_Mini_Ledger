import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import {
  Camera, Mail, User, Phone, Globe, Coins, Clock,
  Lock, Eye, EyeOff, LogOut, CheckCircle2, AlertTriangle,
  Calendar, Upload, X,
} from 'lucide-react';



// ─── Password Strength ────────────────────────────────────────────────────────
function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: 'At least 8 chars', pass: password.length >= 8 },
    { label: 'Uppercase letter', pass: /[A-Z]/.test(password) },
    { label: 'Number',           pass: /[0-9]/.test(password) },
    { label: 'Special char',     pass: /[^A-Za-z0-9]/.test(password) },
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

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Avatar ────────────────────────────────────────────────────────────────
  const avatarKey = user?.id ? `avatar_${user.id}` : 'avatar_guest';
  const [avatar, setAvatar] = useState<string | null>(() => localStorage.getItem(avatarKey));
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const [avatarUploading, setAvatarUploading] = useState(false);

  const handleAvatarChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setAvatarError('Only image files are allowed.'); return; }
    if (file.size > 5 * 1024 * 1024)     { setAvatarError('Image must be under 5MB.'); return; }
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

  // ── Profile form ─────────────────────────────────────────────────────────
  const profileKey = user?.id ? `profile_${user.id}` : 'profile_guest';
  const saved = JSON.parse(localStorage.getItem(profileKey) || '{}');
  const [phone,    setPhone]    = useState<string>(saved.phone    || '');
  const [country,  setCountry]  = useState<string>(saved.country  || '');
  const [currency, setCurrency] = useState<string>(saved.currency || 'USD');
  const [timezone, setTimezone] = useState<string>(saved.timezone || 'UTC');
  const [profileSaving, setProfileSaving] = useState(false);

  const saveProfile = () => {
    setProfileSaving(true);
    setTimeout(() => {
      localStorage.setItem(profileKey, JSON.stringify({ phone, country, currency, timezone }));
      toast.success('Profile updated successfully!');
      setProfileSaving(false);
    }, 600);
  };

  // ── Password ──────────────────────────────────────────────────────────────
  const [currentPw,  setCurrentPw]  = useState('');
  const [newPw,      setNewPw]      = useState('');
  const [confirmPw,  setConfirmPw]  = useState('');
  const [showCurPw,  setShowCurPw]  = useState(false);
  const [showNewPw,  setShowNewPw]  = useState(false);
  const [showConPw,  setShowConPw]  = useState(false);
  const [pwSaving,   setPwSaving]   = useState(false);

  const handlePasswordChange = () => {
    if (!currentPw)          { toast.error('Current password is required.'); return; }
    if (newPw.length < 8)    { toast.error('New password must be at least 8 characters.'); return; }
    if (newPw !== confirmPw) { toast.error('New passwords do not match.'); return; }
    setPwSaving(true);
    setTimeout(() => {
      toast.success('Password changed successfully!');
      setCurrentPw(''); setNewPw(''); setConfirmPw('');
      setPwSaving(false);
    }, 800);
  };



  // ── Logout ────────────────────────────────────────────────────────────────
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const initials = user?.fullName
    ? user.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString([], { month: 'long', year: 'numeric' })
    : 'Jan 2024';

  return (
    <div className="p-4 md:p-6 max-w-[1280px] w-full mx-auto space-y-6 pb-24 md:pb-8 animate-fade-up">

      {/* ── Header ── */}
      <div>
        <h2 className="text-2xl font-bold text-text-primary tracking-tight">Profile & Preferences</h2>
        <p className="text-sm text-text-muted mt-0.5">Manage your personal information and application settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* ── Left Column ── */}
        <div className="lg:col-span-4 flex flex-col gap-4">

          {/* Avatar Card */}
          <div className="bg-white rounded-2xl border border-border shadow-card p-6 flex flex-col items-center text-center">
            <div className="relative mb-4">
              {/* Avatar ring */}
              <div className="w-24 h-24 rounded-full ring-4 ring-primary-100 overflow-hidden bg-gradient-primary flex items-center justify-center">
                {avatar ? (
                  <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white text-2xl font-bold">{initials}</span>
                )}
              </div>
              {/* Upload button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={avatarUploading}
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary-500 hover:bg-primary-600 text-white flex items-center justify-center shadow-primary transition-all active:scale-95"
                title="Change photo"
              >
                {avatarUploading ? (
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <Camera className="w-4 h-4" />
                )}
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} id="avatar-input" />
            </div>

            {avatarError && (
              <p className="text-xs text-error mb-2 flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" />{avatarError}</p>
            )}

            <h3 className="text-lg font-bold text-text-primary">{user?.fullName || 'User'}</h3>
            <p className="text-sm text-text-muted">{user?.email || ''}</p>

            <div className="flex gap-2 mt-4 w-full">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn-primary flex-1 py-2 text-xs"
              >
                <Upload className="w-3.5 h-3.5" /> Upload Photo
              </button>
              {avatar && (
                <button onClick={removeAvatar} className="p-2 rounded-xl border border-border text-text-muted hover:text-error hover:border-error hover:bg-error-bg transition-all" title="Remove photo">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <p className="text-[10px] text-text-muted mt-2">JPG, PNG, GIF up to 5MB</p>

            {/* Member Since */}
            <div className="w-full mt-5 pt-5 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-text-muted">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="text-xs font-semibold uppercase tracking-wide">Member Since</span>
                </div>
                <span className="text-xs font-semibold text-text-secondary">{memberSince}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Column ── */}
        <div className="lg:col-span-8 flex flex-col gap-4">

          {/* Personal Information */}
          <div className="bg-white rounded-2xl border border-border shadow-card overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
              <div className="w-8 h-8 rounded-xl bg-primary-50 flex items-center justify-center">
                <User className="w-4 h-4 text-primary-600" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-text-primary">Personal Information</h4>
                <p className="text-xs text-text-muted">Update your profile details</p>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-text-secondary mb-1.5 block">Full Name</label>
                  <div className="input-field flex items-center gap-2 bg-surface-muted cursor-not-allowed">
                    <User className="w-4 h-4 text-text-muted shrink-0" />
                    <span className="text-sm text-text-muted">{user?.fullName || 'User'}</span>
                  </div>
                  <p className="text-[10px] text-text-muted mt-1">Name is managed by your account</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-text-secondary mb-1.5 block">Email Address</label>
                  <div className="input-field flex items-center gap-2 bg-surface-muted cursor-not-allowed">
                    <Mail className="w-4 h-4 text-text-muted shrink-0" />
                    <span className="text-sm text-text-muted truncate">{user?.email || ''}</span>
                  </div>
                  <p className="text-[10px] text-text-muted mt-1">Email is managed by your account</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-text-secondary mb-1.5 block">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 (555) 000-0000" className="input-field pl-9" id="phone-input" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-text-secondary mb-1.5 block">Country</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <select value={country} onChange={e => setCountry(e.target.value)} className="input-field pl-9" id="country-select">
                      <option value="">Select country…</option>
                      {['India','United States','United Kingdom','Canada','Australia','Germany','France','Singapore','UAE','Other'].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-text-secondary mb-1.5 block">Currency</label>
                  <div className="relative">
                    <Coins className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <select value={currency} onChange={e => setCurrency(e.target.value)} className="input-field pl-9" id="currency-select">
                      {['USD','INR','EUR','GBP','AUD','CAD','SGD','AED'].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-text-secondary mb-1.5 block">Timezone</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <select value={timezone} onChange={e => setTimezone(e.target.value)} className="input-field pl-9" id="timezone-select">
                      {['UTC','Asia/Kolkata','America/New_York','America/Los_Angeles','Europe/London','Europe/Paris','Asia/Singapore','Asia/Dubai'].map(tz => (
                        <option key={tz} value={tz}>{tz}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <button onClick={saveProfile} disabled={profileSaving} className="btn-primary py-2.5 px-5 text-sm">
                {profileSaving ? (
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : 'Save Changes'}
              </button>
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-2xl border border-border shadow-card overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
              <div className="w-8 h-8 rounded-xl bg-accent-50 flex items-center justify-center">
                <Lock className="w-4 h-4 text-accent-600" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-text-primary">Change Password</h4>
                <p className="text-xs text-text-muted">Keep your account safe with a strong password</p>
              </div>
            </div>
            <div className="p-5 space-y-4">
              {[
                { label: 'Current Password', val: currentPw, set: setCurrentPw, show: showCurPw, setShow: setShowCurPw, id: 'current-pw' },
                { label: 'New Password',     val: newPw,     set: setNewPw,     show: showNewPw, setShow: setShowNewPw, id: 'new-pw' },
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



          {/* Danger Zone */}
          <div className="flex justify-end pt-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-error border border-error/30 hover:bg-error-bg transition-all duration-200"
              id="logout-btn"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

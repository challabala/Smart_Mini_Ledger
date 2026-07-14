import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Lock, Eye, EyeOff, TrendingUp, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { authApi } from '../../api/auth';

const registerSchema = z.object({
  fullName:        z.string().min(2, 'Full name must be at least 2 characters'),
  email:           z.string().min(1, 'Email is required').email('Invalid email address'),
  password:        z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine(d => d.password === d.confirmPassword, {
  message: 'Passwords do not match', path: ['confirmPassword'],
});
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch('password', '');

  const onSubmit = async (data: RegisterFormValues) => {
    setApiError(null);
    setIsLoading(true);
    try {
      const response = await authApi.register({ fullName: data.fullName, email: data.email, password: data.password });
      if (response.success) {
        toast.success('Account created! Please sign in.');
        navigate('/login');
      } else {
        setApiError(response.message || 'Registration failed.');
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Registration failed. Email might already be in use.';
      setApiError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    'Track every income and expense',
    'Set monthly budget limits per category',
    'Visual analytics and cash flow charts',
    'Financial health score monitoring',
  ];

  return (
    <div className="min-h-screen flex items-stretch">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-[45%] bg-gradient-primary relative overflow-hidden flex-col items-center justify-center p-12">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.2) 0%, transparent 40%)'
        }} />
        <div className="relative z-10 text-white">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black mb-3">Join Smart Mini Ledger</h1>
          <p className="text-white/80 text-sm leading-relaxed mb-8">Start your journey to financial clarity today.</p>
          <div className="space-y-3">
            {features.map((f) => (
              <div key={f} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm text-white/90">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background overflow-y-auto">
        <div className="w-full max-w-[420px] py-8 animate-fade-up">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-xl bg-gradient-primary flex items-center justify-center shadow-primary">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold text-text-primary">Smart Mini Ledger</span>
          </div>

          <h2 className="text-2xl font-black text-text-primary tracking-tight mb-1">Create account</h2>
          <p className="text-sm text-text-muted mb-8">Join thousands managing their finances smarter.</p>

          {apiError && (
            <div className="flex items-center gap-2 p-3 bg-error-bg border border-red-200 rounded-xl text-xs text-error font-medium mb-5 animate-fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" /> {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="text-xs font-semibold text-text-secondary mb-1.5 block" htmlFor="fullName">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                <input id="fullName" type="text" placeholder="Jane Doe" {...register('fullName')} className={`input-field pl-9 ${errors.fullName ? 'border-error ring-2 ring-error/10' : ''}`} />
              </div>
              {errors.fullName && <p className="text-xs text-error mt-1.5 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.fullName.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-semibold text-text-secondary mb-1.5 block" htmlFor="reg-email">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                <input id="reg-email" type="email" placeholder="jane@example.com" {...register('email')} className={`input-field pl-9 ${errors.email ? 'border-error ring-2 ring-error/10' : ''}`} />
              </div>
              {errors.email && <p className="text-xs text-error mt-1.5 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-semibold text-text-secondary mb-1.5 block" htmlFor="reg-password">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                <input id="reg-password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" {...register('password')} className={`input-field pl-9 pr-10 ${errors.password ? 'border-error ring-2 ring-error/10' : ''}`} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-error mt-1.5 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.password.message}</p>}
              {/* Simple strength bar */}
              {password && (
                <div className="mt-2 flex gap-1">
                  {[1, 2, 3, 4].map((i) => {
                    const score = [password.length >= 6, /[A-Z]/.test(password), /[0-9]/.test(password), /[^A-Za-z0-9]/.test(password)].filter(Boolean).length;
                    return <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= score ? (score <= 2 ? 'bg-warning' : 'bg-primary-500') : 'bg-border'}`} />;
                  })}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-xs font-semibold text-text-secondary mb-1.5 block" htmlFor="confirmPassword">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                <input id="confirmPassword" type={showConfirm ? 'text' : 'password'} placeholder="••••••••" {...register('confirmPassword')} className={`input-field pl-9 pr-10 ${errors.confirmPassword ? 'border-error ring-2 ring-error/10' : ''}`} />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors">
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-xs text-error mt-1.5 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.confirmPassword.message}</p>}
            </div>

            <button type="submit" disabled={isLoading} className="btn-primary w-full py-3 text-sm" id="register-submit">
              {isLoading ? (
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : <>Create Account <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <p className="text-center text-xs text-text-muted mt-6">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-700 transition-colors">Sign in</Link>
          </p>
          <p className="text-center text-[10px] text-text-muted mt-4 leading-relaxed">
            By creating an account, you agree to our{' '}
            <a href="#" onClick={e => e.preventDefault()} className="underline hover:text-primary-600">Terms</a> and{' '}
            <a href="#" onClick={e => e.preventDefault()} className="underline hover:text-primary-600">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

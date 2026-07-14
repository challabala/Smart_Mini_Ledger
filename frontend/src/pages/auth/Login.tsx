import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, Eye, EyeOff, TrendingUp, ArrowRight, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { authApi } from '../../api/auth';

const loginSchema = z.object({
  email:    z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});
type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setApiError(null);
    setIsLoading(true);
    try {
      const response = await authApi.login(data);
      if (response.success && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        toast.success(`Welcome back, ${response.data.user?.fullName?.split(' ')[0] || 'there'}! 👋`);
        navigate('/');
        window.dispatchEvent(new Event('auth:login'));
      } else {
        setApiError(response.message || 'Login failed. Please check credentials.');
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Invalid email or password';
      setApiError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-stretch">
      {/* Left panel – decorative */}
      <div className="hidden lg:flex lg:w-[45%] bg-gradient-primary relative overflow-hidden flex-col items-center justify-center p-12">
        {/* Mesh overlay */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.2) 0%, transparent 40%)'
        }} />
        <div className="relative z-10 text-center text-white">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black mb-3">Smart Mini Ledger</h1>
          <p className="text-white/80 text-sm leading-relaxed max-w-xs">
            Your premium personal finance dashboard. Track every transaction, set smart budgets, and grow your wealth.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { label: 'Users',       value: '10K+' },
              { label: 'Tracked',     value: '$2M+' },
              { label: 'Saved',       value: '18%' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                <p className="text-xl font-black">{value}</p>
                <p className="text-xs text-white/70 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel – form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-[400px] animate-fade-up">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-xl bg-gradient-primary flex items-center justify-center shadow-primary">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold text-text-primary">Smart Mini Ledger</span>
          </div>

          <h2 className="text-2xl font-black text-text-primary tracking-tight mb-1">Sign in</h2>
          <p className="text-sm text-text-muted mb-8">Welcome back! Enter your credentials to continue.</p>

          {apiError && (
            <div className="flex items-center gap-2 p-3 bg-error-bg border border-red-200 rounded-xl text-xs text-error font-medium mb-5 animate-fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" /> {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-xs font-semibold text-text-secondary mb-1.5 block" htmlFor="email">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                <input
                  id="email" type="email" placeholder="name@company.com"
                  {...register('email')}
                  className={`input-field pl-9 ${errors.email ? 'border-error ring-2 ring-error/10' : ''}`}
                />
              </div>
              {errors.email && <p className="text-xs text-error mt-1.5 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-text-secondary" htmlFor="password">Password</label>
                <a href="#" onClick={e => e.preventDefault()} className="text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                <input
                  id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••"
                  {...register('password')}
                  className={`input-field pl-9 pr-10 ${errors.password ? 'border-error ring-2 ring-error/10' : ''}`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-error mt-1.5 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.password.message}</p>}
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2.5">
              <input id="remember-me" type="checkbox" className="w-4 h-4 rounded border-border text-primary-500 focus:ring-primary-500 cursor-pointer" />
              <label htmlFor="remember-me" className="text-xs text-text-muted cursor-pointer">Remember me for 30 days</label>
            </div>

            {/* Submit */}
            <button
              type="submit" disabled={isLoading}
              className="btn-primary w-full py-3 text-sm"
              id="login-submit"
            >
              {isLoading ? (
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <>Sign In to Dashboard <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-text-muted mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-primary-600 hover:text-primary-700 transition-colors">
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

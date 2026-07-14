import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authApi } from '../../api/auth';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormValues) => {
    setApiError(null);
    setIsLoading(true);
    try {
      const response = await authApi.login(data);
      if (response.success && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        // Redirect to dashboard
        navigate('/');
        // Trigger local storage auth update event
        window.dispatchEvent(new Event('auth:login'));
      } else {
        setApiError(response.message || 'Login failed. Please check credentials.');
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Invalid email or password';
      setApiError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-margin-mobile md:p-lg antialiased bg-[#eaf1ff] relative overflow-hidden w-full">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-cover pointer-events-none z-0" style={{
        backgroundImage: `radial-gradient(circle at top left, #ffffff 0%, transparent 40%), radial-gradient(circle at bottom right, #d3e4fe 0%, transparent 40%)`
      }} />

      <div className="w-full max-w-[420px] relative z-10">
        {/* Logo Area */}
        <div className="text-center mb-xl flex flex-col items-center">
          <div className="w-16 h-16 bg-primary rounded-xl mb-md flex items-center justify-center shadow-lg">
            <span className="material-symbols-outlined text-on-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              account_balance
            </span>
          </div>
          <h1 className="font-sans text-headline-lg font-bold text-on-surface">Smart Mini Ledger</h1>
          <p className="font-sans text-body-sm text-on-surface-variant mt-xs">Premium FinTech, simplified.</p>
        </div>

        {/* Login Card */}
        <div className="glass-card rounded-2xl p-xl bg-white/85 border border-white/30 backdrop-blur-md shadow-ambient">
          {apiError && (
            <div className="p-md rounded-lg bg-error-container/20 border border-error/20 text-error font-sans text-body-sm mb-md flex items-start gap-xs">
              <span className="material-symbols-outlined text-[18px] mt-[2px]">error</span>
              <span>{apiError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-lg">
            {/* Email Field */}
            <div>
              <label className="block font-sans text-label-md text-on-surface mb-sm" htmlFor="email">
                Email Address
              </label>
              <div className="relative group border border-outline-variant rounded-lg bg-surface-container-lowest overflow-hidden flex items-center h-[48px] px-md focus-within:ring-2 focus-within:ring-primary/15 focus-within:border-primary transition-all duration-200">
                <span className="material-symbols-outlined text-outline mr-sm">
                  mail
                </span>
                <input
                  className="w-full bg-transparent border-none p-0 font-sans text-body-md text-on-surface placeholder-outline focus:ring-0 focus:outline-none"
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="text-error font-sans text-body-sm mt-xs">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-sm">
                <label className="block font-sans text-label-md text-on-surface" htmlFor="password">
                  Password
                </label>
                <a href="#" className="font-sans text-label-sm text-primary hover:text-on-primary-fixed-variant transition-colors" onClick={(e) => e.preventDefault()}>
                  Forgot Password?
                </a>
              </div>
              <div className="relative group border border-outline-variant rounded-lg bg-surface-container-lowest overflow-hidden flex items-center h-[48px] px-md focus-within:ring-2 focus-within:ring-primary/15 focus-within:border-primary transition-all duration-200">
                <span className="material-symbols-outlined text-outline mr-sm">
                  lock
                </span>
                <input
                  className="w-full bg-transparent border-none p-0 font-sans text-body-md text-on-surface placeholder-outline focus:ring-0 focus:outline-none"
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password')}
                />
                <button
                  className="text-outline hover:text-on-surface transition-colors ml-sm focus:outline-none flex items-center"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? 'visibility' : 'visibility_off'}
                  </span>
                </button>
              </div>
              {errors.password && (
                <p className="text-error font-sans text-body-sm mt-xs">{errors.password.message}</p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary bg-surface-container-lowest cursor-pointer"
                id="remember-me"
                type="checkbox"
              />
              <label className="ml-sm block font-sans text-body-sm text-on-surface-variant cursor-pointer" htmlFor="remember-me">
                Remember me for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <button
              className="w-full h-[48px] flex justify-center items-center rounded-lg bg-primary text-on-primary font-sans text-label-md hover:bg-on-primary-fixed-variant shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-200 active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-xs">
                  <svg className="animate-spin h-5 w-5 text-on-primary" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing In...
                </span>
              ) : (
                <>
                  Sign In to Dashboard
                  <span className="material-symbols-outlined ml-sm text-[20px]">
                    arrow_forward
                  </span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Links */}
        <div className="mt-lg text-center">
          <p className="font-sans text-body-sm text-on-surface-variant">
            Don't have an account?{' '}
            <Link className="font-sans text-label-md text-primary hover:text-on-primary-fixed-variant transition-colors" to="/register">
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

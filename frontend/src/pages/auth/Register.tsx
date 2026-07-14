import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authApi } from '../../api/auth';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters long'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string().min(1, 'Please confirm your password')
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Register() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setApiError(null);
    setIsLoading(true);
    try {
      const response = await authApi.register({
        fullName: data.fullName,
        email: data.email,
        password: data.password
      });

      if (response.success) {
        // Redirect to login screen
        navigate('/login');
      } else {
        setApiError(response.message || 'Registration failed.');
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Registration failed. Email might already be in use.';
      setApiError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex items-center justify-center p-md antialiased select-none selection:bg-primary-container selection:text-on-primary-container relative w-full">
      {/* Decorative Gradients */}
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-surface-container-highest rounded-full mix-blend-multiply filter blur-3xl opacity-50 z-[-1]"></div>
      <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-primary-fixed rounded-full mix-blend-multiply filter blur-3xl opacity-50 z-[-1]"></div>

      <main className="w-full max-w-lg relative z-10">
        {/* Registration Card */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/50 p-xl md:p-3xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05),0_8px_10px_-6px_rgba(0,0,0,0.01)] backdrop-blur-sm relative overflow-hidden">
          {/* Subtle Top Accent Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-80"></div>
          
          {/* Header Section */}
          <div className="flex flex-col items-center text-center mb-xl">
            {/* Brand Icon */}
            <div className="h-12 w-12 bg-surface-container rounded-xl flex items-center justify-center mb-md border border-outline-variant/30 shadow-sm">
              <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                account_balance_wallet
              </span>
            </div>
            {/* Title & Subtitle */}
            <h1 className="font-sans text-headline-lg-mobile md:text-headline-lg text-on-surface mb-xs tracking-tight">Create an account</h1>
            <p className="font-sans text-body-md text-on-surface-variant">Join Smart Mini Ledger to manage your finances securely.</p>
          </div>

          {apiError && (
            <div className="p-md rounded-lg bg-error-container/20 border border-error/20 text-error font-sans text-body-sm mb-md flex items-start gap-xs">
              <span className="material-symbols-outlined text-[18px] mt-[2px]">error</span>
              <span>{apiError}</span>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-md">
            {/* Full Name Field */}
            <div>
              <label className="block font-sans text-label-md text-on-surface mb-xs" htmlFor="fullName">Full Name</label>
              <div className="relative group border border-outline-variant rounded-lg bg-surface-bright overflow-hidden flex items-center h-[40px] px-sm focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-200 shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-sm flex items-center pointer-events-none text-outline group-focus-within:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[20px]">person</span>
                </div>
                <input
                  className="w-full h-full pl-[36px] bg-transparent border-none p-0 font-sans text-body-md text-on-surface placeholder:text-outline/70 focus:ring-0 focus:outline-none"
                  id="fullName"
                  placeholder="Jane Doe"
                  type="text"
                  {...register('fullName')}
                />
              </div>
              {errors.fullName && (
                <p className="text-error font-sans text-body-sm mt-xs">{errors.fullName.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block font-sans text-label-md text-on-surface mb-xs" htmlFor="email">Email Address</label>
              <div className="relative group border border-outline-variant rounded-lg bg-surface-bright overflow-hidden flex items-center h-[40px] px-sm focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-200 shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-sm flex items-center pointer-events-none text-outline group-focus-within:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </div>
                <input
                  className="w-full h-full pl-[36px] bg-transparent border-none p-0 font-sans text-body-md text-on-surface placeholder:text-outline/70 focus:ring-0 focus:outline-none"
                  id="email"
                  placeholder="jane@example.com"
                  type="email"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="text-error font-sans text-body-sm mt-xs">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block font-sans text-label-md text-on-surface mb-xs" htmlFor="password">Password</label>
              <div className="relative group border border-outline-variant rounded-lg bg-surface-bright overflow-hidden flex items-center h-[40px] px-sm focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-200 shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-sm flex items-center pointer-events-none text-outline group-focus-within:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[20px]">lock</span>
                </div>
                <input
                  className="w-full h-full pl-[36px] bg-transparent border-none p-0 font-sans text-body-md text-on-surface placeholder:text-outline/70 focus:ring-0 focus:outline-none"
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  {...register('password')}
                />
              </div>
              {errors.password && (
                <p className="text-error font-sans text-body-sm mt-xs">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="mb-sm">
              <label className="block font-sans text-label-md text-on-surface mb-xs" htmlFor="confirmPassword">Confirm Password</label>
              <div className="relative group border border-outline-variant rounded-lg bg-surface-bright overflow-hidden flex items-center h-[40px] px-sm focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-200 shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-sm flex items-center pointer-events-none text-outline group-focus-within:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[20px]">lock_reset</span>
                </div>
                <input
                  className="w-full h-full pl-[36px] bg-transparent border-none p-0 font-sans text-body-md text-on-surface placeholder:text-outline/70 focus:ring-0 focus:outline-none"
                  id="confirmPassword"
                  placeholder="••••••••"
                  type="password"
                  {...register('confirmPassword')}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-error font-sans text-body-sm mt-xs">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              className="w-full h-[48px] mt-sm bg-primary text-on-primary font-sans text-label-md rounded-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_6px_-1px_rgba(0,74,198,0.2)] hover:bg-on-primary-fixed-variant hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_6px_8px_-1px_rgba(0,74,198,0.25)] transition-all duration-200 flex items-center justify-center gap-2 transform active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-xs">
                  <svg className="animate-spin h-5 w-5 text-on-primary" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Registering...
                </span>
              ) : (
                <>
                  <span>Register</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-xl text-center">
            <p className="font-sans text-body-sm text-on-surface-variant">
              Already have an account?{' '}
              <Link className="font-sans text-label-md text-primary hover:text-on-primary-fixed-variant hover:underline transition-colors ml-1" to="/login">
                Log in
              </Link>
            </p>
          </div>

          {/* Terms Subtext */}
          <div className="mt-lg pt-md border-t border-outline-variant/30 text-center">
            <p className="font-sans text-label-sm text-outline font-normal">
              By registering, you agree to our <a className="hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a> and <a className="hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

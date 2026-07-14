import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Non-functional mock routing to Dashboard
    navigate('/');
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
          <form onSubmit={handleSubmit} className="space-y-lg">
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
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
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
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary bg-surface-container-lowest cursor-pointer"
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className="ml-sm block font-sans text-body-sm text-on-surface-variant cursor-pointer" htmlFor="remember-me">
                Remember me for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <button
              className="w-full h-[48px] flex justify-center items-center rounded-lg bg-primary text-on-primary font-sans text-label-md hover:bg-on-primary-fixed-variant shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-200 active:scale-[0.98]"
              type="submit"
            >
              Sign In to Dashboard
              <span className="material-symbols-outlined ml-sm text-[20px]">
                arrow_forward
              </span>
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

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Non-functional mock routing to Dashboard
    navigate('/');
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex items-center justify-center p-md antialiased select-none selection:bg-primary-container selection:text-on-primary-container relative">
      {/* Decorative Gradients */}
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-surface-container-highest rounded-full mix-blend-multiply filter blur-3xl opacity-50 z-[-1]"></div>
      <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-primary-fixed rounded-full mix-blend-multiply filter blur-3xl opacity-50 z-[-1]"></div>

      <main className="w-full max-w-lg relative z-10">
        {/* Registration Card (Level 2 Elevation with Soft Ambient Shadow) */}
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

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-md">
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
                  name="fullName"
                  placeholder="Jane Doe"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
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
                  name="email"
                  placeholder="jane@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
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
                  name="password"
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
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
                  name="confirmPassword"
                  placeholder="••••••••"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              className="w-full h-[48px] mt-sm bg-primary text-on-primary font-sans text-label-md rounded-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_6px_-1px_rgba(0,74,198,0.2)] hover:bg-on-primary-fixed-variant hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_6px_8px_-1px_rgba(0,74,198,0.25)] transition-all duration-200 flex items-center justify-center gap-2 transform active:scale-[0.99]"
              type="submit"
            >
              <span>Register</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
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

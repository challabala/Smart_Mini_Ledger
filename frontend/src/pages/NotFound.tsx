import { Link } from 'react-router-dom';
import { TrendingUp, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="text-center max-w-md animate-fade-up">
        {/* Logo */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-primary mx-auto mb-8 animate-float">
          <TrendingUp className="w-8 h-8 text-white" />
        </div>

        {/* 404 Number */}
        <div className="relative mb-6">
          <span className="text-[120px] md:text-[160px] font-black text-border leading-none select-none">404</span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-text-primary bg-background px-4 py-1 rounded-full border border-border">
              Page Not Found
            </span>
          </div>
        </div>

        <p className="text-text-muted text-sm leading-relaxed mb-8">
          Looks like this page has gone missing from the ledger.<br />
          Let's get you back to your financial dashboard.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary py-3 px-6 text-sm">
            <Home className="w-4 h-4" /> Go to Dashboard
          </Link>
          <button onClick={() => window.history.back()} className="btn-secondary py-3 px-6 text-sm">
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
        </div>

        <p className="text-xs text-text-muted mt-8">Smart Mini Ledger · Premium FinTech</p>
      </div>
    </div>
  );
}

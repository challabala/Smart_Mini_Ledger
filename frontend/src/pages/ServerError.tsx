import { Link } from 'react-router-dom';
import { ServerCrash, Home, ArrowLeft, RefreshCw } from 'lucide-react';

export default function ServerError() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="text-center max-w-md animate-fade-up">
        <div className="w-16 h-16 rounded-2xl bg-error-bg flex items-center justify-center shadow-lg mx-auto mb-8">
          <ServerCrash className="w-8 h-8 text-error" />
        </div>

        <div className="relative mb-6">
          <span className="text-[120px] md:text-[160px] font-black text-border leading-none select-none">500</span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-text-primary bg-background px-4 py-1 rounded-full border border-border">
              Server Error
            </span>
          </div>
        </div>

        <p className="text-text-muted text-sm leading-relaxed mb-8">
          Our servers encountered an unexpected issue.<br />
          Our team has been notified and is working on a fix.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={() => window.location.reload()} className="btn-primary py-3 px-6 text-sm">
            <RefreshCw className="w-4 h-4" /> Retry
          </button>
          <Link to="/" className="btn-secondary py-3 px-6 text-sm">
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

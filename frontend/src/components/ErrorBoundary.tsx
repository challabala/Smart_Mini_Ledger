import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export default class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ errorInfo });
    console.error('[ErrorBoundary]', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
          <div className="text-center max-w-md animate-fade-up">
            <div className="w-16 h-16 rounded-2xl bg-error-bg flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-error" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-2">Something went wrong</h1>
            <p className="text-sm text-text-muted mb-6 leading-relaxed">
              An unexpected error occurred. Please try refreshing the page or return to the dashboard.
            </p>
            {import.meta.env.DEV && this.state.error && (
              <div className="bg-surface-muted rounded-xl p-4 mb-6 text-left">
                <p className="text-xs font-mono text-error break-all">{this.state.error.message}</p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={this.handleReset} className="btn-primary py-3 px-6 text-sm">
                <RefreshCw className="w-4 h-4" /> Try Again
              </button>
              <a href="/" className="btn-secondary py-3 px-6 text-sm">
                <Home className="w-4 h-4" /> Go to Dashboard
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

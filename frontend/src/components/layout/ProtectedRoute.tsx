import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { TrendingUp } from 'lucide-react';

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background w-full transition-colors duration-250">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-primary animate-pulse">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-sm font-semibold text-text-primary">Verifying session</span>
            <span className="text-xs text-text-muted animate-pulse">Please wait a moment...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

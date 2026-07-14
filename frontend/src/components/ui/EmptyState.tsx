import React from 'react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  compact?: boolean;
  className?: string;
}

export default function EmptyState({ icon, title, description, action, compact = false, className = '' }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${compact ? 'py-8' : 'py-16'} ${className}`}>
      {icon && (
        <div className="w-14 h-14 bg-surface-muted rounded-2xl flex items-center justify-center mx-auto mb-4 text-text-muted">
          {icon}
        </div>
      )}
      <p className={`font-bold text-text-primary ${compact ? 'text-sm' : 'text-base'}`}>{title}</p>
      {description && (
        <p className="text-xs text-text-muted mt-1.5 max-w-xs leading-relaxed">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

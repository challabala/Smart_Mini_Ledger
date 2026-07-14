import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  accent?: 'primary' | 'teal' | 'accent' | 'success' | 'warning' | 'error';
}

export default function Card({
  children, className = '', hover = false, padding = 'md', accent, ...props
}: CardProps) {
  const padMap = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-6',
  };

  const accentMap: Record<string, string> = {
    primary: 'border-t-2 border-t-primary-400',
    teal:    'border-t-2 border-t-teal-400',
    accent:  'border-t-2 border-t-accent-400',
    success: 'border-t-2 border-t-success',
    warning: 'border-t-2 border-t-warning',
    error:   'border-t-2 border-t-error',
  };

  return (
    <div
      className={`bg-white rounded-2xl border border-border shadow-card ${hover ? 'hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 cursor-pointer' : ''} ${padMap[padding]} ${accent ? accentMap[accent] : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

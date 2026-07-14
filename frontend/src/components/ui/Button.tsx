import React from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
type Size    = 'xs' | 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:   'btn-primary',
  secondary: 'btn-secondary',
  ghost:     'text-text-secondary hover:bg-surface-muted hover:text-text-primary rounded-xl transition-all duration-200',
  danger:    'bg-error-bg text-error border border-error/30 hover:bg-red-100 rounded-xl font-semibold transition-all duration-200',
  success:   'bg-success-bg text-green-700 border border-green-200 hover:bg-green-100 rounded-xl font-semibold transition-all duration-200',
};

const sizeClasses: Record<Size, string> = {
  xs: 'px-2.5 py-1.5 text-xs',
  sm: 'px-3.5 py-2 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-sm',
};

export default function Button({
  variant = 'primary', size = 'md', loading = false,
  leftIcon, rightIcon, fullWidth = false,
  children, className = '', disabled, ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98] ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
}

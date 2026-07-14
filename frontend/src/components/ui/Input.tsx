import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: string;
}

export default function Input({ label, icon, id, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block font-sans text-label-md text-on-surface mb-xs" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="relative group border border-outline-variant rounded-lg bg-surface-bright overflow-hidden flex items-center h-[40px] px-sm focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-200 shadow-sm">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-sm flex items-center pointer-events-none text-outline group-focus-within:text-primary transition-colors">
            <span className="material-symbols-outlined text-[20px]">{icon}</span>
          </div>
        )}
        <input
          id={id}
          className={`w-full h-full bg-transparent border-none p-0 font-sans text-body-md text-on-surface placeholder:text-outline/70 focus:ring-0 focus:outline-none ${icon ? 'pl-[36px]' : ''} ${className}`}
          {...props}
        />
      </div>
    </div>
  );
}

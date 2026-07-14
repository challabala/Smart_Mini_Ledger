import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
}

export default function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyle = "flex items-center justify-center gap-sm px-4 py-2 rounded-lg font-sans text-label-md transition-all duration-200 shadow-sm active:scale-[0.99]";
  
  const variants = {
    primary: "bg-primary text-on-primary hover:bg-primary/90 border-t border-white/20",
    secondary: "bg-surface-container-lowest border border-outline-variant text-on-surface hover:bg-surface-container",
    ghost: "text-primary font-bold hover:underline bg-transparent shadow-none active:scale-100 px-0 py-0"
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

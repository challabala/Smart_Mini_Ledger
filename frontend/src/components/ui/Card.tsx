import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  level?: 1 | 2;
  hoverable?: boolean;
  children: React.ReactNode;
}

export default function Card({ level = 1, hoverable = false, children, className = '', ...props }: CardProps) {
  const baseStyle = "bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col gap-sm relative overflow-hidden transition-all duration-250";
  
  const levels = {
    1: "shadow-none",
    2: "shadow-ambient hover:shadow-[0_12px_24px_-10px_rgba(11,28,48,0.08)]"
  };

  const hoverStyle = hoverable ? "cursor-pointer hover:border-primary/50" : "";

  return (
    <div
      className={`${baseStyle} ${levels[level]} ${hoverStyle} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

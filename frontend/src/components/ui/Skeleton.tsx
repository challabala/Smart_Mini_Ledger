import React from 'react';

interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangle';
  className?: string;
}

export default function Skeleton({ variant = 'text', className = '' }: SkeletonProps) {
  const baseStyle = "bg-outline-variant/30 animate-pulse";
  
  const variants = {
    text: "h-4 w-full rounded",
    circular: "rounded-full",
    rectangle: "rounded-lg"
  };

  return (
    <div className={`${baseStyle} ${variants[variant]} ${className}`} />
  );
}

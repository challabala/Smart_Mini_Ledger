import React from 'react';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionText?: string;
  onActionClick?: () => void;
}

export default function EmptyState({
  icon = 'inbox',
  title,
  description,
  actionText,
  onActionClick
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-xl border-2 border-dashed border-outline-variant/60 rounded-xl bg-surface-bright max-w-md mx-auto my-md">
      <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary mb-md">
        <span className="material-symbols-outlined text-[28px]">{icon}</span>
      </div>
      <h3 className="font-sans text-headline-sm font-bold text-on-surface mb-xs">{title}</h3>
      <p className="font-sans text-body-sm text-on-surface-variant mb-lg max-w-[280px] leading-relaxed">{description}</p>
      {actionText && onActionClick && (
        <button
          onClick={onActionClick}
          className="bg-primary text-on-primary font-sans text-label-md px-lg py-2 rounded-lg flex items-center gap-sm hover:bg-primary/95 transition-all shadow-sm border-t border-white/20 active:scale-[0.99]"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          {actionText}
        </button>
      )}
    </div>
  );
}

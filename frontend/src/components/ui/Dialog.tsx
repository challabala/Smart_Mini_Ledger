import React from 'react';
import { X } from 'lucide-react';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg';
}

const maxWidths = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg' };

export default function Dialog({ open, onClose, title, description, children, maxWidth = 'md' }: DialogProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <div className={`bg-white rounded-3xl shadow-modal w-full ${maxWidths[maxWidth]} animate-scale-in`}>
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-border">
          <div>
            <h2 id="dialog-title" className="text-base font-bold text-text-primary">{title}</h2>
            {description && <p className="text-xs text-text-muted mt-0.5">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-surface-muted transition-colors text-text-muted ml-4 shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {/* Body */}
        <div className="px-6 py-5">
          {children}
        </div>
      </div>
    </div>
  );
}

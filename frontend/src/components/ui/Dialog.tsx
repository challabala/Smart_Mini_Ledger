import React, { useEffect } from 'react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Dialog({ isOpen, onClose, title, children }: DialogProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-margin-mobile md:px-0 py-lg overflow-y-auto">
      {/* Blurred Backdrop overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-on-background/20 backdrop-blur-md transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Dialog box wrapper */}
      <div className="relative w-full max-w-lg bg-surface-container-lowest rounded-xl shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] border border-outline-variant overflow-hidden flex flex-col max-h-[90vh] z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-lg py-md border-b border-outline-variant bg-surface-bright">
          <h2 className="font-sans text-headline-sm font-bold text-on-surface">{title}</h2>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface transition-colors rounded-full p-1 focus:outline-none"
            type="button"
            aria-label="Close dialog"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-lg">
          {children}
        </div>
      </div>
    </div>
  );
}

import React from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  onClose?: () => void;
}

export default function Toast({ message, type = 'success', onClose }: ToastProps) {
  return (
    <div className="fixed bottom-lg right-lg z-50 flex items-center gap-md p-md rounded-lg shadow-ambient bg-white/85 border-l-4 border-y border-r backdrop-blur-md max-w-sm animate-in fade-in slide-in-from-bottom-5 duration-300 border-outline-variant/30 text-on-surface" style={{
      borderLeftColor: type === 'success' ? '#006c49' : '#ba1a1a'
    }}>
      <span className="material-symbols-outlined font-bold" style={{
        color: type === 'success' ? '#006c49' : '#ba1a1a'
      }}>
        {type === 'success' ? 'check_circle' : 'error'}
      </span>
      <div className="flex-1 font-sans text-body-sm font-semibold">{message}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-outline hover:text-on-surface transition-colors focus:outline-none flex items-center"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      )}
    </div>
  );
}

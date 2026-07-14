import React from 'react';

// ─── Row Skeleton ─────────────────────────────────────────────────────────────
function SkeletonRow() {
  return (
    <tr className="border-b border-border/50">
      <td className="px-4 py-3.5"><div className="flex items-center gap-3"><div className="skeleton w-8 h-8 rounded-xl" /><div className="skeleton h-4 w-32 rounded" /></div></td>
      <td className="hidden sm:table-cell px-4 py-3.5"><div className="skeleton h-5 w-20 rounded-full" /></td>
      <td className="hidden md:table-cell px-4 py-3.5"><div className="skeleton h-4 w-24 rounded" /></td>
      <td className="px-4 py-3.5 text-right"><div className="skeleton h-4 w-16 rounded ml-auto" /></td>
    </tr>
  );
}

// ─── Card Skeleton ────────────────────────────────────────────────────────────
function SkeletonCard({ lines = 3 }: { lines?: number }) {
  return (
    <div className="bg-white rounded-2xl border border-border shadow-card p-5 space-y-3 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="skeleton w-10 h-10 rounded-xl" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-4 w-24 rounded" />
          <div className="skeleton h-3 w-16 rounded" />
        </div>
      </div>
      {Array.from({ length: lines - 1 }).map((_, i) => (
        <div key={i} className="skeleton h-3 rounded" style={{ width: `${70 + i * 10}%` }} />
      ))}
    </div>
  );
}

// ─── Stat Card Skeleton ───────────────────────────────────────────────────────
function SkeletonStatCard() {
  return (
    <div className="bg-white rounded-2xl border border-border shadow-card p-5 animate-pulse">
      <div className="flex justify-between mb-3">
        <div className="skeleton h-3 w-24 rounded" />
        <div className="skeleton w-9 h-9 rounded-xl" />
      </div>
      <div className="skeleton h-7 w-28 rounded mb-2" />
      <div className="skeleton h-3 w-20 rounded" />
    </div>
  );
}

// ─── Generic Skeleton Line ────────────────────────────────────────────────────
function SkeletonLine({ className }: { className?: string }) {
  return <div className={`skeleton rounded-lg ${className || 'h-4 w-full'}`} />;
}

// ─── Empty State ──────────────────────────────────────────────────────────────
interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  compact?: boolean;
}

function EmptyState({ icon, title, description, action, compact = false }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${compact ? 'py-8' : 'py-16'}`}>
      {icon && (
        <div className="w-14 h-14 bg-surface-muted rounded-2xl flex items-center justify-center mx-auto mb-4 text-text-muted">
          {icon}
        </div>
      )}
      <p className={`font-bold text-text-primary ${compact ? 'text-sm' : 'text-base'}`}>{title}</p>
      {description && <p className="text-xs text-text-muted mt-1.5 max-w-xs">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export default SkeletonLine;
export { SkeletonRow, SkeletonCard, SkeletonStatCard, EmptyState };

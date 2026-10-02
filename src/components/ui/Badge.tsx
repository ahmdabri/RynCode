import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'slate' | 'amber' | 'blue' | 'rose';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'emerald',
  className = '',
}) => {
  const variants = {
    emerald:
      'bg-emerald-500/10 text-emerald-700 border-emerald-400/40 dark:text-emerald-300 dark:border-emerald-500/30',
    slate:
      'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    amber:
      'bg-amber-500/10 text-amber-700 border-amber-400/40 dark:text-amber-300 dark:border-amber-500/30',
    blue:
      'bg-sky-500/10 text-sky-700 border-sky-400/40 dark:text-sky-300 dark:border-sky-500/30',
    rose:
      'bg-rose-500/10 text-rose-700 border-rose-400/40 dark:text-rose-300 dark:border-rose-500/30',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

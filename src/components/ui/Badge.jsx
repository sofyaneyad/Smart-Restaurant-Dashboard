import React from 'react';
import { cn } from '../../lib/utils';

export function Badge({
  className,
  variant = 'default',
  children,
  ...props
}) {
  const variants = {
    default: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/60',
    primary: 'bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 font-semibold',
    success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-800/50',
    preparing: 'bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 border border-sky-200/80 dark:border-sky-800/60',
    warning: 'bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 border border-sky-200/80 dark:border-sky-800/60',
    danger: 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200/70 dark:border-rose-800/50',
    info: 'bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300 border border-sky-200/70 dark:border-sky-800/50',
    purple: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border border-indigo-200/70 dark:border-indigo-800/50'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium tracking-tight transition-colors',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

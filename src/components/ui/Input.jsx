import React from 'react';
import { cn } from '../../lib/utils';

export const Input = React.forwardRef(({
  className,
  type = 'text',
  error,
  ...props
}, ref) => {
  return (
    <div className="w-full">
      <input
        type={type}
        ref={ref}
        className={cn(
          'flex h-10 w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 disabled:cursor-not-allowed disabled:opacity-50 transition-all dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:ring-zinc-100/10 dark:focus:border-zinc-100',
          error && 'border-rose-500 focus:ring-rose-500/20 focus:border-rose-500 dark:border-rose-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-rose-500 font-medium">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

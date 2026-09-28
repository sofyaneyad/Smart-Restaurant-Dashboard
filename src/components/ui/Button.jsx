import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

export const Button = React.forwardRef(({
  className,
  variant = 'default',
  size = 'md',
  isLoading = false,
  children,
  type = 'button',
  disabled,
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-zinc-400/40 disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer text-sm';

  const variants = {
    // True Shadcn / Square / Toast POS High-End Styling
    default: 'bg-zinc-900 text-zinc-50 hover:bg-zinc-800 active:bg-zinc-950 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 shadow-sm',
    primary: 'bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 shadow-sm shadow-emerald-700/20',
    secondary: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200/80 active:bg-zinc-200 dark:bg-[#151924] dark:text-zinc-100 dark:hover:bg-[#1d2332]',
    outline: 'border border-zinc-200 dark:border-[#222838] bg-white dark:bg-[#121622] text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-[#1c2233] dark:hover:text-white',
    ghost: 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-[#181d2a] dark:hover:text-white',
    destructive: 'bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 shadow-sm shadow-rose-600/20',
    success: 'bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800'
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-sm px-3.5 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5',
    icon: 'h-9 w-9 p-0 justify-center'
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <span>Loading...</span>
        </span>
      ) : children}
    </motion.button>
  );
});

Button.displayName = 'Button';

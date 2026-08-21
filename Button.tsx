import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const variants: Record<Variant, string> = {
  primary: 'bg-brand-600 text-white hover:bg-brand-500 shadow-glow focus-visible:ring-brand-500',
  secondary: 'bg-ink-100 text-ink-950 hover:bg-white focus-visible:ring-ink-300',
  ghost: 'bg-transparent text-ink-200 hover:bg-ink-800 hover:text-white focus-visible:ring-ink-600',
  outline: 'border border-ink-600 bg-transparent text-ink-100 hover:bg-ink-800 hover:border-ink-500 focus-visible:ring-ink-500',
  danger: 'bg-red-900/40 text-red-300 hover:bg-red-900/60 border border-red-800/50 focus-visible:ring-red-500',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-xs',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
};

export function Button({
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  fullWidth,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...rest}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}

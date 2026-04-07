import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-slate-950 hover:bg-[#9cbcff] shadow-[0_12px_30px_rgba(133,173,255,0.25)]',
  secondary:
    'bg-secondary/12 text-secondary ring-1 ring-secondary/25 hover:bg-secondary/18',
  ghost:
    'bg-white/0 text-on-background ring-1 ring-white/10 hover:bg-white/5',
};

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-70',
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}

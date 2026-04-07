import type { PropsWithChildren } from 'react';
import { cn } from '../../lib/cn';

export function Badge({
  children,
  className,
}: PropsWithChildren<{
  className?: string;
}>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full bg-white/6 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-primary ring-1 ring-primary/15',
        className,
      )}
    >
      {children}
    </span>
  );
}

import type { PropsWithChildren } from 'react';
import { cn } from '../../lib/cn';

export function Card({
  children,
  className,
}: PropsWithChildren<{
  className?: string;
}>) {
  return (
    <div className={cn('glass-panel terminal-card rounded-3xl p-5', className)}>{children}</div>
  );
}

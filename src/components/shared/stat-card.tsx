import { cn } from '@/lib/utils';

interface StatCardProps {
  value: string | number;
  label: string;
  className?: string;
}

/**
 * Statistics display card — large number, small label.
 *
 * @param root0
 * @param root0.value
 * @param root0.label
 * @param root0.className
 */
export function StatCard({ value, label, className }: StatCardProps) {
  return (
    <div className={cn('text-center', className)}>
      <p className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">{value}</p>
      <p className="text-muted-foreground mt-1 text-sm">{label}</p>
    </div>
  );
}

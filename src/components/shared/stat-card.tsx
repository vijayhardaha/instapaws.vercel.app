import { cn } from '@/lib/utils';

interface StatCardProps {
  value: string | number;
  label: string;
  className?: string;
}

/**
 * Statistics display card — large number, small label.
 *
 * @param {StatCardProps} props - Component props.
 * @param {string | number} props.value - Statistic value to display.
 * @param {string} props.label - Label describing the statistic.
 * @param {string} [props.className] - Additional CSS classes.
 *
 * @returns {JSX.Element} Stat card with value and label.
 */
export function StatCard({ value, label, className }: StatCardProps) {
  return (
    <div className={cn('text-center', className)}>
      <p className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">{value}</p>
      <p className="text-muted-foreground mt-1 text-sm">{label}</p>
    </div>
  );
}

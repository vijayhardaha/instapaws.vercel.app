import { AlertTriangle } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { cn } from '@/lib/utils';

interface WarningBannerProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  variant?: 'destructive' | 'warning';
  className?: string;
}

/**
 * Warning/alert banner with icon, title, and description or children.
 *
 * @param {unknown} props - Component props.
 * @param {unknown} props.title - Banner title text.
 * @param {unknown} props.description - Optional description text.
 * @param {unknown} props.children - Optional child content.
 * @param {unknown} props.variant - Visual variant. Default 'destructive'.
 * @param {unknown} props.className - Additional CSS classes.
 *
 * @returns {unknown} The warning banner element.
 */
export function WarningBanner({
  title,
  description,
  children,
  variant = 'destructive',
  className,
}: WarningBannerProps) {
  return (
    <div
      className={cn(
        'border-b',
        variant === 'destructive' ? 'bg-destructive/10 border-destructive/20' : 'bg-accent/10 border-accent/20',
        className
      )}
    >
      <Container className="flex items-start gap-4 py-6">
        <AlertTriangle
          className={cn('mt-0.5 h-5 w-5 shrink-0', variant === 'destructive' ? 'text-destructive' : 'text-accent')}
          aria-hidden="true"
        />
        <div>
          <p className={cn('font-semibold', variant === 'destructive' ? 'text-destructive' : 'text-accent')}>{title}</p>
          {description && <p className="text-muted-foreground mt-1 text-sm">{description}</p>}
          {children}
        </div>
      </Container>
    </div>
  );
}

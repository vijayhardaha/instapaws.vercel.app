import type { JSX, ReactNode } from 'react';

import { AlertTriangle } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { cn } from '@/lib/utils';

/**
 * Props for the warning banner component.
 *
 * @type {WarningBannerProps}
 * @property {string} title - Banner title text.
 * @property {string} [description] - Optional description text.
 * @property {ReactNode} [children] - Optional child content.
 * @property {'destructive' | 'warning'} [variant] - Visual variant.
 * @property {string} [className] - Additional CSS classes.
 */
interface WarningBannerProps {
  title: string;
  description?: string;
  children?: ReactNode;
  variant?: 'destructive' | 'warning';
  className?: string;
}

/**
 * Warning/alert banner with icon, title, and description or children.
 *
 * @param {WarningBannerProps} props - Component props.
 * @param {string} [props.title] - Banner title text.
 * @param {string} [props.description] - Optional description text.
 * @param {ReactNode} [props.children] - Optional child content.
 * @param {string} [props.variant] - Visual variant. Default 'destructive'.
 * @param {string} [props.className] - Additional CSS classes.
 *
 * @returns {JSX.Element} The warning banner element.
 */
export function WarningBanner({
  title,
  description,
  children,
  variant = 'destructive',
  className,
}: WarningBannerProps): JSX.Element {
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

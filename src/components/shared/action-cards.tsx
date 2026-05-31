import type { ComponentPropsWithoutRef, JSX, ReactNode } from 'react';

import { ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ActionCardCta {
  label: string;
  href: string;
  variant?: 'primary' | 'outline';
  external?: boolean;
}

interface ActionCard {
  icon: ReactNode;
  title: string;
  description: string;
  cta: ActionCardCta;
}

interface ActionCardsProps {
  cards: ActionCard[];
}

const CTA_VARIANTS = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90 border border-transparent',
  outline: 'border-border text-foreground hover:bg-muted border',
} as const;

interface CtaLinkProps extends ComponentPropsWithoutRef<'a'> {
  variant: 'primary' | 'outline';
  external?: boolean;
  children: ReactNode;
}

function CtaLink({ variant, external, children, className, ...props }: CtaLinkProps) {
  const classes = cn(
    'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors',
    CTA_VARIANTS[variant],
    className
  );

  if (external) {
    return (
      <a {...props} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        <ExternalLink className="h-4 w-4" />
      </a>
    );
  }

  return (
    <Link href={props.href as string} className={classes}>
      {children}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

/**
 * Grid of action cards with icon, title, description, and CTA button.
 * Used on the homepage "How You Can Help" section.
 *
 * @param {unknown} props - Component props.
 * @param {unknown} props.cards - Array of action card data.
 *
 * @returns {JSX.Element} The action cards grid.
 */
export function ActionCards({ cards }: ActionCardsProps): JSX.Element {
  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-3">
      {cards.map((card) => (
        <Card key={card.title} className="text-center">
          <CardHeader>
            <div className="bg-accent/10 mx-auto flex h-12 w-12 items-center justify-center rounded-full">
              {card.icon}
            </div>
            <h3 className="mt-4 text-lg font-semibold">{card.title}</h3>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-muted-foreground text-sm">{card.description}</p>
          </CardContent>
          <CardFooter className="justify-center">
            <CtaLink variant={card.cta.variant ?? 'primary'} external={card.cta.external} href={card.cta.href}>
              {card.cta.label}
            </CtaLink>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

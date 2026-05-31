import type { JSX, ReactNode } from 'react';

import { Container } from '@/components/layout/container';

/**
 * Configuration for a single CTA button.
 *
 * @type {CtaButton}
 * @property {string} label - Button text.
 * @property {string} href - Destination URL.
 * @property {ReactNode} [icon] - Optional icon element.
 * @property {'primary' | 'outline'} [variant] - Button visual variant.
 */
interface CtaButton {
  label: string;
  href: string;
  icon?: ReactNode;
  variant?: 'primary' | 'outline';
}

/**
 * Props for the CTA section component.
 *
 * @type {CtaSectionProps}
 * @property {string} title - Call-to-action heading text.
 * @property {string} description - Supporting description text.
 * @property {[CtaButton, CtaButton?]} buttons - One or two CTA button configurations.
 */
interface CtaSectionProps {
  title: string;
  description: string;
  buttons: [CtaButton, CtaButton?];
}

/**
 * Full-width call-to-action section with dark background and two buttons.
 * Used on homepage, about, success-stories, donate, petition, identify-abuse, rescue, and legal pages.
 *
 * @param {CtaSectionProps} props - Component props.
 * @param {string} props.title - Call-to-action heading text.
 * @param {string} props.description - Supporting description text.
 * @param {[CtaButton, CtaButton?]} props.buttons - Array of one or two CTA button configurations.
 *
 * @returns {JSX.Element} CTA section with heading, description, and action buttons.
 */
export function CtaSection({ title, description, buttons }: CtaSectionProps): JSX.Element {
  return (
    <section className="bg-primary text-primary-foreground">
      <Container className="py-16 text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
        <p className="text-primary-foreground/80 mx-auto mt-4">{description}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {buttons.map((btn, i) => {
            if (!btn) return null;
            return btn.variant === 'outline' ? (
              <a
                key={i}
                href={btn.href}
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 inline-flex items-center justify-center gap-2 rounded-lg bg-transparent px-6 py-3 text-sm font-semibold transition-colors"
              >
                {btn.icon}
                {btn.label}
              </a>
            ) : (
              <a
                key={i}
                href={btn.href}
                className="bg-accent text-accent-foreground hover:bg-accent/90 inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-colors"
              >
                {btn.icon}
                {btn.label}
              </a>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

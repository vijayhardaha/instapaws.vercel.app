import type { ReactNode } from 'react';

import { Container } from '@/components/layout/container';
import { SectionHeading } from '@/components/shared/section-heading';

interface HeroBannerProps {
  tag: string;
  title: ReactNode;
  description: string;
  /** Optional extra content below the heading, e.g. a stats line */
  children?: ReactNode;
}

/**
 * Hero/banner section used at the top of most pages.
 * Dark background with tag, title, description, and optional extra content.
 *
 * @param {HeroBannerProps} props - Component props.
 * @param {string} props.tag - Tag label displayed above the title.
 * @param {ReactNode} props.title - Main heading content.
 * @param {string} props.description - Descriptive text below the title.
 * @param {ReactNode} [props.children] - Optional extra content below the heading.
 *
 * @returns {JSX.Element} Hero banner section.
 */
export function HeroBanner({ tag, title, description, children }: HeroBannerProps) {
  return (
    <section className="border-border bg-primary text-primary-foreground border-b">
      <Container className="py-16">
        <SectionHeading tag={tag} title={title} description={description} className="text-primary-foreground" />
        {children}
      </Container>
    </section>
  );
}

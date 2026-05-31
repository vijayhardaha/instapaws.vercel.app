import type { JSX, ReactNode } from 'react';

import { Container } from '@/components/layout/container';
import { cn } from '@/lib/utils';

interface HeroBannerProps {
  tag: string;
  title: ReactNode;
  description: string;
  sectionClassName?: string;
  className?: string;
  tagClassName?: string;
  headingClassName?: string;
  descriptionClassName?: string;
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
 * @param {string} [props.sectionClassName] - Additional CSS classes for the section element.
 * @param {string} [props.className] - Additional CSS classes for the content div.
 * @param {string} [props.tagClassName] - Additional CSS classes for the tag element.
 * @param {string} [props.headingClassName] - Additional CSS classes for the heading element.
 * @param {string} [props.descriptionClassName] - Additional CSS classes for the description element.
 * @param {ReactNode} [props.children] - Optional extra content below the heading.
 *
 * @returns {JSX.Element} Hero banner section.
 */
export function HeroBanner({
  tag,
  title,
  description,
  sectionClassName,
  className,
  tagClassName,
  headingClassName,
  descriptionClassName,
  children,
}: HeroBannerProps): JSX.Element {
  return (
    <section className={cn('border-border bg-primary text-primary-foreground border-b', sectionClassName)}>
      <Container className="py-16">
        <div className={cn('text-primary-foreground', className)}>
          {tag && (
            <p className={cn('text-accent mb-2 text-sm font-semibold tracking-widest uppercase', tagClassName)}>
              {tag}
            </p>
          )}
          <h1 className={cn('text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl', headingClassName)}>
            {title}
          </h1>
          {description && (
            <p className={cn('mt-3 text-base leading-relaxed opacity-80 sm:text-lg md:text-xl', descriptionClassName)}>
              {description}
            </p>
          )}
        </div>
        {children}
      </Container>
    </section>
  );
}

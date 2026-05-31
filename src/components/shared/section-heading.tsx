import type { JSX, ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  tag?: string;
  title: ReactNode;
  description?: string;
  className?: string;
  align?: 'left' | 'center';
}

/**
 * Reusable section heading with optional tag label and description.
 *
 * @param {SectionHeadingProps} props - Component props.
 * @param {string} [props.tag] - Optional tag label displayed above the title.
 * @param {ReactNode} [props.title] - Main heading content.
 * @param {string} [props.description] - Optional descriptive text below the title.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {string} [props.align] - Text alignment. Default 'left'.
 *
 * @returns {JSX.Element} Section heading with optional tag and description.
 */
export function SectionHeading({
  tag,
  title,
  description,
  className,
  align = 'left',
}: SectionHeadingProps): JSX.Element {
  return (
    <div className={cn(align === 'center' && 'mx-auto text-center', className)}>
      {tag && <p className="text-accent mb-1 text-sm font-bold tracking-widest uppercase">・{tag}・</p>}
      <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h2>
      {description && <p className="mt-3 text-lg leading-relaxed opacity-80">{description}</p>}
    </div>
  );
}

import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  tag?: string;
  title: string;
  description?: string;
  className?: string;
  align?: 'left' | 'center';
}

/**
 * Reusable section heading with optional tag label and description.
 *
 * @param root0
 * @param root0.tag
 * @param root0.title
 * @param root0.description
 * @param root0.className
 * @param root0.align
 */
export function SectionHeading({ tag, title, description, className, align = 'left' }: SectionHeadingProps) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {tag && <p className="text-accent mb-2 text-xs font-semibold tracking-widest uppercase">{tag}</p>}
      <h2 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      {description && <p className="text-muted-foreground mt-3 text-base leading-relaxed">{description}</p>}
    </div>
  );
}

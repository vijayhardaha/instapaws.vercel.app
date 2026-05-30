'use client';

/**
 * Grid and Dot Backgrounds — Aceternity UI style components.
 *
 * These components render CSS-based background patterns using inline SVG data URIs.
 * They are implemented as client components for dynamic color support.
 *
 * @see https://ui.aceternity.com/components/grid-and-dot-backgrounds
 */

import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface GridBackgroundProps {
  children: ReactNode;
  className?: string;
  color?: string;
  cellSize?: number;
}

/**
 * Grid pattern background with configurable line color and cell size.
 *
 * @param {unknown} props - Component props
 * @param {unknown} props.children - Content to render above the grid
 * @param {unknown} props.className - Additional classes for the wrapper
 * @param {unknown} props.color - Grid line color (default: #808080)
 * @param {unknown} props.cellSize - Grid cell size in px (default: 32)
 *
 * @returns {ReactNode} A div with grid background pattern wrapping children.
 */
export function GridBackground({ children, className, color = '#808080', cellSize = 32 }: GridBackgroundProps) {
  const gridSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${cellSize} ${cellSize}" width="${cellSize}" height="${cellSize}" fill="none" stroke="${color}"><path d="M0 .5H${cellSize}V${cellSize}"/></svg>`;

  return (
    <div
      className={cn('relative flex w-full items-center justify-center', className)}
      style={{ backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(gridSvg)}")` }}
    >
      {children}
    </div>
  );
}

/**
 * Small grid pattern background — finer grid lines (8px cells).
 *
 * @param {unknown} props - Component props
 * @param {unknown} props.children - Content to render above the grid
 * @param {unknown} props.className - Additional classes for the wrapper
 * @param {unknown} props.color - Grid line color (default: #808080)
 *
 * @returns {ReactNode} A div with fine-grid background pattern wrapping children.
 */
export function GridSmallBackground({ children, className, color = '#808080' }: Omit<GridBackgroundProps, 'cellSize'>) {
  return (
    <GridBackground className={className} color={color} cellSize={8}>
      {children}
    </GridBackground>
  );
}

interface DotBackgroundProps {
  children: ReactNode;
  className?: string;
  color?: string;
  dotSize?: number;
  spacing?: number;
}

/**
 * Dot pattern background with configurable dot color, size, and spacing.
 *
 * @param {unknown} props - Component props
 * @param {unknown} props.children - Content to render above the dots
 * @param {unknown} props.className - Additional classes for the wrapper
 * @param {unknown} props.color - Dot fill color (default: #808080)
 * @param {unknown} props.dotSize - Dot radius in px (default: 1.6)
 * @param {unknown} props.spacing - Spacing between dots in px (default: 16)
 *
 * @returns {ReactNode} A div with dot background pattern wrapping children.
 */
export function DotBackground({
  children,
  className,
  color = '#808080',
  dotSize = 1.6,
  spacing = 16,
}: DotBackgroundProps) {
  const dotSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${spacing} ${spacing}" width="${spacing}" height="${spacing}" fill="none"><circle fill="${color}" cx="${spacing / 2}" cy="${spacing / 2}" r="${dotSize}"/></svg>`;

  return (
    <div
      className={cn('relative flex w-full items-center justify-center', className)}
      style={{ backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(dotSvg)}")` }}
    >
      {children}
    </div>
  );
}

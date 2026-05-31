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

/**
 * Props for the grid pattern background component.
 *
 * @type {GridBackgroundProps}
 * @property {ReactNode} children - Content to render above the grid.
 * @property {string} [className] - Additional CSS classes for the wrapper.
 * @property {string} [color] - Grid line color. Default '#808080'.
 * @property {number} [cellSize] - Grid cell size in pixels. Default 32.
 */
interface GridBackgroundProps {
  children: ReactNode;
  className?: string;
  color?: string;
  cellSize?: number;
}

/**
 * Grid pattern background with configurable line color and cell size.
 *
 * @param {GridBackgroundProps} props - Component props
 * @param {ReactNode} [props.children] - Content to render above the grid
 * @param {string} [props.className] - Additional classes for the wrapper
 * @param {string} [props.color] - Grid line color (default: #808080)
 * @param {number} [props.cellSize] - Grid cell size in px (default: 32)
 *
 * @returns {ReactNode} A div with grid background pattern wrapping children.
 */
export function GridBackground({
  children,
  className,
  color = '#808080',
  cellSize = 32,
}: GridBackgroundProps): ReactNode {
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
 * @param {GridBackgroundProps} props - Component props
 * @param {ReactNode} [props.children] - Content to render above the grid
 * @param {string} [props.className] - Additional classes for the wrapper
 * @param {string} [props.color] - Grid line color (default: #808080)
 *
 * @returns {ReactNode} A div with fine-grid background pattern wrapping children.
 */
export function GridSmallBackground({
  children,
  className,
  color = '#808080',
}: Omit<GridBackgroundProps, 'cellSize'>): ReactNode {
  return (
    <GridBackground className={className} color={color} cellSize={8}>
      {children}
    </GridBackground>
  );
}

/**
 * Props for the dot pattern background component.
 *
 * @type {DotBackgroundProps}
 * @property {ReactNode} children - Content to render above the dots.
 * @property {string} [className] - Additional CSS classes for the wrapper.
 * @property {string} [color] - Dot fill color. Default '#808080'.
 * @property {number} [dotSize] - Dot radius in pixels. Default 1.6.
 * @property {number} [spacing] - Spacing between dots in pixels. Default 16.
 */
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
 * @param {GridBackgroundProps} props - Component props
 * @param {ReactNode} [props.children] - Content to render above the dots
 * @param {string} [props.className] - Additional classes for the wrapper
 * @param {string} [props.color] - Dot fill color (default: #808080)
 * @param {number} [props.dotSize] - Dot radius in px (default: 1.6)
 * @param {number} [props.spacing] - Spacing between dots in px (default: 16)
 *
 * @returns {ReactNode} A div with dot background pattern wrapping children.
 */
export function DotBackground({
  children,
  className,
  color = '#808080',
  dotSize = 1.6,
  spacing = 16,
}: DotBackgroundProps): ReactNode {
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

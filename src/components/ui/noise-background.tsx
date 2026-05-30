'use client';

/**
 * Noise Background — Aceternity UI style animated background.
 *
 * Combines animated gradient layers with a noise texture overlay for
 * a dynamic, atmospheric background effect.
 *
 * @see https://ui.aceternity.com/components/noise-background
 */

import { useId, useMemo, type ReactNode } from 'react';

import { motion } from 'motion/react';

import { cn } from '@/lib/utils';

interface NoiseBackgroundProps {
  children?: ReactNode;
  className?: string;
  containerClassName?: string;
  gradientColors?: string[];
  noiseIntensity?: number;
  speed?: number;
  animating?: boolean;
}

const DEFAULT_GRADIENTS = ['rgb(255, 100, 150)', 'rgb(100, 150, 255)', 'rgb(255, 200, 100)'];

/**
 * SVG-based noise texture rendered as a data URI for the grain overlay.
 * Creates a subtle film grain effect.
 *
 * @param {unknown} intensity - Noise opacity intensity (0–1).
 *
 * @returns {string} A data URI string of the noise SVG.
 */
function noiseSvg(intensity: number): string {
  // Generate a small noise pattern as SVG filter
  const rects = Array.from({ length: 64 }, (_, i) => {
    const x = (i % 8) * 2;
    const y = Math.floor(i / 8) * 2;
    const opacity = Math.random() * intensity;
    return `<rect x="${x}" y="${y}" width="2" height="2" fill="currentColor" opacity="${opacity}"/>`;
  }).join('');

  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">${rects}</svg>`
  )}`;
}

/**
 * Animated background with configurable gradient layers and noise texture.
 * Wraps children in a container with the effect behind them.
 *
 * @param {unknown} props - Component props
 * @param {unknown} props.children - Content to display above the background
 * @param {unknown} props.className - Classes for the content wrapper
 * @param {unknown} props.containerClassName - Classes for the outer container
 * @param {unknown} props.gradientColors - Array of CSS color strings for gradient layers
 * @param {unknown} props.noiseIntensity - Opacity of the noise overlay (0–1, default 0.15)
 * @param {unknown} props.speed - Animation speed multiplier (default 0.1)
 * @param {unknown} props.animating - Whether gradients animate (default true)
 *
 * @returns {ReactNode} A container with animated gradient and noise background wrapping children.
 */
export function NoiseBackground({
  children,
  className,
  containerClassName,
  gradientColors = DEFAULT_GRADIENTS,
  noiseIntensity = 0.15,
  speed = 0.1,
  animating = true,
}: NoiseBackgroundProps) {
  const id = useId();

  // Memoize the noise SVG so it doesn't regenerate on every render
  const noiseDataUri = useMemo(() => noiseSvg(noiseIntensity), [noiseIntensity]);

  return (
    <div className={cn('relative isolate overflow-hidden', containerClassName)}>
      {/* Gradient layers */}
      <div className="absolute inset-0 -z-10">
        {gradientColors.map((color, i) => (
          <motion.div
            key={`${id}-gradient-${i}`}
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at center, ${color} 0%, transparent 70%)`,
              opacity: 0.3 + i * 0.1,
              transformOrigin: `${30 + i * 20}% ${40 + i * 15}%`,
            }}
            animate={
              animating
                ? {
                    x: [0, 30, -20, 10, 0],
                    y: [0, -20, 30, -10, 0],
                    scale: [1, 1.05, 0.98, 1.02, 1],
                    opacity: [0.3 + i * 0.1, 0.4 + i * 0.1, 0.25 + i * 0.1, 0.35 + i * 0.1, 0.3 + i * 0.1],
                  }
                : undefined
            }
            transition={
              animating
                ? { duration: (8 + i * 4) / speed, repeat: Infinity, ease: 'easeInOut', delay: (i * 2) / speed }
                : undefined
            }
          />
        ))}
      </div>

      {/* Noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 select-none"
        style={{
          backgroundImage: `url("${noiseDataUri}")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '16px 16px',
          opacity: Math.min(noiseIntensity, 0.5),
          mixBlendMode: 'overlay',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className={cn('relative z-10', className)}>{children}</div>
    </div>
  );
}

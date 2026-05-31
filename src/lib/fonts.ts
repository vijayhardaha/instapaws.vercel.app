import { Solway, Zilla_Slab, Courier_Prime } from 'next/font/google';

/**
 * Heading font — Solway (sans-serif).
 * Weights: 400 (regular), 600 (semibold), 700 (bold).
 * No italic variant available in Google Fonts.
 */
export const headingFont = Solway({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  display: 'swap',
  preload: true,
});

/**
 * Body font — Zilla Slab (slab serif).
 * Weights: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold).
 * Includes italic styles for all weights.
 */
export const bodyFont = Zilla_Slab({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  preload: true,
});

/**
 * Mono font — Courier Prime (monospace).
 * Weights: 400 (regular), 700 (bold).
 * Includes italic styles for all weights.
 */
export const monoFont = Courier_Prime({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  preload: true,
});

/**
 * Combined class string for the <html> element.
 * Applies all font CSS variables so they're available throughout the app.
 */
export const fontClassNames = `${headingFont.variable} ${bodyFont.variable} ${monoFont.variable}`;

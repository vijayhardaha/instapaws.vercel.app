import Link from 'next/link';

/**
 * InstaPaws site logo — muted orange paw print + text.
 * Not playful. Serious, clean, trustworthy.
 *
 * @param root0
 * @param root0.className
 */
export function SiteLogo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className ?? ''}`} aria-label="InstaPaws — Home">
      {/* Paw print icon */}
      <svg
        viewBox="0 0 40 40"
        className="h-8 w-8 shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M20 24C23.3137 24 26 21.3137 26 18C26 14.6863 23.3137 12 20 12C16.6863 12 14 14.6863 14 18C14 21.3137 16.6863 24 20 24Z"
          className="fill-[oklch(0.62_0.14_45)]"
          opacity="0.85"
        />
        <ellipse cx="12" cy="13" rx="3.5" ry="4" className="fill-[oklch(0.62_0.14_45)]" opacity="0.7" />
        <ellipse cx="28" cy="13" rx="3.5" ry="4" className="fill-[oklch(0.62_0.14_45)]" opacity="0.7" />
        <ellipse cx="8" cy="21" rx="3" ry="3.5" className="fill-[oklch(0.62_0.14_45)]" opacity="0.7" />
        <ellipse cx="32" cy="21" rx="3" ry="3.5" className="fill-[oklch(0.62_0.14_45)]" opacity="0.7" />
      </svg>
      <span className="text-foreground text-lg font-bold tracking-tight">
        Insta<span className="text-accent">Paws</span>
      </span>
    </Link>
  );
}

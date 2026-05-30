import { Loader2, PawPrint } from 'lucide-react';

/**
 * Global loading state — shown while page content is streaming.
 * Uses the app's muted, serious design language.
 *
 * @returns {unknown} The loading state content.
 */
export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16">
      <PawPrint className="text-muted-foreground/30 mb-4 h-10 w-10" aria-hidden="true" />
      <Loader2 className="text-accent h-6 w-6 animate-spin" aria-hidden="true" />
      <p className="text-muted-foreground mt-4 text-sm">Loading...</p>
    </div>
  );
}

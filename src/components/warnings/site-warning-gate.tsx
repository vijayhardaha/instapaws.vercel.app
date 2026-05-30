'use client';

import { useState, useEffect } from 'react';

import { AlertTriangle, ShieldCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const STORAGE_KEY = 'instapaws-warning-accepted';

/**
 * Site-level content warning overlay.
 * Blocks all content until user acknowledges the disturbing nature of the site.
 * Persists acceptance in session storage.
 */
export function SiteWarningGate() {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored === 'true') {
      setAccepted(true);
    }
  }, []);

  const handleAccept = () => {
    setAccepted(true);
    sessionStorage.setItem(STORAGE_KEY, 'true');
  };

  const handleLearnMore = () => {
    // Since this is a client component & we can't directly router.push inside
    // the same render cycle easily, we just navigate via window location
    window.location.href = '/about';
  };

  // If accepted, render nothing (gate is transparent)
  if (accepted) return null;

  return (
    <div className="bg-background fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <Card className="mx-auto max-w-lg p-8 text-center shadow-xl">
        {/* Icon */}
        <div className="bg-destructive/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
          <AlertTriangle className="text-destructive h-8 w-8" aria-hidden="true" />
        </div>

        {/* Warning */}
        <h1 className="text-foreground text-2xl font-bold tracking-tight">Content Warning</h1>
        <p className="text-muted-foreground mt-4 text-base leading-relaxed">
          This site contains disturbing content showing harm to dogs.
          <strong className="text-foreground mt-2 block">Viewer discretion is strongly advised.</strong>
        </p>

        {/* Mission */}
        <div className="bg-muted mt-6 rounded-lg p-4">
          <p className="text-foreground flex items-center justify-center gap-2 text-sm font-medium">
            <ShieldCheck className="text-accent h-4 w-4" />
            Our mission is to expose and stop cruelty.
          </p>
          <p className="text-muted-foreground mt-2 text-xs">
            We archive and report Instagram videos showing abuse. All content is manually reviewed. No videos are hosted
            on this site.
          </p>
        </div>

        {/* Action */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button size="lg" onClick={handleAccept} className="w-full sm:w-auto">
            I Understand — Enter Site
          </Button>
          <Button size="lg" variant="outline" onClick={handleLearnMore} className="w-full sm:w-auto">
            Learn Why This Exists
          </Button>
        </div>

        <p className="text-muted-foreground mt-6 text-xs">
          By entering, you confirm you are aware of the nature of this content.
        </p>
      </Card>
    </div>
  );
}

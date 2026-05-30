'use client';

import { useState, type JSX } from 'react';

import { AlertTriangle, ShieldCheck } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const STORAGE_KEY = 'instapaws-warning-accepted';
const DAYS_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Site-level content warning popup.
 * Shows as a centered popup with blur backdrop on every page except the about page.
 * Persists acceptance in localStorage for 7 days.
 */
type GateState = 'visible' | 'hidden';

/**
 * Site-level content warning popup.
 * Shows as a centered popup with blur backdrop on every page except the about page.
 * Persists acceptance in localStorage for 7 days.
 *
 * @returns {JSX.Element} The warning popup or null if dismissed/on about page.
 */
export function SiteWarningGate(): JSX.Element {
  const pathname = usePathname();
  const [gateState, setGateState] = useState<GateState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const timestamp = Number(stored);
        if (Date.now() - timestamp < DAYS_MS) {
          return 'hidden';
        }
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // localStorage not available (SSR)
    }
    return 'visible';
  });

  const handleAccept = () => {
    setGateState('hidden');
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  };

  const handleLearnMore = () => {
    window.location.href = '/about';
  };

  if (gateState === 'hidden') return <></>;

  // Only exclude the about page (where users learn about the mission)
  if (!pathname || pathname === '/about') return <></>;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <Card className="mx-auto w-full max-w-lg p-8 text-center shadow-2xl">
        {/* Icon */}
        <div className="bg-destructive/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
          <AlertTriangle className="text-destructive h-8 w-8" aria-hidden="true" />
        </div>

        <div className="space-y-2">
          {/* Warning */}
          <h1 className="text-foreground text-3xl font-bold tracking-tight">Content Warning</h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            This site contains disturbing content showing harm to dogs.
            <strong className="text-foreground mt-2 block">Viewer discretion is strongly advised.</strong>
          </p>

          {/* Mission */}
          <div className="bg-muted rounded-lg p-4">
            <p className="text-foreground flex items-center justify-center gap-2 font-semibold">
              <ShieldCheck className="text-accent h-4 w-4" />
              Our mission is to expose and stop cruelty.
            </p>
            <p className="text-muted-foreground mt-2 text-sm">
              We archive and report Instagram videos showing abuse. All content is manually reviewed. No videos are
              hosted on this site.
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
        </div>

        <p className="text-muted-foreground mt-2 text-xs">
          By entering, you confirm you are aware of the nature of this content.
        </p>
      </Card>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';

import { AlertTriangle, X } from 'lucide-react';

import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'instapaws-emergency-dismissed';

/**
 * Emergency banner displayed at the top of every page.
 * Warns users about immediate danger situations.
 * Dismissible with session storage persistence.
 */
export function EmergencyBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      setVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    sessionStorage.setItem(STORAGE_KEY, 'true');
  };

  if (!visible) return null;

  return (
    <div
      role="alert"
      className="bg-destructive text-destructive-foreground flex items-center justify-center gap-3 px-4 py-2.5 text-sm"
    >
      <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span className="text-center text-xs leading-tight font-medium sm:text-sm">
        If a dog is in immediate danger, contact local authorities immediately.
        <strong className="ml-1">Do not engage the poster.</strong>
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="text-destructive-foreground/70 hover:text-destructive-foreground ml-auto h-6 w-6 shrink-0 rounded-full"
        onClick={handleDismiss}
        aria-label="Dismiss emergency banner"
      >
        <X className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}

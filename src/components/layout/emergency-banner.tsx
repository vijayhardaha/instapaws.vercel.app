'use client';

import { useState, type JSX } from 'react';

import { AlertTriangle, X } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'instapaws-emergency-dismissed';

/**
 * Emergency banner displayed at the top of every page.
 * Warns users about immediate danger situations.
 * Dismissible with session storage persistence.
 *
 * @returns {JSX.Element} The emergency banner element, or null if dismissed.
 */
export function EmergencyBanner(): JSX.Element {
  const [visible, setVisible] = useState(() => {
    try {
      return !sessionStorage.getItem(STORAGE_KEY);
    } catch {
      return true;
    }
  });

  const handleDismiss = () => {
    setVisible(false);
    sessionStorage.setItem(STORAGE_KEY, 'true');
  };

  if (!visible) return <></>;

  return (
    <div role="alert" className="bg-destructive text-destructive-foreground py-2.5 text-sm">
      <Container className="flex items-center justify-center gap-3">
        <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span className="text-center text-xs leading-tight font-semibold sm:text-sm">
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
      </Container>
    </div>
  );
}

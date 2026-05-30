'use client';

import { useState, type ReactNode, type FormEvent } from 'react';

import { ShieldCheck, LockKeyhole, AlertTriangle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const AUTH_KEY = 'instapaws-moderator-auth';
const MODERATOR_PASSWORD = 'instapaws-mod-2026';

interface Props {
  children: ReactNode;
}

/**
 * Simple password gate for the moderation queue (v1).
 * Stores auth state in sessionStorage for the current browser session.
 *
 * @param {unknown} props - Component props.
 * @param {unknown} props.children - Child content to render when authenticated.
 *
 * @returns {ReactNode} The password gate or authenticated content.
 */
export function ModerateAuthGate({ children }: Props) {
  const [authenticated, setAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem(AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (password === MODERATOR_PASSWORD) {
      setAuthenticated(true);
      sessionStorage.setItem(AUTH_KEY, 'true');
    } else {
      setError('Incorrect password.');
    }
  };

  if (authenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="bg-accent/10 mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full">
            <LockKeyhole className="text-accent h-7 w-7" />
          </div>
          <h1 className="text-xl font-bold">Moderator Access</h1>
          <p className="text-muted-foreground mt-1 text-sm">Enter the moderator password to access the review queue.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="mod-password" className="text-sm font-semibold">
                Password
              </label>
              <Input
                id="mod-password"
                type="password"
                placeholder="Enter moderator password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                required
              />
            </div>

            {error && (
              <div className="bg-destructive/10 text-destructive flex items-start gap-2 rounded-md p-3 text-sm">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button type="submit" className="w-full">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Authenticate
            </Button>
          </form>
          <p className="text-muted-foreground mt-4 text-center text-xs">
            This is a basic v1 gate. Only authorized moderators should access this page.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

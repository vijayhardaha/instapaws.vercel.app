'use client';

import { useState, type JSX } from 'react';

import { AlertTriangle, ArrowLeft, ExternalLink, ShieldCheck, MessageSquareWarning } from 'lucide-react';
import Link from 'next/link';

import { Container } from '@/components/layout/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ABUSE_TYPE_LABELS, REPORT_STATUS_LABELS, type VideoReport } from '@/lib/types';

interface Props {
  video: VideoReport;
}

/**
 * Video detail client component with content warning gate and report details.
 *
 * @param {unknown} props - Component props.
 * @param {unknown} props.video - The video report data to display.
 *
 * @returns {JSX.Element} The video detail page with content warning gate.
 */
export function VideoDetailClient({ video }: Props): JSX.Element {
  const [warningAccepted, setWarningAccepted] = useState(false);

  return (
    <>
      <div className="border-border bg-background border-b">
        <Container className="py-3">
          <Button asChild variant="ghost" size="sm">
            <Link href="/videos">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Video Library
            </Link>
          </Button>
        </Container>
      </div>

      <section className="bg-background flex-1">
        <Container className="py-3">
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={video.isGraphic ? 'destructive' : 'secondary'} className="text-sm">
                {ABUSE_TYPE_LABELS[video.abuseType]}
              </Badge>
              {video.isGraphic && (
                <Badge variant="destructive" className="bg-destructive/20 text-destructive">
                  Graphic Content
                </Badge>
              )}
              <Badge variant="outline">{REPORT_STATUS_LABELS[video.status]}</Badge>
            </div>
            <p className="text-muted-foreground mt-3 text-sm">
              Reported{' '}
              {new Date(video.reportedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          {/* Content Warning Gate */}
          {!warningAccepted ? (
            <Card className="border-destructive/30">
              <CardContent className="flex flex-col items-center py-16 text-center">
                <AlertTriangle className="text-destructive h-12 w-12" />
                <h2 className="mt-4 text-xl font-bold">Content Warning</h2>
                <p className="text-muted-foreground mt-2 text-sm">
                  This video may contain disturbing content showing harm to dogs. Viewer discretion is strongly advised.
                </p>
                {video.isGraphic && (
                  <p className="text-destructive mt-2 text-sm font-semibold">
                    This video has been marked as potentially graphic.
                  </p>
                )}
                <div className="mt-6 flex gap-3">
                  <Button onClick={() => setWarningAccepted(true)}>I Understand — Show Video</Button>
                  <Button asChild variant="outline">
                    <Link href="/videos">Go Back</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="border-border bg-muted mb-8 overflow-hidden rounded-lg border">
              <div className="flex aspect-video items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground text-sm">[Instagram Embed Placeholder]</p>
                  <p className="text-muted-foreground/60 mt-1 text-xs">{video.instagramUrl}</p>
                </div>
              </div>
            </div>
          )}

          {/* Context Overlay */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-muted-foreground flex items-center gap-2 text-sm font-semibold tracking-widest uppercase">
                  <MessageSquareWarning className="h-4 w-4" />
                  Report Details
                </h3>
                <p className="text-foreground/80 mt-3 text-sm leading-relaxed">{video.description}</p>
                {video.location && (
                  <p className="text-muted-foreground/60 mt-4 text-xs">📍 Location: {video.location}</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-muted-foreground flex items-center gap-2 text-sm font-semibold tracking-widest uppercase">
                  <ShieldCheck className="h-4 w-4" />
                  Status & Actions
                </h3>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Current Status</dt>
                    <dd className="font-semibold">{REPORT_STATUS_LABELS[video.status]}</dd>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Reported to Instagram</dt>
                    <dd className="font-semibold">
                      {video.reportedToInstagramAt
                        ? new Date(video.reportedToInstagramAt).toLocaleDateString()
                        : 'Not yet reported'}
                    </dd>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Instagram Response</dt>
                    <dd className="font-semibold">{video.instagramResponse ?? 'Awaiting response'}</dd>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Views</dt>
                    <dd className="font-semibold">{video.viewCount}</dd>
                  </div>
                </dl>
                <div className="mt-6">
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <a href={video.instagramUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-3.5 w-3.5" />
                      Report to Instagram Directly
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Emergency Disclaimer */}
          <div className="bg-destructive/5 mt-8 flex items-start gap-3 rounded-lg p-4">
            <AlertTriangle className="text-destructive mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <p className="text-destructive text-sm font-semibold">If the dog is in immediate danger:</p>
              <p className="text-muted-foreground mt-1 text-xs">
                Contact your local animal welfare authorities or police immediately.{' '}
                <strong>Do not engage the person posting the content.</strong>
              </p>
            </div>
          </div>

          <p className="text-muted-foreground mt-8 text-center text-xs">
            InstaPaws does not host this video. It is embedded from Instagram for reporting and awareness purposes under
            fair use.
          </p>
        </Container>
      </section>
    </>
  );
}

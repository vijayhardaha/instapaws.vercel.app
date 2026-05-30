'use client';

import { useState, useTransition, type JSX } from 'react';

import { CheckCircle, XCircle, ArrowRight, MessageSquare } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { updateVideoModeration } from '@/lib/actions/videos';
import type { ModerationStatusEnum } from '@/lib/supabase/database.types';
import { ABUSE_TYPE_LABELS, REPORT_STATUS_LABELS, type VideoReport } from '@/lib/types';

interface Props {
  initialVideos: VideoReport[];
}

/**
 * Moderation queue client — displays unmoderated videos
 * with approve/reject actions and moderator notes.
 *
 * @param {unknown} props - Component props.
 * @param {unknown} props.initialVideos - Initial list of unmoderated videos.
 *
 * @returns {JSX.Element} The moderation queue with approve/reject actions.
 */
export function ModerateClient({ initialVideos }: Props): JSX.Element {
  const [videos, setVideos] = useState(initialVideos);
  const [isPending, startTransition] = useTransition();
  const [notes, setNotes] = useState<Record<string, string>>({});

  const handleModeration = (id: string, status: ModerationStatusEnum) => {
    startTransition(async () => {
      const result = await updateVideoModeration(id, status, notes[id]);
      if (result.success) {
        setVideos((prev) => prev.filter((v) => v.id !== id));
      }
    });
  };

  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <CheckCircle className="text-accent h-12 w-12" />
        <h3 className="mt-4 text-lg font-semibold">All caught up!</h3>
        <p className="text-muted-foreground mt-2 text-sm">No videos pending moderation.</p>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/videos">View Video Library</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground text-sm">
        {videos.length} video{videos.length !== 1 ? 's' : ''} pending moderation.
      </p>

      {videos.map((video) => (
        <Card key={video.id} className="border-destructive/20">
          <CardHeader>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={video.isGraphic ? 'destructive' : 'secondary'}>
                {ABUSE_TYPE_LABELS[video.abuseType]}
              </Badge>
              {video.isGraphic && (
                <Badge variant="destructive" className="bg-destructive/20 text-destructive">
                  Graphic
                </Badge>
              )}
              <Badge variant="outline">{REPORT_STATUS_LABELS[video.status]}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">{video.description}</p>
            {video.location && <p className="text-muted-foreground/60 mt-2 text-xs">📍 {video.location}</p>}
            <p className="text-muted-foreground/50 mt-2 text-xs">
              Reported: {new Date(video.reportedAt).toLocaleDateString()}
            </p>
            <a
              href={video.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent mt-2 inline-flex items-center gap-1 text-xs hover:underline"
            >
              View Original <ArrowRight className="h-3 w-3" />
            </a>

            <div className="mt-4">
              <label className="text-muted-foreground flex items-center gap-2 text-sm">
                <MessageSquare className="h-3.5 w-3.5" />
                Moderator Notes
              </label>
              <Textarea
                placeholder="Add notes about this submission..."
                value={notes[video.id] ?? ''}
                onChange={(e) => setNotes((prev) => ({ ...prev, [video.id]: e.target.value }))}
                rows={2}
                className="mt-1"
              />
            </div>
          </CardContent>
          <CardFooter className="border-border flex gap-3 border-t pt-4">
            <Button
              size="sm"
              variant="outline"
              className="border-accent text-accent hover:bg-accent/10"
              disabled={isPending}
              onClick={() => handleModeration(video.id, 'approved')}
            >
              <CheckCircle className="mr-1 h-3.5 w-3.5" />
              Approve
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-destructive text-destructive hover:bg-destructive/10"
              disabled={isPending}
              onClick={() => handleModeration(video.id, 'rejected')}
            >
              <XCircle className="mr-1 h-3.5 w-3.5" />
              Reject
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { ABUSE_TYPE_LABELS, REPORT_STATUS_LABELS, type VideoReport } from '@/lib/types';
import { cn } from '@/lib/utils';

interface VideoCardProps {
  video: VideoReport;
}

/**
 * Card displaying a video report summary.
 * Used on the homepage, video library, and similar listings.
 *
 * @param {unknown} props - Component props.
 * @param {unknown} props.video - The video report data.
 *
 * @returns {unknown} The video card element.
 */
export function VideoCard({ video }: VideoCardProps) {
  return (
    <Card key={video.id} className="flex flex-col transition-shadow hover:shadow-md">
      <CardHeader>
        <Link href={`/videos/${video.id}`}>
          <div
            className={cn(
              'mb-3 flex aspect-video items-center justify-center rounded-md',
              video.isGraphic ? 'bg-destructive/10' : 'bg-muted'
            )}
          >
            <span className="text-muted-foreground text-sm">
              {video.isGraphic ? '⚠️ Graphic Content' : '⚠️ Content Warning'}
            </span>
          </div>
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={video.isGraphic ? 'destructive' : 'secondary'}>{ABUSE_TYPE_LABELS[video.abuseType]}</Badge>
          {video.isGraphic && (
            <Badge variant="destructive" className="bg-destructive/20 text-destructive">
              Graphic
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground line-clamp-3 text-sm">{video.description}</p>
        {video.location && <p className="text-muted-foreground/60 mt-2 text-xs">📍 {video.location}</p>}
      </CardContent>
      <CardFooter className="border-border flex items-center justify-between border-t pt-4">
        <Badge variant="outline" className="text-xs">
          {REPORT_STATUS_LABELS[video.status]}
        </Badge>
        <Button asChild variant="ghost" size="sm">
          <Link href={`/videos/${video.id}`}>
            Details <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

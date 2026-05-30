import { Calendar, Heart } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { type SuccessStory } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface SuccessStoryCardProps {
  story: SuccessStory;
}

/**
 * Card displaying a success story with icon, title, date, summary, and outcome.
 *
 * @param {unknown} props - Component props.
 * @param {unknown} props.story - The success story data.
 *
 * @returns {unknown} The success story card element.
 */
export function SuccessStoryCard({ story }: SuccessStoryCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="bg-accent/10 mb-2 flex h-10 w-10 items-center justify-center rounded-full">
          <Heart className="text-accent h-5 w-5" aria-hidden="true" />
        </div>
        <h3 className="text-base leading-tight font-semibold">{story.title}</h3>
        <div className="mt-2 flex items-center gap-2">
          <Calendar className="text-muted-foreground h-3.5 w-3.5" aria-hidden="true" />
          <span className="text-muted-foreground text-xs">{formatDate(story.date, 'long')}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground text-sm leading-relaxed">{story.summary}</p>
      </CardContent>
      <CardFooter className="border-border border-t pt-4">
        <Badge variant="outline" className="text-xs">
          Outcome: {story.outcome}
        </Badge>
      </CardFooter>
    </Card>
  );
}

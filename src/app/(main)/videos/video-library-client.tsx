'use client';

import { useState, useMemo } from 'react';

import { Search, Filter, ArrowRight, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { SectionHeading } from '@/components/shared/section-heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getMockVideos } from '@/lib/constants';
import {
  ABUSE_TYPE_LABELS,
  REPORT_STATUS_LABELS,
  type AbuseType,
  type ReportStatus,
  type VideoReport,
} from '@/lib/types';
import { cn } from '@/lib/utils';

const ALL_ABUSE_TYPES: AbuseType[] = [
  'physical-abuse',
  'neglect',
  'fighting',
  'baiting',
  'sexual-abuse',
  'hoarding',
  'abandonment',
  'other',
];

const ALL_STATUSES: ReportStatus[] = [
  'pending-review',
  'under-investigation',
  'confirmed',
  'action-taken',
  'dismissed',
  'escalated',
];

interface Props {
  initialVideos?: VideoReport[];
  initialTotal?: number;
}

const PAGE_SIZE = 12;

/**
 * Video library with search, filter, sort, and pagination.
 *
 * @param root0
 * @param root0.initialVideos
 * @param root0.initialTotal
 */
export function VideoLibraryClient({ initialVideos, initialTotal }: Props) {
  const allVideos = useMemo(() => (initialVideos?.length ? initialVideos : getMockVideos()), [initialVideos]);
  const totalCount = initialTotal ?? allVideos.length;
  const [searchQuery, setSearchQuery] = useState('');
  const [abuseFilter, setAbuseFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showGraphic, setShowGraphic] = useState(false);
  const [page, setPage] = useState(1);

  const filteredVideos = useMemo(() => {
    let results = [...allVideos].filter((v) => v.moderationStatus === 'approved');
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (v) =>
          v.description.toLowerCase().includes(q)
          || ABUSE_TYPE_LABELS[v.abuseType].toLowerCase().includes(q)
          || (v.location && v.location.toLowerCase().includes(q))
      );
    }
    if (abuseFilter !== 'all') results = results.filter((v) => v.abuseType === abuseFilter);
    if (statusFilter !== 'all') results = results.filter((v) => v.status === statusFilter);
    if (!showGraphic) results = results.filter((v) => !v.isGraphic);
    if (sortBy === 'newest')
      results.sort((a, b) => new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime());
    else if (sortBy === 'oldest')
      results.sort((a, b) => new Date(a.reportedAt).getTime() - new Date(b.reportedAt).getTime());
    else if (sortBy === 'status') results.sort((a, b) => a.status.localeCompare(b.status));
    return results;
  }, [allVideos, searchQuery, abuseFilter, statusFilter, sortBy, showGraphic]);

  const totalPages = Math.max(1, Math.ceil(filteredVideos.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginatedVideos = filteredVideos.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const clearFilters = () => {
    setSearchQuery('');
    setAbuseFilter('all');
    setStatusFilter('all');
    setSortBy('newest');
    setShowGraphic(false);
    setPage(1);
  };

  // Reset to page 1 when filters change
  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setPage(1);
  };
  const handleAbuseFilterChange = (val: string) => {
    setAbuseFilter(val);
    setPage(1);
  };
  const handleStatusFilterChange = (val: string) => {
    setStatusFilter(val);
    setPage(1);
  };
  const handleSortChange = (val: string) => {
    setSortBy(val);
    setPage(1);
  };
  const handleShowGraphicChange = (val: boolean) => {
    setShowGraphic(val);
    setPage(1);
  };

  // Generate page numbers to display
  const getPageNumbers = (): (number | 'ellipsis')[] => {
    const pages: (number | 'ellipsis')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (safePage > 3) pages.push('ellipsis');
      const start = Math.max(2, safePage - 1);
      const end = Math.min(totalPages - 1, safePage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (safePage < totalPages - 2) pages.push('ellipsis');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <>
      <section className="border-border bg-primary text-primary-foreground border-b">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Archive"
            title="Video Library"
            description="Searchable collection of Instagram videos flagged for dog abuse. Each entry includes context, current status, and actions taken."
            className="text-primary-foreground"
          />
          <p className="text-primary-foreground/70 mt-2 max-w-2xl text-sm">
            Showing {filteredVideos.length} of {totalCount} confirmed reports.
          </p>
        </div>
      </section>

      <section className="border-border bg-background border-b">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search descriptions, types, locations..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-9"
                aria-label="Search videos"
              />
            </div>
            <Select value={abuseFilter} onValueChange={handleAbuseFilterChange}>
              <SelectTrigger className="w-full sm:w-44" aria-label="Filter by abuse type">
                <Filter className="mr-2 h-3.5 w-3.5" />
                <SelectValue placeholder="Abuse Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {ALL_ABUSE_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {ABUSE_TYPE_LABELS[t]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
              <SelectTrigger className="w-full sm:w-44" aria-label="Filter by status">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {ALL_STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {REPORT_STATUS_LABELS[s]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-full sm:w-36" aria-label="Sort by">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="status">By Status</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <label className="text-muted-foreground mt-3 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showGraphic}
              onChange={(e) => handleShowGraphicChange(e.target.checked)}
              className="border-border accent-accent h-4 w-4 rounded"
            />
            Include graphic content
          </label>
        </div>
      </section>

      <section className="bg-background flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          {filteredVideos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <AlertTriangle className="text-muted-foreground/50 h-8 w-8" />
              <h3 className="mt-4 text-lg font-semibold">No videos found</h3>
              <p className="text-muted-foreground mt-2 text-sm">Try adjusting your search or filters.</p>
              <Button variant="outline" className="mt-4" onClick={clearFilters}>
                Clear all filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {paginatedVideos.map((video) => (
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
                        <Badge variant={video.isGraphic ? 'destructive' : 'secondary'}>
                          {ABUSE_TYPE_LABELS[video.abuseType]}
                        </Badge>
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
                      <p className="text-muted-foreground/50 mt-2 text-xs">
                        Reported: {new Date(video.reportedAt).toLocaleDateString()}
                      </p>
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
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav className="mt-10 flex items-center justify-center gap-1" aria-label="Video library pagination">
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={safePage <= 1}
                    onClick={() => setPage(safePage - 1)}
                    aria-label="Previous page"
                    className="px-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="ml-1 hidden sm:inline">Previous</span>
                  </Button>

                  <div className="flex items-center gap-0.5">
                    {getPageNumbers().map((p, i) =>
                      p === 'ellipsis' ? (
                        <span
                          key={`e-${i}`}
                          className="text-muted-foreground flex h-8 w-8 items-center justify-center text-sm"
                        >
                          &hellip;
                        </span>
                      ) : (
                        <Button
                          key={p}
                          variant={p === safePage ? 'outline' : 'ghost'}
                          size="sm"
                          className="h-8 w-8 p-0 text-sm"
                          onClick={() => setPage(p)}
                          aria-label={`Page ${p}`}
                          aria-current={p === safePage ? 'page' : undefined}
                        >
                          {p}
                        </Button>
                      )
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={safePage >= totalPages}
                    onClick={() => setPage(safePage + 1)}
                    aria-label="Next page"
                    className="px-2"
                  >
                    <span className="mr-1 hidden sm:inline">Next</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </nav>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}

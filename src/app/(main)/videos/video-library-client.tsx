'use client';

import { useState, useMemo, type JSX } from 'react';

import { Search, Filter, AlertTriangle } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { HeroBanner } from '@/components/shared/hero-banner';
import { PaginationBar } from '@/components/shared/pagination-bar';
import { VideoCard } from '@/components/shared/video-card';
import { Button } from '@/components/ui/button';
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

/** All available abuse type filter options. */
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

/** All available report status filter options. */
const ALL_STATUSES: ReportStatus[] = [
  'pending-review',
  'under-investigation',
  'confirmed',
  'action-taken',
  'dismissed',
  'escalated',
];

/**
 * Props for the video library client component.
 *
 * @type {Props}
 * @property {VideoReport[]} [initialVideos] - Initial list of videos to display.
 * @property {number} [initialTotal] - Total number of available videos.
 */
interface Props {
  initialVideos?: VideoReport[];
  initialTotal?: number;
}

/** Number of videos to display per page. */
const PAGE_SIZE = 12;

/**
 * Filter a list of videos by search query, abuse type, status, and graphic content flag.
 *
 * @param {VideoReport[]} videos - List of video reports to filter.
 * @param {string} searchQuery - Search query string.
 * @param {string} abuseFilter - Abuse type filter value.
 * @param {string} statusFilter - Status filter value.
 * @param {boolean} showGraphic - Whether to include graphic content.
 * @param {string} sortBy - Sort order.
 *
 * @returns {JSX.Element} The filtered and sorted video list.
 */
function filterVideos(
  videos: VideoReport[],
  searchQuery: string,
  abuseFilter: string,
  statusFilter: string,
  showGraphic: boolean,
  sortBy: string
): VideoReport[] {
  let results = videos.filter((v) => v.moderationStatus === 'approved');

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

  if (sortBy === 'newest') results.sort((a, b) => new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime());
  else if (sortBy === 'oldest')
    results.sort((a, b) => new Date(a.reportedAt).getTime() - new Date(b.reportedAt).getTime());
  else if (sortBy === 'status') results.sort((a, b) => a.status.localeCompare(b.status));

  return results;
}

/**
 * Video library with search, filter, sort, and pagination.
 *
 * @param {{ initialVideos?: VideoReport[]; initialTotal?: number }} props - Component props.
 * @param {VideoReport[]} [props.initialVideos] - Initial list of videos to display.
 * @param {number} [props.initialTotal] - Total number of available videos.
 *
 * @returns {JSX.Element} The video library with search, filters, and pagination.
 */
export function VideoLibraryClient({ initialVideos, initialTotal }: Props): JSX.Element {
  const allVideos = useMemo(() => (initialVideos?.length ? initialVideos : getMockVideos()), [initialVideos]);
  const totalCount = initialTotal ?? allVideos.length;

  const [searchQuery, setSearchQuery] = useState('');
  const [abuseFilter, setAbuseFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showGraphic, setShowGraphic] = useState(false);
  const [page, setPage] = useState(1);

  const filteredVideos = useMemo(
    () => filterVideos(allVideos, searchQuery, abuseFilter, statusFilter, showGraphic, sortBy),
    [allVideos, searchQuery, abuseFilter, statusFilter, showGraphic, sortBy]
  );

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

  const handleFilterChange = (setter: (val: string) => void) => (val: string) => {
    setter(val);
    setPage(1);
  };

  return (
    <>
      <HeroBanner
        tag="Archive"
        title="Video Library"
        description="Searchable collection of Instagram videos flagged for dog abuse. Each entry includes context, current status, and actions taken."
      >
        <p className="text-primary-foreground/70 mt-2 text-sm">
          Showing {filteredVideos.length} of {totalCount} confirmed reports.
        </p>
      </HeroBanner>

      {/* Filters */}
      <section className="border-border bg-background border-b">
        <Container className="py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search descriptions, types, locations..."
                value={searchQuery}
                onChange={(e) => handleFilterChange(setSearchQuery)(e.target.value)}
                className="pl-9"
                aria-label="Search videos"
              />
            </div>
            <Select value={abuseFilter} onValueChange={handleFilterChange(setAbuseFilter)}>
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
            <Select value={statusFilter} onValueChange={handleFilterChange(setStatusFilter)}>
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
            <Select value={sortBy} onValueChange={handleFilterChange(setSortBy)}>
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
              onChange={(e) => {
                setShowGraphic(e.target.checked);
                setPage(1);
              }}
              className="border-border accent-accent h-4 w-4 rounded"
            />
            Include graphic content
          </label>
        </Container>
      </section>

      {/* Results */}
      <section className="bg-background flex-1">
        <Container className="py-8">
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
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
              <PaginationBar currentPage={safePage} totalPages={totalPages} onPageChange={setPage} />
            </>
          )}
        </Container>
      </section>
    </>
  );
}

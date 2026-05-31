'use client';

import type { JSX } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

/**
 * Props for the pagination bar component.
 *
 * @type {PaginationBarProps}
 * @property {number} currentPage - The active page number.
 * @property {number} totalPages - The total number of pages.
 * @property {(page: number) => void} onPageChange - Callback when page changes.
 */
interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * Generate page numbers to display with ellipsis for large page counts.
 *
 * @param {number} currentPage - The active page number.
 * @param {number} totalPages - The total number of pages.
 *
 * @returns {JSX.Element} Array of page numbers and ellipsis markers.
 */
function getPageNumbers(currentPage: number, totalPages: number): (number | 'ellipsis')[] {
  const pages: (number | 'ellipsis')[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push('ellipsis');
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push('ellipsis');
    pages.push(totalPages);
  }
  return pages;
}

/**
 * Pagination bar with page numbers, previous/next buttons, and ellipsis.
 *
 * @param {PaginationBarProps} props - Component props.
 * @param {number} [props.currentPage] - The active page number.
 * @param {number} [props.totalPages] - The total number of pages.
 * @param {(page: number) => void} [props.onPageChange] - Callback when page changes.
 *
 * @returns {JSX.Element} The pagination bar element, or null if totalPages <= 1.
 */
export function PaginationBar({ currentPage, totalPages, onPageChange }: PaginationBarProps): JSX.Element {
  if (totalPages <= 1) return <></>;

  return (
    <nav className="mt-10 flex items-center justify-center gap-1" aria-label="Pagination">
      <Button
        variant="ghost"
        size="sm"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
        className="px-2"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="ml-1 hidden sm:inline">Previous</span>
      </Button>

      <div className="flex items-center gap-0.5">
        {getPageNumbers(currentPage, totalPages).map((p, i) =>
          p === 'ellipsis' ? (
            <span key={`e-${i}`} className="text-muted-foreground flex h-8 w-8 items-center justify-center text-sm">
              &hellip;
            </span>
          ) : (
            <Button
              key={p}
              variant={p === currentPage ? 'outline' : 'ghost'}
              size="sm"
              className="h-8 w-8 p-0 text-sm"
              onClick={() => onPageChange(p)}
              aria-label={`Page ${p}`}
              aria-current={p === currentPage ? 'page' : undefined}
            >
              {p}
            </Button>
          )
        )}
      </div>

      <Button
        variant="ghost"
        size="sm"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
        className="px-2"
      >
        <span className="mr-1 hidden sm:inline">Next</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  );
}

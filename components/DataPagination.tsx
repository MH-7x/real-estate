import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import React from "react";

export function DataPagination({
  data,
}: {
  data: {
    page: number;
    limit: number;
    totalPages: number;
  };
}) {
  const { page, limit, totalPages } = data;

  // Handle edge case where totalPages <= 3
  const visiblePages: number[] = [];
  if (totalPages <= 3) {
    // Show all pages if total pages are 3 or less
    for (let i = 1; i <= totalPages; i++) {
      visiblePages.push(i);
    }
  } else {
    // Always include the first page
    visiblePages.push(1);

    // Include pages around the current page (if applicable)
    if (page > 2) visiblePages.push(page - 1);
    if (page > 1 && page < totalPages) visiblePages.push(page);
    if (page < totalPages - 1) visiblePages.push(page + 1);

    // Always include the last page
    if (visiblePages[visiblePages.length - 1] !== totalPages) {
      visiblePages.push(totalPages);
    }
  }

  return (
    <Pagination className="mt-5">
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            disabled={page === 1}
            href={`?page=${page - 1}&limit=${limit}`}
            aria-disabled={page === 1}
          />
        </PaginationItem>

        {/* Render Pagination Items */}
        {visiblePages.map((currentPage, index) => (
          <React.Fragment key={`page-${currentPage}`}>
            {/* Add ellipsis for skipped pages */}
            {index > 0 && currentPage !== visiblePages[index - 1] + 1 && (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {/* Render Page Link */}
            <PaginationItem>
              <PaginationLink
                isActive={page === currentPage}
                href={`?page=${currentPage}&limit=${limit}`}
              >
                {currentPage}
              </PaginationLink>
            </PaginationItem>
          </React.Fragment>
        ))}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            href={`?page=${page + 1}&limit=${limit}`}
            aria-disabled={page === totalPages}
            disabled={page === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

"use client";
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { page, limit, totalPages } = data;

  // Function to generate the updated URL with only the page parameter modified
  const updatePageParam = (newPage: number) => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href); // Parse the current URL
      url.searchParams.set("page", newPage.toString()); // Update the page parameter
      return `${url.pathname}?${url.searchParams.toString()}`; // Return the updated URL
    }
    return "#"; // Fallback for server-side rendering
  };

  // Handle edge cases for pagination display
  const visiblePages: number[] = [];
  if (totalPages <= 3) {
    for (let i = 1; i <= totalPages; i++) {
      visiblePages.push(i);
    }
  } else {
    visiblePages.push(1);

    if (page > 2) visiblePages.push(page - 1);
    if (page > 1 && page < totalPages) visiblePages.push(page);
    if (page < totalPages - 1) visiblePages.push(page + 1);

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
            href={updatePageParam(page - 1)}
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
                href={updatePageParam(currentPage)}
              >
                {currentPage}
              </PaginationLink>
            </PaginationItem>
          </React.Fragment>
        ))}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            href={updatePageParam(page + 1)}
            aria-disabled={page === totalPages}
            disabled={page === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

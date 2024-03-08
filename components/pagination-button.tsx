"use client";

import { useMemo, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useCreateQueryString } from "@/hooks/create-query-string";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

interface PaginationButtonProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  page_index: number;
  pageCount: number;
  siblingCount?: number;
}

export function PaginationButton({
  pageCount,
  page_index,
  siblingCount = 1,
  className,
  ...props
}: PaginationButtonProps) {
  const { createQueryString } = useCreateQueryString();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // Memoize pagination range to avoid unnecessary re-renders
  const paginationRange = useMemo(() => {
    const delta = siblingCount + 2;

    const range = [];
    for (
      let i = Math.max(2, page_index - delta);
      i <= Math.min(pageCount - 1, page_index + delta);
      i++
    ) {
      range.push(i);
    }

    if (page_index - delta > 2) {
      range.unshift("...");
    }
    if (page_index + delta < pageCount - 1) {
      range.push("...");
    }

    range.unshift(1);
    if (pageCount !== 1) {
      range.push(pageCount);
    }

    return range;
  }, [pageCount, page_index, siblingCount]);

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-2",
        className
      )}
      {...props}
    >
      <Button
        aria-label="Go to first page"
        variant="outline"
        size="icon"
        className="hidden size-8 lg:flex"
        onClick={() => {
          startTransition(() => {
            router.push(
              `${pathname}?${createQueryString({
                page_index: 0,
              })}`,
              { scroll: false }
            );
          });
        }}
        disabled={page_index === 0 || isPending}
      >
        <Icons.chevronsLeft className="size-4" aria-hidden="true" />
      </Button>
      <Button
        aria-label="Go to previous page"
        variant="outline"
        size="icon"
        className="size-8"
        onClick={() => {
          startTransition(() => {
            router.push(
              `${pathname}?${createQueryString({
                page_index: page_index - 1,
              })}`,
              { scroll: false }
            );
          });
        }}
        disabled={page_index === 0 || isPending}
      >
        <Icons.chevronLeft className="size-4" aria-hidden="true" />
      </Button>
      {paginationRange.map((pageNumber, i) =>
        pageNumber === "..." ? (
          <Button
            aria-label="Page separator"
            key={i}
            variant="outline"
            size="icon"
            className="size-8"
            disabled
          >
            ...
          </Button>
        ) : (
          <Button
            aria-label={`Page ${i}`}
            key={i}
            variant={page_index === i ? "default" : "outline"}
            size="icon"
            className="size-8"
            onClick={() => {
              startTransition(() => {
                router.push(
                  `${pathname}?${createQueryString({
                    page_index: i,
                  })}`,
                  { scroll: false }
                );
              });
            }}
            disabled={isPending}
          >
            {pageNumber}
          </Button>
        )
      )}
      <Button
        aria-label="Go to next page"
        variant="outline"
        size="icon"
        className="size-8"
        onClick={() => {
          startTransition(() => {
            router.push(
              `${pathname}?${createQueryString({
                page_index: page_index + 1,
              })}`,
              { scroll: false }
            );
          });
        }}
        disabled={page_index === pageCount - 1 || isPending}
      >
        <Icons.chevronRight className="size-4" aria-hidden="true" />
      </Button>
      <Button
        aria-label="Go to last page"
        variant="outline"
        size="icon"
        className="hidden size-8 lg:flex"
        onClick={() => {
          router.push(
            `${pathname}?${createQueryString({ page_index: pageCount - 1 })}`,
            { scroll: false }
          );
        }}
        disabled={page_index === pageCount - 1 || isPending}
      >
        <Icons.chevronsRight className="size-4" aria-hidden="true" />
      </Button>
    </div>
  );
}

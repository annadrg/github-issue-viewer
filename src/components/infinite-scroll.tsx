"use client";

import { useEffect, useRef } from "react";
import { LoaderCircle } from "lucide-react";

import { useInfiniteRepositoryIssues } from "@/lib/hooks";
import { Button } from "./ui/button";

type Props = {
  issueCount: number;
};

export default function InfiniteScroll({ issueCount }: Props) {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteRepositoryIssues();

  useEffect(() => {
    const callback: IntersectionObserverCallback = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: "100px", // Load more content before user reaches the bottom
    });

    if (loadMoreRef.current && hasNextPage) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage]);

  return (
    <div ref={loadMoreRef} className="flex justify-center py-8">
      {isFetchingNextPage ? (
        <div className="text-muted-foreground flex items-center gap-2">
          <LoaderCircle className="h-5 w-5 animate-spin" />
          Loading more...
        </div>
      ) : hasNextPage ? (
        <Button
          variant="outline"
          onClick={() => fetchNextPage()}
          className="mx-auto"
          size="lg"
        >
          Load more
        </Button>
      ) : issueCount > 0 ? (
        <p className="text-muted-foreground text-sm">
          All {issueCount} issues loaded
        </p>
      ) : null}
    </div>
  );
}

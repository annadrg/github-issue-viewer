"use client";

import { useSearchParams } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchRepositoryIssues } from "./github";

export function useInfiniteRepositoryIssues() {
  const searchParams = useSearchParams();
  const owner = searchParams.get("owner");
  const repo = searchParams.get("repo");

  return useInfiniteQuery({
    queryKey: ["infiniteRepositoryIssues", owner, repo],
    queryFn: async ({ pageParam = 1 }) => {
      if (!owner || !repo) {
        return {
          issues: [],
          nextPage: null,
        };
      }
      return fetchRepositoryIssues(owner, repo, pageParam);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: !!owner && !!repo,
  });
}

"use client";

import { useInfiniteRepositoryIssues } from "@/lib/hooks";
import InfiniteScroll from "./infinite-scroll";

export default function SearchResults() {
  const { data } = useInfiniteRepositoryIssues();
  const issues = data?.pages.flatMap((page) => page.issues) || [];

  return (
    <div className="mt-10 flex flex-col gap-2">
      {issues.map((issue) => (
        <div key={issue.id} style={{ height: 200 }}>
          {issue.title}
        </div>
      ))}
      <InfiniteScroll issueCount={issues.length} />
    </div>
  );
}

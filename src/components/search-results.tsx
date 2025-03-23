"use client";

import { useInfiniteRepositoryIssues } from "@/lib/hooks";
import InfiniteScroll from "./infinite-scroll";
import IssueCard from "./issue-card";

export default function SearchResults() {
  const { data } = useInfiniteRepositoryIssues();
  const issues = data?.pages.flatMap((page) => page.issues) || [];

  return (
    <div className="mt-10 flex flex-col gap-2">
      {issues.map((issue) => (
        <IssueCard
          {...issue}
          key={issue.id}
          url={issue.html_url}
          author={{ url: issue.user.html_url, login: issue.user.login }}
          createdAt={issue.created_at}
          isPullRequest={!!issue.pull_request}
        />
      ))}
      <InfiniteScroll issueCount={issues.length} />
    </div>
  );
}

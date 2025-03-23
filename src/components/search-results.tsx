"use client";

import { useInfiniteRepositoryIssues } from "@/lib/hooks";
import InfiniteScroll from "./infinite-scroll";
import IssueCard from "./issue-card";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function SearchResults() {
  const { data, isLoading } = useInfiniteRepositoryIssues();
  const issues = data?.pages.flatMap((page) => page.issues) || [];

  return (
    <div className="mt-10 flex flex-col gap-2">
      {isLoading && (
        <div className="space-y-4">
          {[...Array(10).keys()].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="mb-2 h-4 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
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

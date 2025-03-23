"use client";

import { useInfiniteRepositoryIssues } from "@/lib/hooks";
import InfiniteScroll from "./infinite-scroll";
import IssueCard from "./issue-card";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function SearchResults() {
  const { data, isLoading, error } = useInfiniteRepositoryIssues();
  const issues = data?.pages.flatMap((page) => page.issues) || [];

  return (
    <div className="mt-8 flex flex-col gap-2">
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
      {error && (
        <div className="text-muted-foreground border-t-muted-background flex justify-center border-t-1 pt-8">
          {error.message === "Not found"
            ? "The repository could not be found. Please fill in a different owner and/or name."
            : "Oops, something went wrong. Please try again."}
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

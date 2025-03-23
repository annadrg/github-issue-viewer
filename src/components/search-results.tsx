"use client";

import { useInfiniteRepositoryIssues } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import InfiniteScroll from "./infinite-scroll";
import IssueCard from "./issue-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function SearchResults() {
  const { data, isLoading, error } = useInfiniteRepositoryIssues();
  const issues = data?.pages.flatMap((page) => page.issues ?? []) || [];

  const marginClass = "mt-8";
  const containerClass = cn("flex flex-col gap-3", marginClass);

  if (isLoading) {
    return (
      <div className={containerClass}>
        {[...Array(10).keys()].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-4">
              <CardTitle>
                <Skeleton className="h-6 w-3/4" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="mt-2 h-4 w-1/2" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-20" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={cn(
          marginClass,
          "text-muted-foreground border-t-muted-background flex justify-center border-t-1 pt-8",
        )}
      >
        {error.message === "Not found"
          ? "The repository could not be found. Please fill in a different owner and/or name."
          : "Oops, something went wrong. Please try again."}
      </div>
    );
  }

  return (
    <div className={containerClass}>
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

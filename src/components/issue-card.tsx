import {
  CircleDot,
  Clock,
  GitPullRequestIcon,
  MessageSquare,
  Package,
  PackageOpen,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { IssueLabel } from "./issue-label";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type Props = {
  title: string;
  url: string;
  number: number;
  state: "open" | "closed";
  createdAt: string;
  author: {
    login: string;
    url: string;
  };
  comments: number;
  labels: { id: number; name: string; color: string }[];
  isPullRequest: boolean;
};

export default function IssueCard({
  title,
  url,
  number,
  state,
  createdAt,
  labels,
  author,
  isPullRequest: pullRequest,
  comments,
}: Props) {
  const StateIcon = state === "open" ? PackageOpen : Package;
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col items-start gap-2 sm:flex-row">
          {pullRequest ? (
            <GitPullRequestIcon className="text-primary mt-1 h-5 w-5 flex-shrink-0" />
          ) : (
            <CircleDot className="text-success mt-1 h-5 w-5 flex-shrink-0" />
          )}
          <div className="flex-1">
            <CardTitle className="flex flex-wrap items-center gap-x-2 gap-y-1 text-lg">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {title}
              </a>
              {labels.map((label) => (
                <IssueLabel
                  key={label.id}
                  name={label.name}
                  color={label.color}
                />
              ))}
            </CardTitle>
            <CardDescription className="mt-2">
              #{number} opened by{" "}
              <a
                href={author.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:underline"
              >
                {author.login}
              </a>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge variant={state === "closed" ? "secondary" : "default"}>
            <StateIcon className="mr-1 h-3 w-3" />
            {state}
          </Badge>
          <Badge variant="outline">
            <Clock className="mr-1 h-3 w-3" />
            {formatDistanceToNow(new Date(createdAt))}
          </Badge>
          <Badge variant="outline">
            <MessageSquare className="mr-1 h-3 w-3" />
            {comments} comments
          </Badge>
        </div>
      </CardFooter>
    </Card>
  );
}

export function formatDistanceToNow(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths === 1 ? "" : "s"} ago`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears === 1 ? "" : "s"} ago`;
}

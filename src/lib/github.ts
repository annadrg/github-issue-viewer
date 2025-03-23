"use server";

type GitHubIssue = {
  id: number;
  node_id: string;
  number: number;
  title: string;
  html_url: string;
  state: "open" | "closed";
  created_at: string;
  updated_at: string;
  user: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  comments: number;
  labels: Array<{
    id: number;
    node_id: string;
    name: string;
    color: string;
    description: string;
  }>;
  pull_request?: {
    url: string;
    html_url: string;
    diff_url: string;
    patch_url: string;
    merged_at: string | null;
  };
};

export async function fetchRepositoryIssues(
  owner: string,
  repo: string,
  page: number,
) {
  const url = `https://api.github.com/repos/${owner}/${repo}/issues?page=${page}&per_page=10&state=all&sort=created&direction=desc`;

  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Not found");
    }
    throw new Error("Something went wrong");
  }

  // Link header is structured as <https://api.github.com/repositories/123/issues?page=2>; rel="next", <https://api.github.com/repositories/123/issues?page=200>; rel="last"
  const hasNextPage = !!response.headers
    .get("Link")
    ?.split(",")
    .find((part) => part.includes('rel="next"'));
  const issues = (await response.json()) as GitHubIssue[];

  return {
    issues,
    nextPage: hasNextPage ? page + 1 : null,
  };
}

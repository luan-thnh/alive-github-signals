import type { CalendarDay, LanguageStat, ProfileData, RepoData } from "../types";

const API = "https://api.github.com";
const GRAPHQL = `${API}/graphql`;

const getTokens = (): string[] => {
  const direct = Object.entries(process.env)
    .filter(([key, value]) => /^GITHUB_TOKEN(?:_\d+)?$/.test(key) && value)
    .map(([, value]) => value as string);
  return [...new Set(direct)];
};

const selectToken = (): string | null => {
  const tokens = getTokens();
  if (!tokens.length) return null;
  return tokens[Math.floor(Math.random() * tokens.length)] ?? tokens[0];
};

const githubHeaders = (token: string | null): HeadersInit => ({
  Accept: "application/vnd.github+json",
  "Content-Type": "application/json",
  "User-Agent": "alive-github-signals",
  "X-GitHub-Api-Version": "2022-11-28",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

const throwGithubError = async (response: Response): Promise<never> => {
  const remaining = response.headers.get("x-ratelimit-remaining");
  let detail = `${response.status} ${response.statusText}`;
  try {
    const body = (await response.json()) as { message?: string };
    if (body.message) detail = body.message;
  } catch {
    // Keep the status text when GitHub does not return JSON.
  }
  if (remaining === "0") {
    throw new Error("GitHub API rate limit reached. Add or rotate a GITHUB_TOKEN.");
  }
  throw new Error(`GitHub API error: ${detail}`);
};

const graphql = async <T>(
  query: string,
  variables: Record<string, unknown>,
): Promise<T> => {
  const token = selectToken();
  if (!token) {
    throw new Error("Missing GITHUB_TOKEN. Add it in Vercel Environment Variables.");
  }

  const response = await fetch(GRAPHQL, {
    method: "POST",
    headers: githubHeaders(token),
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });
  if (!response.ok) await throwGithubError(response);

  const payload = (await response.json()) as {
    data?: T;
    errors?: Array<{ message: string }>;
  };
  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join("; "));
  }
  if (!payload.data) throw new Error("GitHub returned no data.");
  return payload.data;
};

const profileQuery = `
  query AliveProfile($login: String!, $from: DateTime!, $after: String) {
    user(login: $login) {
      login
      name
      bio
      avatarUrl
      websiteUrl
      email
      twitterUsername
      createdAt
      followers { totalCount }
      following { totalCount }
      repositoriesContributedTo(
        first: 1,
        contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]
      ) { totalCount }
      pullRequests(first: 1) { totalCount }
      mergedPullRequests: pullRequests(first: 1, states: MERGED) { totalCount }
      issues(first: 1) { totalCount }
      contributionsCollection(from: $from) {
        totalCommitContributions
        totalIssueContributions
        totalPullRequestContributions
        totalPullRequestReviewContributions
        restrictedContributionsCount
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              weekday
            }
          }
        }
      }
      repositories(
        first: 100,
        after: $after,
        ownerAffiliations: OWNER,
        isFork: false,
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        totalCount
        pageInfo { hasNextPage endCursor }
        nodes {
          name
          description
          url
          updatedAt
          isArchived
          stargazerCount
          forkCount
          primaryLanguage { name }
          languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
            edges { size node { name } }
          }
        }
      }
    }
  }
`;

type ProfileGraph = {
  user: null | {
    login: string;
    name: string | null;
    bio: string | null;
    avatarUrl: string;
    websiteUrl: string | null;
    email: string | null;
    twitterUsername: string | null;
    createdAt: string;
    followers: { totalCount: number };
    following: { totalCount: number };
    repositoriesContributedTo: { totalCount: number };
    pullRequests: { totalCount: number };
    mergedPullRequests: { totalCount: number };
    issues: { totalCount: number };
    contributionsCollection: {
      totalCommitContributions: number;
      totalIssueContributions: number;
      totalPullRequestContributions: number;
      totalPullRequestReviewContributions: number;
      restrictedContributionsCount: number;
      contributionCalendar: {
        totalContributions: number;
        weeks: Array<{
          contributionDays: Array<{
            date: string;
            contributionCount: number;
            weekday: number;
          }>;
        }>;
      };
    };
    repositories: {
      totalCount: number;
      pageInfo: { hasNextPage: boolean; endCursor: string | null };
      nodes: Array<{
        name: string;
        description: string | null;
        url: string;
        updatedAt: string;
        isArchived: boolean;
        stargazerCount: number;
        forkCount: number;
        primaryLanguage: { name: string } | null;
        languages: {
          edges: Array<{ size: number; node: { name: string } }>;
        };
      }>;
    };
  };
};

const aggregateLanguages = (
  languageSizes: Map<string, number>,
  excluded: string[],
): LanguageStat[] => {
  const excludedSet = new Set(excluded.map((name) => name.toLowerCase()));
  const entries = [...languageSizes.entries()]
    .filter(([name]) => !excludedSet.has(name.toLowerCase()))
    .sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((sum, [, size]) => sum + size, 0) || 1;
  return entries.map(([name, size]) => ({
    name,
    size,
    percentage: (size / total) * 100,
  }));
};

export const calculateStreaks = (
  calendar: CalendarDay[],
): { current: number; longest: number } => {
  const days = [...calendar].sort((a, b) => a.date.localeCompare(b.date));
  let longest = 0;
  let running = 0;
  for (const day of days) {
    if (day.count > 0) {
      running += 1;
      longest = Math.max(longest, running);
    } else {
      running = 0;
    }
  }

  let index = days.length - 1;
  const today = new Date().toISOString().slice(0, 10);
  if (days[index]?.date === today && days[index]?.count === 0) index -= 1;
  let current = 0;
  while (index >= 0 && days[index]!.count > 0) {
    current += 1;
    index -= 1;
  }
  return { current, longest };
};

const fetchAllTimeCommits = async (username: string): Promise<number | null> => {
  const token = selectToken();
  const response = await fetch(
    `${API}/search/commits?q=${encodeURIComponent(`author:${username}`)}&per_page=1`,
    { headers: githubHeaders(token), cache: "no-store" },
  );
  if (!response.ok) return null;
  const payload = (await response.json()) as { total_count?: number };
  return typeof payload.total_count === "number" ? payload.total_count : null;
};

export const fetchProfileData = async (
  username: string,
  options?: {
    period?: "year" | "all";
    excludeLanguages?: string[];
    maxRepoPages?: number;
  },
): Promise<ProfileData> => {
  const from = new Date();
  from.setUTCFullYear(from.getUTCFullYear() - 1);

  let after: string | null = null;
  let firstUser: NonNullable<ProfileGraph["user"]> | null = null;
  let stars = 0;
  let forks = 0;
  const languageSizes = new Map<string, number>();
  const recentRepositories: ProfileData["recentRepositories"] = [];
  const maxPages = Math.min(5, Math.max(1, options?.maxRepoPages ?? 3));

  for (let page = 0; page < maxPages; page += 1) {
    const result: ProfileGraph = await graphql<ProfileGraph>(profileQuery, {
      login: username,
      from: from.toISOString(),
      after,
    });
    if (!result.user) throw new Error(`GitHub user "${username}" was not found.`);
    if (!firstUser) firstUser = result.user;

    for (const repo of result.user.repositories.nodes) {
      if (page === 0 && recentRepositories.length < 12) {
        recentRepositories.push({
          name: repo.name,
          description: repo.description,
          url: repo.url,
          updatedAt: repo.updatedAt,
          stars: repo.stargazerCount,
          forks: repo.forkCount,
          primaryLanguage: repo.primaryLanguage?.name ?? null,
          isArchived: repo.isArchived,
        });
      }
      stars += repo.stargazerCount;
      forks += repo.forkCount;
      for (const edge of repo.languages.edges) {
        languageSizes.set(
          edge.node.name,
          (languageSizes.get(edge.node.name) ?? 0) + edge.size,
        );
      }
    }

    if (!result.user.repositories.pageInfo.hasNextPage) break;
    after = result.user.repositories.pageInfo.endCursor;
    if (!after) break;
  }

  if (!firstUser) throw new Error("Unable to load GitHub profile.");
  const calendar = firstUser.contributionsCollection.contributionCalendar.weeks
    .flatMap((week) => week.contributionDays)
    .map((day) => ({
      date: day.date,
      count: day.contributionCount,
      weekday: day.weekday,
    }));
  const streaks = calculateStreaks(calendar);
  let commits = firstUser.contributionsCollection.totalCommitContributions;
  if (options?.period === "all") {
    commits = (await fetchAllTimeCommits(username)) ?? commits;
  }

  return {
    login: firstUser.login,
    name: firstUser.name,
    bio: firstUser.bio,
    avatarUrl: firstUser.avatarUrl,
    websiteUrl: firstUser.websiteUrl,
    email: firstUser.email || null,
    twitterUsername: firstUser.twitterUsername,
    socialAccounts: [],
    createdAt: firstUser.createdAt,
    followers: firstUser.followers.totalCount,
    following: firstUser.following.totalCount,
    repositories: firstUser.repositories.totalCount,
    contributedTo: firstUser.repositoriesContributedTo.totalCount,
    stars,
    forks,
    commits,
    contributions:
      firstUser.contributionsCollection.contributionCalendar.totalContributions,
    pullRequests: firstUser.pullRequests.totalCount,
    mergedPullRequests: firstUser.mergedPullRequests.totalCount,
    issues: firstUser.issues.totalCount,
    reviews:
      firstUser.contributionsCollection.totalPullRequestReviewContributions,
    currentStreak: streaks.current,
    longestStreak: streaks.longest,
    languages: aggregateLanguages(
      languageSizes,
      options?.excludeLanguages ?? [],
    ),
    calendar,
    recentRepositories,
  };
};

const repoQuery = `
  query AliveRepo($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      name
      description
      url
      homepageUrl
      stargazerCount
      forkCount
      watchers { totalCount }
      issues(states: OPEN) { totalCount }
      updatedAt
      licenseInfo { spdxId }
      primaryLanguage { name }
      languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
        totalSize
        edges { size node { name } }
      }
    }
  }
`;

type RepoGraph = {
  repository: null | {
    name: string;
    description: string | null;
    url: string;
    homepageUrl: string | null;
    stargazerCount: number;
    forkCount: number;
    watchers: { totalCount: number };
    issues: { totalCount: number };
    updatedAt: string;
    licenseInfo: { spdxId: string } | null;
    primaryLanguage: { name: string } | null;
    languages: {
      totalSize: number;
      edges: Array<{ size: number; node: { name: string } }>;
    };
  };
};

export const fetchRepoData = async (
  owner: string,
  name: string,
): Promise<RepoData> => {
  const result = await graphql<RepoGraph>(repoQuery, { owner, name });
  if (!result.repository) {
    throw new Error(`Repository "${owner}/${name}" was not found.`);
  }
  const repo = result.repository;
  const total = repo.languages.totalSize || 1;
  return {
    owner,
    name: repo.name,
    description: repo.description,
    url: repo.url,
    homepage: repo.homepageUrl,
    stars: repo.stargazerCount,
    forks: repo.forkCount,
    watchers: repo.watchers.totalCount,
    openIssues: repo.issues.totalCount,
    updatedAt: repo.updatedAt,
    license: repo.licenseInfo?.spdxId ?? null,
    primaryLanguage: repo.primaryLanguage?.name ?? null,
    languages: repo.languages.edges.map((edge) => ({
      name: edge.node.name,
      size: edge.size,
      percentage: (edge.size / total) * 100,
    })),
  };
};


export const fetchSocialAccounts = async (
  username: string,
): Promise<Array<{ provider: string; url: string; displayName: string | null }>> => {
  const token = selectToken();
  const response = await fetch(
    `${API}/users/${encodeURIComponent(username)}/social_accounts?per_page=100`,
    {
      headers: githubHeaders(token),
      cache: "no-store",
    },
  );
  if (!response.ok) await throwGithubError(response);
  const accounts = (await response.json()) as Array<{
    provider?: string;
    url?: string;
  }>;
  return accounts
    .filter((account) => account.provider && account.url)
    .map((account) => ({
      provider: account.provider!,
      url: account.url!,
      displayName: null,
    }));
};

export const fetchAvatarDataUri = async (
  avatarUrl: string,
): Promise<string | null> => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1_800);
  try {
    const sizedUrl = new URL(avatarUrl);
    sizedUrl.searchParams.set("s", "160");
    const response = await fetch(sizedUrl, {
      cache: "force-cache",
      signal: controller.signal,
      headers: { Accept: "image/avif,image/webp,image/png,image/jpeg" },
    });
    if (!response.ok) return null;
    const contentType = response.headers.get("content-type") || "image/png";
    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.byteLength > 256_000) return null;
    return `data:${contentType};base64,${buffer.toString("base64")}`;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
};

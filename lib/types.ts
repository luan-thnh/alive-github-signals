export type CardKind =
  | "stats"
  | "languages"
  | "repo"
  | "streak"
  | "activity"
  | "profile"
  | "signal"
  | "terminal"
  | "badge"
  | "button"
  | "social"
  | "status"
  | "pulse"
  | "radar"
  | "constellation"
  | "timeline"
  | "repos"
  | "year"
  | "compare"
  | "ticker"
  | "overview"
  | "projects"
  | "signal-board"
  | "year-board";

export type ThemeName = "alive" | "paper" | "cobalt" | "ember" | "mono";

export type CalendarDay = {
  date: string;
  count: number;
  weekday: number;
};

export type LanguageStat = {
  name: string;
  size: number;
  percentage: number;
};

export type SocialAccount = {
  provider: string;
  url: string;
  displayName: string | null;
};

export type RecentRepository = {
  name: string;
  description: string | null;
  url: string;
  updatedAt: string;
  stars: number;
  forks: number;
  primaryLanguage: string | null;
  isArchived: boolean;
};

export type ProfileData = {
  login: string;
  name: string | null;
  bio: string | null;
  avatarUrl: string;
  websiteUrl: string | null;
  email: string | null;
  twitterUsername: string | null;
  socialAccounts: SocialAccount[];
  createdAt: string;
  followers: number;
  following: number;
  repositories: number;
  contributedTo: number;
  stars: number;
  forks: number;
  commits: number;
  contributions: number;
  pullRequests: number;
  mergedPullRequests: number;
  issues: number;
  reviews: number;
  currentStreak: number;
  longestStreak: number;
  languages: LanguageStat[];
  calendar: CalendarDay[];
  recentRepositories: RecentRepository[];
};

export type RepoData = {
  owner: string;
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
  updatedAt: string;
  license: string | null;
  primaryLanguage: string | null;
  languages: LanguageStat[];
};

export type Theme = {
  name: ThemeName;
  background: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  muted: string;
  faint: string;
  border: string;
  grid: string;
  accent: string;
  accent2: string;
  danger: string;
  warning: string;
};

export type RenderContext = {
  kind: CardKind;
  params: URLSearchParams;
  theme: Theme;
  width: number;
  height?: number;
  animate: boolean;
  title?: string;
};

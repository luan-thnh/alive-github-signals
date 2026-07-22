import type { ProfileData, RepoData } from "./types";

const today = new Date();
const calendar = Array.from({ length: 371 }, (_, index) => {
  const date = new Date(today);
  date.setUTCDate(date.getUTCDate() - (370 - index));
  const wave = (Math.sin(index * 0.19) + Math.sin(index * 0.047 + 1.2) + 2) / 4;
  const active = (index * 17 + 11) % 13 < 5;
  return {
    date: date.toISOString().slice(0, 10),
    count: active ? Math.max(1, Math.round(wave * 12)) : 0,
    weekday: date.getUTCDay(),
  };
});

export const demoProfile: ProfileData = {
  login: "luan-thnh",
  name: "luanthnh",
  bio: "Creative frontend developer building expressive interfaces and practical automation.",
  avatarUrl: "https://avatars.githubusercontent.com/u/96113898?v=4",
  createdAt: "2021-12-14T00:00:00Z",
  followers: 18,
  following: 24,
  repositories: 48,
  contributedTo: 6,
  stars: 12,
  forks: 8,
  commits: 340,
  contributions: 454,
  pullRequests: 37,
  mergedPullRequests: 28,
  issues: 6,
  reviews: 22,
  currentStreak: 4,
  longestStreak: 18,
  languages: [
    { name: "TypeScript", size: 761000, percentage: 32.8 },
    { name: "JavaScript", size: 612000, percentage: 26.4 },
    { name: "CSS", size: 418000, percentage: 18 },
    { name: "Python", size: 241000, percentage: 10.4 },
    { name: "Vue", size: 172000, percentage: 7.4 },
    { name: "HTML", size: 116000, percentage: 5 },
  ],
  calendar,
};

export const demoRepo: RepoData = {
  owner: "luan-thnh",
  name: "alive-github-signals",
  description:
    "Dynamic GitHub data rendered as expressive SVG badges, cards and living interface signals.",
  url: "https://github.com/luan-thnh/alive-github-signals",
  homepage: "https://alive-github-signals.vercel.app",
  stars: 128,
  forks: 18,
  watchers: 9,
  openIssues: 4,
  updatedAt: new Date().toISOString(),
  license: "MIT",
  primaryLanguage: "TypeScript",
  languages: [
    { name: "TypeScript", size: 720000, percentage: 68 },
    { name: "CSS", size: 210000, percentage: 20 },
    { name: "JavaScript", size: 90000, percentage: 8.5 },
    { name: "HTML", size: 37000, percentage: 3.5 },
  ],
};

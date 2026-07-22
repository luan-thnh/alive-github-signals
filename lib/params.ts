import type { CardKind, ThemeName } from "./types";

const HEX = /^[0-9a-fA-F]{3,8}$/;
const USERNAME = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;
const REPO = /^[a-zA-Z0-9._-]{1,100}$/;

export const CARD_ALIASES: Record<string, CardKind> = {
  api: "stats",
  stats: "stats",
  languages: "languages",
  "top-langs": "languages",
  langs: "languages",
  repo: "repo",
  pin: "repo",
  streak: "streak",
  activity: "activity",
  calendar: "activity",
  profile: "profile",
  signal: "signal",
  terminal: "terminal",
  badge: "badge",
  button: "button",
  status: "status",
};

export const parseCardKind = (value: string): CardKind | null =>
  CARD_ALIASES[value.toLowerCase()] ?? null;

export const parseBoolean = (value: string | null, fallback = false): boolean => {
  if (value === null) return fallback;
  return ["1", "true", "yes", "on"].includes(value.toLowerCase());
};

export const parseInteger = (
  value: string | null,
  fallback: number,
  min: number,
  max: number,
): number => {
  const parsed = Number.parseInt(value ?? "", 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
};

export const safeText = (value: string | null, fallback = "", max = 80): string => {
  const text = (value ?? fallback).replace(/[\u0000-\u001F\u007F]/g, " ").trim();
  return text.slice(0, max);
};

export const requireUsername = (params: URLSearchParams): string => {
  const username = safeText(params.get("username"), "", 39);
  if (!USERNAME.test(username)) {
    throw new Error("A valid GitHub username is required.");
  }
  return username;
};

export const optionalUsername = (params: URLSearchParams): string | null => {
  const value = safeText(params.get("username"), "", 39);
  if (!value) return null;
  if (!USERNAME.test(value)) throw new Error("Invalid GitHub username.");
  return value;
};

export const requireRepo = (params: URLSearchParams): string => {
  const repo = safeText(params.get("repo"), "", 100);
  if (!REPO.test(repo)) throw new Error("A valid repository name is required.");
  return repo;
};

export const parseThemeName = (value: string | null): ThemeName => {
  const theme = (value ?? "alive") as ThemeName;
  return ["alive", "paper", "cobalt", "ember", "mono"].includes(theme)
    ? theme
    : "alive";
};

export const parseHex = (value: string | null): string | null => {
  if (!value) return null;
  let normalized = value.replace(/^#/, "");
  if (!HEX.test(normalized)) return null;
  if (normalized.length === 3 || normalized.length === 4) {
    normalized = normalized
      .split("")
      .map((character) => `${character}${character}`)
      .join("");
  }
  // Theme tokens use opaque RGB values so renderers can safely append alpha bytes.
  if (normalized.length === 8) normalized = normalized.slice(0, 6);
  return `#${normalized.toUpperCase()}`;
};

export const parseList = (value: string | null): string[] =>
  (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 30);

export const parseCacheSeconds = (value: string | null): number => {
  const fallback = Number.parseInt(process.env.DEFAULT_CACHE_SECONDS ?? "21600", 10);
  return parseInteger(value, Number.isFinite(fallback) ? fallback : 21600, 300, 86400);
};

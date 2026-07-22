import {
  fetchAvatarDataUri,
  fetchProfileData,
  fetchRepoData,
  fetchSocialAccounts,
} from "../github/client";
import {
  parseBoolean,
  parseInteger,
  parseList,
  requireCompareUsername,
  requireRepo,
  requireUsername,
  safeText,
} from "../params";
import { resolveTheme } from "../themes";
import type { CardKind, RenderContext } from "../types";
import {
  renderActivity,
  renderBadge,
  renderCompare,
  renderConstellation,
  renderButton,
  renderErrorCard,
  renderLanguages,
  renderProfile,
  renderPulse,
  renderRadar,
  renderRepos,
  renderRepo,
  renderSignal,
  renderSocial,
  renderStats,
  renderStatus,
  renderStreak,
  renderTerminal,
  renderTicker,
  renderTimeline,
  renderYear,
} from "./cards";

const defaults: Record<
  CardKind,
  { width: number; height: number; minWidth: number; minHeight: number }
> = {
  stats: { width: 760, height: 340, minWidth: 580, minHeight: 300 },
  languages: { width: 650, height: 350, minWidth: 520, minHeight: 300 },
  repo: { width: 720, height: 310, minWidth: 560, minHeight: 280 },
  streak: { width: 690, height: 280, minWidth: 560, minHeight: 250 },
  activity: { width: 920, height: 270, minWidth: 760, minHeight: 240 },
  profile: { width: 780, height: 350, minWidth: 640, minHeight: 320 },
  signal: { width: 1100, height: 590, minWidth: 940, minHeight: 540 },
  terminal: { width: 760, height: 370, minWidth: 600, minHeight: 340 },
  badge: { width: 220, height: 34, minWidth: 110, minHeight: 32 },
  button: { width: 240, height: 46, minWidth: 140, minHeight: 42 },
  social: { width: 300, height: 56, minWidth: 46, minHeight: 46 },
  status: { width: 300, height: 58, minWidth: 190, minHeight: 52 },
  pulse: { width: 980, height: 190, minWidth: 720, minHeight: 170 },
  radar: { width: 780, height: 520, minWidth: 660, minHeight: 460 },
  constellation: { width: 860, height: 500, minWidth: 700, minHeight: 440 },
  timeline: { width: 940, height: 360, minWidth: 760, minHeight: 320 },
  repos: { width: 940, height: 540, minWidth: 760, minHeight: 440 },
  year: { width: 940, height: 520, minWidth: 780, minHeight: 470 },
  compare: { width: 1040, height: 500, minWidth: 860, minHeight: 450 },
  ticker: { width: 1100, height: 64, minWidth: 640, minHeight: 58 },
};

export const buildContext = (
  kind: CardKind,
  params: URLSearchParams,
): RenderContext => {
  const size = defaults[kind];
  return {
    kind,
    params,
    theme: resolveTheme(params),
    width: parseInteger(params.get("width"), size.width, size.minWidth, 1400),
    height: parseInteger(params.get("height"), size.height, size.minHeight, 900),
    animate: parseBoolean(params.get("animate"), true),
    title:
      safeText(params.get("title") ?? params.get("custom_title"), "", 80) ||
      undefined,
  };
};

export const renderCard = async (
  kind: CardKind,
  params: URLSearchParams,
): Promise<{ svg: string; context: RenderContext }> => {
  const context = buildContext(kind, params);
  try {
    if (kind === "button") return { svg: renderButton(context), context };
    if (kind === "status") return { svg: renderStatus(context), context };

    if (kind === "repo") {
      const owner = requireUsername(params);
      const repoName = requireRepo(params);
      const repo = await fetchRepoData(owner, repoName);
      return { svg: renderRepo(repo, context), context };
    }

    const username = requireUsername(params);
    if (kind === "compare") {
      const compareUsername = requireCompareUsername(params);
      const period = params.get("period") === "all" ? "all" : "year";
      const [left, right] = await Promise.all([
        fetchProfileData(username, {
          period,
          excludeLanguages: parseList(params.get("exclude_langs")),
          maxRepoPages: parseInteger(params.get("repo_pages"), 3, 1, 5),
        }),
        fetchProfileData(compareUsername, {
          period,
          excludeLanguages: parseList(params.get("exclude_langs")),
          maxRepoPages: parseInteger(params.get("repo_pages"), 3, 1, 5),
        }),
      ]);
      return { svg: renderCompare(left, right, context), context };
    }

    const profile = await fetchProfileData(username, {
      period: params.get("period") === "all" ? "all" : "year",
      excludeLanguages: parseList(params.get("exclude_langs")),
      maxRepoPages: parseInteger(params.get("repo_pages"), 3, 1, 5),
    });

    if (kind === "social") {
      profile.socialAccounts = await fetchSocialAccounts(username);
    }

    switch (kind) {
      case "stats":
        return { svg: renderStats(profile, context), context };
      case "languages":
        return { svg: renderLanguages(profile, context), context };
      case "streak":
        return { svg: renderStreak(profile, context), context };
      case "activity":
        return { svg: renderActivity(profile, context), context };
      case "profile": {
        const avatar = parseBoolean(params.get("avatar"), false)
          ? await fetchAvatarDataUri(profile.avatarUrl)
          : null;
        return { svg: renderProfile(profile, context, avatar), context };
      }
      case "signal":
        return { svg: renderSignal(profile, context), context };
      case "terminal":
        return { svg: renderTerminal(profile, context), context };
      case "badge":
        return { svg: renderBadge(profile, context), context };
      case "social":
        return { svg: renderSocial(profile, context), context };
      case "pulse":
        return { svg: renderPulse(profile, context), context };
      case "radar":
        return { svg: renderRadar(profile, context), context };
      case "constellation":
        return { svg: renderConstellation(profile, context), context };
      case "timeline":
        return { svg: renderTimeline(profile, context), context };
      case "repos":
        return { svg: renderRepos(profile, context), context };
      case "year":
        return { svg: renderYear(profile, context), context };
      case "ticker":
        return { svg: renderTicker(profile, context), context };
      default:
        throw new Error(`Unsupported card type: ${kind}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown rendering error.";
    return { svg: renderErrorCard(message, context), context };
  }
};

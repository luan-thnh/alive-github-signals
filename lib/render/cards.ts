import { parseInteger, safeText } from "../params";
import type { ProfileData, RenderContext, RepoData, Theme } from "../types";
import {
  isSocialPlatform,
  platformLabel,
  SOCIAL_BRAND_COLORS,
  socialIcon,
  simpleActionIcon,
  type SocialPlatform,
} from "./social-icons";
import {
  escapeXml,
  formatNumber,
  headerRail,
  languageColor,
  outerFrame,
  svgDocument,
  truncate,
  waveform,
} from "./svg";

const percent = (value: number): string => `${value.toFixed(value >= 10 ? 0 : 1)}%`;

const ring = ({
  cx,
  cy,
  radius,
  value,
  max,
  theme,
  label,
}: {
  cx: number;
  cy: number;
  radius: number;
  value: number;
  max: number;
  theme: Theme;
  label?: string;
}): string => {
  const circumference = Math.PI * 2 * radius;
  const ratio = Math.min(1, Math.max(0, value / Math.max(1, max)));
  const dash = circumference * ratio;
  return `
    <circle cx="${cx}" cy="${cy}" r="${radius}" stroke="${theme.border}" stroke-width="8"/>
    <circle cx="${cx}" cy="${cy}" r="${radius}" stroke="${theme.accent}" stroke-width="8" stroke-linecap="square" stroke-dasharray="${dash} ${circumference - dash}" transform="rotate(-90 ${cx} ${cy})"/>
    ${label ? `<text x="${cx}" y="${cy + 4}" text-anchor="middle" class="mono micro">${escapeXml(label)}</text>` : ""}
  `;
};

const metricBlock = (
  x: number,
  y: number,
  value: number | string,
  label: string,
  theme: Theme,
  options?: { compact?: boolean; accent?: boolean },
): string => `
  <text x="${x}" y="${y}" class="display" fill="${options?.accent ? theme.accent : theme.text}" font-size="32" font-weight="750" letter-spacing="-1">${
    typeof value === "number" ? formatNumber(value, options?.compact) : escapeXml(value)
  }</text>
  <text x="${x}" y="${y + 23}" class="mono micro">${escapeXml(label.toUpperCase())}</text>
`;

const languageSegments = (
  languages: ProfileData["languages"],
  x: number,
  y: number,
  width: number,
  height: number,
  theme: Theme,
  count = 6,
): string => {
  const selected = languages.slice(0, count);
  const total = selected.reduce((sum, language) => sum + language.percentage, 0) || 1;
  let cursor = x;
  return selected
    .map((language, index) => {
      const segmentWidth = width * (language.percentage / total);
      const output = `<rect x="${cursor.toFixed(2)}" y="${y}" width="${Math.max(2, segmentWidth).toFixed(2)}" height="${height}" fill="${languageColor(index, theme)}"/>`;
      cursor += segmentWidth;
      return output;
    })
    .join("");
};

const monthLabels = (calendar: ProfileData["calendar"], x: number, y: number, cell: number, gap: number): string => {
  let lastMonth = "";
  return calendar
    .slice(-371)
    .map((day, index) => {
      if (index % 7 !== 0) return "";
      const month = new Date(`${day.date}T00:00:00Z`)
        .toLocaleDateString("en-US", { month: "short", timeZone: "UTC" })
        .toUpperCase();
      if (month === lastMonth) return "";
      lastMonth = month;
      return `<text x="${x + Math.floor(index / 7) * (cell + gap)}" y="${y}" class="mono micro">${month}</text>`;
    })
    .join("");
};

const heatmap = (
  calendar: ProfileData["calendar"],
  x: number,
  y: number,
  theme: Theme,
  cell = 9,
  gap = 4,
): string => {
  const levels = [theme.surfaceAlt, `${theme.accent}33`, `${theme.accent}66`, `${theme.accent}A6`, theme.accent];
  return calendar
    .slice(-371)
    .map((day, index) => {
      const week = Math.floor(index / 7);
      const weekday = day.weekday ?? index % 7;
      const level = day.count === 0 ? 0 : day.count <= 2 ? 1 : day.count <= 5 ? 2 : day.count <= 9 ? 3 : 4;
      return `<rect x="${x + week * (cell + gap)}" y="${y + weekday * (cell + gap)}" width="${cell}" height="${cell}" fill="${levels[level]}"><title>${escapeXml(day.date)}: ${day.count} contributions</title></rect>`;
    })
    .join("");
};

export const renderStats = (data: ProfileData, context: RenderContext): string => {
  const width = context.width;
  const height = context.height ?? 340;
  const { theme } = context;
  const variant = safeText(context.params.get("variant"), "editorial", 20);
  const title = context.title || `${data.login} / activity signal`;

  if (variant === "orbit") {
    const body = `
      ${outerFrame(width, height, theme)}
      ${headerRail({ index: "01", label: "GitHub Orbit", width, theme })}
      <circle cx="${width * 0.31}" cy="${height * 0.58}" r="104" fill="url(#alive-aura)"/>
      ${ring({ cx: width * 0.31, cy: height * 0.58, radius: 78, value: data.contributions, max: Math.max(500, data.contributions), theme, label: "12M" })}
      <text x="${width * 0.31}" y="${height * 0.58 - 3}" text-anchor="middle" class="display text" font-size="48" font-weight="800">${formatNumber(data.contributions)}</text>
      <text x="${width * 0.31}" y="${height * 0.58 + 24}" text-anchor="middle" class="mono micro">CONTRIBUTIONS</text>
      <circle cx="${width * 0.31 + 98}" cy="${height * 0.58 - 45}" r="7" fill="${theme.accent}" filter="url(#alive-glow)" class="pulse"/>
      <line x1="${width * 0.56}" y1="104" x2="${width * 0.56}" y2="${height - 42}" stroke="${theme.border}"/>
      ${metricBlock(width * 0.61, 132, data.commits, "commits / period", theme)}
      ${metricBlock(width * 0.61, 206, data.pullRequests, "pull requests", theme)}
      ${metricBlock(width * 0.82, 132, data.stars, "stars earned", theme)}
      ${metricBlock(width * 0.82, 206, data.reviews, "reviews", theme)}
      <text x="${width - 42}" y="${height - 28}" text-anchor="end" class="mono micro">GITHUB.COM/${escapeXml(data.login.toUpperCase())}</text>
    `;
    return svgDocument({ width, height, theme, body, title, description: "Orbital GitHub statistics card", animate: context.animate });
  }

  const body = `
    ${outerFrame(width, height, theme)}
    ${headerRail({ index: "01", label: "GitHub Signal", width, theme })}
    <text x="36" y="102" class="mono label">ACTIVITY / LAST 12 MONTHS</text>
    <text x="34" y="204" class="display text" font-size="108" font-weight="800" letter-spacing="-5">${formatNumber(data.contributions)}</text>
    <text x="40" y="232" class="mono micro">CONTRIBUTIONS RECORDED</text>
    <line x1="${Math.round(width * 0.47)}" y1="94" x2="${Math.round(width * 0.47)}" y2="${height - 44}" stroke="${theme.border}"/>
    ${metricBlock(width * 0.52, 126, data.commits, "commits", theme)}
    ${metricBlock(width * 0.72, 126, data.pullRequests, "pull requests", theme)}
    ${metricBlock(width * 0.52, 206, data.stars, "stars earned", theme)}
    ${metricBlock(width * 0.72, 206, data.reviews, "reviews", theme)}
    <line x1="36" y1="${height - 74}" x2="${width - 36}" y2="${height - 74}" stroke="${theme.border}"/>
    ${waveform(38, height - 38, Math.round(width * 0.42), theme, data.contributions % 17)}
    <text x="${width - 36}" y="${height - 34}" text-anchor="end" class="mono micro">REPOS ${data.repositories} / MERGED ${data.mergedPullRequests} / ISSUES ${data.issues}</text>
  `;
  return svgDocument({ width, height, theme, body, title, description: "Editorial GitHub statistics card", animate: context.animate });
};

export const renderLanguages = (data: ProfileData, context: RenderContext): string => {
  const width = context.width;
  const height = context.height ?? 350;
  const { theme } = context;
  const count = parseInteger(context.params.get("langs_count"), 6, 1, 10);
  const languages = data.languages.slice(0, count);
  const layout = safeText(context.params.get("layout"), "field", 20);
  const title = context.title || `${data.login} / language field`;

  if (layout === "orbit") {
    const cx = width * 0.34;
    const cy = height * 0.57;
    let angle = -90;
    const circles = languages
      .map((language, index) => {
        const sweep = language.percentage * 3.6;
        const radius = 96 - index * 10;
        const dash = (Math.PI * 2 * radius * language.percentage) / 100;
        const gap = Math.PI * 2 * radius - dash;
        const output = `<circle cx="${cx}" cy="${cy}" r="${radius}" stroke="${languageColor(index, theme)}" stroke-width="7" stroke-dasharray="${dash} ${gap}" transform="rotate(${angle} ${cx} ${cy})"/>`;
        angle += sweep;
        return output;
      })
      .join("");
    const labels = languages
      .map((language, index) => `
        <circle cx="${width * 0.61}" cy="${116 + index * 34}" r="4" fill="${languageColor(index, theme)}"/>
        <text x="${width * 0.61 + 16}" y="${120 + index * 34}" class="mono label">${escapeXml(language.name.toUpperCase())}</text>
        <text x="${width - 40}" y="${120 + index * 34}" text-anchor="end" class="mono text" font-size="11">${percent(language.percentage)}</text>
      `)
      .join("");
    const body = `
      ${outerFrame(width, height, theme)}
      ${headerRail({ index: "02", label: "Language Orbit", width, theme })}
      <circle cx="${cx}" cy="${cy}" r="120" fill="url(#alive-aura)" opacity=".6"/>
      ${circles}
      <circle cx="${cx}" cy="${cy}" r="26" fill="${theme.surface}" stroke="${theme.border}"/>
      <circle cx="${cx}" cy="${cy}" r="5" fill="${theme.accent}" class="pulse"/>
      <line x1="${width * 0.55}" y1="98" x2="${width * 0.55}" y2="${height - 36}" stroke="${theme.border}"/>
      ${labels}
    `;
    return svgDocument({ width, height, theme, body, title, description: "Orbital programming language card", animate: context.animate });
  }

  const rows = languages
    .map((language, index) => {
      const y = 136 + index * 34;
      const barWidth = Math.max(4, (width - 310) * (language.percentage / Math.max(1, languages[0]?.percentage ?? 100)));
      return `
        <text x="38" y="${y}" class="mono label">${String(index + 1).padStart(2, "0")}</text>
        <text x="76" y="${y}" class="mono text" font-size="12">${escapeXml(language.name.toUpperCase())}</text>
        <rect x="230" y="${y - 12}" width="${width - 292}" height="12" fill="${theme.surfaceAlt}"/>
        <rect x="230" y="${y - 12}" width="${barWidth}" height="12" fill="${languageColor(index, theme)}"/>
        <text x="${width - 38}" y="${y}" text-anchor="end" class="mono micro">${percent(language.percentage)}</text>
      `;
    })
    .join("");
  const body = `
    ${outerFrame(width, height, theme)}
    ${headerRail({ index: "02", label: "Language Field", width, theme })}
    <text x="38" y="99" class="mono micro">MATERIAL / WEIGHT / SIGNAL DENSITY</text>
    ${rows}
    ${languageSegments(languages, 38, height - 44, width - 76, 10, theme, count)}
  `;
  return svgDocument({ width, height, theme, body, title, description: "Programming languages field card", animate: context.animate });
};

export const renderRepo = (repo: RepoData, context: RenderContext): string => {
  const width = context.width;
  const height = context.height ?? 310;
  const { theme } = context;
  const title = context.title || `${repo.owner}/${repo.name}`;
  const description = truncate(repo.description, 105) || "No repository description supplied.";
  const language = repo.primaryLanguage || repo.languages[0]?.name || "Unspecified";
  const body = `
    ${outerFrame(width, height, theme)}
    ${headerRail({ index: "03", label: "Repository Specimen", width, theme, status: `UPDATED / ${repo.updatedAt.slice(0, 10)}` })}
    <text x="38" y="113" class="mono accent" font-size="11" letter-spacing="1.6">${escapeXml(repo.owner.toUpperCase())} / PUBLIC SYSTEM</text>
    <text x="36" y="158" class="display text" font-size="40" font-weight="780" letter-spacing="-1.5">${escapeXml(truncate(repo.name, 28))}</text>
    <text x="38" y="190" class="mono label">${escapeXml(description)}</text>
    <line x1="38" y1="214" x2="${width - 38}" y2="214" stroke="${theme.border}"/>
    ${metricBlock(38, 254, repo.stars, "stars", theme, { compact: true })}
    ${metricBlock(150, 254, repo.forks, "forks", theme, { compact: true })}
    ${metricBlock(262, 254, repo.openIssues, "open issues", theme, { compact: true })}
    <line x1="${width - 270}" y1="230" x2="${width - 270}" y2="${height - 34}" stroke="${theme.border}"/>
    <text x="${width - 242}" y="247" class="mono micro">PRIMARY MATERIAL</text>
    <text x="${width - 242}" y="276" class="display text" font-size="24" font-weight="700">${escapeXml(language)}</text>
    <circle cx="${width - 42}" cy="${height - 42}" r="8" fill="${theme.accent}" filter="url(#alive-glow)" class="pulse"/>
    <path d="M${width - 98} ${height - 42}H${width - 55}" stroke="${theme.accent}"/>
  `;
  return svgDocument({ width, height, theme, body, title, description: `Repository card for ${repo.owner}/${repo.name}`, animate: context.animate });
};

export const renderStreak = (data: ProfileData, context: RenderContext): string => {
  const width = context.width;
  const height = context.height ?? 280;
  const { theme } = context;
  const cx = width / 2;
  const body = `
    ${outerFrame(width, height, theme)}
    ${headerRail({ index: "04", label: "Continuity Index", width, theme })}
    <line x1="${width / 3}" y1="96" x2="${width / 3}" y2="${height - 32}" stroke="${theme.border}"/>
    <line x1="${(width / 3) * 2}" y1="96" x2="${(width / 3) * 2}" y2="${height - 32}" stroke="${theme.border}"/>
    ${metricBlock(42, 157, data.contributions, "total contributions", theme)}
    ${ring({ cx, cy: 165, radius: 55, value: data.currentStreak, max: Math.max(data.longestStreak, 7), theme, label: "CURRENT" })}
    <text x="${cx}" y="175" text-anchor="middle" class="display text" font-size="42" font-weight="800">${data.currentStreak}</text>
    <text x="${(width / 3) * 2 + 38}" y="157" class="display text" font-size="42" font-weight="800">${data.longestStreak}</text>
    <text x="${(width / 3) * 2 + 38}" y="181" class="mono micro">LONGEST STREAK</text>
    ${waveform((width / 3) * 2 + 38, height - 48, width / 3 - 78, theme, data.longestStreak)}
  `;
  return svgDocument({ width, height, theme, body, title: `${data.login} / streak`, description: "GitHub contribution streak card", animate: context.animate });
};

export const renderActivity = (data: ProfileData, context: RenderContext): string => {
  const width = context.width;
  const height = context.height ?? 270;
  const { theme } = context;
  const cell = Math.max(6, Math.min(10, Math.floor((width - 230) / 53) - 3));
  const gap = 3;
  const gridX = 190;
  const gridY = 118;
  const body = `
    ${outerFrame(width, height, theme)}
    ${headerRail({ index: "05", label: "Contribution Trace", width, theme })}
    <text x="38" y="118" class="display text" font-size="48" font-weight="800">${formatNumber(data.contributions)}</text>
    <text x="40" y="142" class="mono micro">SIGNALS / 12 MONTHS</text>
    <text x="40" y="187" class="mono label">CURRENT ${data.currentStreak}D</text>
    <text x="40" y="213" class="mono label">LONGEST ${data.longestStreak}D</text>
    ${monthLabels(data.calendar, gridX, 100, cell, gap)}
    ${heatmap(data.calendar, gridX, gridY, theme, cell, gap)}
    <rect x="${width - 164}" y="${height - 38}" width="9" height="9" fill="${theme.surfaceAlt}"/><rect x="${width - 149}" y="${height - 38}" width="9" height="9" fill="${theme.accent}"/><text x="${width - 38}" y="${height - 28}" text-anchor="end" class="mono micro">QUIET / ACTIVE</text>
  `;
  return svgDocument({ width, height, theme, body, title: `${data.login} / contribution activity`, description: "GitHub contribution calendar card", animate: context.animate });
};

export const renderProfile = (
  data: ProfileData,
  context: RenderContext,
  avatarDataUri?: string | null,
): string => {
  const width = context.width;
  const height = context.height ?? 350;
  const { theme } = context;
  const displayName = data.name || data.login;
  const bio = truncate(data.bio, 90) || "Building useful systems at the intersection of design and engineering.";
  const avatar = avatarDataUri
    ? `<clipPath id="avatarClip"><rect x="46" y="108" width="116" height="116"/></clipPath><image href="${avatarDataUri}" x="46" y="108" width="116" height="116" preserveAspectRatio="xMidYMid slice" clip-path="url(#avatarClip)"/><rect x="46" y="108" width="116" height="116" stroke="${theme.accent}"/>`
    : `<rect x="46" y="108" width="116" height="116" fill="${theme.surface}" stroke="${theme.border}"/><text x="104" y="177" text-anchor="middle" class="display accent" font-size="38" font-weight="800">${escapeXml(data.login.slice(0, 2).toUpperCase())}</text><path d="M46 214L162 118" stroke="${theme.accent}" stroke-opacity=".45"/>`;
  const body = `
    ${outerFrame(width, height, theme)}
    ${headerRail({ index: "06", label: "Identity Node", width, theme })}
    ${avatar}
    <text x="190" y="132" class="mono accent" font-size="11" letter-spacing="1.8">@${escapeXml(data.login.toUpperCase())}</text>
    <text x="188" y="177" class="display text" font-size="42" font-weight="800" letter-spacing="-1.7">${escapeXml(truncate(displayName, 26))}</text>
    <text x="190" y="208" class="mono label">${escapeXml(bio)}</text>
    <line x1="46" y1="252" x2="${width - 46}" y2="252" stroke="${theme.border}"/>
    ${metricBlock(46, 298, data.followers, "followers", theme, { compact: true })}
    ${metricBlock(178, 298, data.repositories, "repositories", theme)}
    ${metricBlock(336, 298, data.stars, "stars", theme, { compact: true })}
    ${metricBlock(464, 298, data.contributions, "contributions", theme, { compact: true })}
    <text x="${width - 46}" y="${height - 30}" text-anchor="end" class="mono micro">NODE ACTIVE SINCE ${data.createdAt.slice(0, 4)}</text>
  `;
  return svgDocument({ width, height, theme, body, title: `${data.login} / profile`, description: "GitHub profile identity card", animate: context.animate });
};

export const renderTerminal = (data: ProfileData, context: RenderContext): string => {
  const width = context.width;
  const height = context.height ?? 370;
  const { theme } = context;
  const topLanguage = data.languages[0]?.name || "unknown";
  const body = `
    <rect x="14" y="14" width="${width - 28}" height="${height - 28}" fill="${theme.surface}" stroke="${theme.border}"/>
    <rect x="14" y="14" width="${width - 28}" height="46" fill="${theme.surfaceAlt}"/>
    <circle cx="38" cy="37" r="5" fill="${theme.danger}"/>
    <circle cx="56" cy="37" r="5" fill="${theme.warning}"/>
    <circle cx="74" cy="37" r="5" fill="${theme.accent}"/>
    <text x="${width / 2}" y="41" text-anchor="middle" class="mono micro">ALIVE://GITHUB/${escapeXml(data.login.toUpperCase())}</text>
    <text x="38" y="99" class="mono micro">01</text>
    <text x="76" y="99" class="mono text" font-size="13"><tspan fill="${theme.accent}">const</tspan> developer = {</text>
    <text x="38" y="131" class="mono micro">02</text>
    <text x="94" y="131" class="mono text" font-size="13"><tspan fill="${theme.accent2}">login</tspan>: <tspan fill="${theme.accent}">"${escapeXml(data.login)}"</tspan>,</text>
    <text x="38" y="163" class="mono micro">03</text>
    <text x="94" y="163" class="mono text" font-size="13"><tspan fill="${theme.accent2}">commits</tspan>: <tspan fill="${theme.accent}">${data.commits}</tspan>,</text>
    <text x="38" y="195" class="mono micro">04</text>
    <text x="94" y="195" class="mono text" font-size="13"><tspan fill="${theme.accent2}">primaryMaterial</tspan>: <tspan fill="${theme.accent}">"${escapeXml(topLanguage)}"</tspan>,</text>
    <text x="38" y="227" class="mono micro">05</text>
    <text x="94" y="227" class="mono text" font-size="13"><tspan fill="${theme.accent2}">streak</tspan>: <tspan fill="${theme.accent}">${data.currentStreak}</tspan>,</text>
    <text x="38" y="259" class="mono micro">06</text>
    <text x="76" y="259" class="mono text" font-size="13">};</text>
    <rect x="38" y="290" width="${width - 76}" height="48" fill="${theme.background}" stroke="${theme.border}"/>
    <text x="58" y="320" class="mono accent" font-size="13">&gt;</text>
    <text x="82" y="320" class="mono label">npm run ship:meaningful-systems</text>
    <rect x="${width - 78}" y="305" width="9" height="17" fill="${theme.accent}" class="blink"/>
  `;
  return svgDocument({ width, height, theme, body, title: `${data.login} / terminal`, description: "GitHub developer terminal card", animate: context.animate });
};

export const renderSignal = (data: ProfileData, context: RenderContext): string => {
  const width = context.width;
  const height = context.height ?? 590;
  const { theme } = context;
  const languages = data.languages.slice(0, 6);
  const langRows = languages
    .map((language, index) => {
      const col = index % 2;
      const row = Math.floor(index / 2);
      const x = Math.round(width * 0.59) + col * Math.round(width * 0.18);
      const y = 208 + row * 34;
      return `<circle cx="${x}" cy="${y - 4}" r="4" fill="${languageColor(index, theme)}"/><text x="${x + 14}" y="${y}" class="mono label">${escapeXml(language.name.toUpperCase())}</text><text x="${x + Math.round(width * 0.15)}" y="${y}" text-anchor="end" class="mono micro">${percent(language.percentage)}</text>`;
    })
    .join("");
  const cell = Math.max(6, Math.min(9, Math.floor((width - 330) / 53) - 3));
  const gap = 3;
  const gridX = 278;
  const gridY = 430;
  const body = `
    ${outerFrame(width, height, theme, 16)}
    ${headerRail({ index: "00", label: "Alive GitHub Signal", width, theme, status: "DYNAMIC / QUERY DRIVEN" })}
    <text x="42" y="112" class="mono accent" font-size="11" letter-spacing="1.8">@${escapeXml(data.login.toUpperCase())} / ACTIVITY NODE</text>
    <text x="38" y="220" class="display text" font-size="112" font-weight="820" letter-spacing="-6">${formatNumber(data.contributions)}</text>
    <text x="44" y="250" class="mono micro">CONTRIBUTIONS / LAST 12 MONTHS</text>
    <line x1="${Math.round(width * 0.53)}" y1="104" x2="${Math.round(width * 0.53)}" y2="336" stroke="${theme.border}"/>
    <text x="${Math.round(width * 0.59)}" y="126" class="mono accent" font-size="11" letter-spacing="1.7">PRIMARY MATERIALS</text>
    ${languageSegments(languages, Math.round(width * 0.59), 152, Math.round(width * 0.35), 16, theme, 6)}
    ${langRows}
    <line x1="42" y1="304" x2="${width - 42}" y2="304" stroke="${theme.border}"/>
    ${metricBlock(42, 352, data.commits, "commits", theme)}
    ${metricBlock(190, 352, data.pullRequests, "pull requests", theme)}
    ${metricBlock(370, 352, data.stars, "stars", theme, { compact: true })}
    ${metricBlock(504, 352, data.currentStreak, "current streak", theme)}
    ${metricBlock(680, 352, data.longestStreak, "longest streak", theme)}
    ${metricBlock(856, 352, data.repositories, "repositories", theme)}
    <line x1="42" y1="392" x2="${width - 42}" y2="392" stroke="${theme.border}"/>
    <text x="42" y="430" class="mono accent" font-size="11" letter-spacing="1.7">CONTRIBUTION TRACE</text>
    <text x="42" y="456" class="mono micro">QUIET</text>
    <rect x="88" y="447" width="9" height="9" fill="${theme.surfaceAlt}"/>
    <rect x="102" y="447" width="9" height="9" fill="${theme.accent}55"/>
    <rect x="116" y="447" width="9" height="9" fill="${theme.accent}AA"/>
    <rect x="130" y="447" width="9" height="9" fill="${theme.accent}"/>
    <text x="148" y="456" class="mono micro">ACTIVE</text>
    ${monthLabels(data.calendar, gridX, 414, cell, gap)}
    ${heatmap(data.calendar, gridX, gridY, theme, cell, gap)}
    <line x1="42" y1="${height - 64}" x2="${width - 42}" y2="${height - 64}" stroke="${theme.border}"/>
    ${waveform(44, height - 34, Math.round(width * 0.32), theme, data.commits % 23)}
    <text x="${width - 42}" y="${height - 30}" text-anchor="end" class="mono micro">THE INTERFACE IS ALIVE / GITHUB.COM/${escapeXml(data.login.toUpperCase())}</text>
  `;
  return svgDocument({ width, height, theme, body, title: `${data.login} / alive signal`, description: "Full Alive Interface GitHub signal panel", animate: context.animate });
};

const metricValue = (data: ProfileData | null, metric: string, fallback: string): string => {
  if (!data) return fallback;
  const map: Record<string, number> = {
    commits: data.commits,
    contributions: data.contributions,
    stars: data.stars,
    followers: data.followers,
    repos: data.repositories,
    repositories: data.repositories,
    prs: data.pullRequests,
    issues: data.issues,
    streak: data.currentStreak,
  };
  const value = map[metric.toLowerCase()];
  return value === undefined ? fallback : formatNumber(value, true);
};

export const renderBadge = (
  data: ProfileData | null,
  context: RenderContext,
): string => {
  const { theme, params } = context;
  const label = safeText(params.get("label"), safeText(params.get("metric"), "signal", 24), 30).toUpperCase();
  const value = metricValue(data, safeText(params.get("metric"), "", 20), safeText(params.get("value"), "LIVE", 20)).toUpperCase();
  const variant = safeText(params.get("variant"), "signal", 20);
  const width = parseInteger(params.get("width"), Math.max(150, 54 + label.length * 7 + value.length * 8), 110, 520);
  const height = 34;
  const cut = variant === "bracket" ? 9 : 0;
  const body = `
    <path d="M${cut} 1H${width - 1}V${height - 1}H1V${cut}Z" fill="${theme.background}" stroke="${theme.border}"/>
    <rect x="1" y="1" width="6" height="${height - 2}" fill="${theme.accent}"/>
    <text x="18" y="22" class="mono label">${escapeXml(label)}</text>
    <text x="${width - 14}" y="22" text-anchor="end" class="mono accent" font-size="12" font-weight="700">${escapeXml(value)}</text>
    ${variant === "signal" ? `<circle cx="${width - 14 - value.length * 8 - 10}" cy="17" r="3" fill="${theme.accent}" class="pulse"/>` : ""}
  `;
  return svgDocument({ width, height, theme, body, title: `${label}: ${value}`, description: "Alive Interface badge", animate: context.animate });
};

export const renderButton = (context: RenderContext): string => {
  const { theme, params } = context;
  const label = safeText(params.get("label"), "VIEW SYSTEM", 34).toUpperCase();
  const icon = safeText(params.get("icon"), "arrow", 20).toLowerCase();
  const variant = safeText(params.get("variant"), "rail", 20);
  const width = parseInteger(params.get("width"), Math.max(190, label.length * 10 + 82), 140, 560);
  const height = 46;
  const shape = variant === "bracket"
    ? `<path d="M12 1H${width - 1}V${height - 12}L${width - 12} ${height - 1}H1V12Z" fill="${theme.surface}" stroke="${theme.border}"/>`
    : `<rect x="1" y="1" width="${width - 2}" height="${height - 2}" fill="${theme.surface}" stroke="${theme.border}"/>`;
  const iconSvg = isSocialPlatform(icon)
    ? socialIcon({ platform: icon, x: width - 43, y: 11, size: 24, theme, frame: false })
    : simpleActionIcon({ icon, x: width - 43, y: 11, size: 24, theme });
  const body = `
    ${shape}
    <rect x="1" y="1" width="7" height="${height - 2}" fill="${theme.accent}"/>
    <text x="24" y="29" class="mono text" font-size="12" font-weight="700" letter-spacing="1.4">${escapeXml(label)}</text>
    <line x1="${width - 58}" y1="10" x2="${width - 58}" y2="${height - 10}" stroke="${theme.border}"/>
    ${iconSvg}
  `;
  return svgDocument({ width, height, theme, body, title: label, description: "Alive Interface button artwork", animate: context.animate });
};

export const renderSocial = (context: RenderContext): string => {
  const { theme, params } = context;
  const requested = safeText(params.get("platform"), "github", 20).toLowerCase();
  const platform: SocialPlatform = isSocialPlatform(requested) ? requested : "github";
  const label = safeText(params.get("label"), platformLabel(platform), 34).toUpperCase();
  const handle = safeText(params.get("handle") ?? params.get("username"), "", 46);
  const variant = safeText(params.get("variant"), "rail", 20).toLowerCase();
  const brand = ["1", "true", "yes", "on"].includes((params.get("brand") ?? "").toLowerCase());
  const iconColor = brand ? SOCIAL_BRAND_COLORS[platform] : theme.accent;

  if (variant === "compact") {
    const size = parseInteger(params.get("width"), 58, 46, 120);
    const body = `
      <rect x="1" y="1" width="${size - 2}" height="${size - 2}" fill="${theme.surface}" stroke="${theme.border}"/>
      <path d="M1 14V1H14M${size - 14} 1H${size - 1}V14M${size - 1} ${size - 14}V${size - 1}H${size - 14}" stroke="${iconColor}"/>
      ${socialIcon({ platform, x: Math.round((size - 28) / 2), y: Math.round((size - 28) / 2), size: 28, theme, color: iconColor, frame: false })}
    `;
    return svgDocument({ width: size, height: size, theme, body, title: label, description: `${label} Alive Interface social icon`, animate: context.animate });
  }

  const width = parseInteger(params.get("width"), Math.max(250, 118 + label.length * 8 + handle.length * 6), 210, 620);
  const height = variant === "stack" ? 72 : 56;
  const frame = variant === "bracket"
    ? `<path d="M13 1H${width - 1}V${height - 13}L${width - 13} ${height - 1}H1V13Z" fill="${theme.surface}" stroke="${theme.border}"/>`
    : `<rect x="1" y="1" width="${width - 2}" height="${height - 2}" fill="${theme.surface}" stroke="${theme.border}"/>`;
  const iconSize = height === 72 ? 34 : 28;
  const iconY = Math.round((height - iconSize) / 2);
  const textY = handle ? (height === 72 ? 29 : 23) : Math.round(height / 2 + 4);
  const body = `
    ${frame}
    <rect x="1" y="1" width="6" height="${height - 2}" fill="${iconColor}"/>
    <rect x="14" y="${iconY - 5}" width="${iconSize + 10}" height="${iconSize + 10}" fill="${theme.background}" stroke="${theme.border}"/>
    ${socialIcon({ platform, x: 19, y: iconY, size: iconSize, theme, color: iconColor, frame: false })}
    <line x1="${iconSize + 34}" y1="10" x2="${iconSize + 34}" y2="${height - 10}" stroke="${theme.border}"/>
    <text x="${iconSize + 50}" y="${textY}" class="mono text" font-size="11" font-weight="700" letter-spacing="1.5">${escapeXml(label)}</text>
    ${handle ? `<text x="${iconSize + 50}" y="${textY + 19}" class="mono micro">${escapeXml(handle)}</text>` : ""}
    <circle cx="${width - 43}" cy="${Math.round(height / 2)}" r="3" fill="${iconColor}" class="pulse"/>
    <path d="M${width - 30} ${Math.round(height / 2)}H${width - 14}M${width - 20} ${Math.round(height / 2) - 6}L${width - 14} ${Math.round(height / 2)}L${width - 20} ${Math.round(height / 2) + 6}" stroke="${iconColor}"/>
  `;
  return svgDocument({ width, height, theme, body, title: label, description: `${label} Alive Interface social button`, animate: context.animate });
};

export const renderStatus = (context: RenderContext): string => {
  const { theme, params } = context;
  const label = safeText(params.get("label"), "AVAILABLE FOR WORK", 40).toUpperCase();
  const state = safeText(params.get("state"), "online", 20).toLowerCase();
  const stateLabel = safeText(params.get("value"), state, 20).toUpperCase();
  const stateColor = state === "offline" ? theme.faint : state === "busy" ? theme.warning : state === "error" ? theme.danger : theme.accent;
  const width = parseInteger(params.get("width"), Math.max(240, label.length * 8 + stateLabel.length * 8 + 74), 190, 620);
  const height = 58;
  const body = `
    <rect x="1" y="1" width="${width - 2}" height="${height - 2}" fill="${theme.background}" stroke="${theme.border}"/>
    <circle cx="28" cy="29" r="12" fill="${stateColor}" opacity=".12" class="pulse"/>
    <circle cx="28" cy="29" r="5" fill="${stateColor}" filter="url(#alive-glow)"/>
    <text x="52" y="25" class="mono text" font-size="11" font-weight="700" letter-spacing="1.2">${escapeXml(label)}</text>
    <text x="52" y="42" class="mono micro">SIGNAL / ${escapeXml(stateLabel)}</text>
    <path d="M${width - 68} 29H${width - 18}" stroke="${stateColor}"/>
    <path d="M${width - 45} 20L${width - 36} 29L${width - 45} 38" stroke="${stateColor}"/>
  `;
  return svgDocument({ width, height, theme, body, title: `${label}: ${stateLabel}`, description: "Alive Interface status badge", animate: context.animate });
};

export const renderErrorCard = (
  message: string,
  context: Pick<RenderContext, "theme" | "width" | "animate">,
): string => {
  const width = Math.max(420, context.width || 620);
  const height = 180;
  const { theme } = context;
  const body = `
    ${outerFrame(width, height, theme)}
    <text x="36" y="48" class="mono section">ERR / SIGNAL INTERRUPTED</text>
    <line x1="36" y1="70" x2="${width - 36}" y2="70" stroke="${theme.border}"/>
    <circle cx="48" cy="112" r="8" fill="${theme.danger}" filter="url(#alive-glow)"/>
    <text x="72" y="108" class="mono text" font-size="12">${escapeXml(truncate(message, 88))}</text>
    <text x="72" y="132" class="mono micro">CHECK QUERY PARAMETERS OR SERVER TOKEN CONFIGURATION.</text>
  `;
  return svgDocument({ width, height, theme, body, title: "Alive signal error", description: message, animate: context.animate });
};

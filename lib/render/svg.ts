import type { Theme } from "../types";

export const escapeXml = (value: unknown): string =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

export const formatNumber = (value: number, compact = false): string =>
  new Intl.NumberFormat("en-US", {
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: compact ? 1 : 0,
  }).format(value);

export const truncate = (value: string | null | undefined, max: number): string => {
  const text = value?.trim() || "";
  return text.length <= max ? text : `${text.slice(0, Math.max(0, max - 1))}…`;
};

export const sharedDefs = (
  theme: Theme,
  animate: boolean,
  id = "alive",
): string => `
  <defs>
    <pattern id="${id}-grid" width="28" height="28" patternUnits="userSpaceOnUse">
      <path d="M28 0H0V28" stroke="${theme.grid}" stroke-opacity=".035"/>
    </pattern>
    <linearGradient id="${id}-accent" x1="0" y1="0" x2="1" y2="0">
      <stop stop-color="${theme.accent}"/>
      <stop offset="1" stop-color="${theme.accent2}" stop-opacity=".22"/>
    </linearGradient>
    <radialGradient id="${id}-aura">
      <stop stop-color="${theme.accent}" stop-opacity=".28"/>
      <stop offset="1" stop-color="${theme.accent}" stop-opacity="0"/>
    </radialGradient>
    <filter id="${id}-glow" x="-80%" y="-80%" width="260%" height="260%">
      <feGaussianBlur stdDeviation="5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <style>
      .display { font-family: Arial Narrow, Helvetica Neue, Arial, sans-serif; }
      .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
      .label { fill:${theme.muted}; font-size:11px; letter-spacing:1.45px; }
      .micro { fill:${theme.faint}; font-size:9px; letter-spacing:1.15px; }
      .section { fill:${theme.text}; font-size:14px; font-weight:700; letter-spacing:2.3px; }
      .accent { fill:${theme.accent}; }
      .text { fill:${theme.text}; }
      ${
        animate
          ? `
      @keyframes pulse { 0%,100%{opacity:.35} 50%{opacity:1} }
      @keyframes scan { from{transform:translateX(-35%)} to{transform:translateX(135%)} }
      @keyframes blink { 0%,45%{opacity:1} 46%,100%{opacity:0} }
      @keyframes drift { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
      .pulse { animation:pulse 2.2s ease-in-out infinite; }
      .scan { animation:scan 5s linear infinite; }
      .blink { animation:blink 1.1s steps(1,end) infinite; }
      .drift { animation:drift 4s ease-in-out infinite; }
      `
          : ""
      }
    </style>
  </defs>`;

export const svgDocument = ({
  width,
  height,
  theme,
  body,
  title,
  description,
  animate = false,
  id = "alive",
}: {
  width: number;
  height: number;
  theme: Theme;
  body: string;
  title: string;
  description: string;
  animate?: boolean;
  id?: string;
}): string => `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(title)}</title>
  <desc id="desc">${escapeXml(description)}</desc>
  ${sharedDefs(theme, animate, id)}
  <rect width="${width}" height="${height}" fill="${theme.background}"/>
  <rect width="${width}" height="${height}" fill="url(#${id}-grid)"/>
  ${body}
</svg>`.trim();

export const outerFrame = (
  width: number,
  height: number,
  theme: Theme,
  inset = 14,
): string => `
  <rect x="${inset}" y="${inset}" width="${width - inset * 2}" height="${height - inset * 2}" fill="none" stroke="${theme.border}"/>
  <path d="M${inset} ${inset + 18}V${inset}H${inset + 18} M${width - inset - 18} ${inset}H${width - inset}V${inset + 18} M${inset} ${height - inset - 18}V${height - inset}H${inset + 18} M${width - inset - 18} ${height - inset}H${width - inset}V${height - inset - 18}" stroke="${theme.accent}" stroke-width="1.5"/>
`;

export const headerRail = ({
  index,
  label,
  width,
  theme,
  status = "LIVE / GITHUB API",
}: {
  index: string;
  label: string;
  width: number;
  theme: Theme;
  status?: string;
}): string => `
  <text x="36" y="48" class="mono section">${escapeXml(index)} / ${escapeXml(label.toUpperCase())}</text>
  <line x1="36" y1="70" x2="${width - 36}" y2="70" stroke="${theme.border}"/>
  <circle cx="${width - 170}" cy="43" r="4" fill="${theme.accent}" filter="url(#alive-glow)" class="pulse"/>
  <text x="${width - 156}" y="47" class="mono micro">${escapeXml(status)}</text>
`;

export const waveform = (
  x: number,
  y: number,
  width: number,
  theme: Theme,
  seed = 0,
): string => {
  const points = Array.from({ length: Math.max(30, Math.floor(width / 4)) }, (_, i) => {
    const px = x + i * 4;
    const amplitude = 3 + (i / Math.max(1, width / 4)) * 9;
    const py = y - (Math.sin((i + seed) * 0.33) + Math.sin((i + seed) * 0.091)) * amplitude;
    return `${px.toFixed(1)},${py.toFixed(1)}`;
  }).join(" ");
  return `<polyline points="${points}" stroke="${theme.accent}" stroke-width="1.5" fill="none" opacity=".9"/>`;
};

export const languageColor = (index: number, theme: Theme): string => {
  const palette = [
    theme.accent,
    theme.accent2,
    theme.text,
    theme.muted,
    theme.faint,
    theme.border,
  ];
  return palette[index % palette.length]!;
};

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
      <path d="M28 0H0V28" stroke="${theme.grid}" stroke-opacity=".04"/>
    </pattern>
    <linearGradient id="${id}-accent" x1="0" y1="0" x2="1" y2="0">
      <stop stop-color="${theme.accent}"/>
      <stop offset=".62" stop-color="${theme.accent2}" stop-opacity=".42"/>
      <stop offset="1" stop-color="${theme.accent}" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="${id}-scan-gradient" x1="0" y1="0" x2="1" y2="0">
      <stop stop-color="${theme.accent}" stop-opacity="0"/>
      <stop offset=".48" stop-color="${theme.accent}" stop-opacity=".08"/>
      <stop offset=".5" stop-color="${theme.accent}" stop-opacity=".36"/>
      <stop offset=".52" stop-color="${theme.accent}" stop-opacity=".08"/>
      <stop offset="1" stop-color="${theme.accent}" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="${id}-aura">
      <stop stop-color="${theme.accent}" stop-opacity=".28"/>
      <stop offset=".58" stop-color="${theme.accent}" stop-opacity=".09"/>
      <stop offset="1" stop-color="${theme.accent}" stop-opacity="0"/>
    </radialGradient>
    <filter id="${id}-glow" x="-100%" y="-100%" width="300%" height="300%">
      <feGaussianBlur stdDeviation="5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="${id}-soft-glow" x="-80%" y="-80%" width="260%" height="260%">
      <feGaussianBlur stdDeviation="2.6" result="blur"/>
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
      .motion-origin { transform-box:fill-box; transform-origin:center; }
      ${
        animate
          ? `
      @keyframes alive-reveal {
        0% { opacity:0; transform:translateY(9px); }
        100% { opacity:1; transform:translateY(0); }
      }
      @keyframes alive-rise {
        0% { opacity:0; transform:translateY(13px); }
        62% { opacity:1; }
        100% { opacity:1; transform:translateY(0); }
      }
      @keyframes alive-pulse {
        0%,100% { opacity:.35; transform:scale(.82); }
        50% { opacity:1; transform:scale(1.18); }
      }
      @keyframes alive-breathe {
        0%,100% { opacity:.56; transform:scale(.94); }
        50% { opacity:1; transform:scale(1.06); }
      }
      @keyframes alive-drift {
        0%,100% { transform:translateY(0) rotate(0deg); }
        50% { transform:translateY(-3px) rotate(.7deg); }
      }
      @keyframes alive-orbit {
        to { transform:rotate(360deg); }
      }
      @keyframes alive-orbit-reverse {
        to { transform:rotate(-360deg); }
      }
      @keyframes alive-orbit-stroke {
        from { stroke-dashoffset:0; }
        to { stroke-dashoffset:-1000; }
      }
      @keyframes alive-orbit-stroke-reverse {
        from { stroke-dashoffset:0; }
        to { stroke-dashoffset:1000; }
      }
      @keyframes alive-draw {
        0% { stroke-dashoffset:1000; opacity:.12; }
        55% { opacity:1; }
        100% { stroke-dashoffset:0; opacity:1; }
      }
      @keyframes alive-wave {
        0% { stroke-dashoffset:900; opacity:.28; }
        48% { opacity:1; }
        100% { stroke-dashoffset:0; opacity:.86; }
      }
      @keyframes alive-grid {
        from { transform:translate(0,0); }
        to { transform:translate(28px,28px); }
      }
      @keyframes alive-scan {
        from { transform:translateX(-130%); opacity:0; }
        12% { opacity:.55; }
        72% { opacity:.3; }
        to { transform:translateX(130%); opacity:0; }
      }
      @keyframes alive-bar {
        from { transform:scaleX(0); opacity:.25; }
        to { transform:scaleX(1); opacity:1; }
      }
      @keyframes alive-cell {
        0%,100% { opacity:.62; }
        50% { opacity:1; filter:url(#${id}-soft-glow); }
      }
      @keyframes alive-nudge {
        0%,100% { transform:translateX(0); }
        50% { transform:translateX(4px); }
      }
      @keyframes alive-flicker {
        0%,92%,100% { opacity:1; }
        94% { opacity:.45; }
        96% { opacity:.86; }
        98% { opacity:.28; }
      }
      @keyframes alive-blink {
        0%,48% { opacity:1; }
        49%,100% { opacity:0; }
      }
      @keyframes alive-ticker {
        from { transform:translateX(0); }
        to { transform:translateX(-50%); }
      }
      @keyframes alive-float-node {
        0%,100% { transform:translateY(0) scale(1); }
        50% { transform:translateY(-5px) scale(1.035); }
      }
      @keyframes alive-polygon {
        0% { opacity:.18; transform:scale(.72) rotate(-5deg); }
        65% { opacity:1; }
        100% { opacity:.86; transform:scale(1) rotate(0); }
      }

      .alive-stage { animation:alive-reveal .7s cubic-bezier(.2,.8,.2,1) both; }
      .grid-layer { animation:alive-grid 18s linear infinite; }
      .scan-beam { animation:alive-scan 6.8s cubic-bezier(.32,0,.2,1) infinite; }
      .pulse { transform-box:fill-box; transform-origin:center; animation:alive-pulse 2.2s ease-in-out infinite; }
      .breathe, .icon-breathe { transform-box:fill-box; transform-origin:center; animation:alive-breathe 3.2s ease-in-out infinite; }
      .drift { transform-box:fill-box; transform-origin:center; animation:alive-drift 4.8s ease-in-out infinite; }
      .orbit { transform-box:fill-box; transform-origin:center; animation:alive-orbit 16s linear infinite; }
      .orbit-reverse { transform-box:fill-box; transform-origin:center; animation:alive-orbit-reverse 21s linear infinite; }
      .orbit-stroke { animation:alive-orbit-stroke 18s linear infinite; }
      .orbit-stroke-reverse { animation:alive-orbit-stroke-reverse 23s linear infinite; }
      .frame-draw, .line-draw {
        stroke-dasharray:1000;
        animation:alive-draw 1.55s cubic-bezier(.3,.7,.2,1) both;
      }
      .signal-wave {
        stroke-dasharray:900;
        animation:alive-wave 4.8s linear infinite;
      }
      .metric-rise { animation:alive-rise .72s cubic-bezier(.2,.8,.2,1) both; }
      .bar-grow {
        transform-box:fill-box;
        transform-origin:left center;
        animation:alive-bar 1.1s cubic-bezier(.2,.82,.2,1) both;
      }
      .heat-active { animation:alive-cell 3.8s ease-in-out infinite; }
      .action-nudge { animation:alive-nudge 1.65s ease-in-out infinite; }
      .flicker { animation:alive-flicker 5.8s steps(1,end) infinite; }
      .blink { animation:alive-blink 1.05s steps(1,end) infinite; }
      .ticker-track { animation:alive-ticker 18s linear infinite; }
      .float-node { transform-box:fill-box; transform-origin:center; animation:alive-float-node 4.2s ease-in-out infinite; }
      .radar-polygon { transform-box:fill-box; transform-origin:center; animation:alive-polygon 1.25s cubic-bezier(.2,.8,.2,1) both; }

      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after { animation:none !important; }
      }
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
  animate = true,
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
  <rect class="grid-layer" x="-28" y="-28" width="${width + 56}" height="${height + 56}" fill="url(#${id}-grid)"/>
  ${animate ? `<rect class="scan-beam" x="${-width}" y="0" width="${Math.max(80, Math.round(width * .17))}" height="${height}" fill="url(#${id}-scan-gradient)" pointer-events="none"/>` : ""}
  <g class="alive-stage">
    ${body}
  </g>
</svg>`.trim();

export const outerFrame = (
  width: number,
  height: number,
  theme: Theme,
  inset = 14,
): string => `
  <rect class="frame-draw" x="${inset}" y="${inset}" width="${width - inset * 2}" height="${height - inset * 2}" fill="none" stroke="${theme.border}"/>
  <path class="line-draw" d="M${inset} ${inset + 18}V${inset}H${inset + 18} M${width - inset - 18} ${inset}H${width - inset}V${inset + 18} M${inset} ${height - inset - 18}V${height - inset}H${inset + 18} M${width - inset - 18} ${height - inset}H${width - inset}V${height - inset - 18}" stroke="${theme.accent}" stroke-width="1.5"/>
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
  <text x="36" y="48" class="mono section metric-rise">${escapeXml(index)} / ${escapeXml(label.toUpperCase())}</text>
  <line class="line-draw" x1="36" y1="70" x2="${width - 36}" y2="70" stroke="${theme.border}"/>
  <circle cx="${width - 170}" cy="43" r="4" fill="${theme.accent}" filter="url(#alive-glow)" class="pulse"/>
  <text x="${width - 156}" y="47" class="mono micro flicker">${escapeXml(status)}</text>
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
  return `<polyline class="signal-wave" points="${points}" stroke="${theme.accent}" stroke-width="1.5" fill="none" opacity=".9"/>`;
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

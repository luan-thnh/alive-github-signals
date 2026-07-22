import type { Theme } from "../types";
import { escapeXml } from "./svg";

export const SOCIAL_PLATFORMS = [
  "github",
  "youtube",
  "facebook",
  "linkedin",
  "instagram",
  "tiktok",
  "x",
  "discord",
  "telegram",
  "zalo",
  "website",
  "email",
] as const;

export type SocialPlatform = (typeof SOCIAL_PLATFORMS)[number];

export const isSocialPlatform = (value: string): value is SocialPlatform =>
  SOCIAL_PLATFORMS.includes(value as SocialPlatform);

export const SOCIAL_LABELS: Record<SocialPlatform, string> = {
  github: "GITHUB",
  youtube: "YOUTUBE",
  facebook: "FACEBOOK",
  linkedin: "LINKEDIN",
  instagram: "INSTAGRAM",
  tiktok: "TIKTOK",
  x: "X / TWITTER",
  discord: "DISCORD",
  telegram: "TELEGRAM",
  zalo: "ZALO",
  website: "WEBSITE",
  email: "EMAIL",
};

export const SOCIAL_BRAND_COLORS: Record<SocialPlatform, string> = {
  github: "#F3F0EA",
  youtube: "#FF3158",
  facebook: "#4C8DFF",
  linkedin: "#4AB3FF",
  instagram: "#F04DFF",
  tiktok: "#55F5E7",
  x: "#F3F0EA",
  discord: "#8C9EFF",
  telegram: "#46C7FF",
  zalo: "#4A90FF",
  website: "#C8FF4D",
  email: "#FFD66B",
};

const paths: Record<SocialPlatform, (color: string) => string> = {
  youtube: (color) => `
    <rect x="2.5" y="6" width="19" height="12" rx="3" fill="none" stroke="${color}" stroke-width="1.7"/>
    <path d="M10 9L16 12L10 15Z" fill="${color}"/>
    <path d="M4 4H8M16 20H20" stroke="${color}" stroke-width="1.2"/>
  `,
  facebook: (color) => `
    <path d="M14.8 3.2H12.7C9.9 3.2 8.2 5 8.2 7.9V10H5.7V13H8.2V21H12V13H15.3L15.9 10H12V8.2C12 7 12.5 6.2 14 6.2H15.4Z" fill="${color}"/>
    <path d="M4 3H8M16 21H20" stroke="${color}" stroke-width="1.2"/>
  `,
  linkedin: (color) => `
    <rect x="3" y="3" width="18" height="18" fill="none" stroke="${color}" stroke-width="1.5"/>
    <circle cx="7.2" cy="8" r="1.3" fill="${color}"/>
    <path d="M6 11V18M10.5 18V11M10.5 14.2C10.5 12.3 11.7 11 13.6 11C15.8 11 17 12.5 17 15V18" stroke="${color}" stroke-width="1.8"/>
  `,
  instagram: (color) => `
    <rect x="3" y="3" width="18" height="18" rx="4.5" fill="none" stroke="${color}" stroke-width="1.6"/>
    <circle cx="12" cy="12" r="4.2" fill="none" stroke="${color}" stroke-width="1.6"/>
    <circle cx="17.4" cy="6.7" r="1.1" fill="${color}"/>
  `,
  tiktok: (color) => `
    <path d="M13 4V15.4C13 17.8 11.1 19.7 8.7 19.7C6.4 19.7 4.5 17.9 4.5 15.6C4.5 13.2 6.5 11.3 8.9 11.3C9.4 11.3 9.8 11.4 10.2 11.5V14.4C9.9 14.2 9.5 14.1 9.1 14.1C8.2 14.1 7.4 14.8 7.4 15.7C7.4 16.6 8.1 17.3 9 17.3C10 17.3 10.7 16.5 10.7 15.5V4H13Z" fill="${color}"/>
    <path d="M13 5C14.2 7.4 16 8.7 19 8.9V11.8C16.5 11.6 14.4 10.6 13 9.2" stroke="${color}" stroke-width="1.7"/>
  `,
  x: (color) => `
    <path d="M4 4L20 20M20 4L4 20" stroke="${color}" stroke-width="2"/>
    <path d="M7.5 4H4V7.5M16.5 20H20V16.5" stroke="${color}" stroke-width="1.2"/>
  `,
  discord: (color) => `
    <path d="M6.1 6.6C9.8 4.6 14.1 4.6 17.9 6.6C19.2 9.3 19.8 12.1 19.5 15.1C17.3 17.1 15 18.1 12 18.2C9 18.1 6.7 17.1 4.5 15.1C4.2 12.1 4.8 9.3 6.1 6.6Z" fill="none" stroke="${color}" stroke-width="1.5"/>
    <circle cx="9" cy="12" r="1.3" fill="${color}"/><circle cx="15" cy="12" r="1.3" fill="${color}"/>
    <path d="M8.2 15C10.7 16.1 13.3 16.1 15.8 15" stroke="${color}" stroke-width="1.2"/>
  `,
  telegram: (color) => `
    <path d="M3.2 11.4L20.4 4.3L16.6 20L11.1 15.7L7.8 18.3L8.4 13.7L16.9 7.3L6.5 12.2Z" fill="none" stroke="${color}" stroke-width="1.5" stroke-linejoin="bevel"/>
  `,
  zalo: (color) => `
    <path d="M4 4H20V17H11L7 21V17H4Z" fill="none" stroke="${color}" stroke-width="1.5"/>
    <path d="M8 8H15L8.5 13H16" stroke="${color}" stroke-width="1.7"/>
  `,
  website: (color) => `
    <circle cx="12" cy="12" r="9" fill="none" stroke="${color}" stroke-width="1.5"/>
    <path d="M3.5 12H20.5M12 3C14.8 5.5 16 8.5 16 12C16 15.5 14.8 18.5 12 21C9.2 18.5 8 15.5 8 12C8 8.5 9.2 5.5 12 3Z" fill="none" stroke="${color}" stroke-width="1.3"/>
  `,
  email: (color) => `
    <rect x="3" y="5" width="18" height="14" fill="none" stroke="${color}" stroke-width="1.5"/>
    <path d="M4 7L12 13L20 7M4 18L9 13.8M20 18L15 13.8" fill="none" stroke="${color}" stroke-width="1.3"/>
  `,
  github: (color) => `
    <circle cx="12" cy="12" r="9" fill="none" stroke="${color}" stroke-width="1.4"/>
    <path d="M7.2 8.8L8 5.9L10.2 7.1C11.4 6.8 12.6 6.8 13.8 7.1L16 5.9L16.8 8.8C18 10 18.4 11.5 18.1 13.1C17.7 15.4 15.7 16.9 12 16.9C8.3 16.9 6.3 15.4 5.9 13.1C5.6 11.5 6 10 7.2 8.8Z" fill="none" stroke="${color}" stroke-width="1.4"/>
    <circle cx="9.4" cy="12" r="1" fill="${color}"/><circle cx="14.6" cy="12" r="1" fill="${color}"/>
    <path d="M9.2 15.2C10.8 15.8 13.2 15.8 14.8 15.2" stroke="${color}" stroke-width="1.1"/>
  `,
};

export const socialIcon = ({
  platform,
  x,
  y,
  size,
  theme,
  color,
  frame = true,
}: {
  platform: SocialPlatform;
  x: number;
  y: number;
  size: number;
  theme: Theme;
  color?: string;
  frame?: boolean;
}): string => {
  const resolved = color ?? theme.accent;
  const scale = size / 24;
  return `
    <g transform="translate(${x} ${y})">
      ${frame ? `<path d="M0 7V0H7M${size - 7} 0H${size}V7M${size} ${size - 7}V${size}H${size - 7}M7 ${size}H0V${size - 7}" stroke="${theme.border}" stroke-width="1"/>` : ""}
      <g transform="scale(${scale})">${paths[platform](resolved)}</g>
    </g>
  `;
};

export const simpleActionIcon = ({
  icon,
  x,
  y,
  size,
  theme,
}: {
  icon: string;
  x: number;
  y: number;
  size: number;
  theme: Theme;
}): string => {
  const scale = size / 24;
  const color = theme.accent;
  const action: Record<string, string> = {
    arrow: `<path d="M5 19L19 5M9 5H19V15" fill="none" stroke="${color}" stroke-width="1.8"/>`,
    code: `<path d="M9 7L4 12L9 17M15 7L20 12L15 17M13.5 4L10.5 20" fill="none" stroke="${color}" stroke-width="1.6"/>`,
    plus: `<path d="M12 4V20M4 12H20" stroke="${color}" stroke-width="1.8"/>`,
    play: `<path d="M8 5L19 12L8 19Z" fill="none" stroke="${color}" stroke-width="1.7"/>`,
  };
  return `<g transform="translate(${x} ${y}) scale(${scale})">${action[icon] ?? action.arrow}</g>`;
};

export const platformLabel = (platform: SocialPlatform): string =>
  escapeXml(SOCIAL_LABELS[platform]);

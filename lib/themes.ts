import { parseHex, parseThemeName } from "./params";
import type { Theme, ThemeName } from "./types";

const themes: Record<ThemeName, Theme> = {
  alive: {
    name: "alive",
    background: "#090B0E",
    surface: "#0D1013",
    surfaceAlt: "#14181A",
    text: "#F3F0EA",
    muted: "#94978F",
    faint: "#565B56",
    border: "#2B302D",
    grid: "#F3F0EA",
    accent: "#C8FF4D",
    accent2: "#F3F0EA",
    danger: "#FF5D52",
    warning: "#FFB84D",
  },
  paper: {
    name: "paper",
    background: "#F1EFE8",
    surface: "#E8E5DC",
    surfaceAlt: "#DDD9CF",
    text: "#111311",
    muted: "#64675F",
    faint: "#989B92",
    border: "#B7BAB0",
    grid: "#111311",
    accent: "#86B600",
    accent2: "#111311",
    danger: "#C83B32",
    warning: "#A76800",
  },
  cobalt: {
    name: "cobalt",
    background: "#080B12",
    surface: "#0C1220",
    surfaceAlt: "#111A2D",
    text: "#F0F5FF",
    muted: "#8D99AE",
    faint: "#4B5872",
    border: "#26334D",
    grid: "#D7E5FF",
    accent: "#5DE1FF",
    accent2: "#7B7DFF",
    danger: "#FF6577",
    warning: "#FFD166",
  },
  ember: {
    name: "ember",
    background: "#0E0908",
    surface: "#15100E",
    surfaceAlt: "#211512",
    text: "#FFF2EA",
    muted: "#B29A8F",
    faint: "#6D5148",
    border: "#3D2923",
    grid: "#FFF2EA",
    accent: "#FF6542",
    accent2: "#FFB454",
    danger: "#FF3E4D",
    warning: "#FFD166",
  },
  mono: {
    name: "mono",
    background: "#080808",
    surface: "#111111",
    surfaceAlt: "#191919",
    text: "#F5F5F2",
    muted: "#999994",
    faint: "#555552",
    border: "#30302E",
    grid: "#F5F5F2",
    accent: "#F5F5F2",
    accent2: "#BDBDB7",
    danger: "#F5F5F2",
    warning: "#BDBDB7",
  },
};

export const resolveTheme = (params: URLSearchParams): Theme => {
  const base = themes[parseThemeName(params.get("theme"))];
  return {
    ...base,
    background:
      parseHex(params.get("bg") ?? params.get("bg_color")) ?? base.background,
    surface: parseHex(params.get("surface")) ?? base.surface,
    text:
      parseHex(params.get("text") ?? params.get("text_color")) ?? base.text,
    muted: parseHex(params.get("muted")) ?? base.muted,
    border:
      parseHex(params.get("border") ?? params.get("border_color")) ??
      base.border,
    accent:
      parseHex(
        params.get("accent") ??
          params.get("title_color") ??
          params.get("icon_color"),
      ) ?? base.accent,
    accent2: parseHex(params.get("accent2")) ?? base.accent2,
  };
};

export const themeNames = Object.keys(themes) as ThemeName[];

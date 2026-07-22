import type { Metadata } from "next";
import "./globals.css";

const normalizeSiteUrl = (value?: string): string => {
  const fallback = "http://localhost:3000";
  if (!value?.trim()) return fallback;
  const normalized = value.trim().replace(/\/+$/, "");
  return /^https?:\/\//i.test(normalized) ? normalized : `https://${normalized}`;
};

const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL,
);

export const metadata: Metadata = {
  title: "Alive GitHub Signals",
  description:
    "Animated GitHub SVG components generated from real profile, activity, language and repository data.",
  icons: { icon: "/mark.svg" },
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Alive GitHub Signals",
    description:
      "A Vercel-ready API for animated GitHub README components powered by real GitHub data.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

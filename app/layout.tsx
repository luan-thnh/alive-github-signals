import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alive GitHub Signals",
  description:
    "Dynamic GitHub badges, buttons and statistics cards rendered as expressive Alive Interface SVGs.",
  icons: { icon: "/mark.svg" },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  openGraph: {
    title: "Alive GitHub Signals",
    description:
      "GitHub data rendered as an editorial living interface, ready for README files.",
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

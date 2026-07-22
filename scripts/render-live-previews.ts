import fs from "node:fs/promises";
import path from "node:path";
import { renderCard } from "../lib/render";

const username = process.env.LIVE_PREVIEW_USERNAME;
if (!username) {
  throw new Error("Set LIVE_PREVIEW_USERNAME to a real GitHub login.");
}
if (!process.env.GITHUB_TOKEN && !process.env.GITHUB_TOKEN_1) {
  throw new Error("Set GITHUB_TOKEN before generating live previews.");
}

const output = path.join(process.cwd(), "docs", "live-previews");
await fs.mkdir(output, { recursive: true });

const jobs = [
  ["signal", { username, animate: "true" }],
  ["stats", { username, animate: "true", variant: "editorial" }],
  ["languages", { username, animate: "true", layout: "orbit" }],
  ["streak", { username, animate: "true" }],
  ["activity", { username, animate: "true" }],
  ["profile", { username, animate: "true", avatar: "true" }],
  ["terminal", { username, animate: "true" }],
  ["badge", { username, animate: "true", metric: "commits", label: "COMMITS" }],
  ["pulse", { username, animate: "true" }],
  ["radar", { username, animate: "true" }],
  ["constellation", { username, animate: "true", langs_count: "8" }],
  ["timeline", { username, animate: "true" }],
  ["repos", { username, animate: "true", count: "6" }],
  ["year", { username, animate: "true" }],
  ["ticker", { username, animate: "true" }],
] as const;

for (const [kind, values] of jobs) {
  const params = new URLSearchParams(values);
  const { svg } = await renderCard(kind, params);
  await fs.writeFile(path.join(output, `${kind}.svg`), svg, "utf8");
  console.log(`wrote docs/live-previews/${kind}.svg`);
}

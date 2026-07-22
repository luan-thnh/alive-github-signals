import { createHash } from "node:crypto";
import { parseCacheSeconds } from "./params";
import type { CardKind } from "./types";

export const svgResponse = (
  svg: string,
  kind: CardKind,
  params: URLSearchParams,
): Response => {
  const cacheSeconds = parseCacheSeconds(params.get("cache_seconds"));
  const download = params.get("download") === "1" || params.get("download") === "true";
  const etag = `W/\"${createHash("sha1").update(svg).digest("hex")}\"`;
  const headers = new Headers({
    "Content-Type": "image/svg+xml; charset=utf-8",
    "Cache-Control": `public, max-age=300, s-maxage=${cacheSeconds}, stale-while-revalidate=86400`,
    "Access-Control-Allow-Origin": "*",
    "X-Content-Type-Options": "nosniff",
    "X-Alive-Card": kind,
    "X-Alive-Theme": params.get("theme") || "alive",
    ETag: etag,
  });
  if (download) {
    headers.set("Content-Disposition", `attachment; filename=alive-${kind}.svg`);
  }
  return new Response(svg, { status: 200, headers });
};

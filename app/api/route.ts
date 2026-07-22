import { svgResponse } from "@/lib/http";
import { renderCard } from "@/lib/render";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const { svg } = await renderCard("stats", url.searchParams);
  return svgResponse(svg, "stats", url.searchParams);
}

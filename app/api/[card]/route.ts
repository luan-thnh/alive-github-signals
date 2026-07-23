import { svgResponse } from "@/lib/http";
import { parseCardKind } from "@/lib/params";
import { renderCard } from "@/lib/render";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  context: { params: Promise<{ card: string }> },
): Promise<Response> {
  const { card } = await context.params;
  const kind = parseCardKind(card);
  if (!kind) {
    return Response.json(
      {
        error: "Unknown card type.",
        supported: [
          "stats",
          "languages",
          "top-langs",
          "repo",
          "pin",
          "streak",
          "activity",
          "profile",
          "signal",
          "terminal",
          "badge",
          "button",
          "social",
          "status",
          "pulse",
          "radar",
          "constellation",
          "timeline",
          "repos",
          "year",
          "compare",
          "ticker",
          "overview",
          "projects",
          "signal-board",
          "year-board",
        ],
      },
      { status: 404 },
    );
  }
  const url = new URL(request.url);
  const { svg } = await renderCard(kind, url.searchParams);
  return svgResponse(svg, kind, url.searchParams);
}

export function OPTIONS(): Response {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

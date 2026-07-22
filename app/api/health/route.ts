export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET(): Response {
  return Response.json(
    {
      status: "ok",
      service: "alive-github-signals",
      time: new Date().toISOString(),
      tokenConfigured: Object.entries(process.env).some(([key, value]) => /^GITHUB_TOKEN(?:_\d+)?$/.test(key) && Boolean(value)),
    },
    {
      headers: {
        "Cache-Control": "no-store",
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
}

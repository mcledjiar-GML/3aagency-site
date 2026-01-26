export const runtime = "nodejs";

function getSentryUpstreamUrl(reqUrl: string): { upstreamUrl: string } | { error: string } {
  const dsn =
    process.env.NEXT_PUBLIC_SENTRY_DSN ||
    process.env.SENTRY_DSN ||
    process.env.SENTRY_PUBLIC_DSN;

  if (!dsn) {
    return { error: "Missing Sentry DSN (NEXT_PUBLIC_SENTRY_DSN / SENTRY_DSN)." };
  }

  let dsnUrl: URL;
  try {
    dsnUrl = new URL(dsn);
  } catch {
    return { error: "Invalid Sentry DSN format." };
  }

  const projectId = dsnUrl.pathname.replace("/", "");
  if (!projectId) {
    return { error: "Invalid Sentry DSN: missing project id in path." };
  }

  // Preserve query params from incoming request (sentry_key, sentry_version, sentry_client, ...)
  const incoming = new URL(reqUrl);
  const qp = new URLSearchParams(incoming.searchParams);

  // Add minimal required params if missing
  if (!qp.has("sentry_key") && dsnUrl.username) qp.set("sentry_key", dsnUrl.username);
  if (!qp.has("sentry_version")) qp.set("sentry_version", "7");

  const upstream = new URL(`https://${dsnUrl.host}/api/${projectId}/envelope/`);
  upstream.search = qp.toString();

  return { upstreamUrl: upstream.toString() };
}

export async function POST(req: Request) {
  const resolved = getSentryUpstreamUrl(req.url);
  if ("error" in resolved) {
    return Response.json(
      { ok: false, error: resolved.error },
      { status: 500, headers: { "cache-control": "no-store" } }
    );
  }

  const body = await req.arrayBuffer();
  const contentType = req.headers.get("content-type") ?? "application/x-sentry-envelope";

  const upstreamRes = await fetch(resolved.upstreamUrl, {
    method: "POST",
    headers: {
      "content-type": contentType,
      "cache-control": "no-store",
    },
    body,
  });

  const headers = new Headers();
  const ct = upstreamRes.headers.get("content-type");
  if (ct) headers.set("content-type", ct);
  headers.set("cache-control", "no-store");

  return new Response(upstreamRes.body, { status: upstreamRes.status, headers });
}

export async function GET() {
  return new Response("OK", { status: 200, headers: { "cache-control": "no-store" } });
}

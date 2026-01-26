import { NextResponse } from "next/server";

type CspReportDetails = {
  "document-uri"?: string;
  referrer?: string;
  "blocked-uri"?: string;
  "violated-directive"?: string;
  "effective-directive"?: string;
  "original-policy"?: string;
  disposition?: string;
  "status-code"?: number;
  "line-number"?: number;
  "column-number"?: number;
  "source-file"?: string;
  "script-sample"?: string;
};

type CspReportLegacy = {
  "csp-report"?: CspReportDetails;
};

type ReportToItem = {
  type?: string;
  age?: number;
  url?: string;
  user_agent?: string;
  body?: Record<string, unknown>;
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function pickString(v: unknown): string | undefined {
  return typeof v === "string" ? v : undefined;
}

function pickNumber(v: unknown): number | undefined {
  return typeof v === "number" ? v : undefined;
}

function summarizeLegacy(details: CspReportDetails) {
  return {
    kind: "csp-report-uri",
    documentUri: details["document-uri"],
    blockedUri: details["blocked-uri"],
    violatedDirective: details["violated-directive"] ?? details["effective-directive"],
    statusCode: details["status-code"],
    sourceFile: details["source-file"],
    line: details["line-number"],
    column: details["column-number"],
  };
}

function summarizeReportTo(item: ReportToItem) {
  const body = item.body ?? {};
  const blocked =
    pickString(body.blockedURL) ??
    pickString(body.blockedUri) ??
    pickString(body["blocked-uri"]);
  const violated =
    pickString(body.violatedDirective) ??
    pickString(body.effectiveDirective) ??
    pickString(body["violated-directive"]) ??
    pickString(body["effective-directive"]);
  const doc =
    pickString(body.documentURL) ??
    pickString(body.documentUri) ??
    pickString(body["document-uri"]);

  return {
    kind: "report-to",
    type: item.type,
    url: item.url,
    documentUri: doc,
    blockedUri: blocked,
    violatedDirective: violated,
    age: item.age,
    userAgent: item.user_agent,
  };
}

export async function POST(req: Request) {
  let payload: unknown = null;
  try {
    payload = await req.json();
  } catch {
    payload = null;
  }

  // Report-To format: array
  if (Array.isArray(payload)) {
    const summaries: Array<Record<string, unknown>> = [];
    for (const it of payload) {
      if (!isRecord(it)) continue;
      const item: ReportToItem = {
        type: pickString(it.type),
        age: pickNumber(it.age),
        url: pickString(it.url),
        user_agent: pickString(it.user_agent),
        body: isRecord(it.body) ? it.body : undefined,
      };
      summaries.push(summarizeReportTo(item));
    }
    if (summaries.length > 0) console.log("[CSP] reports (report-to):", summaries);
    return new NextResponse(null, { status: 204 });
  }

  // Legacy report-uri format
  if (isRecord(payload) && isRecord((payload as CspReportLegacy)["csp-report"])) {
    const d = (payload as CspReportLegacy)["csp-report"] as CspReportDetails;
    console.log("[CSP] report (report-uri):", summarizeLegacy(d));
    return new NextResponse(null, { status: 204 });
  }

  // Unknown / empty: return 204 to avoid noise
  if (payload !== null) console.log("[CSP] report (unknown shape):", payload);
  return new NextResponse(null, { status: 204 });
}

export async function GET() {
  return NextResponse.json({ ok: true }, { status: 200 });
}

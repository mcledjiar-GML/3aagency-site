import { NextResponse } from 'next/server';

const LOG_TAG = '[CSP-REPORT-V2]';

function safeJsonStringify(v: unknown) {
  try {
    return JSON.stringify(v);
  } catch {
    return '"[unstringifiable]"';
  }
}

function extractBody(payload: any) {
  // Reporting API -> array of { type:'csp-violation', body:{...}, url:'...' }
  if (Array.isArray(payload)) {
    const first = payload[0];
    return first?.body ?? first?.['csp-report'] ?? null;
  }
  // Legacy format sometimes: { "csp-report": {...} }
  return payload?.body ?? payload?.['csp-report'] ?? null;
}

export async function POST(req: Request) {
  const ua = req.headers.get('user-agent');
  const referer = req.headers.get('referer');

  try {
    const contentType = req.headers.get('content-type') || '';

    let payload: any = null;

    if (
      contentType.includes('application/json') ||
      contentType.includes('application/reports+json')
    ) {
      payload = await req.json().catch(() => null);
    } else {
      const txt = await req.text().catch(() => '');
      payload = txt ? { raw: txt } : null;
    }

    const first = Array.isArray(payload) ? payload[0] : payload;
    const body = extractBody(payload);

    console.log(LOG_TAG, {
      ua,
      referer,
      url: first?.url ?? body?.['document-uri'] ?? null,
      type: first?.type ?? null,

      effectiveDirective: body?.effectiveDirective ?? body?.['effective-directive'] ?? null,
      violatedDirective: body?.violatedDirective ?? body?.['violated-directive'] ?? null,
      blockedURL: body?.blockedURL ?? body?.['blocked-uri'] ?? null,
      disposition: body?.disposition ?? null,
      statusCode: body?.statusCode ?? body?.['status-code'] ?? null,
      sample: body?.sample ?? null,
      originalPolicy: body?.originalPolicy ?? body?.['original-policy'] ?? null,

      // body complet (string)
      body: safeJsonStringify(body),
    });

    return new NextResponse(null, { status: 204 });
  } catch (e) {
    console.error(LOG_TAG, { ua, referer, error: String(e) });
    return new NextResponse(null, { status: 204 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, logger: 'v2' });
}

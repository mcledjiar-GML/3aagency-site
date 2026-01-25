import { NextResponse } from 'next/server';

function safeJsonStringify(v: unknown) {
  try {
    return JSON.stringify(v);
  } catch {
    return '"[unstringifiable]"';
  }
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || '';

    let payload: any = null;

    if (contentType.includes('application/json') || contentType.includes('application/reports+json')) {
      payload = await req.json().catch(() => null);
    } else {
      const txt = await req.text().catch(() => '');
      payload = txt ? { raw: txt } : null;
    }

    // ---- Extract "body" fields if present (Reporting API format) ----
    // payload is often an array: [{ type:'csp-violation', body:{...}, url:'...', ... }]
    const first = Array.isArray(payload) ? payload[0] : payload;
    const body = first?.body ?? first?.['csp-report'] ?? null;

    console.log('[CSP-REPORT]', {
      ua: req.headers.get('user-agent'),
      referer: req.headers.get('referer'),
      url: first?.url ?? body?.['document-uri'] ?? null,
      type: first?.type ?? null,
      // log key details (works for both old and new formats)
      effectiveDirective: body?.effectiveDirective ?? body?.['effective-directive'] ?? null,
      violatedDirective: body?.violatedDirective ?? body?.['violated-directive'] ?? null,
      blockedURL: body?.blockedURL ?? body?.['blocked-uri'] ?? null,
      disposition: body?.disposition ?? null,
      statusCode: body?.statusCode ?? body?.['status-code'] ?? null,
      originalPolicy: body?.originalPolicy ?? body?.['original-policy'] ?? null,

      // full body (stringified) for debugging
      body: safeJsonStringify(body),
    });

    return new NextResponse(null, { status: 204 });
  } catch (e) {
    console.error('[CSP-REPORT] error', e);
    return new NextResponse(null, { status: 204 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true });
}

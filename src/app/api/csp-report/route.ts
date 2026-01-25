import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || '';

    // CSP reports peuvent arriver en JSON ou en texte
    let payload: unknown = null;

    if (contentType.includes('application/json') || contentType.includes('application/reports+json')) {
      payload = await req.json().catch(() => null);
    } else {
      const txt = await req.text().catch(() => '');
      payload = txt ? { raw: txt } : null;
    }

    // Log visible dans Vercel (Functions logs)
    console.log('[CSP-REPORT]', {
      ua: req.headers.get('user-agent'),
      referer: req.headers.get('referer'),
      payload,
    });

    // 204 = OK sans contenu
    return new NextResponse(null, { status: 204 });
  } catch (e) {
    console.error('[CSP-REPORT] error', e);
    return new NextResponse(null, { status: 204 });
  }
}

// Optionnel: certains navigateurs peuvent envoyer en GET (rare)
export async function GET() {
  return NextResponse.json({ ok: true });
}

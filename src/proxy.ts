import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  // 1) Nonce par requête
  const nonce = crypto.randomUUID().replace(/-/g, '');

  // 2) Réponse next-intl (redirect/rewrite/next)
  const res = intlMiddleware(req);

  // 3) Expose le nonce (debug/usage éventuel)
  res.headers.set('x-nonce', nonce);

  // 4) CSP stricte scripts via nonce (style inline conservé pour l’instant)
  const csp = [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "img-src 'self' data:",
    "font-src 'self' data:",
    "style-src 'self' 'unsafe-inline'",
    `script-src 'self' 'nonce-${nonce}'`,
    "connect-src 'self'",
    "frame-src 'self'",
    'upgrade-insecure-requests',
    'report-to csp-endpoint',
    'report-uri /api/csp-report',
  ].join('; ');

  res.headers.set('Content-Security-Policy', csp);

  return res;
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};

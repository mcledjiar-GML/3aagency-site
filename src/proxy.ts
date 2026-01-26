import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const nonce = crypto.randomUUID().replace(/-/g, '');

  const res = intlMiddleware(req);

  // debug/optionnel
  res.headers.set('x-nonce', nonce);

  const csp = [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "img-src 'self' data:",
    "font-src 'self' data:",
    // On garde unsafe-inline pour style (tu as beaucoup de style="" inline)
    "style-src 'self' 'unsafe-inline'",
    // Scripts strict via nonce
    `script-src 'self' 'nonce-${nonce}'`,
    "connect-src 'self'",
    "frame-src 'self'",
    'upgrade-insecure-requests',
    'report-to csp-endpoint',
    'report-uri /api/csp-report',
  ].join('; ');

  // Enforce + Report-Only alignés (clean)
  res.headers.set('Content-Security-Policy', csp);
  res.headers.set('Content-Security-Policy-Report-Only', csp);

  return res;
}

export const config = {
  // IMPORTANT: on exclut aussi /monitoring (tunnel Sentry)
  matcher: '/((?!api|trpc|_next|_vercel|monitoring|.*\\..*).*)',
};

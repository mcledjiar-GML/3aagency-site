import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import bundleAnalyzer from '@next/bundle-analyzer';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

// ---- CSP reporting endpoint ----
const CSP_REPORT_URL = 'https://www.3aagency.eu/api/csp-report';

const ReportTo = JSON.stringify({
  group: 'csp-endpoint',
  max_age: 10886400, // ~18 semaines
  endpoints: [{ url: CSP_REPORT_URL }],
});

const ReportingEndpoints = `csp-endpoint="${CSP_REPORT_URL}"`;

// ------------------------------------------------------------
// Phase 2A
// 1) CSP ENFORCE (baseline compatible) -> ne casse pas
// 2) CSP REPORT-ONLY (plus stricte) -> remonte ce qu’il faudra allowlister
// ------------------------------------------------------------

// Enforce = ta CSP “compatible” actuelle
const ContentSecurityPolicyEnforce = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "img-src 'self' data: https:",
  "font-src 'self' data: https:",
  "style-src 'self' 'unsafe-inline' https:",
  "script-src 'self' 'unsafe-inline' https:",
  "connect-src 'self' https:",
  "frame-src https:",
  'upgrade-insecure-requests',

  // reporting
  'report-to csp-endpoint',
  'report-uri /api/csp-report',
].join('; ');

// Report-Only plus strict (détecte domaines externes) sans bruit “inline Next”
// -> on garde 'unsafe-inline' pour éviter des reports à chaque page (Next injecte des inline scripts)
const ContentSecurityPolicyReportOnlyCandidate = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline'",
  "connect-src 'self'",
  "frame-src 'self'",
  'upgrade-insecure-requests',

  // reporting
  'report-to csp-endpoint',
  'report-uri /api/csp-report',
].join('; ');

const nextConfig: NextConfig = {
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Reporting API headers
          { key: 'Report-To', value: ReportTo },
          { key: 'Reporting-Endpoints', value: ReportingEndpoints },

          // CSP (Phase 2A)
          { key: 'Content-Security-Policy', value: ContentSecurityPolicyEnforce },
          {
            key: 'Content-Security-Policy-Report-Only',
            value: ContentSecurityPolicyReportOnlyCandidate,
          },

          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },

          // Clickjacking
          { key: 'X-Frame-Options', value: 'DENY' },

          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
          },

          // OAuth popups ok
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
          { key: 'Cross-Origin-Resource-Policy', value: 'same-site' },

          { key: 'Origin-Agent-Cluster', value: '?1' },
          { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },

          // HSTS
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));

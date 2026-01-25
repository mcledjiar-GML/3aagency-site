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
  max_age: 10886400,
  endpoints: [{ url: CSP_REPORT_URL }],
});

const ReportingEndpoints = `csp-endpoint="${CSP_REPORT_URL}"`;

// ------------------------------------------------------------
// Phase 2B (durcissement):
// - On retire les jokers "https:" dans img/script/style/connect/frame
// - On garde 'unsafe-inline' pour éviter de casser Next (nonce/hashes = Phase 2C)
// - Calendly est juste un lien => pas besoin d'autoriser calendly.com ici
// ------------------------------------------------------------

const ContentSecurityPolicyEnforce = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",

  // strict
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

// Report-Only = identique (on garde simple pour éviter bruit, Kaspersky/Extensions polluent déjà)
const ContentSecurityPolicyReportOnly = ContentSecurityPolicyEnforce;

const nextConfig: NextConfig = {
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Report-To', value: ReportTo },
          { key: 'Reporting-Endpoints', value: ReportingEndpoints },

          // CSP Phase 2B
          { key: 'Content-Security-Policy', value: ContentSecurityPolicyEnforce },
          { key: 'Content-Security-Policy-Report-Only', value: ContentSecurityPolicyReportOnly },

          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },

          // Clickjacking (redondant avec frame-ancestors, on garde en Phase 2B)
          { key: 'X-Frame-Options', value: 'DENY' },

          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
          },

          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
          { key: 'Cross-Origin-Resource-Policy', value: 'same-site' },

          { key: 'Origin-Agent-Cluster', value: '?1' },
          { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },

          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));

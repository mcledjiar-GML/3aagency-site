import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import bundleAnalyzer from '@next/bundle-analyzer';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

// Phase 1 (safe + compatible): CSP en REPORT-ONLY pour éviter de casser Next/tiers.
// On durcira en Phase 2 (nonce/hashes + allowlist domaines réels).
const ContentSecurityPolicyReportOnly = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "img-src 'self' data: https:",
  "font-src 'self' data: https:",
  "style-src 'self' 'unsafe-inline' https:",
  // Phase 1: compatible Next + tiers (durcissement en Phase 2)
  "script-src 'self' 'unsafe-inline' https:",
  "connect-src 'self' https:",
  "frame-src https:",
  'upgrade-insecure-requests',
].join('; ');

const nextConfig: NextConfig = {
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // CSP Phase 1: Report-Only (ne bloque rien, mais permet de voir les violations)
          {
            key: 'Content-Security-Policy-Report-Only',
            value: ContentSecurityPolicyReportOnly,
          },

          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },

          // Phase 1: OK. Phase 2: on s'appuiera plutôt sur frame-ancestors en CSP enforce.
          { key: 'X-Frame-Options', value: 'DENY' },

          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
          },

          // Future-proof for OAuth popups
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },

          // On garde en Phase 1 (à revalider selon ressources externes)
          { key: 'Cross-Origin-Resource-Policy', value: 'same-site' },

          { key: 'Origin-Agent-Cluster', value: '?1' },
          { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },

          // HSTS: tu as includeSubDomains. On confirmera "preload" plus tard si tout est OK.
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));

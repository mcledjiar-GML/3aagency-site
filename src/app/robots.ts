import type { MetadataRoute } from "next";

function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  const fromVercel = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : null;

  const raw = (fromEnv || fromVercel || "http://localhost:3000").trim();
  return raw.endsWith("/") ? raw.slice(0, -1) : raw;
}

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  // Sur Vercel:
  // - production / preview / development
  const isProd =
    process.env.VERCEL_ENV === "production" ||
    process.env.NODE_ENV === "production";

  // Best practice:
  // - DEV/PREVIEW: noindex
  // - PROD: index OK
  if (!isProd) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
      host: siteUrl,
      sitemap: `${siteUrl}/sitemap.xml`,
    };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    host: siteUrl,
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

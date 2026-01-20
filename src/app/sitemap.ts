import type { MetadataRoute } from "next";
import { routing } from "../i18n/routing";

function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  const fromVercel = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : null;

  const raw = (fromEnv || fromVercel || "http://localhost:3000").trim();
  return raw.endsWith("/") ? raw.slice(0, -1) : raw;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  return routing.locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified,
    changeFrequency: "weekly",
    priority: locale === routing.defaultLocale ? 1 : 0.9,
  }));
}

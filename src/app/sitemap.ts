import type { MetadataRoute } from "next";
import { routing } from "../i18n/routing";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.3aagency.eu").replace(
  /\/$/,
  ""
);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routing.locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: locale === routing.defaultLocale ? 1 : 0.9,
  }));
}

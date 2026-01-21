import type { MetadataRoute } from "next";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.3aagency.eu").replace(
  /\/$/,
  ""
);

// Bonne pratique : on autorise l'indexation uniquement en PROD Vercel
const IS_PROD = process.env.VERCEL_ENV === "production";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: IS_PROD
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", disallow: "/" },

    host: SITE_URL,
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

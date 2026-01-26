// src/lib/legal.ts
import type { Metadata } from "next";

export const BASE_URL = "https://www.3aagency.eu" as const;

export const LOCALES = ["en", "fr", "de"] as const;
export type Locale = (typeof LOCALES)[number];

export type LegalDocKey =
  | "privacy"
  | "cookies"
  // Imprint / Mentions légales / Impressum (slug localisé)
  | "imprint_en"
  | "mentions_legales_fr"
  | "impressum_de"
  // Terms / CGV / AGB (slug localisé)
  | "terms_en"
  | "cgv_fr"
  | "agb_de";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Retourne le chemin "équivalent" par langue.
 *
 * - privacy/cookies : slug identique dans toutes les langues
 * - imprint : slug localisé (en: /imprint, fr: /mentions-legales, de: /impressum)
 * - terms : slug localisé (en: /terms, fr: /cgv, de: /agb)
 *
 * Note: pour les clés imprint_* et terms_* on ignore la clé et on retourne la variante correcte selon locale.
 * Ça permet d'avoir des hreflang cohérents entre les pages équivalentes.
 */
export function pathFor(locale: Locale, key: LegalDocKey): string {
  switch (key) {
    case "privacy":
      return `/${locale}/privacy`;
    case "cookies":
      return `/${locale}/cookies`;

    // Imprint group (localized slug)
    case "imprint_en":
    case "mentions_legales_fr":
    case "impressum_de": {
      if (locale === "fr") return `/${locale}/mentions-legales`;
      if (locale === "de") return `/${locale}/impressum`;
      return `/${locale}/imprint`;
    }

    // Terms group (localized slug)
    case "terms_en":
    case "cgv_fr":
    case "agb_de": {
      if (locale === "fr") return `/${locale}/cgv`;
      if (locale === "de") return `/${locale}/agb`;
      return `/${locale}/terms`;
    }

    default: {
      const _exhaustive: never = key;
      return _exhaustive;
    }
  }
}

export function buildLegalMetadata(args: {
  locale: Locale;
  key: LegalDocKey;
  title: string;
  description: string;
}): Metadata {
  const { locale, key, title, description } = args;

  const canonical = `${BASE_URL}${pathFor(locale, key)}`;

  const languages: Record<string, string> = {
    en: `${BASE_URL}${pathFor("en", key)}`,
    fr: `${BASE_URL}${pathFor("fr", key)}`,
    de: `${BASE_URL}${pathFor("de", key)}`,
    "x-default": `${BASE_URL}${pathFor("en", key)}`,
  };

  return {
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

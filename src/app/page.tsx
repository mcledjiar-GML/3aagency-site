import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isLocale, routing, type Locale } from "../i18n/routing";

function getCookieValue(cookieHeader: string | null, name: string): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1] || "").trim() : null;
}

function getLocaleFromCookie(cookieHeader: string | null): Locale | null {
  // On respecte NEXT_LOCALE seulement si l'utilisateur l'a explicitement choisi
  const isExplicit = getCookieValue(cookieHeader, "NEXT_LOCALE_SET");
  if (isExplicit !== "1") return null;

  const value = getCookieValue(cookieHeader, "NEXT_LOCALE");
  if (!value) return null;

  return isLocale(value) ? value : null;
}

function getLocaleFromCountry(country: string | null): Locale | null {
  if (!country) return null;

  switch (country.toUpperCase()) {
    case "DE":
    case "AT":
    case "CH":
      return "de";

    case "FR":
    case "BE":
      return "fr";

    default:
      return null;
  }
}

function getLocaleFromAcceptLanguage(acceptLanguage: string | null): Locale | null {
  if (!acceptLanguage) return null;

  // Exemple: "en-US,en;q=0.9,fr;q=0.8,de;q=0.7"
  const tags = acceptLanguage
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase())
    .filter(Boolean);

  const bases = tags.map((tag) => tag.split("-")[0]);

  // EU-first: si fr ou de existe quelque part, on préfère fr/de.
  for (const base of bases) {
    if (base === "fr" || base === "de") return base as Locale;
  }

  // Sinon fallback en
  if (bases.includes("en")) return "en";

  return null;
}

export default async function Home() {
  const h = await headers();

  const cookieHeader = h.get("cookie");

  // 0) Cookie uniquement si choix explicite
  const fromCookie = getLocaleFromCookie(cookieHeader);
  if (fromCookie) {
    redirect(`/${fromCookie}`);
  }

  // 1) Geo (Vercel)
  const fromVercelCountry = getLocaleFromCountry(h.get("x-vercel-ip-country"));
  if (fromVercelCountry) {
    redirect(`/${fromVercelCountry}`);
  }

  // 2) Browser (local/dev)
  const fromAcceptLanguage = getLocaleFromAcceptLanguage(h.get("accept-language"));
  if (fromAcceptLanguage) {
    redirect(`/${fromAcceptLanguage}`);
  }

  // 3) Fallback final
  redirect(`/${routing.defaultLocale}`);
}

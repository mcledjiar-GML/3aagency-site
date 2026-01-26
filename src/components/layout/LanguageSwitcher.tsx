"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LOCALES = ["de", "fr", "en"] as const;
type Locale = (typeof LOCALES)[number];

function normalizeLocale(input: string): Locale {
  const lowered = (input || "").toLowerCase();
  return (LOCALES.includes(lowered as Locale) ? lowered : "en") as Locale;
}

function stripLocale(pathname: string): string {
  const pattern = new RegExp(`^/(${LOCALES.join("|")})(?=/|$)`, "i");
  const without = pathname.replace(pattern, "");
  return without === "" ? "/" : without;
}

function setCookie(name: string, value: string, maxAgeSeconds: number) {
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? "; Secure"
      : "";
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax${secure}`;
}

function rememberLocale(locale: Locale) {
  const oneYear = 60 * 60 * 24 * 365;
  setCookie("NEXT_LOCALE", locale, oneYear);
  setCookie("NEXT_LOCALE_SET", "1", oneYear);
}

/**
 * Pages légales avec slugs localisés :
 * - Imprint: EN /imprint, FR /mentions-legales, DE /impressum
 * - Terms:   EN /terms,   FR /cgv,             DE /agb
 *
 * Pour privacy/cookies, slug identique.
 */
function mapLocalizedLegalPath(restPath: string, targetLocale: Locale): string {
  // Imprint group
  if (
    restPath === "/imprint" ||
    restPath === "/mentions-legales" ||
    restPath === "/impressum"
  ) {
    if (targetLocale === "fr") return "/mentions-legales";
    if (targetLocale === "de") return "/impressum";
    return "/imprint";
  }

  // Terms group
  if (restPath === "/terms" || restPath === "/cgv" || restPath === "/agb") {
    if (targetLocale === "fr") return "/cgv";
    if (targetLocale === "de") return "/agb";
    return "/terms";
  }

  return restPath;
}

export default function LanguageSwitcher({ locale }: { locale: string }) {
  const currentLocale = normalizeLocale(locale);
  const pathname = usePathname() || "/";
  const rest = stripLocale(pathname);

  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      {LOCALES.map((l) => {
        const isActive = l === currentLocale;

        const localizedRest = mapLocalizedLegalPath(rest, l);
        const href = localizedRest === "/" ? `/${l}` : `/${l}${localizedRest}`;

        return (
          <Link
            key={l}
            href={href}
            onClick={() => rememberLocale(l)}
            aria-current={isActive ? "page" : undefined}
            style={{
              fontWeight: isActive ? 700 : 400,
              textDecoration: "none",
              opacity: isActive ? 1 : 0.7,
            }}
          >
            {l.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}

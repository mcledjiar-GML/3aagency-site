"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

const LOCALES = ["de", "fr", "en"] as const;
type Locale = (typeof LOCALES)[number];

function stripLocale(pathname: string): string {
  const pattern = new RegExp(`^/(${LOCALES.join("|")})(?=/|$)`, "i");
  const without = pathname.replace(pattern, "");
  return without === "" ? "/" : without;
}

function setCookie(name: string, value: string, maxAgeSeconds: number) {
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax${secure}`;
}

function rememberLocale(locale: Locale) {
  const oneYear = 60 * 60 * 24 * 365;
  setCookie("NEXT_LOCALE", locale, oneYear);
  setCookie("NEXT_LOCALE_SET", "1", oneYear);
}

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname() || "/";

  const rest = stripLocale(pathname);

  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      {LOCALES.map((l) => {
        const isActive = l === locale;
        const href = rest === "/" ? `/${l}` : `/${l}${rest}`;

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

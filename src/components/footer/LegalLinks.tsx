// src/components/footer/LegalLinks.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { isLocale, pathFor, type Locale } from "@/lib/legal";

const LABELS: Record<
  Locale,
  { privacy: string; cookies: string; imprint: string }
> = {
  en: { privacy: "Privacy", cookies: "Cookies", imprint: "Imprint" },
  fr: { privacy: "Confidentialité", cookies: "Cookies", imprint: "Mentions légales" },
  de: { privacy: "Datenschutz", cookies: "Cookies", imprint: "Impressum" },
};

export default function LegalLinks() {
  const params = useParams() as { locale?: string } | null;
  const rawLocale = typeof params?.locale === "string" ? params.locale : "en";
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";

  const t = LABELS[locale];

  // pathFor gère déjà l'imprint localisé (en: /imprint, fr: /mentions-legales, de: /impressum)
  const hrefPrivacy = pathFor(locale, "privacy");
  const hrefImprint = pathFor(locale, "imprint_en");
  const hrefCookies = pathFor(locale, "cookies");

  const wrapStyle: React.CSSProperties = {
    maxWidth: 1120,
    margin: "0 auto",
    padding: "14px 24px",
  };

  const navStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    fontSize: 14,
    opacity: 0.85,
  };

  const linkStyle: React.CSSProperties = {
    textDecoration: "underline",
    textUnderlineOffset: 4,
  };

  return (
    <div style={wrapStyle}>
      <nav aria-label="Legal" style={navStyle}>
        <Link href={hrefPrivacy} style={linkStyle}>
          {t.privacy}
        </Link>
        <Link href={hrefImprint} style={linkStyle}>
          {t.imprint}
        </Link>
        <Link href={hrefCookies} style={linkStyle}>
          {t.cookies}
        </Link>
      </nav>
    </div>
  );
}

// src/app/[locale]/cookies/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/legal/LegalPage";
import { buildLegalMetadata, isLocale, type Locale } from "@/lib/legal";
import { COOKIES_EN } from "@/content/legal/en";
import { COOKIES_FR } from "@/content/legal/fr";
import { COOKIES_DE } from "@/content/legal/de";

type Params = Promise<{ locale: string }>;

function getCookies(locale: Locale) {
  if (locale === "fr") return COOKIES_FR;
  if (locale === "de") return COOKIES_DE;
  return COOKIES_EN;
}

function updatedLabel(locale: Locale) {
  if (locale === "fr") return "Dernière mise à jour";
  if (locale === "de") return "Stand";
  return "Last updated";
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) return {};

  const doc = getCookies(locale);

  return buildLegalMetadata({
    locale,
    key: "cookies",
    title: doc.title,
    description: doc.description,
  });
}

export default async function CookiesPage({ params }: { params: Params }) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  const doc = getCookies(locale);

  return (
    <LegalPage
      title={doc.title}
      description={doc.description}
      lastUpdated={doc.lastUpdated}
      sections={doc.sections}
      updatedLabel={updatedLabel(locale)}
    />
  );
}

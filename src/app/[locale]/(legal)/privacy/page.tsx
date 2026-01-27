// src/app/[locale]/privacy/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/legal/LegalPage";
import { buildLegalMetadata, isLocale, type Locale } from "@/lib/legal";
import { PRIVACY_EN } from "@/content/legal/en";
import { PRIVACY_FR } from "@/content/legal/fr";
import { PRIVACY_DE } from "@/content/legal/de";

type Params = Promise<{ locale: string }>;

function getPrivacy(locale: Locale) {
  if (locale === "fr") return PRIVACY_FR;
  if (locale === "de") return PRIVACY_DE;
  return PRIVACY_EN;
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

  const doc = getPrivacy(locale);

  return buildLegalMetadata({
    locale,
    key: "privacy",
    title: doc.title,
    description: doc.description,
  });
}

export default async function PrivacyPage({ params }: { params: Params }) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  const doc = getPrivacy(locale);

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

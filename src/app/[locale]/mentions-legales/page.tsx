// src/app/[locale]/mentions-legales/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/legal/LegalPage";
import { buildLegalMetadata, isLocale } from "@/lib/legal";
import { MENTIONS_LEGALES_FR } from "@/content/legal/fr";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) return {};
  if (locale !== "fr") return {};

  return buildLegalMetadata({
    locale: "fr",
    key: "mentions_legales_fr",
    title: MENTIONS_LEGALES_FR.title,
    description: MENTIONS_LEGALES_FR.description,
  });
}

export default async function MentionsLegalesPage({ params }: { params: Params }) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();
  if (locale !== "fr") notFound();

  return (
    <LegalPage
      title={MENTIONS_LEGALES_FR.title}
      description={MENTIONS_LEGALES_FR.description}
      lastUpdated={MENTIONS_LEGALES_FR.lastUpdated}
      sections={MENTIONS_LEGALES_FR.sections}
      updatedLabel="Dernière mise à jour"
    />
  );
}

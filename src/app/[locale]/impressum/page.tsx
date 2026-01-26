// src/app/[locale]/impressum/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/legal/LegalPage";
import { buildLegalMetadata, isLocale } from "@/lib/legal";
import { IMPRESSUM_DE } from "@/content/legal/de";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) return {};
  if (locale !== "de") return {};

  return buildLegalMetadata({
    locale: "de",
    key: "impressum_de",
    title: IMPRESSUM_DE.title,
    description: IMPRESSUM_DE.description,
  });
}

export default async function ImpressumPage({ params }: { params: Params }) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();
  if (locale !== "de") notFound();

  return (
    <LegalPage
      title={IMPRESSUM_DE.title}
      description={IMPRESSUM_DE.description}
      lastUpdated={IMPRESSUM_DE.lastUpdated}
      sections={IMPRESSUM_DE.sections}
      updatedLabel="Stand"
    />
  );
}

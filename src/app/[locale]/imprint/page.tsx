// src/app/[locale]/imprint/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/legal/LegalPage";
import { buildLegalMetadata, isLocale } from "@/lib/legal";
import { IMPRINT_EN } from "@/content/legal/en";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) return {};
  if (locale !== "en") return {};

  return buildLegalMetadata({
    locale: "en",
    key: "imprint_en",
    title: IMPRINT_EN.title,
    description: IMPRINT_EN.description,
  });
}

export default async function ImprintPage({ params }: { params: Params }) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();
  if (locale !== "en") notFound();

  return (
    <LegalPage
      title={IMPRINT_EN.title}
      description={IMPRINT_EN.description}
      lastUpdated={IMPRINT_EN.lastUpdated}
      sections={IMPRINT_EN.sections}
      updatedLabel="Last updated"
    />
  );
}

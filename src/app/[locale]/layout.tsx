import type { Metadata } from "next";
import type { ReactNode } from "react";

import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { routing, type Locale } from "../../i18n/routing";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import LegalLinks from "../../components/footer/LegalLinks";

function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  const fromVercel = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null;

  const raw = (fromEnv || fromVercel || "http://localhost:3000").trim();
  return raw.endsWith("/") ? raw.slice(0, -1) : raw;
}

function getOgLocale(locale: Locale): string {
  switch (locale) {
    case "fr":
      return "fr_FR";
    case "de":
      return "de_DE";
    case "en":
    default:
      return "en_US";
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;

  const locale: Locale = hasLocale(routing.locales, rawLocale)
    ? rawLocale
    : routing.defaultLocale;

  const siteUrl = getSiteUrl();
  const metadataBase = new URL(siteUrl);

  const t = await getTranslations({ locale, namespace: "Landing" });

  const pageTitle = `${t("hero.title")} | 3A Agency`;
  const pageDescription = t("hero.subtitle");

  const canonicalPath = `/${locale}`;

  return {
    metadataBase,
    title: pageTitle,
    description: pageDescription,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: canonicalPath,
      languages: {
        "x-default": `/${routing.defaultLocale}`,
        en: "/en",
        fr: "/fr",
        de: "/de",
      },
    },
    openGraph: {
      type: "website",
      siteName: "3A Agency",
      locale: getOgLocale(locale),
      title: pageTitle,
      description: pageDescription,
      url: canonicalPath,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1">{children}</div>

        <div className="border-t border-black/10">
          <div className="mx-auto w-full max-w-6xl px-6 py-8">
            <LegalLinks />
          </div>
          <Footer />
        </div>
      </div>
    </NextIntlClientProvider>
  );
}

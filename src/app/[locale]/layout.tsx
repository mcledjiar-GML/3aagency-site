import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { isLocale, routing, type Locale } from "../../i18n/routing";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  const fromVercel = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : null;

  const raw = (fromEnv || fromVercel || "http://localhost:3000").trim();
  return raw.endsWith("/") ? raw.slice(0, -1) : raw;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;

  const locale: Locale = isLocale(rawLocale)
    ? rawLocale
    : routing.defaultLocale;

  const siteUrl = getSiteUrl();

  return {
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        "x-default": `/${routing.defaultLocale}`,
        en: "/en",
        fr: "/fr",
        de: "/de",
      },
    },
  };
}

async function loadMessages(locale: Locale) {
  switch (locale) {
    case "de":
      return (await import("../../messages/de.json")).default;
    case "fr":
      return (await import("../../messages/fr.json")).default;
    case "en":
    default:
      return (await import("../../messages/en.json")).default;
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const messages = await loadMessages(locale);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

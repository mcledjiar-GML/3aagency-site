import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "../../i18n/routing";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

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
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const messages = await loadMessages(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Navbar />
      {children}
      <Footer />
    </NextIntlClientProvider>
  );
}

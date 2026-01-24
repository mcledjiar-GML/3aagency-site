import type {Metadata} from 'next';
import type {ReactNode} from 'react';

import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';

import {routing, type Locale} from '../../i18n/routing';

import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  const fromVercel =
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null;

  const raw = (fromEnv || fromVercel || 'http://localhost:3000').trim();
  return raw.endsWith('/') ? raw.slice(0, -1) : raw;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale: rawLocale} = await params;

  const locale: Locale = hasLocale(routing.locales, rawLocale)
    ? rawLocale
    : routing.defaultLocale;

  const siteUrl = getSiteUrl();

  return {
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'x-default': `/${routing.defaultLocale}`,
        en: '/en',
        fr: '/fr',
        de: '/de'
      }
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Recommandé par next-intl pour distribuer la locale sans headers()
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Navbar />
      {children}
      <Footer />
    </NextIntlClientProvider>
  );
}

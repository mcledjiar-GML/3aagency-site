import './globals.css';

import type {ReactNode} from 'react';
import {cookies, headers} from 'next/headers';

import {routing, isLocale} from '../i18n/routing';

export default async function RootLayout({children}: {children: ReactNode}) {
  const h = await headers();
  const c = await cookies();

  // next-intl attache la locale négociée dans ce header (si la proxy/middleware a tourné)
  const fromHeader = h.get('x-next-intl-locale');

  // fallback utile (tu vois déjà NEXT_LOCALE=fr en prod)
  const fromCookie = c.get('NEXT_LOCALE')?.value;

  const raw = fromHeader || fromCookie || routing.defaultLocale;
  const locale = isLocale(raw) ? raw : routing.defaultLocale;

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}

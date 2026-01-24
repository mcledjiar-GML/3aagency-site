import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['de', 'fr', 'en'] as const,
  defaultLocale: 'en',

  // on garde /de /fr /en (et / redirige vers une locale)
  localePrefix: 'always',

  // IMPORTANT: on veut cookie / Accept-Language => donc TRUE
  localeDetection: true
});

export type Locale = (typeof routing.locales)[number];

export function isLocale(value: string): value is Locale {
  return (routing.locales as readonly string[]).includes(value);
}

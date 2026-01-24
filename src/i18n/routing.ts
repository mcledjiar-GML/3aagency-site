import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['de', 'fr', 'en'] as const,
  defaultLocale: 'en',

  // URLs toujours préfixées: /en, /fr, /de
  localePrefix: 'always',

  // stable (évite que / change selon Accept-Language)
  localeDetection: false
});

export type Locale = (typeof routing.locales)[number];

export function isLocale(value: string): value is Locale {
  return (routing.locales as readonly string[]).includes(value);
}

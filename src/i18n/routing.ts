export const routing = {
  locales: ['de', 'fr', 'en'] as const,
  defaultLocale: 'en' as const
};

export type Locale = (typeof routing.locales)[number];

export function isLocale(value: string): value is Locale {
  return (routing.locales as readonly string[]).includes(value);
}

'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useLocale} from 'next-intl';
import {routing, type Locale} from '../../i18n/routing';

function stripLocale(pathname: string): string {
  const pattern = new RegExp(`^/(${routing.locales.join('|')})(?=/|$)`, 'i');
  const without = pathname.replace(pattern, '');
  return without === '' ? '/' : without;
}

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname() || '/';

  const basePath = stripLocale(pathname);
  const suffix = basePath === '/' ? '' : basePath;

  return (
    <nav style={{display: 'flex', gap: 12}}>
      {routing.locales.map((l) => {
        const isActive = l === locale;

        return (
          <Link
            key={l}
            href={`/${l}${suffix}`}
            aria-current={isActive ? 'page' : undefined}
            style={{
              fontWeight: isActive ? 700 : 400,
              textDecoration: 'none',
              opacity: isActive ? 1 : 0.7
            }}
          >
            {l.toUpperCase()}
          </Link>
        );
      })}
    </nav>
  );
}

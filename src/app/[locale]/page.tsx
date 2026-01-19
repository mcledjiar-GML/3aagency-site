'use client';

import {useTranslations} from 'next-intl';

export default function HomePage() {
  const t = useTranslations('Home');

  return (
    <main style={{padding: '48px'}}>
      <h1 style={{margin: 0, fontSize: 48, lineHeight: 1.05}}>
        {t('headline')}
      </h1>

      <p style={{marginTop: 12, color: '#666'}}>
        {t('subline')}
      </p>
    </main>
  );
}

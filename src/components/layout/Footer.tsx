import {useTranslations} from 'next-intl';
import Container from './Container';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="site-footer">
      <Container>
        <div className="site-footer__inner">
          <div className="site-footer__row">
            <small className="muted">
              © {new Date().getFullYear()} 3A Agency — Automation • AI • Agents
            </small>
            <small className="muted">{t('tagline')}</small>
          </div>
        </div>
      </Container>
    </footer>
  );
}

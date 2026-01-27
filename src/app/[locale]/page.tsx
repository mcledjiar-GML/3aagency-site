import {getTranslations, setRequestLocale} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';

import {routing} from '../../i18n/routing';

import Container from '../../components/layout/Container';
import Section from '../../components/layout/Section';
import {ButtonLink} from '../../components/ui/Button';

const CALENDLY_URL = 'https://calendly.com/contact-3aagency/30min';

export default async function Page({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations({locale, namespace: 'Landing'});
  const nav = await getTranslations({locale, namespace: 'Nav'});

  return (
    <main
      style={{
        background:
          'radial-gradient(1200px 600px at 80% 10%, rgba(255, 120, 60, 0.14), transparent 60%), radial-gradient(900px 500px at 10% 20%, rgba(0, 80, 255, 0.10), transparent 55%)'
      }}
    >
      {/* HERO */}
      <Section className="hero">
        <Container>
          <div className="badge">{t('hero.badge')}</div>

          <h1 className="h1">{t('hero.title')}</h1>
          <p className="lead">{t('hero.subtitle')}</p>

          <div className="btn-row">
            <ButtonLink
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
              variant="primary"
            >
              {nav('cta')}
            </ButtonLink>

            <ButtonLink href="#solutions" variant="secondary">
              {t('hero.secondaryCta')}
            </ButtonLink>
          </div>

          <div style={{height: 18}} />

          <div className="grid-3">
            <div className="card">
              <p className="card-title">{t('hero.promises.p1Title')}</p>
              <p className="card-text">{t('hero.promises.p1Body')}</p>
            </div>
            <div className="card">
              <p className="card-title">{t('hero.promises.p2Title')}</p>
              <p className="card-text">{t('hero.promises.p2Body')}</p>
            </div>
            <div className="card">
              <p className="card-title">{t('hero.promises.p3Title')}</p>
              <p className="card-text">{t('hero.promises.p3Body')}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* PRODUCT STRIP (signal produit) */}
      <Section className="section">
        <Container>
          <div className="product-strip">
            <div className="product-strip-title">{t('productStrip.title')}</div>

            <div
              className="chip-row"
              role="list"
              aria-label={t('productStrip.title')}
            >
              <span className="chip" role="listitem">
                {t('productStrip.chips.approvals')}
              </span>
              <span className="chip" role="listitem">
                {t('productStrip.chips.auditLog')}
              </span>
              <span className="chip" role="listitem">
                {t('productStrip.chips.privateRag')}
              </span>
              <span className="chip" role="listitem">
                {t('productStrip.chips.euOnPrem')}
              </span>
              <span className="chip" role="listitem">
                {t('productStrip.chips.n8n')}
              </span>
              <span className="chip" role="listitem">
                {t('productStrip.chips.runIds')}
              </span>
            </div>
          </div>
        </Container>
      </Section>

      {/* TRUST TRIO (ALT) */}
      <Section id="trust" className="section section--alt">
        <Container>
          <h2 className="h2">{t('trust.title')}</h2>
          <p className="lead">{t('trust.subtitle')}</p>

          <div style={{height: 16}} />

          <div className="grid-3">
            <div className="card">
              <p className="card-title">{t('trust.card1Title')}</p>
              <p className="card-text">{t('trust.card1Body')}</p>
            </div>
            <div className="card">
              <p className="card-title">{t('trust.card2Title')}</p>
              <p className="card-text">{t('trust.card2Body')}</p>
            </div>
            <div className="card">
              <p className="card-title">{t('trust.card3Title')}</p>
              <p className="card-text">{t('trust.card3Body')}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* SOLUTIONS STAR */}
      <Section id="solutions">
        <Container>
          <h2 className="h2">{t('solutions.title')}</h2>
          <p className="lead">{t('solutions.subtitle')}</p>

          <div style={{height: 16}} />

          <div className="grid-3">
            <div className="card">
              <p className="card-title">{t('solutions.s1Title')}</p>
              <p className="card-text">{t('solutions.s1Body')}</p>
            </div>
            <div className="card">
              <p className="card-title">{t('solutions.s2Title')}</p>
              <p className="card-text">{t('solutions.s2Body')}</p>
            </div>
            <div className="card">
              <p className="card-title">{t('solutions.s3Title')}</p>
              <p className="card-text">{t('solutions.s3Body')}</p>
            </div>
          </div>

          <div style={{height: 18}} />

          <div className="card card--panel">
            <p className="card-title">{t('solutions.noteTitle')}</p>
            <p className="card-text">{t('solutions.noteBody')}</p>
          </div>
        </Container>
      </Section>

      {/* USE CASES */}
      <Section id="use-cases">
        <Container>
          <h2 className="h2">{t('usecases.title')}</h2>
          <p className="lead">{t('usecases.subtitle')}</p>

          <div style={{height: 16}} />

          <div
            style={{
              display: 'grid',
              gap: 14,
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))'
            }}
          >
            <div className="card">
              <p className="card-title">{t('usecases.u1Title')}</p>
              <p className="card-text">{t('usecases.u1Body')}</p>
            </div>
            <div className="card">
              <p className="card-title">{t('usecases.u2Title')}</p>
              <p className="card-text">{t('usecases.u2Body')}</p>
            </div>
            <div className="card">
              <p className="card-title">{t('usecases.u3Title')}</p>
              <p className="card-text">{t('usecases.u3Body')}</p>
            </div>
            <div className="card">
              <p className="card-title">{t('usecases.u4Title')}</p>
              <p className="card-text">{t('usecases.u4Body')}</p>
            </div>
            <div className="card">
              <p className="card-title">{t('usecases.u5Title')}</p>
              <p className="card-text">{t('usecases.u5Body')}</p>
            </div>
            <div className="card">
              <p className="card-title">{t('usecases.u6Title')}</p>
              <p className="card-text">{t('usecases.u6Body')}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* SECURITY (ALT subtil) */}
      <Section id="security" className="section--alt">
        <Container>
          <h2 className="h2">{t('security.title')}</h2>
          <p className="lead">{t('security.subtitle')}</p>

          <div style={{height: 16}} />

          <div className="grid-3">
            <div className="card">
              <p className="card-title">{t('security.s1Title')}</p>
              <p className="card-text">{t('security.s1Body')}</p>
            </div>
            <div className="card">
              <p className="card-title">{t('security.s2Title')}</p>
              <p className="card-text">{t('security.s2Body')}</p>
            </div>
            <div className="card">
              <p className="card-title">{t('security.s3Title')}</p>
              <p className="card-text">{t('security.s3Body')}</p>
            </div>
          </div>

          <div style={{height: 18}} />

          {/* ✅ mini panel UI (au lieu d’une card marketing classique) */}
          <div className="panel">
            <div className="panel-header">
              <div className="panel-heading">
                <div className="panel-title">{t('security.auditTitle')}</div>
                <div className="panel-sub">{t('process.panelSub')}</div>
              </div>
              <span className="status-pill">AVAILABLE</span>
            </div>

            <div className="panel-body">
              <div className="log">
                <div className="log-line">
                  <span className="log-time">10:02:11</span>
                  <span className="log-action">{t('security.auditBody')}</span>
                </div>
                <div className="log-line">
                  <span className="log-time">10:02:14</span>
                  <span className="log-action">{t('process.log3')}</span>
                </div>
                <div className="log-line">
                  <span className="log-time">10:02:30</span>
                  <span className="log-action">{t('process.log5')}</span>
                </div>
              </div>

              <div className="wireframe" aria-hidden="true">
                <svg viewBox="0 0 640 92" role="img" focusable="false">
                  <defs>
                    <marker
                      id="arrow"
                      markerWidth="10"
                      markerHeight="10"
                      refX="6"
                      refY="3"
                      orient="auto"
                    >
                      <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" />
                    </marker>
                  </defs>

                  <rect
                    x="12"
                    y="18"
                    width="130"
                    height="44"
                    rx="10"
                    fill="none"
                    stroke="currentColor"
                    opacity="0.85"
                  />
                  <rect
                    x="178"
                    y="18"
                    width="130"
                    height="44"
                    rx="10"
                    fill="none"
                    stroke="currentColor"
                    opacity="0.85"
                  />
                  <rect
                    x="344"
                    y="18"
                    width="130"
                    height="44"
                    rx="10"
                    fill="none"
                    stroke="currentColor"
                    opacity="0.85"
                  />
                  <rect
                    x="510"
                    y="18"
                    width="118"
                    height="44"
                    rx="10"
                    fill="none"
                    stroke="currentColor"
                    opacity="0.85"
                  />

                  <line
                    x1="142"
                    y1="40"
                    x2="178"
                    y2="40"
                    stroke="currentColor"
                    opacity="0.85"
                    markerEnd="url(#arrow)"
                  />
                  <line
                    x1="308"
                    y1="40"
                    x2="344"
                    y2="40"
                    stroke="currentColor"
                    opacity="0.85"
                    markerEnd="url(#arrow)"
                  />
                  <line
                    x1="474"
                    y1="40"
                    x2="510"
                    y2="40"
                    stroke="currentColor"
                    opacity="0.85"
                    markerEnd="url(#arrow)"
                  />

                  <text
                    x="77"
                    y="46"
                    textAnchor="middle"
                    fontSize="14"
                    fill="currentColor"
                    opacity="0.92"
                  >
                    {t('process.wireInput')}
                  </text>
                  <text
                    x="243"
                    y="46"
                    textAnchor="middle"
                    fontSize="14"
                    fill="currentColor"
                    opacity="0.92"
                  >
                    {t('process.wireAgent')}
                  </text>
                  <text
                    x="409"
                    y="46"
                    textAnchor="middle"
                    fontSize="14"
                    fill="currentColor"
                    opacity="0.92"
                  >
                    {t('process.wireApproval')}
                  </text>
                  <text
                    x="569"
                    y="46"
                    textAnchor="middle"
                    fontSize="14"
                    fill="currentColor"
                    opacity="0.92"
                  >
                    {t('process.wireOutput')}
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* PROCESS 3A CERTIFIED */}
      <Section id="process" className="section section--alt">
        <Container>
          <div className="process-header">
            <h2 className="h2">{t('process.title')}</h2>
            <p className="lead">{t('process.subtitle')}</p>
          </div>

          <div className="process-layout">
            <ol className="timeline">
              <li className="timeline-step">
                <div className="step-marker" aria-hidden="true">
                  <span className="step-badge">1</span>
                </div>
                <div className="step-content">
                  <h3 className="step-title">{t('process.p1Title')}</h3>
                  <p className="step-text">{t('process.p1Body')}</p>
                </div>
              </li>

              <li className="timeline-step">
                <div className="step-marker" aria-hidden="true">
                  <span className="step-badge">2</span>
                </div>
                <div className="step-content">
                  <h3 className="step-title">{t('process.p2Title')}</h3>
                  <p className="step-text">{t('process.p2Body')}</p>
                </div>
              </li>

              <li className="timeline-step">
                <div className="step-marker" aria-hidden="true">
                  <span className="step-badge">3</span>
                </div>
                <div className="step-content">
                  <h3 className="step-title">{t('process.p3Title')}</h3>
                  <p className="step-text">{t('process.p3Body')}</p>
                </div>
              </li>

              <li className="timeline-step">
                <div className="step-marker" aria-hidden="true">
                  <span className="step-badge">4</span>
                </div>
                <div className="step-content">
                  <h3 className="step-title">{t('process.p4Title')}</h3>
                  <p className="step-text">{t('process.p4Body')}</p>
                </div>
              </li>
            </ol>

            <div className="panel">
              <div className="panel-header">
                <div className="panel-heading">
                  <div className="panel-title">{t('process.panelTitle')}</div>
                  <div className="panel-sub">{t('process.panelSub')}</div>
                </div>
                <span className="status-pill">{t('process.panelStatus')}</span>
              </div>

              <div className="panel-body">
                <div className="log">
                  <div className="log-line">
                    <span className="log-time">09:18:03</span>
                    <span className="log-action">{t('process.log1')}</span>
                  </div>
                  <div className="log-line">
                    <span className="log-time">09:18:05</span>
                    <span className="log-action">{t('process.log2')}</span>
                  </div>
                  <div className="log-line">
                    <span className="log-time">09:18:11</span>
                    <span className="log-action">{t('process.log3')}</span>
                  </div>
                  <div className="log-line">
                    <span className="log-time">09:18:42</span>
                    <span className="log-action">{t('process.log4')}</span>
                  </div>
                  <div className="log-line">
                    <span className="log-time">09:18:44</span>
                    <span className="log-action">{t('process.log5')}</span>
                  </div>
                  <div className="log-line">
                    <span className="log-time">09:18:45</span>
                    <span className="log-action">{t('process.log6')}</span>
                  </div>
                </div>

                <div className="wireframe" aria-hidden="true">
                  <svg viewBox="0 0 640 92" role="img" focusable="false">
                    <defs>
                      <marker
                        id="arrow2"
                        markerWidth="10"
                        markerHeight="10"
                        refX="6"
                        refY="3"
                        orient="auto"
                      >
                        <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" />
                      </marker>
                    </defs>

                    <rect
                      x="12"
                      y="18"
                      width="130"
                      height="44"
                      rx="10"
                      fill="none"
                      stroke="currentColor"
                      opacity="0.85"
                    />
                    <rect
                      x="178"
                      y="18"
                      width="130"
                      height="44"
                      rx="10"
                      fill="none"
                      stroke="currentColor"
                      opacity="0.85"
                    />
                    <rect
                      x="344"
                      y="18"
                      width="130"
                      height="44"
                      rx="10"
                      fill="none"
                      stroke="currentColor"
                      opacity="0.85"
                    />
                    <rect
                      x="510"
                      y="18"
                      width="118"
                      height="44"
                      rx="10"
                      fill="none"
                      stroke="currentColor"
                      opacity="0.85"
                    />

                    <line
                      x1="142"
                      y1="40"
                      x2="178"
                      y2="40"
                      stroke="currentColor"
                      opacity="0.85"
                      markerEnd="url(#arrow2)"
                    />
                    <line
                      x1="308"
                      y1="40"
                      x2="344"
                      y2="40"
                      stroke="currentColor"
                      opacity="0.85"
                      markerEnd="url(#arrow2)"
                    />
                    <line
                      x1="474"
                      y1="40"
                      x2="510"
                      y2="40"
                      stroke="currentColor"
                      opacity="0.85"
                      markerEnd="url(#arrow2)"
                    />

                    <text
                      x="77"
                      y="46"
                      textAnchor="middle"
                      fontSize="14"
                      fill="currentColor"
                      opacity="0.92"
                    >
                      {t('process.wireInput')}
                    </text>
                    <text
                      x="243"
                      y="46"
                      textAnchor="middle"
                      fontSize="14"
                      fill="currentColor"
                      opacity="0.92"
                    >
                      {t('process.wireAgent')}
                    </text>
                    <text
                      x="409"
                      y="46"
                      textAnchor="middle"
                      fontSize="14"
                      fill="currentColor"
                      opacity="0.92"
                    >
                      {t('process.wireApproval')}
                    </text>
                    <text
                      x="569"
                      y="46"
                      textAnchor="middle"
                      fontSize="14"
                      fill="currentColor"
                      opacity="0.92"
                    >
                      {t('process.wireOutput')}
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* FOUNDERS */}
      <Section id="founders">
        <Container>
          <h2 className="h2">{t('founders.title')}</h2>
          <p className="lead">{t('founders.subtitle')}</p>

          <div style={{height: 16}} />

          <div
            style={{
              display: 'grid',
              gap: 14,
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))'
            }}
          >
            <div className="card">
              <p className="card-title">{t('founders.f1Title')}</p>
              <p className="card-text">{t('founders.f1Body')}</p>
            </div>
            <div className="card">
              <p className="card-title">{t('founders.f2Title')}</p>
              <p className="card-text">{t('founders.f2Body')}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ (ALT) */}
      <Section id="faq" className="section section--alt">
        <Container>
          <h2 className="h2">{t('faq.title')}</h2>
          <p className="lead">{t('faq.subtitle')}</p>

          <div style={{height: 16}} />

          <div
            style={{
              display: 'grid',
              gap: 14,
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))'
            }}
          >
            <div className="card">
              <p className="card-title">{t('faq.q1Title')}</p>
              <p className="card-text">{t('faq.q1Body')}</p>
            </div>
            <div className="card">
              <p className="card-title">{t('faq.q2Title')}</p>
              <p className="card-text">{t('faq.q2Body')}</p>
            </div>
            <div className="card">
              <p className="card-title">{t('faq.q3Title')}</p>
              <p className="card-text">{t('faq.q3Body')}</p>
            </div>
            <div className="card">
              <p className="card-title">{t('faq.q4Title')}</p>
              <p className="card-text">{t('faq.q4Body')}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <Section id="book">
        <Container>
          <div
            className="card"
            style={{
              padding: 22,
              background:
                'linear-gradient(135deg, rgba(255, 77, 26, 0.16), rgba(255, 122, 69, 0.10))'
            }}
          >
            <h2 className="h2" style={{marginTop: 0}}>
              {t('finalCta.title')}
            </h2>
            <p className="lead">{t('finalCta.subtitle')}</p>

            <div className="btn-row">
              <ButtonLink
                href={CALENDLY_URL}
                target="_blank"
                rel="noreferrer"
                variant="primary"
              >
                {nav('cta')}
              </ButtonLink>
            </div>

            <div style={{marginTop: 10}} className="muted">
              <small>{t('finalCta.note')}</small>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}

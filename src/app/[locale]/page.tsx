import { getTranslations } from "next-intl/server";
import { isLocale, type Locale, routing } from "../../i18n/routing";

import Container from "../../components/layout/Container";
import Section from "../../components/layout/Section";
import { ButtonLink } from "../../components/ui/Button";

const CALENDLY_URL = "https://calendly.com/contact-3aagency/30min";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;

  const locale: Locale = isLocale(rawLocale) ? rawLocale : routing.defaultLocale;

  const t = await getTranslations({ locale, namespace: "Landing" });
  const nav = await getTranslations({ locale, namespace: "Nav" });

  return (
    <main
      style={{
        background:
          "radial-gradient(1200px 600px at 80% 10%, rgba(255, 120, 60, 0.10), transparent 60%), radial-gradient(900px 500px at 10% 20%, rgba(0, 80, 255, 0.08), transparent 55%)",
      }}
    >
      {/* HERO */}
      <Section className="hero">
        <Container>
          <div className="badge">{t("hero.badge")}</div>

          <h1 className="h1">{t("hero.title")}</h1>
          <p className="lead">{t("hero.subtitle")}</p>

          <div className="btn-row">
            <ButtonLink href={CALENDLY_URL} target="_blank" rel="noreferrer" variant="primary">
              {nav("cta")}
            </ButtonLink>

            <ButtonLink href="#solutions" variant="secondary">
              {t("hero.secondaryCta")}
            </ButtonLink>
          </div>

          <div style={{ height: 18 }} />

          {/* 3 promesses ultra claires sous le hero */}
          <div className="grid-3">
            <div className="card">
              <p className="card-title">{t("hero.promises.p1Title")}</p>
              <p className="card-text">{t("hero.promises.p1Body")}</p>
            </div>
            <div className="card">
              <p className="card-title">{t("hero.promises.p2Title")}</p>
              <p className="card-text">{t("hero.promises.p2Body")}</p>
            </div>
            <div className="card">
              <p className="card-title">{t("hero.promises.p3Title")}</p>
              <p className="card-text">{t("hero.promises.p3Body")}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* TRUST TRIO */}
      <Section id="trust">
        <Container>
          <h2 className="h2">{t("trust.title")}</h2>
          <p className="lead">{t("trust.subtitle")}</p>

          <div style={{ height: 16 }} />

          <div className="grid-3">
            <div className="card">
              <p className="card-title">{t("trust.card1Title")}</p>
              <p className="card-text">{t("trust.card1Body")}</p>
            </div>
            <div className="card">
              <p className="card-title">{t("trust.card2Title")}</p>
              <p className="card-text">{t("trust.card2Body")}</p>
            </div>
            <div className="card">
              <p className="card-title">{t("trust.card3Title")}</p>
              <p className="card-text">{t("trust.card3Body")}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* SOLUTIONS STAR */}
      <Section id="solutions">
        <Container>
          <h2 className="h2">{t("solutions.title")}</h2>
          <p className="lead">{t("solutions.subtitle")}</p>

          <div style={{ height: 16 }} />

          <div className="grid-3">
            <div className="card">
              <p className="card-title">{t("solutions.s1Title")}</p>
              <p className="card-text">{t("solutions.s1Body")}</p>
            </div>
            <div className="card">
              <p className="card-title">{t("solutions.s2Title")}</p>
              <p className="card-text">{t("solutions.s2Body")}</p>
            </div>
            <div className="card">
              <p className="card-title">{t("solutions.s3Title")}</p>
              <p className="card-text">{t("solutions.s3Body")}</p>
            </div>
          </div>

          <div style={{ height: 18 }} />

          <div className="card">
            <p className="card-title">{t("solutions.noteTitle")}</p>
            <p className="card-text">{t("solutions.noteBody")}</p>
          </div>
        </Container>
      </Section>

      {/* USE CASES */}
      <Section id="use-cases">
        <Container>
          <h2 className="h2">{t("usecases.title")}</h2>
          <p className="lead">{t("usecases.subtitle")}</p>

          <div style={{ height: 16 }} />

          <div
            style={{
              display: "grid",
              gap: 14,
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            }}
          >
            <div className="card">
              <p className="card-title">{t("usecases.u1Title")}</p>
              <p className="card-text">{t("usecases.u1Body")}</p>
            </div>
            <div className="card">
              <p className="card-title">{t("usecases.u2Title")}</p>
              <p className="card-text">{t("usecases.u2Body")}</p>
            </div>
            <div className="card">
              <p className="card-title">{t("usecases.u3Title")}</p>
              <p className="card-text">{t("usecases.u3Body")}</p>
            </div>
            <div className="card">
              <p className="card-title">{t("usecases.u4Title")}</p>
              <p className="card-text">{t("usecases.u4Body")}</p>
            </div>
            <div className="card">
              <p className="card-title">{t("usecases.u5Title")}</p>
              <p className="card-text">{t("usecases.u5Body")}</p>
            </div>
            <div className="card">
              <p className="card-title">{t("usecases.u6Title")}</p>
              <p className="card-text">{t("usecases.u6Body")}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* SECURITY */}
      <Section id="security">
        <Container>
          <h2 className="h2">{t("security.title")}</h2>
          <p className="lead">{t("security.subtitle")}</p>

          <div style={{ height: 16 }} />

          <div className="grid-3">
            <div className="card">
              <p className="card-title">{t("security.s1Title")}</p>
              <p className="card-text">{t("security.s1Body")}</p>
            </div>
            <div className="card">
              <p className="card-title">{t("security.s2Title")}</p>
              <p className="card-text">{t("security.s2Body")}</p>
            </div>
            <div className="card">
              <p className="card-title">{t("security.s3Title")}</p>
              <p className="card-text">{t("security.s3Body")}</p>
            </div>
          </div>

          <div style={{ height: 18 }} />

          <div className="card">
            <p className="card-title">{t("security.auditTitle")}</p>
            <p className="card-text">{t("security.auditBody")}</p>
          </div>
        </Container>
      </Section>

      {/* PROCESS 3A CERTIFIED */}
      <Section id="process">
        <Container>
          <h2 className="h2">{t("process.title")}</h2>
          <p className="lead">{t("process.subtitle")}</p>

          <div style={{ height: 16 }} />

          <div
            style={{
              display: "grid",
              gap: 14,
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            }}
          >
            <div className="card">
              <p className="card-title">{t("process.p1Title")}</p>
              <p className="card-text">{t("process.p1Body")}</p>
            </div>
            <div className="card">
              <p className="card-title">{t("process.p2Title")}</p>
              <p className="card-text">{t("process.p2Body")}</p>
            </div>
            <div className="card">
              <p className="card-title">{t("process.p3Title")}</p>
              <p className="card-text">{t("process.p3Body")}</p>
            </div>
            <div className="card">
              <p className="card-title">{t("process.p4Title")}</p>
              <p className="card-text">{t("process.p4Body")}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* FOUNDERS */}
      <Section id="founders">
        <Container>
          <h2 className="h2">{t("founders.title")}</h2>
          <p className="lead">{t("founders.subtitle")}</p>

          <div style={{ height: 16 }} />

          <div
            style={{
              display: "grid",
              gap: 14,
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            }}
          >
            <div className="card">
              <p className="card-title">{t("founders.f1Title")}</p>
              <p className="card-text">{t("founders.f1Body")}</p>
            </div>
            <div className="card">
              <p className="card-title">{t("founders.f2Title")}</p>
              <p className="card-text">{t("founders.f2Body")}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <Container>
          <h2 className="h2">{t("faq.title")}</h2>
          <p className="lead">{t("faq.subtitle")}</p>

          <div style={{ height: 16 }} />

          <div
            style={{
              display: "grid",
              gap: 14,
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            }}
          >
            <div className="card">
              <p className="card-title">{t("faq.q1Title")}</p>
              <p className="card-text">{t("faq.q1Body")}</p>
            </div>
            <div className="card">
              <p className="card-title">{t("faq.q2Title")}</p>
              <p className="card-text">{t("faq.q2Body")}</p>
            </div>
            <div className="card">
              <p className="card-title">{t("faq.q3Title")}</p>
              <p className="card-text">{t("faq.q3Body")}</p>
            </div>
            <div className="card">
              <p className="card-title">{t("faq.q4Title")}</p>
              <p className="card-text">{t("faq.q4Body")}</p>
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
                "linear-gradient(135deg, rgba(255, 77, 26, 0.16), rgba(255, 122, 69, 0.10))",
            }}
          >
            <h2 className="h2" style={{ marginTop: 0 }}>
              {t("finalCta.title")}
            </h2>
            <p className="lead">{t("finalCta.subtitle")}</p>

            <div className="btn-row">
              <ButtonLink href={CALENDLY_URL} target="_blank" rel="noreferrer" variant="primary">
                {nav("cta")}
              </ButtonLink>
            </div>

            <div style={{ marginTop: 10 }} className="muted">
              <small>{t("finalCta.note")}</small>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}

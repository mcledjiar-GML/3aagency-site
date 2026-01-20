import Link from "next/link";
import {getTranslations} from "next-intl/server";
import {isLocale, type Locale, routing} from "../../i18n/routing";

export default async function Page({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale: rawLocale} = await params;

  const locale: Locale = isLocale(rawLocale) ? rawLocale : routing.defaultLocale;

  const t = await getTranslations({locale, namespace: "Landing"});

  return (
    <main
      style={{
        minHeight: "calc(100vh - 120px)",
        background:
          "radial-gradient(1200px 600px at 80% 10%, rgba(255, 120, 60, 0.10), transparent 60%), radial-gradient(900px 500px at 10% 20%, rgba(0, 80, 255, 0.08), transparent 55%)",
      }}
    >
      {/* HERO */}
      <section
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "72px 24px 40px",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 14px",
            borderRadius: 999,
            border: "1px solid rgba(0,0,0,0.15)",
            background: "rgba(255,255,255,0.65)",
            backdropFilter: "blur(8px)",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          {t("hero.badge")}
        </div>

        <h1
          style={{
            marginTop: 18,
            marginBottom: 12,
            fontSize: 56,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          {t("hero.title")}
        </h1>

        <p
          style={{
            marginTop: 0,
            marginBottom: 26,
            fontSize: 18,
            lineHeight: 1.6,
            maxWidth: 760,
            opacity: 0.85,
          }}
        >
          {t("hero.subtitle")}
        </p>

        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Link
            href="#book"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 18px",
              borderRadius: 12,
              background: "#ff5a1f",
              color: "white",
              fontWeight: 800,
              textDecoration: "none",
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 10px 30px rgba(255,90,31,0.25)",
            }}
          >
            {t("hero.primaryCta")}
          </Link>

          <Link
            href="#solutions"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 18px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.7)",
              color: "inherit",
              fontWeight: 800,
              textDecoration: "none",
              border: "1px solid rgba(0,0,0,0.15)",
            }}
          >
            {t("hero.secondaryCta")}
          </Link>
        </div>

        {/* DEBUG léger (utile pour confirmer le locale réel) */}
        <div style={{marginTop: 14, fontSize: 12, opacity: 0.55}}>
          locale = <b>{locale}</b>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section
        id="solutions"
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "26px 24px 64px",
        }}
      >
        <h2 style={{ fontSize: 34, margin: "8px 0 6px" }}>
          {t("solutions.title")}
        </h2>

        <p style={{ margin: "0 0 18px", fontSize: 16, opacity: 0.8 }}>
          {t("solutions.subtitle")}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
            marginTop: 16,
          }}
        >
          <div
            style={{
              border: "1px solid rgba(0,0,0,0.15)",
              borderRadius: 16,
              padding: 18,
              background: "rgba(255,255,255,0.65)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div style={{ fontWeight: 900, marginBottom: 8 }}>
              {t("solutions.cards.indexing.title")}
            </div>
            <div style={{ opacity: 0.85, lineHeight: 1.55 }}>
              {t("solutions.cards.indexing.body")}
            </div>
          </div>

          <div
            style={{
              border: "1px solid rgba(0,0,0,0.15)",
              borderRadius: 16,
              padding: 18,
              background: "rgba(255,255,255,0.65)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div style={{ fontWeight: 900, marginBottom: 8 }}>
              {t("solutions.cards.drafting.title")}
            </div>
            <div style={{ opacity: 0.85, lineHeight: 1.55 }}>
              {t("solutions.cards.drafting.body")}
            </div>
          </div>

          <div
            style={{
              border: "1px solid rgba(0,0,0,0.15)",
              borderRadius: 16,
              padding: 18,
              background: "rgba(255,255,255,0.65)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div style={{ fontWeight: 900, marginBottom: 8 }}>
              {t("solutions.cards.timetracker.title")}
            </div>
            <div style={{ opacity: 0.85, lineHeight: 1.55 }}>
              {t("solutions.cards.timetracker.body")}
            </div>
          </div>
        </div>
      </section>

      {/* BOOK */}
      <section
        id="book"
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "10px 24px 80px",
        }}
      >
        <div
          style={{
            border: "1px dashed rgba(0,0,0,0.25)",
            borderRadius: 16,
            padding: 18,
            opacity: 0.8,
          }}
        >
          {t("book.placeholder")}
        </div>
      </section>
    </main>
  );
}

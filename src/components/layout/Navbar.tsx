import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import LanguageSwitcher from "./LanguageSwitcher";

const CALENDLY_URL = "https://calendly.com/contact-3aagency/30min";

export default async function Navbar() {
  const locale = await getLocale();
  const t = await getTranslations("Nav");

  return (
    <header style={{ borderBottom: "1px solid var(--border)" }}>
      <div className="container nav">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 0",
            gap: 14,
          }}
        >
          <Link
            href={`/${locale}`}
            aria-label="3AAgency"
            style={{ display: "inline-flex", alignItems: "center", lineHeight: 0 }}
          >
            <picture>
              <source media="(prefers-color-scheme: dark)" srcSet="/brand/logo-dark.svg" />
              <img
                src="/brand/logo.svg"
                alt="3AAgency"
                width={143}
                height={28}
                style={{ height: 28, width: "auto", display: "block" }}
              />
            </picture>
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <nav aria-label="Language switcher">
              <LanguageSwitcher locale={locale} />
            </nav>

            <a
              href={CALENDLY_URL}
              className="btn btn-primary"
              target="_blank"
              rel="noreferrer"
            >
              {t("cta")}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

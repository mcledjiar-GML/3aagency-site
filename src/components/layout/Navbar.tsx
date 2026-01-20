"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import Container from "./Container";
import LanguageSwitcher from "./LanguageSwitcher";
import { ButtonLink } from "../ui/Button";

export default function Navbar() {
  const locale = useLocale();
  const t = useTranslations("Nav");

  return (
    <header style={{ borderBottom: "1px solid var(--border)" }}>
      <Container
        className="nav"
        // petit padding vertical simple
      >
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
              <source
                media="(prefers-color-scheme: dark)"
                srcSet="/brand/logo-dark.svg"
              />
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
            <LanguageSwitcher />

            <ButtonLink
              href="https://calendly.com/contact-3aagency/30min"
              target="_blank"
              rel="noreferrer"
              variant="primary"
            >
              {t("cta")}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </header>
  );
}

"use client";

import Link from "next/link";
import {useLocale} from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const locale = useLocale();

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 24px",
      }}
    >
      <Link
        href={`/${locale}`}
        aria-label="3AAgency"
        style={{
          display: "inline-flex",
          alignItems: "center",
          lineHeight: 0,
        }}
      >
        <picture>
          <source media="(prefers-color-scheme: dark)" srcSet="/brand/logo-dark.svg" />
          <img
            src="/brand/logo.svg"
            alt="3AAgency"
            width={143}
            height={28}
            style={{
              height: 28,
              width: "auto",
              display: "block",
            }}
          />
        </picture>
      </Link>

      <nav aria-label="Language switcher">
        <LanguageSwitcher />
      </nav>
    </header>
  );
}

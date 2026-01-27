// src/components/legal/LegalPage.tsx
import React from "react";

type Section = {
  heading: string;
  body: string[];
};

export function LegalPage(props: {
  title: string;
  description?: string;
  lastUpdated: string;
  sections: Section[];
  updatedLabel?: string;
}) {
  const {
    title,
    description,
    lastUpdated,
    sections,
    updatedLabel = "Last updated",
  } = props;

  return (
    <main className="legal-wrap">
      <div className="legal-container">
        <div className="legal-surface">
          <header className="legal-header">
            <h1 className="legal-title">{title}</h1>

            {description ? <p className="legal-desc">{description}</p> : null}

            <p className="legal-meta">
              <span style={{ fontWeight: 700 }}>{updatedLabel}:</span> {lastUpdated}
            </p>
          </header>

          <div className="legal-sections">
            {sections.map((s) => (
              <section key={s.heading} className="legal-section">
                <h2>{s.heading}</h2>
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

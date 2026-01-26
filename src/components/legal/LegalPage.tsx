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
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        {description ? (
          <p className="mt-2 text-base opacity-80">{description}</p>
        ) : null}
        <p className="mt-4 text-sm opacity-70">
          <span className="font-medium">{updatedLabel}:</span> {lastUpdated}
        </p>
      </header>

      <div className="space-y-10">
        {sections.map((s) => (
          <section key={s.heading} className="space-y-3">
            <h2 className="text-xl font-semibold">{s.heading}</h2>
            <div className="space-y-2">
              {s.body.map((p, i) => (
                <p key={i} className="leading-7 opacity-90">
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

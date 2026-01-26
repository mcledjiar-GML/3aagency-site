// src/app/[locale]/agb/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/legal/LegalPage";
import { buildLegalMetadata, isLocale } from "@/lib/legal";

type Params = Promise<{ locale: string }>;

const AGB_DE = {
  title: "Allgemeine Geschäftsbedingungen (AGB) & Service",
  description: "Allgemeine Geschäftsbedingungen für die von 3A Agency (MyServX) erbrachten Dienstleistungen.",
  lastUpdated: "2026-02-01",
  sections: [
    {
      heading: "1. Gegenstand & Definitionen",
      body: [
        "3A Agency (betrieben von MyServX) bietet eine hybride operative Intelligenzlösung basierend auf drei Säulen: Automation (n8n-Workflows), AI (RAG / private Wissensdatenbanken) und Agents (autonome Assistenten).",
        "Anbieter: Mohamed LEDJIAR (MyServX / 3A Agency), Wilhelmsplatz 13, 63065 Offenbach am Main, Deutschland. Kontakt: contact@3aagency.eu.",
        "Kunde: jede gewerbliche Einheit, die ordnungsgemäß in der Europäischen Union registriert ist.",
        "Dauer: Mindestlaufzeit 12 Monate für „Pro“ und „Premium“; Testzeitraum 30 Tage (Geld-zurück-Garantie auf monatliche Gebühren); Kündigung mit 60 Tagen Frist vor dem Jahrestag.",
      ],
    },
    {
      heading: "2. Struktur des 3A-Angebots",
      body: [
        "Paket „Starter“ (Pilot): initiales Setup 4.000 €; Abonnement 250 €/Monat; inklusive 1 automatisierte Kundenreise, 1 Basis-FAQ-Agent, Standard-E-Mail-Support.",
        "Paket „Pro“ (Standard Kanzlei): initiales Setup 8.000 €; Abonnement 500 €/Monat; inklusive unbegrenztes Dokumenten-RAG, 3 strategische n8n-Workflows, 24h Prioritäts-Support, Teamschulung.",
        "Paket „Premium“ (Expertise): initiales Setup ab 12.000 € (Angebot); Abonnement ab 900 €/Monat; inklusive komplexe mehrsprachige KI-Agenten, maßgeschneiderte API-Integrationen (CRM/ERP), dedizierter Berater, vierteljährliche Strategiesitzungen.",
      ],
    },
    {
      heading: "3. Finanzielle Bedingungen",
      body: [
        "Setup-Gebühren: fällig bei Vertragsunterzeichnung. Die Bereitstellung beginnt nach Zahlungseingang.",
        "Monatliches Abonnement: automatische Abbuchung am 5. eines jeden Monats.",
        "Zusätzliche technische Ausgaben: souveränes Hosting (Hetzner Online GmbH, Deutschland) kann bis zu einem definierten API-Aufrufvolumen enthalten sein; LLM-Verbrauch (Tokens) wird zu Selbstkosten weiterberechnet oder ist je nach Paket enthalten.",
      ],
    },
    {
      heading: "4. Vertraulichkeit & Datenschutz (DSGVO)",
      body: [
        "Verarbeitung und Speicherung erfolgen – je nach Serviceumfang – ausschließlich auf Servern innerhalb der Europäischen Union (Hetzner Online GmbH, Nürnberg, Deutschland).",
        "Kein Training: Kundendaten werden niemals zum Training öffentlicher KI-Modelle verwendet; jeder Kunde verfügt über eine isolierte Umgebung mit eigenen Schlüsseln.",
        "Berufsgeheimnis: Für Rechtsberufe wird Vertraulichkeit durch NDAs mit technischem Personal unterstützt.",
        "Rollen: Der Kunde ist Verantwortlicher; 3A Agency ist Auftragsverarbeiter (DSGVO Art. 28). Ein AVV/DPA kann dem Vertrag beigefügt werden.",
      ],
    },
    {
      heading: "5. Haftung",
      body: [
        "Human-in-the-loop: Der Kunde erkennt an, dass KI Fehler erzeugen kann, und muss Ergebnisse vor Nutzung/Weitergabe validieren.",
        "Haftungsbeschränkung: Haftung ist auf den Betrag begrenzt, den der Kunde in den drei (3) Monaten vor dem Vorfall gezahlt hat; keine Haftung für entgangenen Gewinn oder indirekte Schäden im Zusammenhang mit KI-Analysen.",
      ],
    },
    {
      heading: "6. Geistiges Eigentum",
      body: [
        "Proprietäre Algorithmen, komplexe n8n-Workflow-Strukturen und Optimierungsmethoden bleiben Eigentum von 3A Agency.",
        "Der Kunde bleibt Eigentümer seiner Quelldaten, Dokumente und der über RAG aufgebauten Wissensdatenbanken.",
      ],
    },
    {
      heading: "7. Anwendbares Recht & Gerichtsstand",
      body: [
        "Anwendbares Recht: Recht der Bundesrepublik Deutschland.",
        "Gerichtsstand: Gerichte von Frankfurt am Main oder Offenbach.",
        "Annahme: Mit Validierung des initialen Audits und Zahlung der Setup-Gebühr akzeptiert der Kunde diese AGB.",
      ],
    },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) return {};
  if (locale !== "de") return {};

  return buildLegalMetadata({
    locale: "de",
    key: "agb_de",
    title: AGB_DE.title,
    description: AGB_DE.description,
  });
}

export default async function AGBPage({ params }: { params: Params }) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();
  if (locale !== "de") notFound();

  return (
    <LegalPage
      title={AGB_DE.title}
      description={AGB_DE.description}
      lastUpdated={AGB_DE.lastUpdated}
      sections={AGB_DE.sections}
      updatedLabel="Inkrafttreten"
    />
  );
}

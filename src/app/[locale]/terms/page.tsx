// src/app/[locale]/terms/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/legal/LegalPage";
import { buildLegalMetadata, isLocale } from "@/lib/legal";

type Params = Promise<{ locale: string }>;

const TERMS_EN = {
  title: "General Terms of Sale & Service",
  description:
    "General terms applicable to the services provided by 3A Agency (MyServX).",
  lastUpdated: "2026-02-01",
  sections: [
    {
      heading: "1. Object & definitions",
      body: [
        "3A Agency (operated by MyServX) provides a hybrid operational intelligence solution based on three pillars: Automation (n8n workflows), AI (RAG private knowledge bases), and Agents (autonomous assistants).",
        "Provider: Mohamed LEDJIAR (trading as MyServX / 3A Agency), Wilhelmsplatz 13, 63065 Offenbach am Main, Germany. Contact: contact@3aagency.eu.",
        "Client: any professional entity duly registered within the European Union.",
        "Duration: minimum 12 months commitment for “Pro” and “Premium” subscriptions; 30-day trial (money-back guarantee on monthly fees); termination with 60 days notice before anniversary date.",
      ],
    },
    {
      heading: "2. 3A offer structure",
      body: [
        "“Starter” pack (Pilot): initial setup €4,000; subscription €250/month; includes 1 automated client journey, 1 basic FAQ agent, standard email support.",
        "“Pro” pack (Standard Firm): initial setup €8,000; subscription €500/month; includes unlimited document RAG, 3 strategic n8n workflows, 24h priority support, team training.",
        "“Premium” pack (Expertise): initial setup from €12,000 (on quote); subscription from €900/month; includes complex multilingual AI agents, custom API integrations (CRM/ERP), dedicated consultant, quarterly strategic sessions.",
      ],
    },
    {
      heading: "3. Financial conditions",
      body: [
        "Setup fees are invoiced upon contract signature. Deployment begins after payment receipt.",
        "Monthly subscription: automatic debit on the 5th of each month.",
        "Additional technical expenses: sovereign hosting (Hetzner Online GmbH, Germany) may be included up to a defined API call volume; LLM consumption (tokens) may be rebilled at cost or included depending on the negotiated package.",
      ],
    },
    {
      heading: "4. Confidentiality & data protection (GDPR)",
      body: [
        "Data processing and storage are carried out exclusively on servers located within the European Union (Hetzner Online GmbH, Nuremberg, Germany), as applicable to the service.",
        "Client data is never used to train public AI models; each client has an isolated environment with dedicated encryption keys.",
        "For legal professions, professional secrecy is supported through NDAs signed by technical staff.",
        "Roles: Client is the Data Controller; 3A Agency is the Processor (GDPR Art. 28). A Data Processing Agreement (DPA) can be attached to the contract.",
      ],
    },
    {
      heading: "5. Liabilities",
      body: [
        "Human-in-the-loop: the Client acknowledges AI may generate errors and must validate outputs before use/transmission.",
        "Limitation of liability: liability is limited to the amount paid by the Client during the three (3) months preceding the incident; no liability for loss of profit or indirect damages linked to decisions based on AI analysis.",
      ],
    },
    {
      heading: "6. Intellectual property",
      body: [
        "3A Agency retains ownership of proprietary algorithms, complex n8n workflow structures, and agent optimization methods.",
        "The Client remains owner of its source data, documents, and knowledge bases built via RAG.",
      ],
    },
    {
      heading: "7. Applicable law & jurisdiction",
      body: [
        "Applicable law: Federal Republic of Germany.",
        "Competent court: Courts of Frankfurt am Main or Offenbach.",
        "Acceptance: by validating the initial audit and proceeding with setup fee payment, the Client accepts these terms.",
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
  if (locale !== "en") return {};

  return buildLegalMetadata({
    locale: "en",
    key: "terms_en",
    title: TERMS_EN.title,
    description: TERMS_EN.description,
  });
}

export default async function TermsPage({ params }: { params: Params }) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();
  if (locale !== "en") notFound();

  return (
    <LegalPage
      title={TERMS_EN.title}
      description={TERMS_EN.description}
      lastUpdated={TERMS_EN.lastUpdated}
      sections={TERMS_EN.sections}
      updatedLabel="Effective date"
    />
  );
}

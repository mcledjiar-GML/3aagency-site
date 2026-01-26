// src/app/[locale]/cgv/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/legal/LegalPage";
import { buildLegalMetadata, isLocale } from "@/lib/legal";

type Params = Promise<{ locale: string }>;

const CGV_FR = {
  title: "Conditions Générales de Vente & de Service",
  description: "Conditions générales applicables aux services fournis par 3A Agency (MyServX).",
  lastUpdated: "2026-02-01",
  sections: [
    {
      heading: "1. Objet & définitions",
      body: [
        "3A Agency (opérée par MyServX) fournit une solution d’intelligence opérationnelle hybride basée sur trois piliers : Automation (workflows n8n), AI (RAG / bases de connaissances privées) et Agents (assistants autonomes).",
        "Prestataire : Mohamed LEDJIAR (nom commercial MyServX / 3A Agency), Wilhelmsplatz 13, 63065 Offenbach am Main, Allemagne. Contact : contact@3aagency.eu.",
        "Client : toute entité professionnelle dûment immatriculée dans l’Union Européenne.",
        "Durée : engagement minimum de 12 mois pour les abonnements « Pro » et « Premium » ; période d’essai de 30 jours (garantie satisfait ou remboursé sur les frais mensuels) ; résiliation avec préavis de 60 jours avant la date anniversaire.",
      ],
    },
    {
      heading: "2. Structure de l’offre 3A",
      body: [
        "Pack « Starter » (Pilot) : setup initial 4 000 € ; abonnement 250 €/mois ; inclut 1 parcours client automatisé, 1 agent FAQ de base, support email standard.",
        "Pack « Pro » (Standard Cabinet) : setup initial 8 000 € ; abonnement 500 €/mois ; inclut RAG documentaire illimité, 3 workflows n8n stratégiques, support prioritaire 24h, formation des équipes.",
        "Pack « Premium » (Expertise) : setup initial dès 12 000 € (sur devis) ; abonnement dès 900 €/mois ; inclut agents IA multilingues complexes, intégrations API custom (CRM/ERP), consultant dédié, sessions stratégiques trimestrielles.",
      ],
    },
    {
      heading: "3. Conditions financières",
      body: [
        "Frais de setup : facturés à la signature du contrat. Le déploiement commence après réception du paiement.",
        "Abonnement mensuel : prélèvement automatique le 5 de chaque mois.",
        "Dépenses techniques additionnelles : hébergement souverain (Hetzner Online GmbH, Allemagne) inclus jusqu’à un certain volume d’appels API ; consommation LLM (tokens) refacturée au réel ou incluse selon le forfait négocié.",
      ],
    },
    {
      heading: "4. Confidentialité & protection des données (RGPD)",
      body: [
        "Traitement et stockage réalisés exclusivement sur des serveurs situés au sein de l’Union Européenne (Hetzner Online GmbH, Nuremberg, Allemagne), selon le périmètre du service.",
        "Non-entraînement : les données du Client ne sont jamais utilisées pour entraîner des modèles d’IA publics ; chaque Client dispose d’un environnement isolé avec clés de chiffrement propres.",
        "Secret professionnel : pour les professions juridiques, la confidentialité est renforcée via des NDA signés par le personnel technique.",
        "Rôles : le Client est Responsable de traitement ; 3A Agency est Sous-traitant (RGPD art. 28). Un accord de sous-traitance (DPA) peut être joint au contrat.",
      ],
    },
    {
      heading: "5. Responsabilités",
      body: [
        "Human-in-the-loop : le Client reconnaît que l’IA peut générer des erreurs et doit valider toute production avant usage / transmission.",
        "Limitation de responsabilité : la responsabilité de 3A Agency est limitée aux sommes versées par le Client au cours des trois (3) derniers mois précédant l’incident ; exclusion des pertes de profit et dommages indirects liés à une décision fondée sur une analyse IA.",
      ],
    },
    {
      heading: "6. Propriété intellectuelle",
      body: [
        "3A Agency conserve la propriété des algorithmes propriétaires, des structures complexes de workflows n8n et des méthodes d’optimisation des agents.",
        "Le Client reste propriétaire exclusif de ses données sources, documents et bases de connaissances constituées via le RAG.",
      ],
    },
    {
      heading: "7. Droit applicable & juridiction",
      body: [
        "Droit applicable : droit de la République Fédérale d’Allemagne.",
        "Tribunal compétent : tribunaux de Francfort-sur-le-Main ou Offenbach.",
        "Acceptation : en validant l’audit initial et en procédant au paiement des frais de setup, le Client accepte les présentes CGV.",
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
  if (locale !== "fr") return {};

  return buildLegalMetadata({
    locale: "fr",
    key: "cgv_fr",
    title: CGV_FR.title,
    description: CGV_FR.description,
  });
}

export default async function CGVPage({ params }: { params: Params }) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();
  if (locale !== "fr") notFound();

  return (
    <LegalPage
      title={CGV_FR.title}
      description={CGV_FR.description}
      lastUpdated={CGV_FR.lastUpdated}
      sections={CGV_FR.sections}
      updatedLabel="Entrée en vigueur"
    />
  );
}

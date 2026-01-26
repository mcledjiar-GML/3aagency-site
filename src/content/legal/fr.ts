// src/content/legal/fr.ts
export const LAST_UPDATED_FR = "2026-01-26";

export const PRIVACY_FR = {
  title: "Politique de confidentialité",
  description:
    "Comment nous traitons les données personnelles lorsque vous utilisez le site 3A Agency ou nous contactez.",
  lastUpdated: LAST_UPDATED_FR,
  sections: [
    {
      heading: "1. Responsable du traitement",
      body: [
        "Responsable du traitement : TODO (raison sociale)",
        "Adresse : TODO",
        "Email : TODO",
        "Téléphone (optionnel) : TODO",
        "DPO (si applicable) : TODO",
      ],
    },
    {
      heading: "2. Données traitées",
      body: [
        "Lors de la navigation, l’hébergeur peut traiter des données techniques (ex. adresse IP, user-agent, pages consultées, horodatage) pour délivrer le site et assurer la sécurité.",
        "Lors d’un contact (email / formulaire si présent), nous traitons les informations que vous fournissez (nom, email, contenu du message) afin de vous répondre.",
        "Si vous cliquez sur le lien Calendly, vous quittez notre site : Calendly traite ensuite vos données selon ses propres politiques.",
      ],
    },
    {
      heading: "3. Finalités et bases légales",
      body: [
        "Fonctionnement du site, sécurité et prévention des abus (intérêt légitime).",
        "Réponse aux demandes et mesures précontractuelles (contrat / intérêt légitime).",
        "Supervision technique et correction d’erreurs (intérêt légitime).",
      ],
    },
    {
      heading: "4. Cookies et traceurs",
      body: [
        "Nous n’utilisons pas de cookies publicitaires.",
        "Nous n’utilisons que des cookies strictement nécessaires (ex. mémorisation de la langue) si besoin. Voir la page Cookies.",
      ],
    },
    {
      heading: "5. Sous-traitants",
      body: [
        "Hébergement : Vercel (délivrance du site).",
        "Supervision d’erreurs : Sentry (détection/correction de bugs).",
        "NB : adaptez cette liste à votre configuration réelle.",
      ],
    },
    {
      heading: "6. Transferts hors UE",
      body: [
        "Selon les prestataires et la configuration, certaines données peuvent être traitées dans l’UE et/ou hors UE. Le cas échéant, nous mettons en place des garanties appropriées (ex. CCT/SCC).",
        "TODO : ajuster selon vos engagements de résidence des données.",
      ],
    },
    {
      heading: "7. Durées de conservation",
      body: [
        "Nous conservons les données uniquement le temps nécessaire aux finalités décrites, puis suppression ou anonymisation.",
        "Exemples : logs techniques pendant une durée limitée (TODO), échanges de contact pour le suivi (TODO).",
      ],
    },
    {
      heading: "8. Vos droits",
      body: [
        "Selon la réglementation applicable, vous pouvez disposer de droits d’accès, rectification, effacement, limitation, portabilité et opposition.",
        "Vous pouvez également introduire une réclamation auprès d’une autorité de contrôle.",
        "Contact : TODO (email).",
      ],
    },
    {
      heading: "9. Mise à jour",
      body: [
        "Cette politique peut évoluer. La date « Dernière mise à jour » ci-dessus indique la dernière révision.",
      ],
    },
  ],
};

export const COOKIES_FR = {
  title: "Politique Cookies",
  description:
    "Informations sur les cookies et traceurs utilisés sur le site 3A Agency.",
  lastUpdated: LAST_UPDATED_FR,
  sections: [
    {
      heading: "1. Utilisons-nous des cookies ?",
      body: [
        "Nous cherchons à maintenir le site sans cookies/traceurs non essentiels.",
        "Si nous ajoutons une mesure d’audience ou d’autres traceurs non essentiels, cette page sera mise à jour et, lorsque requis, un consentement préalable sera demandé.",
      ],
    },
    {
      heading: "2. Cookies strictement nécessaires",
      body: [
        "Nous pouvons utiliser des cookies strictement nécessaires au fonctionnement (ex. préférence de langue, sécurité).",
        "Exemple fréquent sur un site multilingue : cookie de langue (ex. NEXT_LOCALE).",
        "TODO : confirmer les noms exacts en production (DevTools → Application → Cookies).",
      ],
    },
    {
      heading: "3. Services tiers",
      body: [
        "Nous proposons un lien vers Calendly pour la prise de rendez-vous. En cliquant, vous êtes redirigé vers Calendly, qui peut déposer des cookies selon ses propres politiques.",
        "Nous n’intégrons pas Calendly en iframe (lien uniquement).",
      ],
    },
    {
      heading: "4. Gérer les cookies",
      body: [
        "Vous pouvez gérer les cookies via les paramètres de votre navigateur (bloquer, supprimer, autoriser).",
      ],
    },
  ],
};

export const MENTIONS_LEGALES_FR = {
  title: "Mentions légales",
  description: "Informations légales et contact pour 3A Agency.",
  lastUpdated: LAST_UPDATED_FR,
  sections: [
    {
      heading: "Éditeur du site",
      body: [
        "Raison sociale : TODO",
        "Forme juridique : TODO",
        "Adresse : TODO",
        "Email : TODO",
        "Téléphone (optionnel) : TODO",
        "Directeur de la publication : TODO (nom/prénom)",
      ],
    },
    {
      heading: "Immatriculation",
      body: [
        "RCS / RNE : TODO (si applicable)",
        "Numéro TVA intracommunautaire : TODO (si applicable)",
      ],
    },
    {
      heading: "Hébergement",
      body: ["Hébergeur : Vercel (TODO : adresse si souhaité)"],
    },
    {
      heading: "Propriété intellectuelle",
      body: [
        "Les contenus (textes, visuels, marques, etc.) sont protégés. Toute reproduction non autorisée est interdite.",
      ],
    },
    {
      heading: "Responsabilité",
      body: [
        "Les informations publiées sont fournies à titre indicatif et peuvent évoluer. Elles ne constituent pas un conseil juridique.",
      ],
    },
  ],
};

// src/content/legal/en.ts
export const LAST_UPDATED_EN = "2026-01-26";

export const PRIVACY_EN = {
  title: "Privacy Policy",
  description:
    "How we process personal data when you use the 3A Agency website or contact us.",
  lastUpdated: LAST_UPDATED_EN,
  sections: [
    {
      heading: "1. Controller",
      body: [
        "Controller (data controller): TODO: Legal entity name",
        "Address: TODO",
        "Email: TODO",
        "Phone (optional): TODO",
        "If you have a DPO: TODO",
      ],
    },
    {
      heading: "2. Data we process",
      body: [
        "When you visit the site, our hosting provider may process technical data (e.g., IP address, user agent, requested pages, timestamps) to deliver the website securely and reliably.",
        "When you contact us (email / form if any), we process the information you provide (name, email, message content) to respond.",
        "If you click our Calendly link, you leave our website and Calendly processes your data under its own policies.",
      ],
    },
    {
      heading: "3. Purposes and legal bases",
      body: [
        "Website delivery, security, and abuse prevention (legitimate interests).",
        "Responding to inquiries and pre-contractual steps (contract / legitimate interests).",
        "Operational monitoring and debugging (legitimate interests).",
      ],
    },
    {
      heading: "4. Cookies and similar technologies",
      body: [
        "We do not use advertising cookies.",
        "We only use strictly necessary cookies (e.g., to remember your language preference) if needed. See our Cookies page for details.",
      ],
    },
    {
      heading: "5. Processors (service providers)",
      body: [
        "Hosting: Vercel (website delivery).",
        "Error monitoring: Sentry (to detect and fix issues).",
        "Note: Replace/extend this list according to your actual configuration.",
      ],
    },
    {
      heading: "6. International transfers",
      body: [
        "Depending on providers and configuration, data may be processed in the EU and/or other jurisdictions. Where applicable, we rely on appropriate safeguards (e.g., Standard Contractual Clauses).",
        "TODO: Adjust to your real hosting / data residency commitments.",
      ],
    },
    {
      heading: "7. Retention",
      body: [
        "We keep personal data only as long as necessary for the purposes described above, then delete or anonymize it.",
        "Typical examples: server logs for a limited period (TODO: your retention), inquiry emails as needed for follow-up (TODO).",
      ],
    },
    {
      heading: "8. Your rights",
      body: [
        "You may have rights of access, rectification, erasure, restriction, portability, and objection, depending on your jurisdiction.",
        "You can also lodge a complaint with a supervisory authority.",
        "Contact us at: TODO (email).",
      ],
    },
    {
      heading: "9. Updates",
      body: [
        "We may update this policy from time to time. The ‘Last updated’ date above indicates the latest revision.",
      ],
    },
  ],
};

export const COOKIES_EN = {
  title: "Cookie Policy",
  description:
    "Information about cookies and similar technologies used on the 3A Agency website.",
  lastUpdated: LAST_UPDATED_EN,
  sections: [
    {
      heading: "1. Do we use cookies?",
      body: [
        "We aim to keep this website free of non-essential cookies and trackers.",
        "If we introduce analytics or other non-essential technologies in the future, we will update this page and, where required, ask for consent before setting them.",
      ],
    },
    {
      heading: "2. Strictly necessary cookies",
      body: [
        "We may use strictly necessary cookies required for core functionality and security.",
        "Example (common on multilingual sites): a cookie to remember your language preference (e.g., NEXT_LOCALE).",
        "TODO: Confirm the exact cookie names used in production (browser DevTools → Application → Cookies).",
      ],
    },
    {
      heading: "3. Third-party services",
      body: [
        "We provide a link to Calendly for booking calls. Clicking the link takes you to Calendly, which may set cookies under its own policies.",
        "We do not embed Calendly on the website (link-only).",
      ],
    },
    {
      heading: "4. How to control cookies",
      body: [
        "You can control cookies through your browser settings (block, delete, or allow).",
      ],
    },
  ],
};

export const IMPRINT_EN = {
  title: "Imprint",
  description: "Legal notice and contact information for 3A Agency.",
  lastUpdated: LAST_UPDATED_EN,
  sections: [
    {
      heading: "Legal entity",
      body: [
        "TODO: Legal entity name",
        "TODO: Legal form (e.g., GmbH, SAS, etc.)",
        "TODO: Address",
        "TODO: Email",
        "TODO: Phone (optional)",
      ],
    },
    {
      heading: "Registration",
      body: [
        "TODO: Company register / registration number (if applicable)",
        "TODO: VAT ID (if applicable)",
      ],
    },
    {
      heading: "Responsible for content",
      body: ["TODO: Name of the person responsible for content (if applicable)"],
    },
    {
      heading: "Hosting",
      body: ["Hosting provider: Vercel (TODO: address if you want to include it)"],
    },
    {
      heading: "Disclaimer",
      body: [
        "The information on this website is provided for general information purposes only and does not constitute legal advice.",
      ],
    },
  ],
};

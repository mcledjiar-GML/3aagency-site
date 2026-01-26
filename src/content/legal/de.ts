// src/content/legal/de.ts
export const LAST_UPDATED_DE = "2026-01-26";

export const PRIVACY_DE = {
  title: "Datenschutzerklärung",
  description:
    "Wie wir personenbezogene Daten verarbeiten, wenn Sie die Website von 3A Agency nutzen oder uns kontaktieren.",
  lastUpdated: LAST_UPDATED_DE,
  sections: [
    {
      heading: "1. Verantwortlicher",
      body: [
        "Verantwortlicher: TODO (Firma/Name)",
        "Adresse: TODO",
        "E-Mail: TODO",
        "Telefon (optional): TODO",
        "Datenschutzbeauftragter (falls vorhanden): TODO",
      ],
    },
    {
      heading: "2. Verarbeitete Daten",
      body: [
        "Beim Besuch der Website kann der Hosting-Provider technische Daten verarbeiten (z. B. IP-Adresse, User-Agent, aufgerufene Seiten, Zeitstempel), um die Website sicher und zuverlässig bereitzustellen.",
        "Bei Kontakt (E-Mail / Formular falls vorhanden) verarbeiten wir die von Ihnen übermittelten Angaben (Name, E-Mail, Nachricht), um zu antworten.",
        "Wenn Sie auf den Calendly-Link klicken, verlassen Sie unsere Website – Calendly verarbeitet Daten nach eigenen Richtlinien.",
      ],
    },
    {
      heading: "3. Zwecke und Rechtsgrundlagen",
      body: [
        "Bereitstellung, Sicherheit und Missbrauchsprävention (berechtigtes Interesse).",
        "Beantwortung von Anfragen / vorvertragliche Maßnahmen (Vertrag / berechtigtes Interesse).",
        "Technisches Monitoring und Fehlerbehebung (berechtigtes Interesse).",
      ],
    },
    {
      heading: "4. Cookies",
      body: [
        "Keine Werbe-Cookies.",
        "Nur technisch notwendige Cookies (z. B. Sprachpräferenz) falls erforderlich. Details auf der Cookies-Seite.",
      ],
    },
    {
      heading: "5. Auftragsverarbeiter",
      body: [
        "Hosting: Vercel.",
        "Fehler-Monitoring: Sentry.",
        "Hinweis: Liste entsprechend Ihrer tatsächlichen Konfiguration anpassen.",
      ],
    },
    {
      heading: "6. Datenübermittlung in Drittländer",
      body: [
        "Je nach Anbieter/Setup können Daten in der EU und/oder außerhalb der EU verarbeitet werden. Falls erforderlich, nutzen wir geeignete Garantien (z. B. Standardvertragsklauseln).",
        "TODO: An Ihre tatsächlichen Zusagen zur Datenresidenz anpassen.",
      ],
    },
    {
      heading: "7. Speicherdauer",
      body: [
        "Wir speichern Daten nur so lange, wie es für die genannten Zwecke erforderlich ist, anschließend Löschung/Anonymisierung.",
        "Beispiele: technische Logs für begrenzte Zeit (TODO), Kommunikationsdaten für Follow-up (TODO).",
      ],
    },
    {
      heading: "8. Rechte der betroffenen Personen",
      body: [
        "Je nach Rechtslage bestehen Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch.",
        "Sie können sich außerdem bei einer Aufsichtsbehörde beschweren.",
        "Kontakt: TODO (E-Mail).",
      ],
    },
    {
      heading: "9. Änderungen",
      body: [
        "Diese Erklärung kann angepasst werden. Das Datum „Stand“ oben zeigt die letzte Aktualisierung.",
      ],
    },
  ],
};

export const COOKIES_DE = {
  title: "Cookie-Richtlinie",
  description:
    "Informationen zu Cookies und ähnlichen Technologien auf der 3A Agency Website.",
  lastUpdated: LAST_UPDATED_DE,
  sections: [
    {
      heading: "1. Verwenden wir Cookies?",
      body: [
        "Wir versuchen, die Website ohne nicht-notwendige Cookies/Tracker zu betreiben.",
        "Wenn wir künftig Analytics oder andere nicht-notwendige Technologien einsetzen, aktualisieren wir diese Seite und holen – sofern erforderlich – vorher eine Einwilligung ein.",
      ],
    },
    {
      heading: "2. Technisch notwendige Cookies",
      body: [
        "Wir können technisch notwendige Cookies für Kernfunktionalität und Sicherheit verwenden.",
        "Beispiel (mehrsprachige Websites): Cookie zur Sprachpräferenz (z. B. NEXT_LOCALE).",
        "TODO: Cookie-Namen in Produktion verifizieren (DevTools → Application → Cookies).",
      ],
    },
    {
      heading: "3. Drittanbieter",
      body: [
        "Wir verlinken auf Calendly für Terminbuchungen. Beim Klick verlassen Sie unsere Website; Calendly kann Cookies nach eigenen Richtlinien setzen.",
        "Kein Calendly-Embed (nur Link).",
      ],
    },
    {
      heading: "4. Cookie-Kontrolle",
      body: [
        "Cookies können Sie über die Einstellungen Ihres Browsers verwalten (blockieren/löschen/zulassen).",
      ],
    },
  ],
};

export const IMPRESSUM_DE = {
  title: "Impressum",
  description: "Anbieterkennzeichnung und Kontaktinformationen.",
  lastUpdated: LAST_UPDATED_DE,
  sections: [
    {
      heading: "Angaben gemäß § 5 DDG",
      body: [
        "Anbieter: TODO (Firma/Name)",
        "Rechtsform: TODO",
        "Anschrift: TODO",
        "E-Mail: TODO",
        "Telefon (optional): TODO",
      ],
    },
    {
      heading: "Registereintrag (falls vorhanden)",
      body: ["Registergericht: TODO", "Registernummer: TODO", "USt-IdNr.: TODO"],
    },
    {
      heading: "Verantwortlich für den Inhalt (optional)",
      body: ["TODO: Name, Anschrift (falls erforderlich)"],
    },
    {
      heading: "Hosting",
      body: ["Hosting: Vercel (TODO: Anschrift falls gewünscht)"],
    },
    {
      heading: "Haftungshinweis",
      body: [
        "Die Inhalte dieser Website dienen allgemeinen Informationszwecken und stellen keine Rechtsberatung dar.",
      ],
    },
  ],
};

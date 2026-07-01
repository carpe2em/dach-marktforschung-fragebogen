const SEGMENTS = {
  recruiting: {
    title: "Recruiting / Personalvermittlung",
    kicker: "B1 Recruiting",
    features: [["Fokus", "Kandidaten, Termine, Statusmeldungen"], ["Ziel", "Zeitfresser im Recruiting-Alltag erkennen"], ["Dauer", "3–5 Minuten"]],
    sections: ["basis", "admin", "ki", "recruitingSpecific", "potential", "consent"]
  },
  immobilien: {
    title: "Immobilienmakler / Immobilienverwaltung",
    kicker: "B2 Immobilien",
    features: [["Fokus", "Anfragen, Besichtigungen, Exposés"], ["Ziel", "Lead- und Follow-up-Prozesse verstehen"], ["Dauer", "3–5 Minuten"]],
    sections: ["basis", "admin", "ki", "immobilienSpecific", "potential", "consent"]
  },
  reinigung: {
    title: "Reinigungs-, Hausbetreuungs- und Facility-Firmen",
    kicker: "B3 Reinigung / Facility",
    features: [["Fokus", "Angebote, Einsatzplanung, Checklisten"], ["Ziel", "Büroaufwand und operative Abläufe erfassen"], ["Dauer", "3–5 Minuten"]],
    sections: ["basis", "admin", "ki", "reinigungSpecific", "potential", "consent"]
  },
  handwerk: {
    title: "Handwerk / Bau / Haustechnik",
    kicker: "B4 Handwerk",
    features: [["Fokus", "Angebote, Termine, Dokumentation"], ["Ziel", "Manuelle Büroprozesse im Handwerk erkennen"], ["Dauer", "3–5 Minuten"]],
    sections: ["basis", "admin", "ki", "handwerkSpecific", "potential", "consent"]
  },
  pflege: {
    title: "Pflege- und Betreuungsagenturen",
    kicker: "B5 Pflege / Betreuung",
    features: [["Fokus", "Anfragen, Termine, Dokumente"], ["Ziel", "Administrative Entlastung ohne Gesundheitsdaten prüfen"], ["Dauer", "3–5 Minuten"]],
    sections: ["basis", "admin", "ki", "pflegeSpecific", "potential", "consent"]
  },
  buchhaltung: {
    title: "Buchhaltung / Treuhand / Lohnservice",
    kicker: "B6 Buchhaltung",
    features: [["Fokus", "Dokumente, Fristen, Kundenkommunikation"], ["Ziel", "Digitale Unterstützung für wiederkehrende Aufgaben prüfen"], ["Dauer", "3–5 Minuten"]],
    sections: ["basis", "admin", "ki", "buchhaltungSpecific", "potential", "consent"]
  }
};

const FIELD_LIBRARY = {
  basis: {
    title: "Unternehmensdaten",
    note: "Diese Angaben dienen nur der statistischen Einordnung.",
    fields: [
      { key: "unternehmen", label: "Unternehmen", type: "text", required: false },
      { key: "land", label: "Land", type: "select", required: true, options: ["Österreich", "Deutschland", "Schweiz"] },
      { key: "region", label: "Stadt / Region", type: "text", required: false },
      { key: "rolle", label: "Ihre Rolle im Unternehmen", type: "select", required: true, options: ["Geschäftsführung / Inhaber", "Büroleitung / Assistenz", "Fachbereichsleitung", "Mitarbeiter/in", "Sonstiges"] },
      { key: "groesse", label: "Unternehmensgröße", type: "select", required: true, options: ["1 Person", "2–5 Personen", "6–10 Personen", "11–25 Personen", "26–50 Personen", "Mehr als 50 Personen"] },
      { key: "email_optional", label: "E-Mail für Rückfragen (freiwillig)", type: "email", required: false, help: "Nur ausfüllen, wenn Kontakt nach der Auswertung gewünscht ist." }
    ]
  },
  admin: {
    title: "Administrativer Aufwand",
    note: "Hier geht es um wiederkehrende Tätigkeiten, die Zeit kosten.",
    fields: [
      { key: "admin_stunden", label: "Wie viele Stunden pro Woche fallen ungefähr für administrative Tätigkeiten an?", type: "select", required: true, options: ["Unter 2 Stunden", "2–5 Stunden", "6–10 Stunden", "11–20 Stunden", "Mehr als 20 Stunden", "Nicht einschätzbar"] },
      { key: "groesster_zeitfresser", label: "Welche administrative Tätigkeit kostet aktuell am meisten Zeit?", type: "textarea", required: true, full: true },
      { key: "manuelle_prozesse", label: "Welche Aufgaben werden überwiegend manuell erledigt?", type: "textarea", required: false, full: true, help: "Zum Beispiel E-Mails, Termine, Angebote, Dokumentation, Follow-up." },
      { key: "verlorene_anfragen", label: "Kommt es vor, dass Anfragen oder Follow-ups im Alltag untergehen?", type: "select", required: true, options: ["Nie", "Selten", "Manchmal", "Häufig", "Nicht einschätzbar"] },
      { key: "prozess_prioritaet", label: "Welchen Prozess würden Sie zuerst digital verbessern wollen?", type: "select", required: true, options: ["Kunden-/Interessentenanfragen", "Terminvereinbarung", "Angebotserstellung", "Dokumentenerstellung", "Interne Aufgabenverteilung", "Follow-up", "Reporting / Auswertung", "Noch unklar"] }
    ]
  },
  ki: {
    title: "Digitale Tools und KI-Nutzung",
    note: "Es geht nicht um technische Details, sondern um den praktischen Nutzen.",
    fields: [
      { key: "tools_heute", label: "Welche Tools nutzen Sie heute hauptsächlich?", type: "textarea", required: false, full: true, help: "Zum Beispiel Outlook, Gmail, Excel, CRM, Branchensoftware." },
      { key: "ki_nutzung", label: "Nutzen Sie bereits KI-Tools wie ChatGPT, Copilot oder ähnliche Systeme?", type: "select", required: true, options: ["Nein", "Ja, gelegentlich", "Ja, regelmäßig", "Nur einzelne Mitarbeiter", "Nicht bekannt"] },
      { key: "ki_einsatz", label: "Wofür wäre KI-Unterstützung grundsätzlich interessant?", type: "select", required: true, options: ["E-Mail-Entwürfe", "Zusammenfassungen", "Dokumente / Vorlagen", "Klassifizierung von Anfragen", "Aufgabenlisten", "Noch nicht einschätzbar", "Nicht relevant"] },
      { key: "bedenken", label: "Welche Bedenken hätten Sie bei KI- oder Automatisierungslösungen?", type: "textarea", required: false, full: true, help: "Zum Beispiel Datenschutz, Fehler, Aufwand, Kosten, Akzeptanz." }
    ]
  },
  recruitingSpecific: {
    title: "Recruiting-spezifische Fragen",
    note: "Nur für Personalvermittlung und Recruiting relevant.",
    fields: [
      { key: "recruiting_anfragen", label: "Wie viele neue Kandidaten- oder Kundenkontakte entstehen ungefähr pro Woche?", type: "select", required: true, options: ["Unter 10", "10–25", "26–50", "51–100", "Mehr als 100", "Nicht einschätzbar"] },
      { key: "recruiting_aufwand", label: "Was kostet im Recruiting-Alltag besonders viel Zeit?", type: "select", required: true, options: ["Kandidatenkommunikation", "Terminabstimmung", "CV-/Profilaufbereitung", "Statusmeldungen", "Follow-up mit Kunden", "Dokumentation im System", "Sonstiges"] },
      { key: "recruiting_status", label: "Wie werden Kandidatenstatus und Follow-up aktuell überwiegend nachverfolgt?", type: "select", required: true, options: ["CRM/ATS", "Excel/Tabellen", "Outlook/Gmail", "Manuell / Notizen", "Kombination", "Nicht bekannt"] },
      { key: "recruiting_automatisierung", label: "Welche Unterstützung wäre am wertvollsten?", type: "select", required: true, options: ["Automatische Statusübersicht", "E-Mail-Vorlagen", "Termin-Koordination", "Zusammenfassung von Kandidatenprofilen", "Follow-up-Erinnerungen", "Noch unklar"] }
    ]
  },
  immobilienSpecific: {
    title: "Immobilien-spezifische Fragen",
    note: "Für Makler, Verwaltungen und Immobilien-Dienstleister.",
    fields: [
      { key: "immobilien_leads", label: "Wie viele neue Objekt- oder Interessentenanfragen entstehen ungefähr pro Woche?", type: "select", required: true, options: ["Unter 10", "10–25", "26–50", "51–100", "Mehr als 100", "Nicht einschätzbar"] },
      { key: "immobilien_quellen", label: "Über welche Kanäle kommen Anfragen hauptsächlich?", type: "textarea", required: false, full: true, help: "Zum Beispiel Website, Immobilienportale, E-Mail, Telefon." },
      { key: "immobilien_aufwand", label: "Welcher Schritt kostet besonders viel Zeit?", type: "select", required: true, options: ["Erstantwort auf Anfragen", "Besichtigungstermine", "Exposé / Unterlagen", "Follow-up", "Datenpflege im CRM", "Kommunikation mit Eigentümern", "Sonstiges"] },
      { key: "immobilien_automatisierung", label: "Welche digitale Unterstützung wäre am interessantesten?", type: "select", required: true, options: ["Lead-Erfassung", "Automatische Erstantwort", "Besichtigungstermin-Vorschläge", "Follow-up-Erinnerungen", "Dokumentenvorbereitung", "Noch unklar"] }
    ]
  },
  reinigungSpecific: {
    title: "Reinigungs- und Facility-spezifische Fragen",
    note: "Für Reinigung, Hausbetreuung, Gebäudemanagement und Facility Services.",
    fields: [
      { key: "reinigung_anfragen", label: "Wie viele Angebots- oder Kundenanfragen entstehen ungefähr pro Monat?", type: "select", required: true, options: ["Unter 10", "10–25", "26–50", "51–100", "Mehr als 100", "Nicht einschätzbar"] },
      { key: "reinigung_angebot", label: "Wie werden Angebote aktuell erstellt?", type: "select", required: true, options: ["Word/PDF manuell", "Excel-Vorlage", "Branchensoftware", "E-Mail frei formuliert", "Kombination", "Nicht bekannt"] },
      { key: "reinigung_aufwand", label: "Was kostet besonders viel Zeit?", type: "select", required: true, options: ["Angebote", "Einsatzplanung", "Checklisten", "Reklamationen", "Berichte an Kunden", "Fakturavorbereitung", "Sonstiges"] },
      { key: "reinigung_automatisierung", label: "Welche Unterstützung wäre am wertvollsten?", type: "select", required: true, options: ["Angebotsvorbereitung", "Digitale Checklisten", "Einsatz- und Terminübersicht", "Reklamationsverfolgung", "Kundenberichte", "Noch unklar"] }
    ]
  },
  handwerkSpecific: {
    title: "Handwerk-/Bau-spezifische Fragen",
    note: "Für Handwerk, Bau, Haustechnik und technische Dienstleister.",
    fields: [
      { key: "handwerk_anfragen", label: "Wie viele neue Kundenanfragen entstehen ungefähr pro Woche?", type: "select", required: true, options: ["Unter 5", "5–10", "11–25", "26–50", "Mehr als 50", "Nicht einschätzbar"] },
      { key: "handwerk_angebot", label: "Wie werden Angebote aktuell erstellt?", type: "select", required: true, options: ["Word/PDF manuell", "Excel-Vorlage", "Branchensoftware", "E-Mail frei formuliert", "Kombination", "Nicht bekannt"] },
      { key: "handwerk_aufwand", label: "Was kostet besonders viel Zeit?", type: "select", required: true, options: ["Angebote", "Terminabstimmung", "Material-/Leistungsbeschreibung", "Dokumentation", "Rechnungsgrundlagen", "Follow-up", "Sonstiges"] },
      { key: "handwerk_automatisierung", label: "Welche Unterstützung wäre am wertvollsten?", type: "select", required: true, options: ["Angebotsgenerator", "Termin-/Aufgabenübersicht", "Vorlagen für Kunden-E-Mails", "Fotodokumentation / Bericht", "Follow-up-Erinnerung", "Noch unklar"] }
    ]
  },
  pflegeSpecific: {
    title: "Pflege-/Betreuungs-spezifische Fragen",
    note: "Bitte keine Gesundheitsdaten einzelner Personen angeben. Es geht nur um administrative Abläufe.",
    fields: [
      { key: "pflege_anfragen", label: "Wie viele neue Anfragen von Familien oder Klienten entstehen ungefähr pro Monat?", type: "select", required: true, options: ["Unter 10", "10–25", "26–50", "51–100", "Mehr als 100", "Nicht einschätzbar"] },
      { key: "pflege_aufwand", label: "Was kostet administrativ besonders viel Zeit?", type: "select", required: true, options: ["Erstkontakt", "Terminvereinbarung", "Dokumenten-Checklisten", "Kommunikation mit Angehörigen", "Einsatzplanung", "Interne Aufgaben", "Sonstiges"] },
      { key: "pflege_grenze", label: "Welche Daten sollten Ihrer Meinung nach keinesfalls in KI-Tools verarbeitet werden?", type: "textarea", required: false, full: true },
      { key: "pflege_automatisierung", label: "Welche Unterstützung wäre ohne Verarbeitung sensibler Gesundheitsdaten interessant?", type: "select", required: true, options: ["Erstkontakt-Organisation", "Terminübersicht", "Checklisten", "E-Mail-Vorlagen", "Interne Aufgaben", "Noch unklar"] }
    ]
  },
  buchhaltungSpecific: {
    title: "Buchhaltungs-/Treuhand-spezifische Fragen",
    note: "Für Buchhaltung, Lohnservice, Treuhand und verwandte Büroservices.",
    fields: [
      { key: "buchhaltung_mandanten", label: "Wie viele Mandanten/Kunden betreuen Sie ungefähr?", type: "select", required: true, options: ["Unter 25", "25–50", "51–100", "101–250", "Mehr als 250", "Nicht einschätzbar"] },
      { key: "buchhaltung_aufwand", label: "Was kostet administrativ besonders viel Zeit?", type: "select", required: true, options: ["Unterlagen anfordern", "Fristen nachverfolgen", "Rückfragen beantworten", "Dokumentenablage", "Lohn-/Personalunterlagen", "Standard-E-Mails", "Sonstiges"] },
      { key: "buchhaltung_tools", label: "Welche Systeme oder Prozesse werden bereits genutzt?", type: "textarea", required: false, full: true, help: "Bitte keine vertraulichen Mandantendaten angeben." },
      { key: "buchhaltung_automatisierung", label: "Welche Unterstützung wäre am wertvollsten?", type: "select", required: true, options: ["Checklisten / Unterlagenanforderung", "Fristenerinnerungen", "Standardantworten", "Dokumentenübersicht", "Interne Aufgabenverteilung", "Noch unklar"] }
    ]
  },
  potential: {
    title: "Bedarf und möglicher Nutzen",
    note: "Diese Fragen helfen, den realen Marktbedarf einzuschätzen.",
    fields: [
      { key: "nutzen", label: "Wie wertvoll wäre eine Lösung, die 3–5 Stunden administrativen Aufwand pro Woche spart?", type: "select", required: true, options: ["Sehr wertvoll", "Eher wertvoll", "Neutral", "Eher nicht wertvoll", "Nicht relevant", "Nicht einschätzbar"] },
      { key: "budget_bereitschaft", label: "Wäre Ihr Unternehmen grundsätzlich bereit, für eine passende digitale Lösung zu bezahlen?", type: "select", required: true, options: ["Ja", "Eher ja", "Vielleicht", "Eher nein", "Nein", "Nicht entscheidungsbefugt"] },
      { key: "monatliche_betreuung", label: "Wäre laufende Betreuung / Anpassung grundsätzlich interessant?", type: "select", required: true, options: ["Ja", "Vielleicht", "Nein", "Nur bei Bedarf", "Nicht einschätzbar"] },
      { key: "wichtigste_bedingung", label: "Was müsste erfüllt sein, damit eine solche Lösung für Sie interessant wäre?", type: "textarea", required: false, full: true }
    ]
  },
  consent: {
    title: "Freiwilliger Folgekontakt",
    note: "Diese Angaben sind freiwillig und dienen nur dem weiteren Austausch nach der Auswertung.",
    fields: [
      { key: "zusammenarbeit_bereit", label: "Wären Sie grundsätzlich bereit, mit einem neuen Anbieter zusammenzuarbeiten, sobald passende Produkte oder Dienstleistungen angeboten werden?", type: "select", required: true, options: ["Ja", "Vielleicht", "Nein", "Nur wenn der konkrete Nutzen klar ist", "Nicht entscheidungsbefugt"] },
      { key: "folgekontakt", label: "Dürfen Sie nach Abschluss der Auswertung für einen kurzen Austausch oder einen kostenlosen Workflow-Check kontaktiert werden?", type: "select", required: true, options: ["Ja", "Nein"] },
      { key: "kontakt_email", label: "Kontakt-E-Mail für Folgekontakt (nur wenn gewünscht)", type: "email", required: false },
      { key: "datenschutz_bestaetigung", label: "Ich bestätige, dass meine Angaben freiwillig erfolgen und ausschließlich zur Marktforschung ausgewertet werden dürfen.", type: "select", required: true, options: ["Ja"] }
    ]
  }
};

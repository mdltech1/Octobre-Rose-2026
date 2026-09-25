/**
 * « Ajouter à mon agenda » pour les événements documentés.
 *
 * Les sources n'annoncent qu'une heure de début (« À partir de 7h30 ») : aucune heure de fin
 * n'est inventée. L'événement est donc créé sur la journée entière, l'horaire annoncé figure
 * dans la description, avec un rappel la veille au soir.
 */
import { absoluteUrl, siteConfig } from "@/lib/site";
import type { Event } from "@/types/content";

/** URL du fichier .ics d'un événement (route app/agenda/[file]). */
export function calendarFilePath(event: Event) {
  return `/agenda/${event.id}.ics`;
}

/** "2026-09-27" -> "20260927" ; jour suivant pour la fin (exclusive) d'un événement sur la journée. */
function compactDate(iso: string, addDays = 0) {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + addDays);
  return d.toISOString().slice(0, 10).replace(/-/g, "");
}

function description(event: Event) {
  return [
    event.time ? `Horaire annoncé : ${event.time}.` : null,
    event.description,
    `Organisation : ${event.organizer}.`,
    `Annonce officielle : ${event.sourceUrl}`,
    `Informations à confirmer auprès de l'organisateur. Référencé par ${siteConfig.name} : ${absoluteUrl("/evenements")}`,
  ]
    .filter(Boolean)
    .join("\n");
}

/** Texte iCalendar : échappe \ ; , et les retours à la ligne (RFC 5545, 3.3.11). */
function escapeText(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
}

/** Replie une ligne à 75 octets maximum, sans couper un caractère UTF-8 (RFC 5545, 3.1). */
function fold(line: string) {
  const encoder = new TextEncoder();
  const parts: string[] = [];
  let current = "";
  for (const char of line) {
    // Les lignes de continuation commencent par une espace, qui compte dans les 75 octets
    const limit = parts.length ? 74 : 75;
    if (encoder.encode(current + char).length > limit) {
      parts.push(current);
      current = char;
    } else {
      current += char;
    }
  }
  parts.push(current);
  return parts.join("\r\n ");
}

/** Fichier .ics d'un événement (journée entière, rappel la veille à 18 h, heure de Dakar = UTC). */
export function buildIcs(event: Event, stamp = new Date()) {
  const dtstamp = stamp.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const host = new URL(siteConfig.url).hostname;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//${siteConfig.name}//FR`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${event.id}@${host}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART;VALUE=DATE:${compactDate(event.date)}`,
    `DTEND;VALUE=DATE:${compactDate(event.date, 1)}`,
    `SUMMARY:${escapeText(event.title)}`,
    event.location ? `LOCATION:${escapeText(event.location)}` : null,
    `DESCRIPTION:${escapeText(description(event))}`,
    `URL:${event.sourceUrl}`,
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    // Journée commençant à minuit : -6 h = la veille à 18 h
    "TRIGGER:-PT6H",
    `DESCRIPTION:${escapeText(`Demain : ${event.title}`)}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter((line): line is string => Boolean(line));
  return lines.map(fold).join("\r\n") + "\r\n";
}

/** Lien « Google Agenda » : formulaire de création prérempli (journée entière). */
export function googleCalendarUrl(event: Event) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${compactDate(event.date)}/${compactDate(event.date, 1)}`,
    details: description(event),
    ctz: "Africa/Dakar",
  });
  if (event.location) params.set("location", event.location);
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

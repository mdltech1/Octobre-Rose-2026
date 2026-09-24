import type { ContentCategory, LanguageCode } from "@/types/content";

export const languageLabel: Record<LanguageCode, string> = {
  wo: "Wolof",
  fr: "Français",
};

export const categoryLabel: Record<ContentCategory, string> = {
  comprendre: "Comprendre",
  prevention: "Prévention",
  depistage: "Dépistage",
  sensibilisation: "Sensibilisation",
};

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const shortDateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** "2025-09-28" -> "dimanche 28 septembre 2025" */
export function formatLongDate(iso: string) {
  return dateFormatter.format(new Date(`${iso}T00:00:00Z`));
}

/** "2026-09-24" -> "24 septembre 2026". Accepte aussi "2026-07". */
export function formatShortDate(iso: string) {
  if (/^\d{4}-\d{2}$/.test(iso)) {
    return new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric", timeZone: "UTC" }).format(
      new Date(`${iso}-01T00:00:00Z`),
    );
  }
  return shortDateFormatter.format(new Date(`${iso}T00:00:00Z`));
}

export function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

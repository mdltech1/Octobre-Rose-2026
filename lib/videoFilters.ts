/**
 * Filtres de la bibliothèque vidéo, partagés entre le serveur (lecture de l'URL)
 * et le client (VideoLibrary). Ce module ne doit pas porter "use client".
 */
import type { VideoFilterState } from "@/components/VideoFilters";
import type { ContentCategory, LanguageCode } from "@/types/content";

export const LANGS: LanguageCode[] = ["wo", "fr"];
export const CATS: ContentCategory[] = ["prevention", "depistage", "comprendre", "sensibilisation"];

function parseLanguage(v: string | undefined): LanguageCode | null {
  return v && (LANGS as string[]).includes(v) ? (v as LanguageCode) : null;
}
function parseCategory(v: string | undefined): ContentCategory | null {
  return v && (CATS as string[]).includes(v) ? (v as ContentCategory) : null;
}

type RawParam = string | string[] | undefined;

/** État des filtres à partir des paramètres d'URL (lus côté serveur par la page). */
export function parseVideoFilters(params: { language?: RawParam; category?: RawParam; q?: RawParam }): VideoFilterState {
  // Un paramètre répété (?q=a&q=b) arrive sous forme de tableau : on garde la première valeur
  const first = (v: RawParam) => (Array.isArray(v) ? v[0] : v);
  return {
    language: parseLanguage(first(params.language)),
    category: parseCategory(first(params.category)),
    query: first(params.q) ?? "",
  };
}

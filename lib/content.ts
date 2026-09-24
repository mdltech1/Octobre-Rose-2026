/**
 * Couche d'accès aux contenus.
 * Les composants et pages ne lisent jamais /data directement : ils passent par ces
 * fonctions. Pour brancher une API ou un CMS, il suffit de remplacer leur implémentation
 * (elles sont déjà asynchrones).
 */
import { articles, faq } from "@/data/articles";
import { events } from "@/data/events";
import { guides, infoLinks } from "@/data/guides";
import { resources } from "@/data/resources";
import { sources, sourceUrl } from "@/data/sources";
import { videos } from "@/data/videos";
import type { ContentCategory, Event, LanguageCode, Source, Video } from "@/types/content";

const isPublished = <T extends { status: string }>(item: T) => item.status === "published";

export async function getVideos(filter?: { language?: LanguageCode; category?: ContentCategory }) {
  return videos
    .filter(isPublished)
    .filter((v) => (filter?.language ? v.language === filter.language : true))
    .filter((v) => (filter?.category ? v.category === filter.category : true));
}

export async function getVideoById(id: string): Promise<Video | undefined> {
  return videos.find((v) => v.id === id && isPublished(v));
}

/** Nombre de vidéos d'une langue en cours de vérification (non affichées). */
export async function countVideosInReview(language?: LanguageCode) {
  return videos.filter((v) => v.status === "review" && (!language || v.language === language)).length;
}

export async function getArticles() {
  return articles.filter(isPublished);
}

export async function getFaq() {
  return faq;
}

export async function getResources() {
  return resources;
}

/** Besoins de l'orienteur, avec leurs ressources résolues. */
export async function getGuides() {
  return guides.map((g) => ({
    ...g,
    resources: g.resourceIds
      .map((id) => resources.find((r) => r.id === id))
      .filter((r): r is NonNullable<typeof r> => Boolean(r)),
  }));
}

export async function getInfoLinks() {
  return infoLinks;
}

export async function getSources() {
  return sources;
}

export function getSourceById(id: string): Source | undefined {
  return sources.find((s) => s.id === id);
}

/** URL d'une source de /data/sources.ts (erreur au build si l'identifiant est inconnu). */
export function getSourceUrl(id: string) {
  return sourceUrl(id);
}

export function getSourcesByIds(ids: string[]): Source[] {
  return ids.map(getSourceById).filter((s): s is Source => Boolean(s));
}

/** Sépare les événements à venir (triés par date croissante) et passés (décroissante). */
export async function getEvents(now = new Date()) {
  const today = now.toISOString().slice(0, 10);
  const published = events.filter(isPublished);
  const upcoming = published.filter((e) => e.date >= today).sort((a, b) => a.date.localeCompare(b.date));
  const past = published.filter((e) => e.date < today).sort((a, b) => b.date.localeCompare(a.date));
  return { upcoming, past } satisfies { upcoming: Event[]; past: Event[] };
}

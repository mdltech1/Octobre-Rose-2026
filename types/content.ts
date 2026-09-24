/**
 * Modèle de contenu de la plateforme.
 * Ces types décrivent les données locales de /data. Ils sont pensés pour
 * pouvoir être alimentés plus tard par une API ou un CMS sans toucher aux composants.
 */

/** Code de langue ISO 639 : "wo" = wolof, "fr" = français. */
export type LanguageCode = "wo" | "fr";

/** Cycle de publication d'un contenu. Seuls les contenus "published" sont affichés. */
export type PublicationStatus = "published" | "review" | "draft";

/** Thèmes utilisés pour classer les vidéos et les fiches. */
export type ContentCategory = "comprendre" | "prevention" | "depistage" | "sensibilisation";

export type VideoPlatform = "youtube";

export interface Video {
  id: string;
  title: string;
  description: string;
  language: LanguageCode;
  /** false tant que la langue parlée n'a pas été confirmée au visionnage. */
  languageConfirmed: boolean;
  category: ContentCategory;
  platform: VideoPlatform;
  /** Identifiant de la vidéo sur la plateforme (ex. ID YouTube). */
  platformId: string;
  videoUrl: string;
  embedUrl: string;
  thumbnailUrl: string;
  /** Durée au format lisible ("4 min 12 s"). null si non vérifiée. */
  duration: string | null;
  sourceName: string;
  sourceUrl: string;
  /** Référence vers une entrée de /data/sources.ts, si pertinente. */
  sourceId?: string;
  /** true : existence de la vidéo et identité de la chaîne vérifiées. */
  verified: boolean;
  /** Date de la dernière vérification (AAAA-MM-JJ). */
  verifiedAt: string;
  status: PublicationStatus;
  /** Précision éditoriale affichée avec la vidéo (contexte, réserve...). */
  note?: string;
}

/** Bloc de contenu d'une fiche pédagogique. */
export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; sourceId: string }
  | { type: "myth"; myth: string; fact: string; sourceId: string };

export interface Article {
  id: string;
  /** Ancre utilisée sur /comprendre (#slug). */
  slug: string;
  title: string;
  summary: string;
  category: ContentCategory;
  blocks: ArticleBlock[];
  /** Identifiants de /data/sources.ts. */
  sourceIds: string[];
  /** Vidéo en wolof associée, si elle existe et est publiée. */
  wolofVideoId?: string;
  /** Relecture par un professionnel de santé. */
  medicalReview: "pending" | "done";
  status: PublicationStatus;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  sourceIds: string[];
}

export type ResourceType = "association" | "institution" | "information" | "donnees";

export interface Resource {
  id: string;
  name: string;
  description: string;
  type: ResourceType;
  website?: string;
  phone?: string;
  email?: string;
  address?: string;
  /** Page qui atteste les informations affichées. */
  sourceUrl: string;
  /** Nom lisible de la source des coordonnées. */
  sourceLabel: string;
  country: "SN" | "INT" | "FR";
  verifiedAt: string;
  note?: string;
}

export interface Event {
  id: string;
  title: string;
  /** Date ISO (AAAA-MM-JJ). */
  date: string;
  /** Lieu tel qu'indiqué par la source. null si la source ne le précise pas. */
  location: string | null;
  /** Horaire tel qu'annoncé ("À partir de 7h30"). */
  time?: string;
  description: string;
  organizer: string;
  sourceUrl: string;
  sourceName: string;
  status: PublicationStatus;
}

export type SourceKind = "international" | "national" | "association" | "presse" | "reference";

export interface Source {
  id: string;
  name: string;
  shortName: string;
  kind: SourceKind;
  description: string;
  url: string;
  /** Document précis consulté, si différent de l'URL principale. */
  documentTitle?: string;
  documentDate?: string;
  consultedAt: string;
}

/** Besoin de l'orienteur « Où s'adresser, où s'informer ». */
export interface Guide {
  id: string;
  icon: "stethoscope" | "walk" | "bank";
  /** Formulé du point de vue de la personne ("Je cherche..."). */
  need: string;
  title: string;
  answer: string;
  quote?: { text: string; source: string; url: string };
  /** Identifiants de /data/resources.ts. */
  resourceIds: string[];
  /** Liens internes complémentaires. */
  links: { href: string; label: string }[];
  /** Affiche le prochain événement documenté sous la réponse. */
  showNextEvent?: boolean;
}

/** Lien de référence du bloc « Où s'informer ». */
export interface InfoLink {
  id: string;
  icon: "book" | "chart" | "scan" | "headphones";
  title: string;
  description: string;
  href: string;
  external: boolean;
  /** Nom de l'organisme ou de la page, affiché en pied de tuile. */
  label: string;
}

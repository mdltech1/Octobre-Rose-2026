import type { Video } from "@/types/content";
import { youtubeEmbedUrl, youtubeThumbnail, youtubeWatchUrl } from "@/lib/youtube";

/**
 * Vidéos référencées.
 *
 * Règles d'ajout :
 * - uniquement des vidéos réelles, hébergées par leur auteur (aucun réhébergement) ;
 * - existence et chaîne vérifiées via l'API oEmbed officielle de YouTube ;
 * - "published" seulement si la source est identifiable (institution, organisme médical,
 *   association reconnue ou média rapportant ses propos) ;
 * - les vidéos d'auteurs non identifiés restent en "review" et ne sont pas affichées.
 *
 * Toutes les entrées ci-dessous ont été vérifiées le 24 septembre 2026.
 */
function yt(
  id: string,
  platformId: string,
  data: Omit<Video, "id" | "platform" | "platformId" | "videoUrl" | "embedUrl" | "thumbnailUrl">,
): Video {
  return {
    id,
    platform: "youtube",
    platformId,
    videoUrl: youtubeWatchUrl(platformId),
    embedUrl: youtubeEmbedUrl(platformId),
    thumbnailUrl: youtubeThumbnail(platformId),
    ...data,
  };
}

export const videos: Video[] = [
  yt("video-001", "OUbVI0460PQ", {
    title: "Dépistage des cancers du sein : pourquoi ? comment ? pour qui ?",
    description:
      "Vidéo sous-titrée de l'Institut national du cancer (France) qui explique le principe du dépistage du cancer du sein.",
    language: "fr",
    languageConfirmed: true,
    category: "depistage",
    duration: null,
    sourceName: "Institut national du cancer (INCa)",
    sourceUrl: "https://www.youtube.com/@inca",
    sourceId: "inca",
    verified: true,
    verifiedAt: "2026-09-24",
    status: "published",
    note: "Contexte français : l'organisation du dépistage décrite est celle de la France. Au Sénégal, renseignez-vous auprès d'une structure de santé.",
  }),
  yt("video-002", "P62blIBl0D0", {
    title: "La Ligue Sénégalaise Contre le Cancer (LISCA) sensibilise sur les cancers féminins",
    description:
      "Reportage de l'Agence de Presse Africaine (APA News) sur une action de sensibilisation de la LISCA consacrée aux cancers féminins.",
    language: "fr",
    languageConfirmed: false,
    category: "sensibilisation",
    duration: null,
    sourceName: "APA News",
    sourceUrl: "https://www.youtube.com/@APAnewsTV",
    sourceId: "lisca",
    verified: true,
    verifiedAt: "2026-09-24",
    status: "published",
  }),
  yt("video-003", "txRyHBQcT9M", {
    title: "Lisca, Octobre Rose 2025 : 2 625 marcheurs unis contre le cancer du sein au Sénégal",
    description:
      "Reportage de Dakaractu TV sur la randonnée de lancement d'Octobre Rose 2025 organisée par la LISCA.",
    language: "fr",
    languageConfirmed: false,
    category: "sensibilisation",
    duration: null,
    sourceName: "Dakaractu TV HD",
    sourceUrl: "https://www.youtube.com/@dakaractutvhd",
    sourceId: "dakaractu-marche-2025",
    verified: true,
    verifiedAt: "2026-09-24",
    status: "published",
  }),
  yt("video-004", "GtG6K1OoPcs", {
    title: "Cancer du sein : 70 % des femmes diagnostiquées trop tard, la LISCA tire la sonnette d'alarme",
    description:
      "Reportage d'Actu Chrono TV relayant l'alerte de la LISCA sur les diagnostics tardifs du cancer du sein au Sénégal.",
    language: "fr",
    languageConfirmed: false,
    category: "sensibilisation",
    duration: null,
    sourceName: "Actu Chrono TV",
    sourceUrl: "https://www.youtube.com/@actuchronotv",
    sourceId: "lisca",
    verified: true,
    verifiedAt: "2026-09-24",
    status: "published",
  }),
  yt("video-006", "Hxxfk5nqKxY", {
    title: "Randonnée pédestre Octobre Rose 2024 (IUP-Santé et LISCA)",
    description:
      "Images de la randonnée pédestre Octobre Rose 2024 de la LISCA, publiées par l'IUP-Santé, qui y participait.",
    language: "fr",
    languageConfirmed: false,
    category: "sensibilisation",
    duration: null,
    sourceName: "IUP-Santé",
    sourceUrl: "https://www.youtube.com/@iupsante215",
    sourceId: "lisca",
    verified: true,
    verifiedAt: "2026-09-24",
    status: "published",
  }),
  // En attente : vidéo en wolof dont l'auteur n'est pas encore identifié comme
  // professionnel de santé. Ne sera publiée qu'après vérification.
  yt("video-005", "ps10zWDJC88", {
    title: "Les facteurs de risque à connaître pour prévenir le cancer du sein (en wolof)",
    description:
      "Explication en wolof des facteurs de risque du cancer du sein. Auteur à identifier avant publication.",
    language: "wo",
    languageConfirmed: false,
    category: "prevention",
    duration: null,
    sourceName: "SEN DOCTEUR ASTUCE",
    sourceUrl: "https://www.youtube.com/@sendocteurastuce4227",
    verified: false,
    verifiedAt: "2026-09-24",
    status: "review",
  }),
];

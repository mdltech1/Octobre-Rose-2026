import type { Event } from "@/types/content";

/**
 * Événements documentés.
 * Ajouter un événement uniquement lorsqu'il est annoncé par son organisateur
 * ou par un média, avec l'URL de cette annonce dans sourceUrl.
 *
 * Les événements passés basculent automatiquement dans « Éditions passées ».
 */
export const events: Event[] = [
  // Source : publication LinkedIn de la LISCA (#octobrerose), vérifiée le 24/09/2026 :
  // « 27 septembre, retrouvons-nous dès 7h30 à la Place de la Nation (ex-Place de l'Obélisque) ».
  {
    id: "event-2026-randonnee-lisca",
    title: "Randonnée pédestre de lancement d'Octobre Rose 2026",
    date: "2026-09-27",
    location: "Place de la Nation (ex-Obélisque), Dakar",
    time: "À partir de 7h30",
    description:
      "La LISCA lance officiellement Octobre Rose 2026 par sa randonnée pédestre annuelle. Familles, amis, entreprises, associations et institutions sont invités à marcher ensemble pour prévenir, dépister et sauver des vies. #SénégalEnRose",
    organizer: "Ligue Sénégalaise Contre le Cancer (LISCA)",
    sourceUrl:
      "https://www.linkedin.com/posts/ligue-senegalaise-de-lutte-contre-le-cancer_octobrerose-activity-7506488340729188352-zbYR",
    sourceName: "Publication de la LISCA sur LinkedIn",
    status: "published",
  },
];

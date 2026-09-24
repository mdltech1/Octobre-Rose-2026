import { sourceUrl } from "@/data/sources";
import type { Guide, InfoLink } from "@/types/content";

/**
 * Bloc « Où s'adresser » de l'orienteur.
 * Chaque besoin renvoie vers des ressources de /data/resources.ts ou vers une page du site.
 * Aucune structure, adresse ou contact n'est ajouté ici : uniquement des renvois.
 */
export const guides: Guide[] = [
  {
    id: "changement",
    icon: "stethoscope",
    need: "J'ai remarqué un changement",
    title: "Parlez-en à un professionnel de santé",
    answer:
      "Une masse, un changement de forme ou de peau, un écoulement : montrez-le à un médecin, dans une structure de santé proche de chez vous. La plupart des masses ne sont pas cancéreuses, mais seul un examen permet de le savoir.",
    quote: {
      text: "En cas de masse anormale dans le sein, même indolore, il faut consulter un médecin.",
      source: "OMS",
      url: sourceUrl("oms-cancer-sein"),
    },
    resourceIds: [],
    links: [
      { href: "/comprendre#signes-et-symptomes", label: "Les signes à connaître" },
      { href: "/depistage", label: "Le dépistage" },
    ],
  },
  {
    id: "octobre-rose",
    icon: "walk",
    need: "Je veux participer à Octobre Rose",
    title: "Rejoignez la Ligue Sénégalaise Contre le Cancer",
    answer:
      "Chaque année, la LISCA organise des actions de sensibilisation et des consultations pendant Octobre Rose. Lors d'une campagne précédente, elle a indiqué avoir examiné plus de 3 500 femmes dans plusieurs localités.",
    resourceIds: ["resource-lisca"],
    links: [{ href: "/evenements", label: "Tous les événements" }],
    showNextEvent: true,
  },
  {
    id: "officiel",
    icon: "bank",
    need: "Je cherche une information officielle",
    title: "Le Ministère de la Santé du Sénégal",
    answer:
      "Le site officiel du ministère publie les actualités de santé publique et les campagnes nationales, dont celles liées aux cancers féminins.",
    resourceIds: ["resource-ministere"],
    links: [],
  },
];

/**
 * Bloc « Où s'informer » : références fiables, sans coordonnées.
 */
export const infoLinks: InfoLink[] = [
  {
    id: "fiches",
    icon: "headphones",
    title: "Nos fiches, à lire ou écouter",
    description: "L'essentiel en fiches courtes et sourcées, lisibles à voix haute par votre téléphone.",
    href: "/comprendre",
    external: false,
    label: "Octobre Rose Sénégal",
  },
  {
    id: "oms",
    icon: "book",
    title: "Comprendre la maladie",
    description: "L'aide-mémoire de l'OMS, en français : signes, facteurs de risque, prise en charge.",
    href: sourceUrl("oms-cancer-sein"),
    external: true,
    label: "OMS",
  },
  {
    id: "circ",
    icon: "chart",
    title: "Les chiffres au Sénégal",
    description: "Les estimations GLOBOCAN des nouveaux cas et des décès par cancer, pays par pays.",
    href: sourceUrl("circ-globocan-senegal"),
    external: true,
    label: "CIRC",
  },
  {
    id: "inca",
    icon: "scan",
    title: "Le dépistage expliqué",
    description: "Des explications pédagogiques sur le dépistage. Son organisation décrite est celle de la France.",
    href: sourceUrl("inca"),
    external: true,
    label: "INCa (France)",
  },
];

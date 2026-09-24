import type { Source } from "@/types/content";

/**
 * Sources consultées pour la rédaction de la plateforme.
 * Chaque information médicale ou chiffrée affichée renvoie à l'une de ces entrées.
 * Date de consultation : 24 septembre 2026.
 */
export const sources: Source[] = [
  {
    id: "oms-cancer-sein",
    name: "Organisation mondiale de la Santé",
    shortName: "OMS",
    kind: "international",
    description:
      "Aide-mémoire de l'OMS sur le cancer du sein : faits essentiels, facteurs de risque, signes, dépistage et prise en charge.",
    url: "https://www.who.int/fr/news-room/fact-sheets/detail/breast-cancer",
    documentTitle: "Cancer du sein (aide-mémoire)",
    documentDate: "2026-07-03",
    consultedAt: "2026-09-24",
  },
  {
    id: "oms-gbci",
    name: "Organisation mondiale de la Santé",
    shortName: "OMS",
    kind: "international",
    description:
      "Initiative mondiale de l'OMS contre le cancer du sein (GBCI), lancée en 2021 pour réduire la mortalité de 2,5 % par an.",
    url: "https://www.who.int/initiatives/global-breast-cancer-initiative",
    documentTitle: "Global Breast Cancer Initiative",
    consultedAt: "2026-09-24",
  },
  {
    id: "circ-globocan-senegal",
    name: "Centre international de Recherche sur le Cancer (CIRC / IARC)",
    shortName: "CIRC",
    kind: "international",
    description:
      "Observatoire mondial du cancer (Global Cancer Observatory) : estimations GLOBOCAN des nouveaux cas et décès par cancer au Sénégal.",
    url: "https://gco.iarc.who.int/media/globocan/factsheets/populations/686-senegal-fact-sheet.pdf",
    documentTitle: "Senegal, fiche pays GLOBOCAN 2024",
    documentDate: "2026-07",
    consultedAt: "2026-09-24",
  },
  {
    id: "lisca",
    name: "Ligue Sénégalaise Contre le Cancer",
    shortName: "LISCA",
    kind: "association",
    description:
      "Association sénégalaise de lutte contre le cancer, organisatrice de campagnes de sensibilisation et de consultations pendant Octobre Rose.",
    url: "https://lisca.sn/",
    consultedAt: "2026-09-24",
  },
  {
    id: "uicc-lisca",
    name: "Union internationale contre le cancer (UICC)",
    shortName: "UICC",
    kind: "reference",
    description:
      "Annuaire des membres de l'UICC. La fiche de la LISCA indique son site, son adresse et un numéro de téléphone.",
    url: "https://www.uicc.org/membership/ligue-senegalaise-contre-le-cancer-lisca",
    documentTitle: "Fiche membre : Ligue Sénégalaise Contre le Cancer (LISCA)",
    consultedAt: "2026-09-24",
  },
  {
    id: "sante-gouv-sn",
    name: "Ministère de la Santé du Sénégal",
    shortName: "Ministère de la Santé",
    kind: "national",
    description:
      "Site officiel du ministère en charge de la santé au Sénégal : actualités, campagnes et informations de santé publique.",
    url: "https://www.sante.gouv.sn/",
    consultedAt: "2026-09-24",
  },
  {
    id: "sante-gouv-octobre-rose-lisca",
    name: "Ministère de la Santé du Sénégal",
    shortName: "Ministère de la Santé",
    kind: "national",
    description:
      "Article relayant le bilan d'une campagne Octobre Rose de la LISCA : plus de 3 500 femmes examinées dans plusieurs localités du Sénégal.",
    url: "https://www.sante.gouv.sn/Actualites/octobre-rose%E2%80%99%E2%80%99-jusque-l%C3%A0-permis-d%E2%80%99examiner-plus-de-3500-femmes%E2%80%99%E2%80%99-pr%C3%A9sidente-lisca",
    documentTitle: "« Octobre Rose » a jusque-là permis d'examiner « plus de 3500 femmes » (présidente LISCA)",
    consultedAt: "2026-09-24",
  },
  {
    id: "inca",
    name: "Institut national du cancer (France)",
    shortName: "INCa",
    kind: "reference",
    description:
      "Agence sanitaire française de référence sur le cancer. Ses contenus décrivent le programme de dépistage organisé en France.",
    url: "https://www.e-cancer.fr/",
    consultedAt: "2026-09-24",
  },
  {
    id: "dakaractu-marche-2025",
    name: "Dakaractu",
    shortName: "Dakaractu",
    kind: "presse",
    description:
      "Article du 29 septembre 2025 sur la 15e randonnée de la LISCA lançant Octobre Rose 2025, avec les propos de sa présidente.",
    url: "https://www.dakaractu.com/Lisca-Octobre-Rose-2025-2-625-marcheurs-unis-contre-le-cancer-du-sein-au-Senegal_a265448.html",
    documentTitle: "Lisca, Octobre Rose 2025 : 2 625 marcheurs unis contre le cancer du sein au Sénégal",
    documentDate: "2025-09-29",
    consultedAt: "2026-09-24",
  },
];

/**
 * URL d'une source par son identifiant. Échoue au build si l'identifiant n'existe pas,
 * pour qu'un lien ne puisse jamais diverger de la liste des sources.
 */
export function sourceUrl(id: string) {
  const source = sources.find((s) => s.id === id);
  if (!source) throw new Error(`Source inconnue : ${id}`);
  return source.url;
}

export const sourceKindLabel: Record<Source["kind"], string> = {
  international: "Organisation internationale",
  national: "Institution nationale",
  association: "Association",
  presse: "Presse",
  reference: "Référence",
};

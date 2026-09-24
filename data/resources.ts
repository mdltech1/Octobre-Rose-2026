import type { Resource } from "@/types/content";

/**
 * Ressources utiles.
 * N'afficher que des coordonnées publiées par une source identifiable (sourceUrl).
 * Un champ absent n'est pas affiché : ne jamais le compléter sans vérification.
 */
export const resources: Resource[] = [
  {
    id: "resource-lisca",
    name: "Ligue Sénégalaise Contre le Cancer (LISCA)",
    description:
      "Association de lutte contre le cancer au Sénégal. Elle organise chaque année des actions de sensibilisation et des consultations pendant Octobre Rose.",
    type: "association",
    website: "https://lisca.sn/",
    phone: "+221 77 369 01 11",
    address: "Sacré-Cœur 3, n° 9994, Dakar",
    sourceUrl: "https://www.uicc.org/membership/ligue-senegalaise-contre-le-cancer-lisca",
    sourceLabel: "Annuaire des membres de l'UICC",
    country: "SN",
    verifiedAt: "2026-09-24",
    note: "À confirmer auprès de la LISCA avant tout déplacement.",
  },
  {
    id: "resource-ministere",
    name: "Ministère de la Santé du Sénégal",
    description:
      "Site officiel du ministère en charge de la santé : actualités, campagnes nationales et informations de santé publique.",
    type: "institution",
    website: "https://www.sante.gouv.sn/",
    sourceUrl: "https://www.sante.gouv.sn/",
    sourceLabel: "Site officiel",
    country: "SN",
    verifiedAt: "2026-09-24",
  },
  {
    id: "resource-oms",
    name: "OMS : aide-mémoire sur le cancer du sein",
    description:
      "Document de référence de l'Organisation mondiale de la Santé, en français : faits essentiels, signes, facteurs de risque et prise en charge.",
    type: "information",
    website: "https://www.who.int/fr/news-room/fact-sheets/detail/breast-cancer",
    sourceUrl: "https://www.who.int/fr/news-room/fact-sheets/detail/breast-cancer",
    sourceLabel: "OMS",
    country: "INT",
    verifiedAt: "2026-09-24",
  },
  {
    id: "resource-circ",
    name: "CIRC : chiffres du cancer au Sénégal",
    description:
      "Fiche pays GLOBOCAN du Centre international de Recherche sur le Cancer : estimations des nouveaux cas et des décès par type de cancer.",
    type: "donnees",
    website: "https://gco.iarc.who.int/media/globocan/factsheets/populations/686-senegal-fact-sheet.pdf",
    sourceUrl: "https://gco.iarc.who.int/media/globocan/factsheets/populations/686-senegal-fact-sheet.pdf",
    sourceLabel: "CIRC / IARC",
    country: "INT",
    verifiedAt: "2026-09-24",
  },
  {
    id: "resource-inca",
    name: "Institut national du cancer (France)",
    description:
      "Informations pédagogiques en français sur les cancers et leur dépistage. Les modalités de dépistage décrites concernent la France.",
    type: "information",
    website: "https://www.e-cancer.fr/",
    sourceUrl: "https://www.e-cancer.fr/",
    sourceLabel: "Site officiel",
    country: "FR",
    verifiedAt: "2026-09-24",
  },
];

export const resourceTypeLabel: Record<Resource["type"], string> = {
  association: "Association",
  institution: "Institution",
  information: "Information",
  donnees: "Données",
};

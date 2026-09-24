import type { Article, FaqItem } from "@/types/content";

/**
 * Fiches pédagogiques de la page /comprendre.
 *
 * Contenu construit exclusivement à partir de sources identifiées (voir /data/sources.ts).
 * Les citations entre guillemets reprennent le texte de la source.
 * Relecture par un professionnel de santé : en attente (medicalReview: "pending").
 */
export const articles: Article[] = [
  {
    id: "article-definition",
    slug: "quest-ce-que",
    title: "Qu'est-ce que le cancer du sein ?",
    summary: "Une maladie qui naît dans les cellules du sein, et qui peut être détectée tôt.",
    category: "comprendre",
    blocks: [
      {
        type: "quote",
        text: "Le cancer du sein est une maladie qui se caractérise par la multiplication anarchique de cellules mammaires anormales.",
        sourceId: "oms-cancer-sein",
      },
      {
        type: "paragraph",
        text: "Selon l'OMS, les cellules cancéreuses ont leur origine dans les canaux galactophores et/ou les lobules, c'est-à-dire les parties du sein qui produisent et transportent le lait.",
      },
      {
        type: "list",
        items: [
          "La forme la plus précoce, dite « in situ », n'engage pas le pronostic vital et peut être détectée à un stade précoce (OMS).",
          "Les cancers invasifs peuvent se propager aux ganglions lymphatiques voisins ou à d'autres organes (OMS).",
          "Les hommes peuvent aussi être touchés : ils représentent environ 0,5 % à 1 % des personnes atteintes (OMS).",
        ],
      },
    ],
    sourceIds: ["oms-cancer-sein"],
    medicalReview: "pending",
    status: "published",
  },
  {
    id: "article-pourquoi",
    slug: "pourquoi-en-parler",
    title: "Pourquoi en parler ?",
    summary: "Parce qu'au Sénégal, le cancer du sein est fréquent et souvent découvert tard.",
    category: "sensibilisation",
    blocks: [
      {
        type: "paragraph",
        text: "D'après les estimations GLOBOCAN 2024 publiées par le Centre international de Recherche sur le Cancer, le cancer du sein représente au Sénégal 2 220 nouveaux cas par an (15,5 % des nouveaux cas de cancer, 2e rang) et 1 041 décès (3e rang).",
      },
      {
        type: "paragraph",
        text: "En septembre 2025, la présidente de la LISCA a indiqué que 70 % des patientes arrivaient à un stade avancé de la maladie (propos rapportés par Dakaractu).",
      },
      {
        type: "quote",
        text: "La détection et le traitement précoces des cas permettent de réduire la mortalité liée au cancer du sein.",
        sourceId: "oms-cancer-sein",
      },
    ],
    sourceIds: ["circ-globocan-senegal", "dakaractu-marche-2025", "oms-cancer-sein"],
    medicalReview: "pending",
    status: "published",
  },
  {
    id: "article-facteurs",
    slug: "facteurs-de-risque",
    title: "Facteurs de risque",
    summary: "Certains facteurs augmentent le risque, mais la plupart des femmes touchées n'en présentent aucun.",
    category: "prevention",
    blocks: [
      {
        type: "paragraph",
        text: "L'OMS cite les facteurs suivants comme augmentant le risque de cancer du sein :",
      },
      {
        type: "list",
        items: [
          "l'âge ;",
          "l'obésité ;",
          "l'usage nocif de l'alcool ;",
          "les antécédents familiaux de cancer du sein ;",
          "une exposition aux radiations ;",
          "les antécédents gynécologiques ;",
          "le tabagisme ;",
          "un traitement hormonal après la ménopause ;",
          "certaines mutations génétiques (gènes BRCA1, BRCA2 et PALB2).",
        ],
      },
      {
        type: "quote",
        text: "Environ 80 % des cancers du sein apparaissent chez des femmes qui ne présentent aucun facteur de risque spécifique.",
        sourceId: "oms-cancer-sein",
      },
    ],
    sourceIds: ["oms-cancer-sein"],
    medicalReview: "pending",
    status: "published",
  },
  {
    id: "article-signes",
    slug: "signes-et-symptomes",
    title: "Signes et symptômes",
    summary: "Les changements du sein à connaître, pour savoir quand en parler à un professionnel.",
    category: "comprendre",
    blocks: [
      {
        type: "paragraph",
        text: "L'OMS liste les signes suivants. Leur présence ne signifie pas qu'il s'agit d'un cancer, mais elle justifie de consulter.",
      },
      {
        type: "list",
        items: [
          "une masse ou un épaississement dans le sein, souvent indolore ;",
          "un changement de la taille, de la forme ou de l'apparence du sein ;",
          "des fossettes, des rougeurs, une peau d'orange ou d'autres changements de la peau ;",
          "une modification de l'apparence du mamelon ou de la peau qui l'entoure ;",
          "un écoulement anormal ou sanglant du mamelon.",
        ],
      },
    ],
    sourceIds: ["oms-cancer-sein"],
    medicalReview: "pending",
    status: "published",
  },
  {
    id: "article-depistage",
    slug: "depistage",
    title: "Dépistage",
    summary: "Dépistage et diagnostic précoce : deux démarches complémentaires.",
    category: "depistage",
    blocks: [
      {
        type: "paragraph",
        text: "L'OMS distingue deux approches pour détecter le cancer du sein tôt :",
      },
      {
        type: "list",
        items: [
          "le dépistage : le recours à la mammographie dans une population apparemment en bonne santé ;",
          "le diagnostic précoce : connaître les signes et symptômes du cancer du sein, pour consulter sans attendre.",
        ],
      },
      {
        type: "paragraph",
        text: "La page Dépistage de cette plateforme regroupe ces informations générales et les ressources existantes au Sénégal.",
      },
    ],
    sourceIds: ["oms-cancer-sein"],
    medicalReview: "pending",
    status: "published",
  },
  {
    id: "article-consulter",
    slug: "quand-consulter",
    title: "Quand consulter ?",
    summary: "Toute masse anormale dans le sein, même sans douleur, doit être montrée à un médecin.",
    category: "depistage",
    blocks: [
      {
        type: "quote",
        text: "En cas de masse anormale dans le sein, même indolore, il faut consulter un médecin.",
        sourceId: "oms-cancer-sein",
      },
      {
        type: "quote",
        text: "La plupart des masses de ce type ne sont pas cancéreuses.",
        sourceId: "oms-cancer-sein",
      },
      {
        type: "paragraph",
        text: "Consulter permet d'obtenir un examen et, si besoin, des examens complémentaires. Seul un professionnel de santé peut interpréter une situation individuelle.",
      },
    ],
    sourceIds: ["oms-cancer-sein"],
    medicalReview: "pending",
    status: "published",
  },
  {
    id: "article-idees-recues",
    slug: "idees-recues",
    title: "Idées reçues",
    summary: "Cinq affirmations fréquentes, confrontées aux informations de l'OMS.",
    category: "sensibilisation",
    blocks: [
      {
        type: "myth",
        myth: "Seules les femmes qui ont des cas dans leur famille sont concernées.",
        fact: "Environ 80 % des cancers du sein apparaissent chez des femmes sans facteur de risque spécifique.",
        sourceId: "oms-cancer-sein",
      },
      {
        type: "myth",
        myth: "Une boule qui ne fait pas mal n'est pas inquiétante.",
        fact: "La masse est souvent indolore. Une masse anormale, même indolore, doit être montrée à un médecin.",
        sourceId: "oms-cancer-sein",
      },
      {
        type: "myth",
        myth: "Toute boule dans le sein est un cancer.",
        fact: "La plupart des masses du sein ne sont pas cancéreuses. Seul un examen permet de le savoir.",
        sourceId: "oms-cancer-sein",
      },
      {
        type: "myth",
        myth: "Les hommes ne peuvent pas avoir de cancer du sein.",
        fact: "Les hommes représentent environ 0,5 % à 1 % des personnes touchées.",
        sourceId: "oms-cancer-sein",
      },
      {
        type: "myth",
        myth: "On ne peut rien faire contre le cancer du sein.",
        fact: "La détection et le traitement précoces permettent de réduire la mortalité liée au cancer du sein.",
        sourceId: "oms-cancer-sein",
      },
    ],
    sourceIds: ["oms-cancer-sein"],
    medicalReview: "pending",
    status: "published",
  },
];

export const faq: FaqItem[] = [
  {
    id: "faq-diagnostic",
    question: "Cette plateforme peut-elle me dire si j'ai un cancer ?",
    answer:
      "Non. Octobre Rose Sénégal 2026 ne pose aucun diagnostic et n'interprète pas de symptômes. Elle rassemble des informations générales issues de sources identifiées. Pour toute question sur votre santé, adressez-vous à un professionnel de santé.",
    sourceIds: [],
  },
  {
    id: "faq-masse",
    question: "J'ai remarqué une masse dans mon sein. Que faire ?",
    answer:
      "L'OMS recommande de consulter un médecin en cas de masse anormale dans le sein, même indolore. Elle rappelle aussi que la plupart des masses ne sont pas cancéreuses.",
    sourceIds: ["oms-cancer-sein"],
  },
  {
    id: "faq-hommes",
    question: "Les hommes sont-ils concernés ?",
    answer:
      "Oui, plus rarement. Selon l'OMS, les hommes représentent environ 0,5 % à 1 % des personnes touchées par un cancer du sein.",
    sourceIds: ["oms-cancer-sein"],
  },
  {
    id: "faq-wolof",
    question: "Pourquoi y a-t-il encore peu de vidéos en wolof ?",
    answer:
      "Nous ne publions que des vidéos dont l'auteur est identifié (institution, association reconnue, professionnel de santé). Les vidéos en wolof sont ajoutées au fur et à mesure de leur vérification.",
    sourceIds: [],
  },
  {
    id: "faq-officiel",
    question: "Ce site est-il le site officiel de la LISCA ou du Ministère ?",
    answer:
      "Non. Il s'agit d'une initiative digitale indépendante et bénévole de MdlTech. Elle renvoie vers les sites officiels, sans partenariat sauf collaboration officiellement confirmée.",
    sourceIds: [],
  },
];

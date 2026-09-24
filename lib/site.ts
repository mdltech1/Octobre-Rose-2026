export const siteConfig = {
  name: "Octobre Rose Sénégal 2026",
  shortName: "Octobre Rose 2026",
  tagline: "S'informer. Se sensibiliser. Agir.",
  description:
    "Initiative digitale indépendante pour faciliter l'accès à des informations et ressources fiables sur le cancer du sein au Sénégal : fiches sourcées, vidéos en wolof et en français, dépistage, ressources.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://octobre-rose-2026.vercel.app").replace(/\/$/, ""),
  locale: "fr_SN",
  keywords: [
    "Octobre Rose Sénégal 2026",
    "cancer du sein Sénégal",
    "cancer du sein wolof",
    "dépistage cancer du sein Sénégal",
    "Octobre Rose Dakar",
    "LISCA",
    "sensibilisation cancer du sein",
  ],
  author: {
    name: "Mame Diarra",
    role: "Développeuse Web Full-Stack freelance, fondatrice de MdlTech",
  },
  studio: {
    name: "MdlTech",
    url: "https://www.mdltech.site/",
    signature: "Des idées. Des solutions web.",
  },
} as const;

export const mainNav = [
  { href: "/comprendre", label: "Comprendre" },
  { href: "/depistage", label: "Dépistage" },
  { href: "/videos", label: "Vidéos" },
  { href: "/ressources", label: "Ressources" },
  { href: "/evenements", label: "Événements" },
  { href: "/sources", label: "Sources" },
  { href: "/a-propos", label: "À propos" },
] as const;

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

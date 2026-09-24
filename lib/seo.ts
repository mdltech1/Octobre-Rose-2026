import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";

/** Métadonnées d'une page : title, description, canonical et Open Graph. */
export function pageMetadata({
  title,
  description,
  path,
  keywords = [],
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const url = absoluteUrl(path);
  // Image Open Graph générée par app/opengraph-image.tsx, réutilisée par toutes les pages
  const ogImage = { url: "/opengraph-image", width: 1200, height: 630, alt: `${siteConfig.name} : ${siteConfig.tagline}` };
  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [ogImage.url],
    },
  };
}

import type { MetadataRoute } from "next";
import { absoluteUrl, mainNav } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "weekly", priority: 1 },
    ...mainNav.map((item) => ({
      url: absoluteUrl(item.href),
      lastModified,
      changeFrequency: (item.href === "/evenements" || item.href === "/videos" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: item.href === "/videos" || item.href === "/comprendre" || item.href === "/depistage" ? 0.9 : 0.7,
    })),
    { url: absoluteUrl("/affiche"), lastModified, changeFrequency: "monthly", priority: 0.6 },
  ];
}

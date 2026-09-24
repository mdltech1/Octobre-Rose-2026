import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fbf8f7",
    theme_color: "#bf2c61",
    lang: "fr",
    icons: [{ src: "/icon", sizes: "64x64", type: "image/png" }],
  };
}

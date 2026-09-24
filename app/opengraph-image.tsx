import { ImageResponse } from "next/og";
import { RibbonImage } from "@/lib/ribbonImage";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} : ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          position: "relative",
          background: "#fbf8f7",
          color: "#25242a",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "#bf2c61",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RibbonImage height={48} color="#fff8fa" background="#bf2c61" />
          </div>
          <div style={{ fontSize: 30, color: "#54525b" }}>{siteConfig.url.replace(/^https?:\/\//, "")}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>Octobre Rose</div>
          <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: -4, lineHeight: 1.05, color: "#bf2c61" }}>
            Sénégal 2026
          </div>
          <div style={{ fontSize: 40, marginTop: 28, color: "#54525b" }}>{siteConfig.tagline}</div>
        </div>
        {/* Grand ruban, symbole d'Octobre Rose */}
        <div style={{ position: "absolute", right: 96, top: 110, display: "flex" }}>
          <RibbonImage height={400} color="#bf2c61" background="#fbf8f7" />
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 26 }}>
          {["Lire", "Écouter", "Regarder", "Vérifier la source"].map((w) => (
            <div key={w} style={{ padding: "10px 22px", borderRadius: 999, background: "#fbe5ec", color: "#7a1740" }}>
              {w}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}

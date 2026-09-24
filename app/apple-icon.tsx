import { ImageResponse } from "next/og";
import { RibbonImage } from "@/lib/ribbonImage";

/** Icône de l'écran d'accueil iOS (iOS arrondit lui-même les angles). */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#bf2c61",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <RibbonImage height={112} color="#fff8fa" background="#bf2c61" />
      </div>
    ),
    size,
  );
}

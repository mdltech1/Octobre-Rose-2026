import { ImageResponse } from "next/og";

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
          color: "#fff8fa",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 76,
          fontWeight: 700,
          fontFamily: "sans-serif",
        }}
      >
        OR
      </div>
    ),
    size,
  );
}

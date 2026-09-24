import { ImageResponse } from "next/og";

/**
 * Icônes du site et de l'application installée :
 * /icon/64 (onglet), /icon/192 et /icon/512 (écran d'accueil), /icon/maskable (Android, pleine surface).
 */
const icons = [
  { id: "64", px: 64, maskable: false },
  { id: "192", px: 192, maskable: false },
  { id: "512", px: 512, maskable: false },
  { id: "maskable", px: 512, maskable: true },
];

export function generateImageMetadata() {
  return icons.map((i) => ({ id: i.id, size: { width: i.px, height: i.px }, contentType: "image/png" }));
}

export default function Icon({ id }: { id: string }) {
  const icon = icons.find((i) => i.id === id) ?? icons[0];
  const { px, maskable } = icon;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          // Une icône « maskable » occupe toute la surface : Android applique sa propre forme
          borderRadius: maskable ? 0 : px / 4,
          background: "#bf2c61",
          color: "#fff8fa",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // Texte réduit sur l'icône maskable pour rester dans la zone sûre (80 % central)
          fontSize: maskable ? px * 0.34 : px * 0.44,
          fontWeight: 700,
          fontFamily: "sans-serif",
        }}
      >
        OR
      </div>
    ),
    { width: px, height: px },
  );
}

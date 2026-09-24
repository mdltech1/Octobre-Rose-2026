import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 16,
          background: "#bf2c61",
          color: "#fff8fa",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
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

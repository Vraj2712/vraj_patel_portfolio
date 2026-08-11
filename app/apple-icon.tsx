import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1a2e6e",
          color: "#f6f4ee",
          fontSize: 84,
          fontWeight: 600,
          letterSpacing: -2,
        }}
      >
        VP
      </div>
    ),
    { ...size }
  );
}

import { ImageResponse } from "next/og";
import { portfolio } from "@/data/portfolio";

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
          padding: "80px 88px",
          background: "#f6f4ee",
          color: "#181a1f",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#3a56c4",
            }}
          />
          <div style={{ fontSize: 26, letterSpacing: 1, color: "#5b5e68" }}>
            {portfolio.location}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 76, fontWeight: 600, letterSpacing: -2, lineHeight: 1.05 }}>
            {portfolio.name}
          </div>
          <div style={{ fontSize: 38, color: "#3a56c4", fontWeight: 500 }}>
            {portfolio.role}
          </div>
          <div style={{ fontSize: 26, color: "#5b5e68", maxWidth: 900, lineHeight: 1.5 }}>
            {portfolio.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "#5b5e68",
            letterSpacing: 1,
          }}
        >
          {portfolio.links.github.replace("https://", "")}
        </div>
      </div>
    ),
    { ...size }
  );
}

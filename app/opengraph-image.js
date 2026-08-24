import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

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
          justifyContent: "center",
          padding: "80px",
          background: "#211f1b",
          color: "#faf9f5",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 34,
            fontWeight: 800,
            color: "#e3a600",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#faf9f5",
              color: "#211f1b",
              fontSize: 28,
            }}
          >
            N
          </div>
          {SITE_NAME}
        </div>
        <div style={{ display: "flex", fontSize: 56, fontWeight: 800, marginTop: 44, maxWidth: 900, lineHeight: 1.1 }}>
          Rénovation intérieure &amp; pose de cuisine
        </div>
        <div style={{ display: "flex", fontSize: 26, marginTop: 24, color: "#c9c4b6" }}>
          Chamvres · Yonne — devis gratuit
        </div>
      </div>
    ),
    { ...size }
  );
}

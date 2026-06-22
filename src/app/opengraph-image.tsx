import { SITE_CONFIG } from "@/lib/constants";
import { SITE_IMAGES } from "@/content/site-images";
import { ImageResponse } from "next/og";

export const alt = SITE_IMAGES.openGraph.alt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          background: "linear-gradient(145deg, #1a6b6b 0%, #123f3f 55%, #1a1a2e 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#e8a83e",
            marginBottom: 24,
          }}
        >
          {SITE_CONFIG.name}
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, marginBottom: 28 }}>
          Árabe y Español
        </div>
        <div style={{ fontSize: 32, lineHeight: 1.4, color: "#f4ecdd", maxWidth: 900 }}>
          {SITE_CONFIG.description}
        </div>
      </div>
    ),
    { ...size },
  );
}

import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FlipMyCase — Free Online Text Tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            borderRadius: 20,
            backgroundColor: "rgba(16,185,129,0.15)",
            marginBottom: 24,
            fontSize: 40,
            fontWeight: 700,
            color: "#34d399",
          }}
        >
          F
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#fafafa",
            letterSpacing: "-0.02em",
          }}
        >
          FlipMyCase
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#a3a3a3",
            marginTop: 12,
          }}
        >
          Free Online Text Tools
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 32,
            fontSize: 16,
            color: "#737373",
          }}
        >
          <span>Case Converter</span>
          <span style={{ color: "#404040" }}>·</span>
          <span>JSON Formatter</span>
          <span style={{ color: "#404040" }}>·</span>
          <span>Word Counter</span>
          <span style={{ color: "#404040" }}>·</span>
          <span>75+ Tools</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Mohamad Bitar — AI Engineer";
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
          justifyContent: "space-between",
          background: "#0B0C0A",
          color: "#ECEAE3",
          padding: "64px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontFamily: "ui-monospace, monospace",
            fontSize: 22,
            color: "#C8F25A",
            letterSpacing: "0.06em",
          }}
        >
          mohamadbit.me · grounded
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 96, lineHeight: 0.95, letterSpacing: "-0.04em" }}>
            Mohamad Bitar
          </div>
          <div style={{ fontSize: 32, color: "#A8AAA0", maxWidth: 820 }}>
            I build AI that answers from real data — and shows its sources.
          </div>
        </div>
        <div
          style={{
            fontFamily: "ui-monospace, monospace",
            fontSize: 20,
            color: "#8B8D84",
          }}
        >
          BAC AI · RAG · citations · AI Engineer
        </div>
      </div>
    ),
    { ...size }
  );
}

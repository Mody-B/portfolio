import type { Metadata } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";
import "./lumen.css";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-flow-display",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-flow-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Mohamad Bitar — AI Engineer",
    template: "%s · Mohamad Bitar",
  },
  description:
    "Mohamad Bitar — AI engineer building RAG, embeddings, and LLM systems. mohamadbit.me",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Space_Grotesk, Syne } from "next/font/google";
import "./globals.css";
import "./lumen.css";

const display = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-atelier-display",
});

const sans = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-atelier-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Mohamad Bitar — AI Engineer",
    template: "%s · Mohamad Bitar",
  },
  description:
    "Mohamad Bitar — AI engineer building RAG, embeddings, and LLM systems. Portfolio with interactive demos. mohamadbit.me",
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

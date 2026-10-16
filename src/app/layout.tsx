import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import "./lumen.css";

const sans = DM_Sans({
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
    <html lang="en" className={`${sans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import "./lumen.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lumen-display",
});

const sans = Outfit({
  subsets: ["latin"],
  variable: "--font-lumen-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Mohamad Bitar — AI Engineer",
    template: "%s · Mohamad Bitar",
  },
  description:
    "Animated portfolio for Mohamad Bitar — AI engineering, production LLM systems, elegant interaction.",
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

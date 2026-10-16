import type { Metadata } from "next";
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "./lumen.css";
import "./grounded.css";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-g-serif",
  display: "swap",
});

const sans = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-g-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-g-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mohamadbit.me"),
  title: {
    default: "Mohamad Bitar — AI Engineer",
    template: "%s · Mohamad Bitar",
  },
  description:
    "Mohamad Bitar — AI engineer. I build systems that answer from real data and show their sources. Flagship: BAC AI.",
  openGraph: {
    title: "Mohamad Bitar — AI Engineer",
    description:
      "Grounded AI engineering portfolio. Flagship: BAC AI — Syrian Baccalaureate study assistant.",
    url: "https://mohamadbit.me",
    siteName: "Mohamad Bitar",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamad Bitar — AI Engineer",
    description: "I build AI that answers from real data — and shows its sources.",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/favicon.svg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="ink"
      className={`${serif.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

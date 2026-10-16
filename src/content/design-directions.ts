export type DesignSlug = "signal" | "atelier" | "lattice";

export type DesignDirection = {
  slug: DesignSlug;
  label: string;
  mood: string;
  fit: string;
  typography: string;
  colors: string;
  previewPath: string;
};

export const designDirections: DesignDirection[] = [
  {
    slug: "signal",
    label: "Signal",
    mood: "Lab-instrument precision — cool graphite, teal pulse, mono accents.",
    fit: "Strongest default for AI engineering: technical, trustworthy, modern without neon-hype.",
    typography: "Space Grotesk (display) + IBM Plex Sans / Plex Mono",
    colors: "Graphite #0E1218 · mist #E8EEF2 · signal teal #1FA7A0 · soft grid lines",
    previewPath: "/preview/signal/",
  },
  {
    slug: "atelier",
    label: "Atelier",
    mood: "Editorial craft — deep ink, olive, warm paper grain; thoughtful and human.",
    fit: "Best if you want a calmer, writerly presence that still feels serious about systems work.",
    typography: "Fraunces (display) + Source Serif 4 + DM Sans for UI",
    colors: "Ink #14201A · olive #3D5A45 · parchment #F3EFE6 · copper line (sparse)",
    previewPath: "/preview/atelier/",
  },
  {
    slug: "lattice",
    label: "Lattice",
    mood: "Systems diagram — stone field, navy structure, amber accent; architectural.",
    fit: "Good middle path: structured and product-forward without dark-mode clichés.",
    typography: "Syne (display) + Manrope",
    colors: "Stone #F2F0EB · navy #1B2A4A · amber #C9852A · hairline lattice",
    previewPath: "/preview/lattice/",
  },
];

export function getDesign(slug: string): DesignDirection | undefined {
  return designDirections.find((d) => d.slug === slug);
}

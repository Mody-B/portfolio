import { notFound } from "next/navigation";
import {
  designDirections,
  getDesign,
  type DesignSlug,
} from "@/content/design-directions";
import { PortfolioPreview } from "@/components/portfolio/PortfolioPreview";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return designDirections.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const design = getDesign(slug);
  if (!design) return { title: "Preview" };
  return {
    title: `${design.label} preview — Mohamad Bitar`,
    description: design.mood,
  };
}

export default async function PreviewPage({ params }: PageProps) {
  const { slug } = await params;
  const design = getDesign(slug);
  if (!design) notFound();

  return <PortfolioPreview design={design.slug as DesignSlug} />;
}

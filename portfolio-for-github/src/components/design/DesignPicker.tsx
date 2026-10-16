import Link from "next/link";
import { designDirections } from "@/content/design-directions";
import { site } from "@/content/portfolio";
import { Button } from "@/components/ui/button";

export function DesignPicker() {
  return (
    <main className="picker">
      <header className="picker-header">
        <p className="picker-kicker">Archived design refs</p>
        <h1>{site.name}</h1>
        <p className="picker-lede">
          Live home is the <strong>Lumen</strong> motion experience (not these
          static themes). Atelier was tried and rejected. These previews stay
          for history only.
        </p>
        <p className="picker-lede">
          <Link href="/">← Back to live portfolio</Link>
        </p>
      </header>

      <ol className="direction-grid">
        {designDirections.map((direction, index) => (
          <li
            key={direction.slug}
            className={`direction direction-${direction.slug}`}
          >
            <div className="direction-swatch" aria-hidden>
              <span className="swatch-a" />
              <span className="swatch-b" />
              <span className="swatch-c" />
            </div>
            <div className="direction-copy">
              <p className="direction-index">
                Archived {String(index + 1).padStart(2, "0")}
                {direction.slug === "atelier" ? " · Rejected" : ""}
              </p>
              <h2>{direction.label}</h2>
              <p>{direction.mood}</p>
              <Button
                nativeButton={false}
                render={<Link href={direction.previewPath} />}
              >
                Open {direction.label} preview
              </Button>
            </div>
          </li>
        ))}
      </ol>
    </main>
  );
}

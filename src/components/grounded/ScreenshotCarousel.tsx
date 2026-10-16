"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export type Shot = {
  src: string;
  alt: string;
  caption: string;
  href?: string;
};

type Props = {
  shots: readonly Shot[];
  linkHref: string;
};

export function ScreenshotCarousel({ shots, linkHref }: Props) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    if (reduce || shots.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % shots.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [reduce, shots.length]);

  const shot = shots[index];

  function prev() {
    setIndex((i) => (i - 1 + shots.length) % shots.length);
  }
  function next() {
    setIndex((i) => (i + 1) % shots.length);
  }

  return (
    <div className="g-carousel">
      <a
        className="g-browser g-carousel-frame"
        href={linkHref}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open BAC AI live — ${shot.caption}`}
        onTouchStart={(e) => {
          touchX.current = e.changedTouches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          if (touchX.current == null) return;
          const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) < 40) return;
          if (dx > 0) prev();
          else next();
        }}
      >
        <div className="g-browser-bar">
          <span />
          <span />
          <span />
          <em>{shot.caption}</em>
        </div>
        <Image
          src={shot.src}
          alt={shot.alt}
          width={1400}
          height={900}
          className="g-browser-img"
          sizes="(max-width: 900px) 100vw, 52vw"
          priority={index === 0}
        />
        <span className="g-carousel-hint">Click to open bacai.dev · swipe or use arrows</span>
      </a>

      <div className="g-carousel-controls">
        <button type="button" className="g-carousel-btn" onClick={prev} aria-label="Previous screenshot">
          ←
        </button>
        <div className="g-carousel-dots" role="tablist" aria-label="Screenshots">
          {shots.map((s, i) => (
            <button
              key={s.src}
              type="button"
              role="tab"
              aria-selected={i === index}
              className={`g-carousel-dot${i === index ? " is-active" : ""}`}
              onClick={() => setIndex(i)}
              aria-label={s.caption}
            />
          ))}
        </div>
        <button type="button" className="g-carousel-btn" onClick={next} aria-label="Next screenshot">
          →
        </button>
      </div>
    </div>
  );
}

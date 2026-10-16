"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Citation as CitationType } from "@/content/grounded";

type Props = {
  citation: CitationType;
  pulse?: boolean;
};

export function Citation({ citation, pulse }: Props) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const tipId = useId();

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <span className="g-cite-wrap" ref={wrapRef}>
      <button
        type="button"
        className={`g-cite${pulse ? " g-cite-pulse" : ""}`}
        aria-expanded={open}
        aria-controls={tipId}
        onClick={() => setOpen((v) => !v)}
      >
        [{citation.id}]
      </button>
      {open ? (
        <span className="g-cite-tip" id={tipId} role="tooltip">
          <strong>{citation.label}</strong>
          <span>{citation.detail}</span>
          <a href={citation.href} target="_blank" rel="noreferrer">
            Open source →
          </a>
        </span>
      ) : null}
    </span>
  );
}

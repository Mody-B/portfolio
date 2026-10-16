"use client";

import { useEffect, useState } from "react";
import { nav } from "@/content/grounded";
import { ThemeToggle } from "./ThemeToggle";

export function SiteNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="g-nav">
      <a href="#top" className="g-brand">
        MB
      </a>
      <nav className="g-nav-desktop" aria-label="Primary">
        {nav.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="g-nav-actions">
        <ThemeToggle />
        <button
          type="button"
          className="g-nav-menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open ? (
        <div className="g-nav-sheet" id="mobile-nav">
          <nav aria-label="Mobile">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}

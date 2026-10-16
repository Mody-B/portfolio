"use client";

import { useEffect, useState } from "react";

type Theme = "ink" | "paper";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("ink");

  useEffect(() => {
    const stored = window.localStorage.getItem("grounded-theme") as Theme | null;
    const next = stored === "paper" || stored === "ink" ? stored : "ink";
    setTheme(next);
    document.documentElement.dataset.theme = next;
  }, []);

  function toggle() {
    const next: Theme = theme === "ink" ? "paper" : "ink";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("grounded-theme", next);
  }

  return (
    <button
      type="button"
      className="g-theme"
      onClick={toggle}
      aria-label={theme === "ink" ? "Switch to paper theme" : "Switch to ink theme"}
    >
      {theme === "ink" ? "paper" : "ink"}
    </button>
  );
}

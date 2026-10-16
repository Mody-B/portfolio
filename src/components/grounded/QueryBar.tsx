"use client";

import { FormEvent, useEffect, useState } from "react";
import { queryPlaceholders, queryRoutes } from "@/content/grounded";

function routeQuery(q: string): string | null {
  const lower = q.toLowerCase();
  for (const route of queryRoutes) {
    if (route.keys.some((k) => lower.includes(k))) return route.target;
  }
  return null;
}

export function QueryBar() {
  const [value, setValue] = useState("");
  const [phIndex, setPhIndex] = useState(0);
  const [flashId, setFlashId] = useState<string | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => {
      setPhIndex((i) => (i + 1) % queryPlaceholders.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!flashId) return;
    const el = document.getElementById(flashId);
    if (el) {
      el.classList.add("g-section-flash");
      const t = window.setTimeout(() => {
        el.classList.remove("g-section-flash");
        setFlashId(null);
      }, 1600);
      return () => window.clearTimeout(t);
    }
  }, [flashId]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const target = routeQuery(value) ?? "flagship";
    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setFlashId(target);
    }
  }

  return (
    <form className="g-query" onSubmit={onSubmit} role="search">
      <label className="g-query-label" htmlFor="grounded-query">
        query
      </label>
      <div className="g-query-row">
        <span className="g-query-prefix" aria-hidden>
          ›
        </span>
        <input
          id="grounded-query"
          className="g-query-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={queryPlaceholders[phIndex]}
          autoComplete="off"
        />
        <button type="submit" className="g-query-go">
          Retrieve
        </button>
      </div>
    </form>
  );
}

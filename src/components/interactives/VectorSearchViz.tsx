"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  vectorChunks,
  vectorQueries,
  type VectorQuery,
} from "@/content/interactives";

function dist(ax: number, ay: number, bx: number, by: number) {
  const dx = ax - bx;
  const dy = ay - by;
  return Math.sqrt(dx * dx + dy * dy);
}

function similarity(d: number) {
  // Map distance in 0–100 space to a rough cosine-like score
  return Math.max(0, Math.min(1, 1 - d / 95));
}

export function VectorSearchViz() {
  const [queryId, setQueryId] = useState(vectorQueries[0].id);
  const [threshold, setThreshold] = useState(0.55);
  const reduce = useReducedMotion();

  const query = vectorQueries.find((q) => q.id === queryId) ?? vectorQueries[0];

  const ranked = useMemo(() => {
    return vectorChunks
      .map((chunk) => {
        const d = dist(query.x, query.y, chunk.x, chunk.y);
        const score = similarity(d);
        return { chunk, score };
      })
      .sort((a, b) => b.score - a.score);
  }, [query]);

  const top = ranked[0];
  const pass = top.score >= threshold;
  const neighbors = ranked.filter((r) => r.score >= threshold).slice(0, 4);

  function pick(q: VectorQuery) {
    setQueryId(q.id);
  }

  return (
    <div className="studio-panel">
      <header className="studio-panel-head">
        <p className="studio-kicker">02 · Interactive RAG</p>
        <h3>Live Vector Search Visualizer</h3>
        <p>
          Pick a study query. Watch nearest textbook chunks light up in embedding
          space—then cite or refuse based on your similarity threshold. Mocked BAC
          AI–style corpus.
        </p>
      </header>

      <div className="vector-query-chips">
        {vectorQueries.map((q) => (
          <button
            key={q.id}
            type="button"
            className={`studio-chip${queryId === q.id ? " is-active" : ""}`}
            onClick={() => pick(q)}
          >
            {q.label}
          </button>
        ))}
      </div>

      <p className="vector-query-text">{query.text}</p>

      <div className="vector-layout">
        <div className="vector-canvas" aria-hidden>
          {vectorChunks.map((chunk) => {
            const hit = ranked.find((r) => r.chunk.id === chunk.id);
            const score = hit?.score ?? 0;
            const hot = score >= threshold;
            return (
              <motion.span
                key={chunk.id}
                className={`vector-point${hot ? " is-hot" : ""}`}
                style={{ left: `${chunk.x}%`, top: `${chunk.y}%` }}
                title={`${chunk.label} · ${score.toFixed(2)}`}
                animate={
                  reduce
                    ? undefined
                    : { scale: hot ? 1.35 : 1, opacity: hot ? 1 : 0.35 }
                }
                transition={{ duration: 0.35 }}
              />
            );
          })}
          <motion.span
            className="vector-query-dot"
            style={{ left: `${query.x}%`, top: `${query.y}%` }}
            layout
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
          />
        </div>

        <div className="vector-side">
          <label className="vector-threshold">
            <span>
              Similarity threshold{" "}
              <strong>{threshold.toFixed(2)}</strong>
            </span>
            <input
              type="range"
              min={0.3}
              max={0.9}
              step={0.01}
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
            />
          </label>

          <ol className="vector-hits">
            {ranked.slice(0, 5).map(({ chunk, score }) => (
              <li
                key={chunk.id}
                className={score >= threshold ? "is-pass" : "is-fail"}
              >
                <div>
                  <strong>{chunk.label}</strong>
                  <span>
                    {chunk.book} · p.{chunk.page}
                  </span>
                </div>
                <em>{score.toFixed(2)}</em>
              </li>
            ))}
          </ol>

          <div className={`vector-verdict${pass ? " is-ok" : " is-refuse"}`}>
            {pass && top ? (
              <>
                <p className="vector-verdict-label">Grounded answer</p>
                <p>
                  Cite: {top.chunk.book}, page {top.chunk.page}
                  {neighbors.length > 1
                    ? ` (+${neighbors.length - 1} supporting chunks)`
                    : ""}
                </p>
                <p>{query.answer || top.chunk.preview}</p>
              </>
            ) : (
              <>
                <p className="vector-verdict-label">Refuse</p>
                <p>{query.refuseHint}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

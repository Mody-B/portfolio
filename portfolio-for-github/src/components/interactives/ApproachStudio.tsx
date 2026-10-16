"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { approachPrompts, type ApproachPrompt } from "@/content/interactives";

function findApproach(text: string): ApproachPrompt | null {
  const q = text.toLowerCase();
  const scored = approachPrompts
    .map((p) => {
      const hay = `${p.label} ${p.problem}`.toLowerCase();
      const hits = hay.split(/\W+/).filter((w) => w.length > 3 && q.includes(w));
      return { p, score: hits.length };
    })
    .sort((a, b) => b.score - a.score);
  if (scored[0]?.score) return scored[0].p;
  // loose keyword map
  if (/hallucin|invent|made up|fabricat/.test(q))
    return approachPrompts.find((p) => p.id === "hallucination") ?? null;
  if (/agent|flaky|tool|trajectory/.test(q))
    return approachPrompts.find((p) => p.id === "agent-flake") ?? null;
  if (/cost|budget|latency|slo|routing/.test(q))
    return approachPrompts.find((p) => p.id === "cost-slo") ?? null;
  if (/stale|wiki|corpus|outdated|fresh/.test(q))
    return approachPrompts.find((p) => p.id === "rag-stale") ?? null;
  return null;
}

export function ApproachStudio() {
  const [draft, setDraft] = useState("");
  const [active, setActive] = useState<ApproachPrompt | null>(null);
  const [revealed, setRevealed] = useState(false);

  const customNote = useMemo(() => {
    if (!draft.trim() || active) return null;
    return "No exact template for that wording yet—pick a starter, or edit the curated set in interactives.ts.";
  }, [draft, active]);

  function generate(from?: ApproachPrompt) {
    const prompt = from ?? findApproach(draft);
    setActive(prompt);
    setRevealed(true);
    if (prompt && !from) setDraft(prompt.problem);
  }

  return (
    <div className="interactive-panel approach-panel">
      <header className="interactive-head">
        <p className="interactive-kicker">03 · Craft</p>
        <h3>How I’d approach it</h3>
        <p>
          Pick a common AI-engineering snag—or describe one—and get a structured
          first cut: steps, risks, and a metric I’d watch first.
        </p>
      </header>

      <div className="approach-starters">
        {approachPrompts.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`starter-chip${active?.id === p.id ? " is-active" : ""}`}
            onClick={() => {
              setDraft(p.problem);
              generate(p);
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      <Textarea
        value={draft}
        onChange={(e) => {
          setDraft(e.target.value);
          setRevealed(false);
        }}
        rows={3}
        placeholder="e.g. Users don’t trust citations; the index feels stale…"
        aria-label="Problem to approach"
      />

      <div className="eval-actions">
        <Button
          type="button"
          onClick={() => generate()}
          disabled={!draft.trim()}
        >
          Sketch approach
        </Button>
      </div>

      {revealed && active ? (
        <article className="approach-result" aria-live="polite">
          <p className="approach-problem">{active.problem}</p>
          <h4>Steps</h4>
          <ol>
            {active.steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
          <h4>Risks</h4>
          <ul>
            {active.risks.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <p className="approach-metric">
            <strong>First metric:</strong> {active.firstMetric}
          </p>
        </article>
      ) : null}

      {revealed && !active && customNote ? (
        <p className="approach-empty">{customNote}</p>
      ) : null}
    </div>
  );
}

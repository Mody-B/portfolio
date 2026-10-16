"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { evalLoopScript } from "@/content/interactives";

export function EvalLoopDemo() {
  const [visible, setVisible] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    if (visible >= evalLoopScript.length) {
      setPlaying(false);
      return;
    }
    const t = setTimeout(() => setVisible((v) => v + 1), 700);
    return () => clearTimeout(t);
  }, [playing, visible]);

  function play() {
    setVisible(0);
    setPlaying(true);
    // Kick first step after reset
    requestAnimationFrame(() => setVisible(1));
  }

  function reset() {
    setPlaying(false);
    setVisible(0);
  }

  const shown = evalLoopScript.slice(0, visible);

  return (
    <div className="interactive-panel eval-panel">
      <header className="interactive-head">
        <p className="interactive-kicker">02 · Systems</p>
        <h3>Eval loop, played slow</h3>
        <p>
          A scripted faithfulness gate: retrieve → draft → judge → refuse when
          evidence is thin. The kind of path I’d rather see in CI than in a
          postmortem.
        </p>
      </header>

      <div className="eval-actions">
        <Button type="button" onClick={play} disabled={playing}>
          {playing ? "Running…" : "Run loop"}
        </Button>
        <Button type="button" variant="outline" onClick={reset} disabled={playing}>
          Reset
        </Button>
      </div>

      <ol className="eval-timeline" aria-live="polite">
        {shown.map((step) => (
          <li key={step.id} className={`eval-step status-${step.status}`}>
            <div className="eval-step-meta">
              <span className="eval-phase">{step.phase}</span>
              <span className={`eval-status status-${step.status}`}>
                · {step.status}
              </span>
            </div>
            <h4>{step.title}</h4>
            <p>{step.detail}</p>
          </li>
        ))}
        {!shown.length ? (
          <li className="eval-empty">Press Run loop to watch the gate fire.</li>
        ) : null}
      </ol>
    </div>
  );
}

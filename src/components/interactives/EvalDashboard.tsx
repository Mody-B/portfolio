"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { evalDashboardBase, evalLoopScript } from "@/content/interactives";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function EvalDashboard() {
  const [requireCitations, setRequireCitations] = useState(true);
  const [threshold, setThreshold] = useState(0.55);
  const [hardMix, setHardMix] = useState(0.35);
  const [suiteStep, setSuiteStep] = useState(0);
  const [running, setRunning] = useState(false);
  const reduce = useReducedMotion();

  const metrics = useMemo(() => {
    const base = evalDashboardBase;
    // Higher threshold + hard queries stress retrieval; citations boost coverage score
    const faithfulness = clamp(
      base.faithfulness -
        hardMix * 0.18 +
        (threshold - 0.55) * 0.35 +
        (requireCitations ? 0.04 : -0.08),
      0.45,
      0.98
    );
    const citationCoverage = clamp(
      base.citationCoverage -
        hardMix * 0.12 +
        (requireCitations ? 0.08 : -0.22) +
        (threshold - 0.55) * 0.2,
      0.3,
      0.98
    );
    const latencyMs = Math.round(
      base.latencyMs + hardMix * 380 + (requireCitations ? 80 : 0)
    );
    const costPerAnswer = clamp(
      base.costPerAnswer + hardMix * 0.006 + (requireCitations ? 0.002 : 0),
      0.005,
      0.04
    );
    return { faithfulness, citationCoverage, latencyMs, costPerAnswer };
  }, [hardMix, requireCitations, threshold]);

  const pass =
    metrics.faithfulness >= evalDashboardBase.gateFaithfulness &&
    metrics.citationCoverage >= evalDashboardBase.gateCitation &&
    metrics.latencyMs <= evalDashboardBase.gateLatencyMs;

  function runSuite() {
    if (running) return;
    setRunning(true);
    setSuiteStep(0);
    let step = 0;
    const id = window.setInterval(() => {
      step += 1;
      setSuiteStep(step);
      if (step >= evalLoopScript.length) {
        window.clearInterval(id);
        setRunning(false);
      }
    }, reduce ? 200 : 650);
  }

  const meters = [
    {
      key: "faithfulness",
      label: "Faithfulness",
      value: metrics.faithfulness,
      display: `${Math.round(metrics.faithfulness * 100)}%`,
      gate: `≥ ${Math.round(evalDashboardBase.gateFaithfulness * 100)}%`,
    },
    {
      key: "citation",
      label: "Citation coverage",
      value: metrics.citationCoverage,
      display: `${Math.round(metrics.citationCoverage * 100)}%`,
      gate: `≥ ${Math.round(evalDashboardBase.gateCitation * 100)}%`,
    },
    {
      key: "latency",
      label: "p95 latency",
      value: 1 - clamp(metrics.latencyMs / 1600, 0, 1),
      display: `${metrics.latencyMs} ms`,
      gate: `≤ ${evalDashboardBase.gateLatencyMs} ms`,
    },
    {
      key: "cost",
      label: "Cost / answer",
      value: 1 - clamp(metrics.costPerAnswer / 0.035, 0, 1),
      display: `$${metrics.costPerAnswer.toFixed(3)}`,
      gate: "watch trend",
    },
  ];

  return (
    <div className="studio-panel">
      <header className="studio-panel-head">
        <p className="studio-kicker">03 · Evaluation</p>
        <h3>Interactive Model Evaluation Dashboard</h3>
        <p>
          Tune retrieval and policy knobs. Watch faithfulness, citations,
          latency, and cost move—then see whether the regression gate stays green.
        </p>
      </header>

      <div className="eval-controls">
        <label className="eval-toggle">
          <input
            type="checkbox"
            checked={requireCitations}
            onChange={(e) => setRequireCitations(e.target.checked)}
          />
          <span>Require citations</span>
        </label>
        <label className="eval-slider">
          <span>
            Retrieval threshold <strong>{threshold.toFixed(2)}</strong>
          </span>
          <input
            type="range"
            min={0.35}
            max={0.85}
            step={0.01}
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
          />
        </label>
        <label className="eval-slider">
          <span>
            Hard query mix <strong>{Math.round(hardMix * 100)}%</strong>
          </span>
          <input
            type="range"
            min={0}
            max={0.8}
            step={0.05}
            value={hardMix}
            onChange={(e) => setHardMix(Number(e.target.value))}
          />
        </label>
      </div>

      <div className="eval-meters">
        {meters.map((m) => (
          <div key={m.key} className="eval-meter">
            <div className="eval-meter-top">
              <span>{m.label}</span>
              <strong>{m.display}</strong>
            </div>
            <div className="eval-meter-track">
              <motion.div
                className="eval-meter-fill"
                animate={{ width: `${Math.round(m.value * 100)}%` }}
                transition={{ duration: reduce ? 0 : 0.35 }}
              />
            </div>
            <p className="eval-meter-gate">Gate: {m.gate}</p>
          </div>
        ))}
      </div>

      <div className={`eval-gate${pass ? " is-pass" : " is-fail"}`}>
        <span className="eval-gate-dot" />
        <div>
          <strong>{pass ? "Regression gate: PASS" : "Regression gate: FAIL"}</strong>
          <p>
            {pass
              ? "Quality floor holds under the current mix—safe to ship this config."
              : "Something slipped. Raise recall, tighten refusal, or cut hard-query load before merge."}
          </p>
        </div>
      </div>

      <div className="eval-suite">
        <button
          type="button"
          className="studio-btn studio-btn-dark"
          onClick={runSuite}
          disabled={running}
        >
          {running ? "Running suite…" : "Run eval suite"}
        </button>
        <ol className="eval-suite-steps">
          {evalLoopScript.map((step, i) => (
            <li
              key={step.id}
              className={`eval-suite-step status-${step.status}${
                i < suiteStep ? " is-shown" : ""
              }`}
            >
              <strong>{step.title}</strong>
              <span>{step.detail}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

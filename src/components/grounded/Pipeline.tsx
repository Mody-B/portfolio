"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { pipelineSteps } from "@/content/grounded";

export function Pipeline() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % pipelineSteps.length);
    }, 1100);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <ol className="g-pipeline" aria-label="BAC AI retrieval pipeline">
      {pipelineSteps.map((step, i) => (
        <li
          key={step.id}
          className={`g-pipeline-step${i === active ? " is-active" : ""}${
            i < active ? " is-done" : ""
          }`}
        >
          <span className="g-pipeline-idx">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span>{step.label}</span>
        </li>
      ))}
    </ol>
  );
}

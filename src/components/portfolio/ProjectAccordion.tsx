"use client";

import { useState } from "react";
import type { Project } from "@/content/portfolio";

type Props = {
  projects: Project[];
};

export function ProjectAccordion({ projects }: Props) {
  const [openId, setOpenId] = useState<string | null>(projects[0]?.id ?? null);

  return (
    <div className="flow-projects">
      {projects.map((project, index) => {
        const open = openId === project.id;
        const stackLine = project.stack.join(" · ");
        return (
          <div
            key={project.id}
            className={`flow-project${open ? " is-open" : ""}`}
          >
            <button
              type="button"
              className="flow-project-trigger"
              aria-expanded={open}
              onClick={() => setOpenId(open ? null : project.id)}
            >
              <span className="flow-project-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flow-project-titles">
                <strong>{project.title}</strong>
                <em>{stackLine}</em>
              </span>
              <span className="flow-project-chevron" aria-hidden>
                {open ? "−" : "+"}
              </span>
            </button>
            {open ? (
              <div className="flow-project-body">
                <p>{project.summary}</p>
                <ul>
                  {(project.bullets ?? [
                    project.problem,
                    project.approach,
                    project.outcome,
                  ]).map((b) => (
                    <li key={b.slice(0, 40)}>{b}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

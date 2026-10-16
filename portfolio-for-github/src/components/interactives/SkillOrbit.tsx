"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { skills } from "@/content/portfolio";

const flat = skills.groups.flatMap((g) =>
  g.items.map((item) => ({ item, group: g.title }))
);

/** Interactive skill words — hover reveals group; gentle float. */
export function SkillOrbit() {
  const [focus, setFocus] = useState<string | null>(null);
  const reduce = useReducedMotion();

  return (
    <div className="skill-orbit">
      <p className="skill-orbit-meta" aria-live="polite">
        {focus ?? "Hover a thread"}
      </p>
      <ul className="skill-orbit-list">
        {flat.map((s, i) => (
          <motion.li
            key={s.item}
            className={`skill-orbit-item${focus === s.group ? " is-hot" : ""}`}
            onHoverStart={() => setFocus(s.group)}
            onHoverEnd={() => setFocus(null)}
            onFocus={() => setFocus(s.group)}
            onBlur={() => setFocus(null)}
            tabIndex={0}
            animate={
              reduce
                ? undefined
                : {
                    y: [0, i % 2 === 0 ? -6 : 6, 0],
                  }
            }
            transition={{
              duration: 5 + (i % 4),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.12,
            }}
            whileHover={reduce ? undefined : { scale: 1.06 }}
          >
            {s.item}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

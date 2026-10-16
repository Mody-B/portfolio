"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { DocHeader } from "./DocHeader";

type Props = {
  id: string;
  doc: string;
  children: ReactNode;
  wide?: boolean;
};

export function Section({ id, doc, children, wide }: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={`g-section${wide ? " g-section-wide" : ""}`}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="g-scan" aria-hidden />
      <DocHeader label={doc} />
      {children}
    </motion.section>
  );
}

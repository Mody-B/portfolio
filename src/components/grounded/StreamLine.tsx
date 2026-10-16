"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  text: string;
  className?: string;
};

export function StreamLine({ text, className }: Props) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? text : "");

  useEffect(() => {
    if (reduce) {
      setShown(text);
      return;
    }
    setShown("");
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, 22);
    return () => window.clearInterval(id);
  }, [text, reduce]);

  return (
    <p className={className} aria-label={text}>
      {shown}
      {shown.length < text.length ? (
        <span className="g-caret" aria-hidden />
      ) : null}
    </p>
  );
}

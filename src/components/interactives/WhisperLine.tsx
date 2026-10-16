"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import {
  approachPrompts,
  chatFallback,
  chatReplies,
} from "@/content/interactives";
import { matchChatReply } from "@/lib/mock-stream";

const prompts = [
  "grounded RAG",
  "agent reliability",
  "eval gates",
  "cost-aware routing",
];

function resolve(topic: string): string {
  const fromChat = matchChatReply(topic, chatReplies, "");
  if (fromChat && fromChat !== chatFallback) return fromChat;
  const approach = approachPrompts.find((p) =>
    `${p.label} ${p.problem}`.toLowerCase().includes(topic.toLowerCase().slice(0, 12))
  );
  if (approach) {
    return `${approach.steps[0]} Then: ${approach.steps[1]} First metric I’d watch — ${approach.firstMetric}`;
  }
  return chatFallback;
}

/** Single elegant line — ambient AI presence, not a chat panel. */
export function WhisperLine() {
  const [value, setValue] = useState("");
  const [reply, setReply] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const reduce = useReducedMotion();

  function submit(topic: string) {
    const t = topic.trim();
    if (!t) return;
    setValue(t);
    setActive(true);
    setReply(resolve(t));
  }

  return (
    <div className={`whisper${active ? " is-active" : ""}`}>
      <p className="whisper-label">A quiet line — type what you’re building</p>
      <form
        className="whisper-form"
        onSubmit={(e) => {
          e.preventDefault();
          submit(value);
        }}
      >
        <input
          className="whisper-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setActive(true)}
          placeholder="grounded assistants, flaky agents, eval gates…"
          aria-label="What are you building"
        />
        <button type="submit" className="whisper-go" aria-label="Respond">
          →
        </button>
      </form>
      <div className="whisper-chips">
        {prompts.map((p) => (
          <button
            key={p}
            type="button"
            className="whisper-chip"
            onClick={() => submit(p)}
          >
            {p}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {reply ? (
          <motion.p
            key={reply.slice(0, 40)}
            className="whisper-reply"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {reply}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

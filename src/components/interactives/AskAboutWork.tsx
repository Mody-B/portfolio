"use client";

import { useEffect, useRef, useState } from "react";
import {
  chatFallback,
  chatReplies,
  chatStarters,
} from "@/content/interactives";
import { matchChatReply, streamText } from "@/lib/mock-stream";

type Msg = { role: "user" | "assistant"; text: string };

export function AskAboutWork() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Ask about BAC AI, RAG, evals, or internships. Local mock with curated replies—not a live model.",
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages]);

  async function send(raw: string) {
    const question = raw.trim();
    if (!question || busy) return;

    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    setBusy(true);
    setInput("");
    setMessages((m) => [...m, { role: "user", text: question }]);

    const answer = matchChatReply(question, chatReplies, chatFallback);
    setMessages((m) => [...m, { role: "assistant", text: "" }]);

    await streamText(
      answer,
      (full) => {
        setMessages((m) => {
          const next = [...m];
          next[next.length - 1] = { role: "assistant", text: full };
          return next;
        });
      },
      { signal: ac.signal, msPerChar: 9 }
    );

    setBusy(false);
  }

  return (
    <div className="studio-panel">
      <header className="studio-panel-head">
        <p className="studio-kicker">01 · Conversation</p>
        <h3>Ask about the work</h3>
        <p>
          Streaming chat with curated AI-engineering answers. No API key—edit
          replies in <code>src/content/interactives.ts</code>.
        </p>
      </header>

      <div className="chat-log" role="log" aria-live="polite">
        {messages.map((msg, i) => (
          <div
            key={`${msg.role}-${i}`}
            className={`chat-bubble chat-${msg.role}`}
          >
            <span className="chat-role">
              {msg.role === "user" ? "You" : "Mohamad"}
            </span>
            <p>{msg.text || (busy ? "…" : "")}</p>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="chat-starters">
        {chatStarters.map((starter) => (
          <button
            key={starter}
            type="button"
            className="studio-chip"
            disabled={busy}
            onClick={() => void send(starter)}
          >
            {starter}
          </button>
        ))}
      </div>

      <form
        className="chat-form"
        onSubmit={(e) => {
          e.preventDefault();
          void send(input);
        }}
      >
        <input
          className="studio-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about RAG, BAC AI, evals…"
          disabled={busy}
          aria-label="Your question"
        />
        <button
          type="submit"
          className="studio-btn studio-btn-dark"
          disabled={busy || !input.trim()}
        >
          {busy ? "…" : "Ask"}
        </button>
      </form>
    </div>
  );
}

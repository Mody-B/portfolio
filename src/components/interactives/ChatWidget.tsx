"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  chatFallback,
  chatReplies,
  chatStarters,
} from "@/content/interactives";
import { matchChatReply, streamText } from "@/lib/mock-stream";

type Msg = { role: "user" | "assistant"; text: string };

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Hi — ask about BAC AI, RAG, skills, or internships. Local mock replies, not a live model.",
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, open]);

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
    <div className={`chat-widget${open ? " is-open" : ""}`}>
      {open ? (
        <div
          className="chat-widget-panel"
          id={panelId}
          role="dialog"
          aria-label="Ask Mohamad"
        >
          <header className="chat-widget-head">
            <div>
              <p className="chat-widget-kicker">Ask Mohamad</p>
              <p className="chat-widget-sub">AI engineering · local mock</p>
            </div>
            <button
              type="button"
              className="chat-widget-close"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </header>

          <div className="chat-widget-log" role="log" aria-live="polite">
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

          <div className="chat-widget-starters">
            {chatStarters.slice(0, 3).map((starter) => (
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
            className="chat-widget-form"
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
          >
            <input
              className="studio-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something…"
              disabled={busy}
              aria-label="Your question"
            />
            <button
              type="submit"
              className="studio-btn studio-btn-dark"
              disabled={busy || !input.trim()}
            >
              {busy ? "…" : "Send"}
            </button>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        className={`chat-widget-fab${open ? " is-open" : ""}`}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close chat" : "Open chat with Mohamad"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <span className="chat-bot-x" aria-hidden>
            ×
          </span>
        ) : (
          <span className="chat-bot" aria-hidden>
            <span className="chat-bot-antenna" />
            <span className="chat-bot-face">
              <span className="chat-bot-eye" />
              <span className="chat-bot-eye" />
            </span>
            <span className="chat-bot-mouth" />
          </span>
        )}
      </button>
    </div>
  );
}

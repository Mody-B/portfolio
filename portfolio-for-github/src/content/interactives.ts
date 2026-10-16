/**
 * Browser-local interactive demos — curated/mock, no API keys required.
 * Edit responses here to match Mohamad’s real voice later.
 */

export const studioIntro = {
  headline: "Studio",
  body: "Three small, local demos—how I talk about the work, how an eval loop moves, and how I’d frame a common AI-engineering problem. Mocked on purpose; swap for a live model later if you want.",
} as const;

export type ChatPair = {
  triggers: string[];
  answer: string;
};

export const chatStarters = [
  "What kind of AI work do you do?",
  "How do you think about RAG?",
  "What’s your take on agents?",
  "How do you evaluate quality?",
] as const;

export const chatReplies: ChatPair[] = [
  {
    triggers: ["what kind", "what do you", "who are you", "background", "intro"],
    answer:
      "I focus on production LLM systems: grounding, evals, and operability—not demos that fall apart on the second user. If it ships, it should have a failure mode, a metric, and a way to tell when it got worse.",
  },
  {
    triggers: ["rag", "retrieval", "ground", "citation", "knowledge"],
    answer:
      "For RAG I start with the corpus contract—what’s allowed to be true—then retrieval that can refuse. Citations aren’t decoration; if the model can’t point at evidence, it should say so. Nightly faithfulness checks beat one-off vibe tests.",
  },
  {
    triggers: ["agent", "tool", "multi-step", "orchestr"],
    answer:
      "Agents are useful when the tool surface is honest and recovery is designed. I care more about trajectory evals and fault injection than about a clever planner prompt. If a tool lies or times out, the system should degrade loudly, not invent success.",
  },
  {
    triggers: ["eval", "evaluat", "quality", "regress", "metric", "judge"],
    answer:
      "Evals are part of the product. Golden cases for the paths that matter, LLM-as-judge only where humans defined the rubric, and CI that can block a release when quality slips. Latency and cost sit next to accuracy—otherwise you optimize the wrong axis.",
  },
  {
    triggers: ["cost", "latency", "routing", "model", "budget"],
    answer:
      "I’d route by difficulty under an SLO: cheap models for easy asks, escalate when confidence is thin, and keep kill switches per route. Telemetry on tokens and latency isn’t optional—it’s how you know the ladder still earns its keep.",
  },
  {
    triggers: ["hire", "work with", "contact", "available", "collaborate"],
    answer:
      "If you’re building LLM features and want someone who argues for evals and grounding before polish, reach out via the contact section. Email and profiles are still TBD placeholders on this scaffold.",
  },
];

export const chatFallback =
  "I don’t have a canned answer for that yet—this chat is a local mock with curated replies. Try a starter about RAG, agents, or evals, or ask how I’d approach a production LLM problem.";

export type ApproachPrompt = {
  id: string;
  label: string;
  problem: string;
  steps: string[];
  risks: string[];
  firstMetric: string;
};

export const approachPrompts: ApproachPrompt[] = [
  {
    id: "hallucination",
    label: "Reduce hallucinations",
    problem: "The assistant sounds confident but invents facts from thin air.",
    steps: [
      "Define what “allowed truth” is (corpus, tools, or both).",
      "Require evidence or an explicit refusal before answering.",
      "Add a faithfulness / citation eval set from real user asks.",
      "Ship with a visible “not enough context” path—not a softer lie.",
    ],
    risks: [
      "Over-refusal if retrieval recall is weak",
      "Users punishing honesty if UX hides uncertainty",
    ],
    firstMetric: "Faithfulness on a fixed weekly set (and refusal precision).",
  },
  {
    id: "agent-flake",
    label: "Stabilize a flaky agent",
    problem: "Multi-step agents pass demos but fail when tools error or order shifts.",
    steps: [
      "Record golden trajectories for the top user jobs.",
      "Inject tool failures and empty results in CI.",
      "Score tool choice + recovery, not only final text.",
      "Gate merges when the harness regresses.",
    ],
    risks: [
      "Overfitting to golden paths",
      "Slow CI if the suite isn’t triaged by severity",
    ],
    firstMetric: "Pass rate on fault-injected trajectories for P0 jobs.",
  },
  {
    id: "cost-slo",
    label: "Cut cost without missing SLOs",
    problem: "A single premium model is burning budget; cheaper models feel unreliable.",
    steps: [
      "Classify easy vs hard requests with a confidence threshold.",
      "Build a fallback ladder with explicit escalation rules.",
      "Instrument tokens, latency, and quality per route.",
      "Add kill switches and budget alarms before optimizing prompts.",
    ],
    risks: [
      "Misrouting hard queries to weak models",
      "Chasing cost while user-visible quality slips",
    ],
    firstMetric: "Cost per successful task under p95 latency and quality floor.",
  },
  {
    id: "rag-stale",
    label: "Refresh a stale knowledge base",
    problem: "Answers cite outdated wiki pages; nobody trusts the corpus.",
    steps: [
      "Inventory sources and ownership; drop dead trees.",
      "Add freshness metadata and prefer recent chunks.",
      "Schedule re-index + spot-check diffs after content changes.",
      "Show citation dates so users can challenge stale answers.",
    ],
    risks: [
      "Index lag after edits",
      "Conflicting sources without a precedence rule",
    ],
    firstMetric: "Share of answers citing docs newer than a freshness SLA.",
  },
];

export type EvalStep = {
  id: string;
  phase: "plan" | "tool" | "judge" | "result";
  title: string;
  detail: string;
  status: "ok" | "warn" | "fail" | "retry";
};

/** Scripted eval-loop timeline for the interactive demo. */
export const evalLoopScript: EvalStep[] = [
  {
    id: "plan",
    phase: "plan",
    title: "Plan",
    detail: "Job: answer only from approved docs; refuse if retrieval is thin.",
    status: "ok",
  },
  {
    id: "retrieve",
    phase: "tool",
    title: "Tool · retrieve",
    detail: "Hybrid search → 4 chunks. Top hit score 0.41 (below threshold 0.55).",
    status: "warn",
  },
  {
    id: "draft",
    phase: "tool",
    title: "Tool · draft",
    detail: "Model drafts an answer without strong citations.",
    status: "fail",
  },
  {
    id: "judge",
    phase: "judge",
    title: "Judge · faithfulness",
    detail: "Rubric fail: claim not supported by retrieved evidence.",
    status: "fail",
  },
  {
    id: "retry",
    phase: "tool",
    title: "Retry · refuse",
    detail: "Policy: return a clear refusal + ask for a better source link.",
    status: "retry",
  },
  {
    id: "pass",
    phase: "result",
    title: "Result",
    detail: "Suite marks case as expected refusal — regression gate stays green.",
    status: "ok",
  },
];

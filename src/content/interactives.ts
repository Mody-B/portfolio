/**
 * Browser-local interactive demos — curated/mock, no API keys required.
 */

export const studioIntro = {
  headline: "Studio",
  body: "Three local demos—how I talk about the work, how retrieval finds evidence, and how I’d watch quality before shipping. Mocked on purpose.",
} as const;

export type ChatPair = {
  triggers: string[];
  answer: string;
};

export const chatStarters = [
  "What kind of AI work do you do?",
  "Tell me about BAC AI",
  "How does BAC AI retrieve answers?",
  "How do you think about RAG?",
  "What’s your stack?",
  "How do you evaluate quality?",
  "Any hackathon wins?",
  "Do you tutor?",
  "Are you open to internships?",
  "Where did you study?",
  "How do you handle Arabic / RTL?",
  "What’s your approach to agents?",
  "Tell me about the heart-disease project",
  "How can I contact you?",
] as const;

export const chatNudgeLines = [
  "Hey — ask me questions!",
  "Curious about BAC AI? Ask away.",
  "Ask me about RAG, stack, or internships.",
  "I’m here — try a question!",
] as const;

export const chatReplies: ChatPair[] = [
  {
    triggers: ["what kind", "what do you", "who are you", "background", "intro"],
    answer:
      "I’m an AI engineer focused on applied ML products—especially RAG, embeddings, and LLM systems that answer from real data with citations. I’m a fourth-year Informatics Engineering student (AI track) at Arab International University, building toward internships and junior roles.",
  },
  {
    triggers: ["bac", "baccalaureate", "textbook", "study assistant", "syria"],
    answer:
      "BAC AI is a live Syrian Baccalaureate study assistant I founded and engineered. Students chat with official Grade 12 textbooks, open the cited page, and revise with quiz questions from retrieved lessons. Stack: FastAPI, Qdrant, BGE-M3, Qwen, React, Docker—Arabic RTL + English, with intent routing and grounding checks. Try it at bacai.dev.",
  },
  {
    triggers: ["how does bac", "retrieve answer", "pipeline", "qdrant", "bge"],
    answer:
      "BAC AI’s path is PDF/OCR → lesson-boundary chunking → BGE-M3 (1024-dim) → Qdrant → intent routing → Qwen → answer with a cited textbook page. Retrieval is the quality lever; generation only speaks from what was retrieved.",
  },
  {
    triggers: ["rag", "retrieval", "ground", "citation", "knowledge", "vector"],
    answer:
      "For RAG I start with the corpus contract—what’s allowed to be true—then retrieval that can refuse. On BAC AI that means lesson-aware chunking, BGE-M3 embeddings, Qdrant search, and citations pinned to official pages. If evidence is thin, the system should say so instead of improvising.",
  },
  {
    triggers: ["stack", "tech", "tools", "fastapi", "react", "docker"],
    answer:
      "Day-to-day: Python, FastAPI, Qdrant, BGE-M3, Qwen, React (bilingual RTL), Docker, GitHub Actions, plus TypeScript/SQL. Heart-disease work used scikit-learn and pandas. Full index is in the Stack section.",
  },
  {
    triggers: ["agent", "tool", "multi-step", "orchestr"],
    answer:
      "Agents are useful when the tool surface is honest and recovery is designed. I care more about measurable trajectories and failure modes than a clever planner prompt. If a tool lies or times out, degrade loudly.",
  },
  {
    triggers: ["eval", "evaluat", "quality", "regress", "metric", "judge"],
    answer:
      "Evals are part of the product. I test with real textbook questions, watch faithfulness and citation coverage, and treat latency and cost as first-class metrics. A regression gate beats one-off vibe checks.",
  },
  {
    triggers: ["multilingual", "arabic", "french", "english", "rtl"],
    answer:
      "BAC AI handles Arabic, English, and French study questions with separate catalogs and query-dependent search—grammar vs poetry, workbook vs student book, writing topics. The web UI is bilingual with Arabic RTL.",
  },
  {
    triggers: ["hack", "sync", "kiro", "award", "3rd", "third"],
    answer:
      "I placed 3rd at the Kiro Hackathon during SYNC'26 (Damascus Opera House, Oct 2026)—built and deployed a live AI voice character with agentic coding. Awarded an AWS Associate Certification exam voucher. Certificate and repo are linked in Activities.",
  },
  {
    triggers: ["tutor", "teach", "math", "hobby", "science"],
    answer:
      "I tutor mathematics, science, and English as a hobby—clear explanations, adapted to the student’s pace. It’s listed under Activities.",
  },
  {
    triggers: ["school", "univers", "educat", "aiu", "stud"],
    answer:
      "I’m a fourth-year Informatics Engineering student specializing in AI at Arab International University, expected 2028. Details are in About + Education.",
  },
  {
    triggers: ["ml project", "heart", "data collection", "real life", "real-world"],
    answer:
      "Besides BAC AI I’ve worked on real-world ML projects involving data collection, model evaluation, and API integration—for example heart-disease classification comparing logistic regression vs random forest with scikit-learn.",
  },
  {
    triggers: ["hire", "work with", "contact", "available", "collaborate", "intern"],
    answer:
      "Yes — I’m seeking AI/ML engineering internships and junior roles. Email mohamad.bitar05@gmail.com, or find me on GitHub (Mody-B) and LinkedIn. There’s a Contact section with a one-click copy for email.",
  },
];

export const chatFallback =
  "I don’t have a canned answer for that yet—this chat is a local mock with curated replies. Try BAC AI, RAG, evals, or internships.";

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

/** Mock embedding-space chunks for the Live Vector Search Visualizer. */
export type VectorChunk = {
  id: string;
  label: string;
  book: string;
  page: number;
  lang: "ar" | "en" | "fr";
  x: number;
  y: number;
  preview: string;
};

export type VectorQuery = {
  id: string;
  label: string;
  text: string;
  /** Ideal query position in the mock space */
  x: number;
  y: number;
  answer: string;
  refuseHint: string;
};

export const vectorChunks: VectorChunk[] = [
  {
    id: "ar-grammar-12",
    label: "Arabic · grammar lesson 12",
    book: "Arabic Literary Stream",
    page: 84,
    lang: "ar",
    x: 22,
    y: 30,
    preview: "Rules for nominal sentences and agreement…",
  },
  {
    id: "ar-poetry-3",
    label: "Arabic · poetry unit 3",
    book: "Arabic Literary Stream",
    page: 112,
    lang: "ar",
    x: 28,
    y: 48,
    preview: "Meter, imagery, and close reading of the selected poem…",
  },
  {
    id: "en-student-5",
    label: "English · student book unit 5",
    book: "English Student Book",
    page: 67,
    lang: "en",
    x: 62,
    y: 28,
    preview: "Reading passage with comprehension checkpoints…",
  },
  {
    id: "en-workbook-5",
    label: "English · workbook unit 5",
    book: "English Workbook",
    page: 41,
    lang: "en",
    x: 70,
    y: 42,
    preview: "Practice drills tied to unit 5 vocabulary…",
  },
  {
    id: "fr-writing-2",
    label: "French · writing topics",
    book: "French Guide",
    page: 55,
    lang: "fr",
    x: 48,
    y: 68,
    preview: "Structured prompts for opinion essays…",
  },
  {
    id: "sci-physics-8",
    label: "Physics · lesson 8",
    book: "Scientific Stream · Physics",
    page: 93,
    lang: "en",
    x: 78,
    y: 62,
    preview: "Worked examples for circuits and Ohm’s law…",
  },
  {
    id: "teacher-sol-en",
    label: "Teacher guide · English",
    book: "English Teacher Guide",
    page: 19,
    lang: "en",
    x: 58,
    y: 55,
    preview: "Official worked solutions for selected exercises…",
  },
  {
    id: "noise-history",
    label: "History · off-topic",
    book: "History (unrelated)",
    page: 12,
    lang: "en",
    x: 12,
    y: 78,
    preview: "Timeline notes unrelated to language drills…",
  },
];

export const vectorQueries: VectorQuery[] = [
  {
    id: "q-ar-grammar",
    label: "Arabic grammar",
    text: "Explain the nominal sentence rules from the Arabic literary book.",
    x: 24,
    y: 34,
    answer:
      "From Arabic Literary Stream p.84: nominal sentences begin with a noun/pronoun; the predicate agrees in number and gender with the subject…",
    refuseHint: "Top similarity is below your threshold—refuse rather than guess.",
  },
  {
    id: "q-en-workbook",
    label: "English workbook",
    text: "Help me practice unit 5 vocabulary from the English workbook.",
    x: 68,
    y: 40,
    answer:
      "From English Workbook p.41: unit 5 drills focus on the target vocabulary set—here are the cited exercise patterns…",
    refuseHint: "Retrieval is weak for this query under the current threshold.",
  },
  {
    id: "q-fr-writing",
    label: "French writing",
    text: "Give me a French writing topic structure from the official guide.",
    x: 50,
    y: 66,
    answer:
      "From French Guide p.55: open with a clear thesis, develop two argued paragraphs, close with a measured conclusion…",
    refuseHint: "No chunk clears the similarity floor—ask the student to name a lesson.",
  },
  {
    id: "q-offtopic",
    label: "Off-topic ask",
    text: "Who won the World Cup in 2018?",
    x: 90,
    y: 12,
    answer: "",
    refuseHint:
      "Nothing in the textbook index supports this. Correct behavior: refuse and steer back to the curriculum.",
  },
];

/** Base metrics for the Interactive Model Evaluation Dashboard. */
export const evalDashboardBase = {
  faithfulness: 0.86,
  citationCoverage: 0.81,
  latencyMs: 920,
  costPerAnswer: 0.012,
  gateFaithfulness: 0.8,
  gateCitation: 0.75,
  gateLatencyMs: 1200,
} as const;

/**
 * Editable portfolio copy.
 * Domain: mohamadbit.me (confirmed). Do NOT use mohamadbitar.me (different person).
 * GitHub / LinkedIn / email still TBD until Mohamad confirms.
 */

export const site = {
  name: "Mohamad Bitar",
  /**
   * Likely GitHub login (API: Mody-B). Confirm before relying on Pages www CNAME.
   * Social href still TBD until you confirm.
   */
  githubUsername: "Mody-B",
  /** Confirmed Student Pack custom domain — keep in sync with `public/CNAME`. */
  domain: "mohamadbit.me",
  /** TBD — confirm real inbox before shipping. */
  email: "TBD@example.com",
  role: "AI Engineer",
  tagline: "Building production LLM systems that teams can trust.",
  location: "Open to remote collaboration",
  socials: [
    {
      label: "GitHub (TBD)",
      href: "#contact",
    },
    {
      label: "LinkedIn (TBD)",
      href: "#contact",
    },
  ],
} as const;

export const about = {
  headline: "Systems-minded AI engineering",
  body: [
    "I design and ship AI features that hold up outside the demo: retrieval that stays grounded, agents with measurable reliability, and inference paths that respect latency and cost.",
    "My work sits at the intersection of model capability and product constraints—clear interfaces, evaluation loops, and honest tradeoffs over flashy prototypes.",
  ],
} as const;

export const skills = {
  headline: "Where I focus",
  groups: [
    {
      title: "AI systems",
      items: [
        "LLM application design",
        "RAG & grounding",
        "Agent workflows",
        "Eval harnesses & regression suites",
        "Prompt & tool contracts",
      ],
    },
    {
      title: "Engineering",
      items: [
        "TypeScript / Node",
        "Python services",
        "Streaming APIs",
        "Observability for model calls",
        "CI for model-facing changes",
      ],
    },
    {
      title: "Product craft",
      items: [
        "Failure-mode design",
        "Latency & cost budgets",
        "Human-in-the-loop flows",
        "Clear technical writing",
      ],
    },
  ],
} as const;

export type Project = {
  id: string;
  title: string;
  summary: string;
  problem: string;
  approach: string;
  outcome: string;
  stack: string[];
  /** Set to false or remove when a project is ready to feature. */
  placeholder: boolean;
};

export const projects: Project[] = [
  {
    id: "knowledge-rag",
    title: "Grounded knowledge assistant",
    summary:
      "Internal RAG assistant that answers from approved docs with citations and refusal when evidence is thin.",
    problem:
      "Teams spent hours hunting stale wiki pages; chatbots hallucinated when coverage was incomplete.",
    approach:
      "Chunked corpus with metadata filters, hybrid retrieval, citation-required generation, and a nightly eval set for faithfulness.",
    outcome:
      "Placeholder metric: faster answers on support questions with measurable citation coverage. Replace with your results.",
    stack: ["Python", "embeddings", "vector store", "eval suite"],
    placeholder: true,
  },
  {
    id: "agent-evals",
    title: "Agent reliability harness",
    summary:
      "Scenario-based evaluation loop for multi-step agents—tool choice, recovery, and regression gates in CI.",
    problem:
      "Agent demos looked strong until edge cases and tool failures appeared in production.",
    approach:
      "Golden trajectories, fault injection on tools, scored rubrics, and blocking CI checks on quality regressions.",
    outcome:
      "Placeholder: fewer silent failures shipping to staging. Swap in your harness and numbers.",
    stack: ["TypeScript", "trace logging", "CI", "LLM judges"],
    placeholder: true,
  },
  {
    id: "inference-routing",
    title: "Cost-aware inference routing",
    summary:
      "Streaming inference gateway that routes easy vs hard requests across model tiers under latency SLOs.",
    problem:
      "A single premium model blew the budget; cheaper models failed on hard queries without a clear policy.",
    approach:
      "Classifier + confidence thresholds, fallback ladder, token/cost telemetry, and kill switches per route.",
    outcome:
      "Placeholder: lower average cost with SLO-preserving quality. Replace with measured before/after.",
    stack: ["Node", "streaming", "observability", "model APIs"],
    placeholder: true,
  },
];

export const contact = {
  headline: "Let’s talk about AI systems that ship",
  body: "If you’re building LLM features and need someone who cares about evals, grounding, and operability—reach out.",
  cta: "Email Mohamad",
} as const;

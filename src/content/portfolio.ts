/**
 * Editable portfolio copy.
 * Domain: mohamadbit.me — do NOT use mohamadbitar.me (different person).
 */

export const site = {
  name: "Mohamad Bitar",
  firstName: "Mohamad",
  lastName: "Bitar",
  githubUsername: "Mody-B",
  domain: "mohamadbit.me",
  email: "mohamad.bitar05@gmail.com",
  role: "AI Engineer",
  tagline:
    "Building applied ML products—RAG, embeddings, and LLM systems that answer from real data with citations.",
  availability: "Available for internships",
  location: "Open to remote · Syria-based",
  education: {
    school: "Arab International University",
    program: "Informatics Engineering — Artificial Intelligence",
    status: "Fourth-year student · Expected 2028",
  },
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/Mody-B",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/mohamad-bitar-721b90324",
    },
    {
      label: "Email",
      href: "mailto:mohamad.bitar05@gmail.com",
    },
  ],
} as const;

export const about = {
  headline: "From laptop experiments to live study AI",
  body: [
    "I build applied ML products: retrieval-augmented generation, text embeddings, vector search, and LLM systems that answer from real data with source citations.",
    "I took BAC AI from local experiments to a live website answering multilingual (Arabic, English, French) study questions from official textbooks—and I’m seeking AI/ML engineering internships and junior roles.",
  ],
} as const;

export const skills = {
  headline: "Where I focus",
  groups: [
    {
      title: "AI Engineering",
      items: [
        "RAG & grounding",
        "Embeddings & vector search",
        "Prompt design",
        "LLM integration",
        "Streaming generation",
        "Source citation",
        "Multilingual QA",
      ],
    },
    {
      title: "Machine Learning",
      items: [
        "BGE-M3 embeddings",
        "Semantic search",
        "Chunking strategy",
        "OCR pipelines",
        "Intent routing",
        "Model comparison",
        "Evaluation",
      ],
    },
    {
      title: "Stack",
      items: [
        "Python",
        "TypeScript",
        "FastAPI",
        "Qdrant",
        "React",
        "Docker",
        "GitHub Actions",
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
  period?: string;
  role?: string;
  placeholder: boolean;
};

export const projects: Project[] = [
  {
    id: "bac-ai",
    title: "BAC AI — Syrian Baccalaureate Study Assistant",
    period: "July 2026 – Present",
    role: "Founder / AI Engineer",
    summary:
      "Live study assistant where students chat with official Grade 12 textbooks, open the cited page, and revise with auto-generated quiz questions.",
    problem:
      "Students needed trustworthy answers grounded in official curricula—across Arabic, English, and French—not generic chatbot guesses.",
    approach:
      "End-to-end RAG: PDF/OCR extraction, lesson-boundary chunking, BGE-M3 embeddings, Qdrant search, intent routing before generation, citation-pinned answers, FastAPI + bilingual React (RTL), Docker deploy.",
    outcome:
      "Shipped a production web product with JWT/Google auth, subscriptions, admin panel, streaming generation (Qwen via Ollama locally / OpenRouter in production), and pytest API coverage.",
    stack: [
      "Python",
      "FastAPI",
      "Qdrant",
      "BGE-M3",
      "Qwen",
      "React",
      "Docker",
    ],
    placeholder: false,
  },
  {
    id: "heart-disease",
    title: "Heart Disease Prediction",
    role: "Machine Learning Project",
    summary:
      "Binary classification model predicting heart disease from clinical factors.",
    problem:
      "Needed a clear baseline for clinical tabular prediction and model comparison.",
    approach:
      "Trained and compared logistic regression and random forest with scikit-learn and pandas to select the best performer.",
    outcome:
      "Delivered a compared baseline with a documented winner for the classification task.",
    stack: ["Python", "scikit-learn", "pandas"],
    placeholder: false,
  },
];

export const contact = {
  headline: "Let’s build something grounded",
  body: "Seeking AI/ML engineering internships and junior roles. If you’re shipping RAG, evals, or applied LLM products—reach out.",
  cta: "Email Mohamad",
} as const;

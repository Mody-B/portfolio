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
    "AI engineer who builds applied ML products: RAG, embeddings, vector search, and LLM systems that answer from real data with source citations.",
  availability: "Available for internships",
  location: "Syria · Open to remote",
  education: {
    school: "Arab International University",
    program: "Bachelor of Informatics Engineering, Artificial Intelligence specialization",
    detail: "Fourth-year student",
    expected: "2028",
  },
  socials: [
    {
      label: "Email",
      href: "mailto:mohamad.bitar05@gmail.com",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/mohamad-bitar-721b90324",
    },
    {
      label: "GitHub",
      href: "https://github.com/Mody-B",
    },
  ],
} as const;

export const summary = {
  headline: "Summary",
  body: "AI engineer who builds applied ML products: retrieval-augmented generation, text embeddings, vector search, and LLM systems that answer from real data with source citations. Took BAC AI from laptop experiments to a live website answering multilingual (Arabic, English, French) study questions from official textbooks. Fourth-year Informatics Engineering student specializing in AI, seeking AI/ML engineering internships and junior roles.",
} as const;

export type Experience = {
  id: string;
  title: string;
  org: string;
  period: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    id: "bac-ai",
    title: "Founder / AI Engineer",
    org: "BAC AI — Syrian Baccalaureate Study Assistant",
    period: "July 2026 – Present",
    bullets: [
      "Built and launched a live study assistant where students chat with official Grade 12 textbooks, open the cited page, and revise with auto-generated quiz questions.",
      "Designed the RAG pipeline end to end: PDF/OCR extraction, lesson-boundary chunking, BGE-M3 embeddings, and Qdrant vector search.",
      "Tuned retrieval with intent routing and query-dependent search across Arabic, English, and French curricula.",
      "Shipped FastAPI backend (JWT + Google sign-in), bilingual React app (Arabic RTL + English), Docker + GitHub Actions on Oracle Cloud.",
    ],
  },
];

export const skills = {
  headline: "Skills",
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
        "Multilingual QA (AR/EN/FR)",
      ],
    },
    {
      title: "Machine Learning",
      items: [
        "Text embeddings (BGE-M3)",
        "Semantic search",
        "Chunking strategy",
        "OCR (Tesseract, EasyOCR)",
        "Intent routing",
        "Binary classification",
        "Model comparison & evaluation",
      ],
    },
    {
      title: "Models & Tools",
      items: [
        "Qwen",
        "Ollama",
        "OpenRouter",
        "Qdrant",
        "sentence-transformers",
        "scikit-learn",
        "pandas",
      ],
    },
    {
      title: "Languages",
      items: ["Python", "TypeScript", "SQL", "Dart"],
    },
    {
      title: "Backend",
      items: [
        "FastAPI",
        "Pydantic",
        "SQLAlchemy",
        "SQLite",
        "JWT",
        "OAuth (Google)",
        "REST APIs",
      ],
    },
    {
      title: "Frontend & DevOps",
      items: [
        "React",
        "Vite",
        "Bilingual RTL UI",
        "Git",
        "GitHub Actions",
        "Docker",
        "Linux",
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
  bullets?: string[];
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
      "End-to-end RAG: PDF/OCR extraction, lesson-boundary chunking, BGE-M3 embeddings, Qdrant search, intent routing, citation-pinned answers, FastAPI + bilingual React, Docker deploy.",
    outcome:
      "Production web product with auth, subscriptions, admin panel, streaming generation, and pytest API coverage.",
    bullets: [
      "RAG pipeline: OCR, lesson-aware chunking, BGE-M3 1,024-dim embeddings, Qdrant search.",
      "Intent routing and query-dependent retrieval across Arabic/English/French materials.",
      "Grounding with separate catalogs, teacher guides, and citations pinned to official pages.",
      "FastAPI + JWT/Google auth, bilingual React (RTL), Docker + GitHub Actions deploy.",
    ],
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
      "Trained and compared logistic regression and random forest with scikit-learn and pandas.",
    outcome:
      "Delivered a compared baseline with a documented winner for the classification task.",
    bullets: [
      "Built a binary classifier from several clinical factors.",
      "Compared logistic regression and random forest to select the best performer.",
    ],
    stack: ["Python", "scikit-learn", "pandas"],
    placeholder: false,
  },
];

export const contact = {
  headline: "Contact",
  body: "Have an internship, junior role, or collaboration in mind? Reach out anytime.",
  cta: "Email Mohamad",
} as const;

/** @deprecated use summary — kept for preview pages */
export const about = {
  headline: summary.headline,
  body: [summary.body],
} as const;

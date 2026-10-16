/**
 * Grounded portfolio content — every citation must point at something real.
 * Domain: mohamadbit.me
 */

export type Citation = {
  id: string;
  label: string;
  href: string;
  detail: string;
};

export const citations: Record<string, Citation> = {
  bacaiLive: {
    id: "1",
    label: "bacai.dev",
    href: "https://bacai.dev",
    detail: "Live marketing site — Syrian Baccalaureate study assistant",
  },
  bacaiApp: {
    id: "2",
    label: "app.bacai.dev",
    href: "https://app.bacai.dev",
    detail: "Production web app (auth, chat, RTL)",
  },
  linkedinAnnounce: {
    id: "3",
    label: "LinkedIn announcement",
    href: "https://www.linkedin.com/posts/mohamad-bitar-721b90324_edtech-ai-education-activity-7498351852409978881-h4A9",
    detail: "Public launch note — answers from official textbooks with page sources",
  },
  github: {
    id: "4",
    label: "github.com/Mody-B",
    href: "https://github.com/Mody-B",
    detail: "Public GitHub profile",
  },
  linkedin: {
    id: "5",
    label: "LinkedIn profile",
    href: "https://www.linkedin.com/in/mohamad-bitar-721b90324",
    detail: "Professional profile",
  },
  email: {
    id: "6",
    label: "Email",
    href: "mailto:mohamad.bitar05@gmail.com",
    detail: "mohamad.bitar05@gmail.com",
  },
  resume: {
    id: "7",
    label: "Résumé PDF",
    href: "/Mohamad_Bitar_CV.pdf",
    detail: "CV — Mohamad Bitar, AI Engineer",
  },
  hackathonCert: {
    id: "8",
    label: "Hackathon certificate",
    href: "/certs/hackathon-3rd-place.pdf",
    detail: "3rd place — Kiro Hackathon at SYNC'26 (Damascus Opera House)",
  },
  hackathonRepo: {
    id: "9",
    label: "Hackathon project repo",
    href: "https://github.com/Mody-B/kiro-hackathon-bizdude",
    detail: "Public repo from the SYNC'26 / Kiro hackathon build",
  },
};

export const site = {
  name: "Mohamad Bitar",
  role: "AI Engineer",
  domain: "mohamadbit.me",
  email: "mohamad.bitar05@gmail.com",
  metaLine: "Syria · open to remote · AI/ML internships & junior roles",
  streamLine:
    "I build AI that answers from real data — and shows its sources.",
  bacaiLive: "https://bacai.dev",
  bacaiApp: "https://app.bacai.dev",
  github: "https://github.com/Mody-B",
  linkedin: "https://www.linkedin.com/in/mohamad-bitar-721b90324",
  resumeHref: "/Mohamad_Bitar_CV.pdf",
} as const;

export const queryPlaceholders = [
  "what has he shipped?",
  "how does BAC AI retrieve?",
  "stack?",
  "hackathon?",
  "education?",
  "how do I reach him?",
] as const;

/** Client-side keyword → section id */
export const queryRoutes: { keys: string[]; target: string }[] = [
  {
    keys: ["ship", "bac", "product", "flagship", "textbook", "study"],
    target: "flagship",
  },
  {
    keys: ["retriev", "rag", "qdrant", "embed", "pipeline", "chunk", "ocr"],
    target: "flagship",
  },
  {
    keys: ["stack", "skill", "tool", "fastapi", "python", "react"],
    target: "stack",
  },
  {
    keys: ["heart", "classif", "scikit", "other", "work"],
    target: "other-work",
  },
  {
    keys: ["school", "educat", "univers", "about", "aiu"],
    target: "about",
  },
  {
    keys: ["hack", "tutor", "activit", "sync", "kiro"],
    target: "activities",
  },
  {
    keys: ["contact", "email", "hire", "intern", "reach", "talk"],
    target: "contact",
  },
];

export const pipelineSteps = [
  { id: "pdf", label: "PDF / OCR" },
  { id: "chunk", label: "Lesson-boundary chunking" },
  { id: "embed", label: "BGE-M3 · 1024-dim" },
  { id: "qdrant", label: "Qdrant" },
  { id: "intent", label: "Intent routing" },
  { id: "qwen", label: "Qwen" },
  { id: "cite", label: "Answer + cited page" },
] as const;

export const flagship = {
  doc: "doc_01 · flagship · retrieved 0.97",
  title: "BAC AI",
  subtitle: "Syrian Baccalaureate Study Assistant",
  role: "Founder / AI Engineer",
  period: "July 2026 – Present",
  lede: "A live study assistant where students chat with official Grade 12 textbooks, open the cited page, and revise from the same lessons — Arabic, English, and French.",
  facts: [
    {
      text: "Answers are grounded in ministry textbooks with source pages — not the open web.",
      cite: "bacaiLive" as const,
    },
    {
      text: "Production web app with JWT + Google sign-in, bilingual RTL React, FastAPI backend.",
      cite: "bacaiApp" as const,
    },
    {
      text: "End-to-end RAG: OCR, lesson-aware chunking, BGE-M3 embeddings, Qdrant, intent routing, Qwen generation.",
      cite: "linkedinAnnounce" as const,
    },
    {
      text: "Deployed with Docker + GitHub Actions on Oracle Cloud.",
      cite: "resume" as const,
    },
  ],
  screenshots: [
    {
      src: "/bac-ai/chat-cite.png",
      alt: "BAC AI chat answering a French unit question with cited textbook pages",
      caption: "app · chat + page citations",
    },
    {
      src: "/bac-ai/subjects.png",
      alt: "BAC AI subject picker — Grade 12 literary stream with revision and study cards",
      caption: "app · subjects & revision",
    },
    {
      src: "/bac-ai/login.png",
      alt: "BAC AI login — email and Google sign-in",
      caption: "app · auth",
    },
  ],
} as const;

export const otherWork = {
  doc: "doc_02 · other work · retrieved 0.88",
  intro:
    "Alongside BAC AI I’ve worked on real-world ML projects that involve data collection, model evaluation, and API integration — not notebook demos.",
  items: [
    {
      id: "heart-disease",
      title: "Heart Disease Prediction",
      stack: "Python · scikit-learn · pandas",
      summary:
        "Binary classification from clinical factors. Compared logistic regression vs random forest and selected the stronger performer — data prep, evaluation, and model selection end to end.",
      metricLabel: "Models compared",
      metricValue: "2",
      metricNote: "LogReg vs Random Forest",
      cite: "resume" as const,
    },
  ],
  slot: {
    title: "Next project",
    body: "Slot reserved — shipping something grounded soon.",
  },
} as const;

export const activities = {
  doc: "doc_04 · activities · retrieved 0.9",
  items: [
    {
      id: "sync26",
      title: "Hackathon winner — 3rd place",
      org: "Kiro Hackathon · SYNC'26",
      when: "9 Oct 2026 · Damascus Opera House",
      body: "Placed 3rd of all participants building and deploying a live AI voice character with agentic coding. Judged on completeness and solution quality. Awarded an AWS Associate Certification exam voucher.",
      links: [
        { label: "Certificate (PDF)", href: "/certs/hackathon-3rd-place.pdf" },
        {
          label: "Project repo",
          href: "https://github.com/Mody-B/kiro-hackathon-bizdude",
        },
      ],
      cite: "hackathonCert" as const,
    },
    {
      id: "tutoring",
      title: "Tutoring — math, science & English",
      org: "Hobby / community",
      when: "Ongoing",
      body: "I tutor mathematics, science, and English as a hobby — explaining concepts clearly and adapting to each student’s pace.",
      links: [] as { label: string; href: string }[],
      cite: "resume" as const,
    },
  ],
} as const;

export type StackItem = {
  label: string;
  cite?: keyof typeof citations;
};

export const stackGroups: { title: string; items: StackItem[] }[] = [
  {
    title: "AI Engineering",
    items: [
      { label: "RAG & grounding", cite: "bacaiLive" },
      { label: "Embeddings & vector search", cite: "bacaiLive" },
      { label: "Prompt design", cite: "resume" },
      { label: "LLM integration", cite: "bacaiApp" },
      { label: "Streaming generation", cite: "bacaiApp" },
      { label: "Source citation", cite: "bacaiLive" },
      { label: "Multilingual QA (AR/EN/FR)", cite: "bacaiLive" },
    ],
  },
  {
    title: "ML",
    items: [
      { label: "BGE-M3 embeddings", cite: "resume" },
      { label: "Semantic search", cite: "bacaiLive" },
      { label: "Chunking strategy", cite: "resume" },
      { label: "OCR (Tesseract, EasyOCR)", cite: "resume" },
      { label: "Intent routing", cite: "resume" },
      { label: "Binary classification", cite: "resume" },
      { label: "Model comparison", cite: "resume" },
    ],
  },
  {
    title: "Models & Tools",
    items: [
      { label: "Qwen", cite: "resume" },
      { label: "Ollama", cite: "resume" },
      { label: "OpenRouter", cite: "resume" },
      { label: "Qdrant", cite: "resume" },
      { label: "sentence-transformers", cite: "resume" },
      { label: "scikit-learn", cite: "resume" },
      { label: "pandas", cite: "resume" },
    ],
  },
  {
    title: "Languages",
    items: [
      { label: "Python", cite: "bacaiApp" },
      { label: "TypeScript", cite: "github" },
      { label: "SQL", cite: "resume" },
      { label: "Dart", cite: "resume" },
    ],
  },
  {
    title: "Backend",
    items: [
      { label: "FastAPI", cite: "bacaiApp" },
      { label: "Pydantic", cite: "resume" },
      { label: "SQLAlchemy", cite: "resume" },
      { label: "SQLite", cite: "resume" },
      { label: "JWT", cite: "bacaiApp" },
      { label: "OAuth (Google)", cite: "bacaiApp" },
      { label: "REST APIs", cite: "resume" },
    ],
  },
  {
    title: "Frontend & DevOps",
    items: [
      { label: "React", cite: "bacaiApp" },
      { label: "Vite", cite: "resume" },
      { label: "Bilingual RTL UI", cite: "bacaiApp" },
      { label: "Git", cite: "github" },
      { label: "GitHub Actions", cite: "resume" },
      { label: "Docker", cite: "resume" },
      { label: "Linux", cite: "resume" },
    ],
  },
];

export const about = {
  doc: "doc_05 · about · retrieved 0.91",
  body: "Fourth-year Informatics Engineering student specializing in Artificial Intelligence at Arab International University. I ship applied ML products — especially retrieval systems that stay honest about their sources — and I’ve also worked on real-life ML projects involving data collection, model evaluation, and API integration. Looking for AI/ML internships and junior roles.",
  timeline: [
    { when: "Expected 2028", what: "B. Informatics Engineering · AI specialization · AIU" },
    { when: "Jul 2026 →", what: "Founded BAC AI · live on bacai.dev" },
    { when: "Oct 2026", what: "3rd place · Kiro Hackathon at SYNC'26" },
    { when: "Present", what: "Seeking AI/ML internships & junior roles" },
  ],
} as const;

export const nav = [
  { href: "#flagship", label: "Flagship" },
  { href: "#other-work", label: "Work" },
  { href: "#stack", label: "Stack" },
  { href: "#activities", label: "Activities" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

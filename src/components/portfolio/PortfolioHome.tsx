"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { AskAboutWork } from "@/components/interactives/AskAboutWork";
import { EvalDashboard } from "@/components/interactives/EvalDashboard";
import { VectorSearchViz } from "@/components/interactives/VectorSearchViz";
import { ProjectAccordion } from "@/components/portfolio/ProjectAccordion";
import {
  contact,
  experience,
  projects,
  site,
  skills,
  summary,
} from "@/content/portfolio";

const nav = [
  { href: "#summary", label: "Summary" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#studio", label: "Studio" },
  { href: "#education", label: "Education" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
] as const;

export function PortfolioHome() {
  const reduce = useReducedMotion();

  return (
    <div className="flow">
      <div className="flow-atmosphere" aria-hidden />

      <header className="flow-nav">
        <a href="#top" className="flow-brand">
          {site.firstName} <span>·</span> {site.lastName}
        </a>
        <nav aria-label="Primary">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <section className="flow-hero" id="top" aria-label="Hero">
        <motion.p
          className="flow-location"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="flow-location-dot" />
          {site.location}
        </motion.p>
        <motion.h1
          className="flow-name"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {site.firstName}{" "}
          <span className="flow-name-accent">{site.lastName}</span>
        </motion.h1>
        <motion.p
          className="flow-role"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          {site.role}
        </motion.p>
        <motion.p
          className="flow-lede"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          {site.tagline}
        </motion.p>
        <motion.ul
          className="flow-socials"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          {site.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noreferrer" : undefined}
              >
                {s.label}
              </a>
            </li>
          ))}
        </motion.ul>
        <a className="flow-scroll" href="#summary">
          <span className="flow-location-dot" />
          Scroll
        </a>
      </section>

      <section id="summary" className="flow-section">
        <h2>Summary</h2>
        <p className="flow-prose">{summary.body}</p>
      </section>

      <section id="experience" className="flow-section">
        <h2>Experience</h2>
        <ul className="flow-experience">
          {experience.map((job) => (
            <li key={job.id}>
              <div className="flow-experience-head">
                <div>
                  <h3>{job.title}</h3>
                  <p className="flow-org">{job.org}</p>
                </div>
                <span className="flow-period">{job.period}</span>
              </div>
              <ul>
                {job.bullets.map((b) => (
                  <li key={b.slice(0, 48)}>{b}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section id="projects" className="flow-section">
        <h2>Projects</h2>
        <ProjectAccordion projects={projects} />
      </section>

      <section id="studio" className="flow-section">
        <h2>Studio</h2>
        <p className="flow-section-lede">
          Interactive demos of how I think about chat, RAG retrieval, and
          evaluation—local mocks, no API keys.
        </p>
        <div className="flow-studio-stack">
          <AskAboutWork />
          <VectorSearchViz />
          <EvalDashboard />
        </div>
      </section>

      <section id="education" className="flow-section">
        <h2>Education</h2>
        <div className="flow-education">
          <h3>{site.education.program}</h3>
          <p className="flow-org">{site.education.school}</p>
          <dl>
            <div>
              <dt>Status</dt>
              <dd>{site.education.detail}</dd>
            </div>
            <div>
              <dt>Expected</dt>
              <dd>{site.education.expected}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section id="skills" className="flow-section">
        <h2>Skills</h2>
        <div className="flow-skills">
          {skills.groups.map((group) => (
            <div key={group.title} className="flow-skill-group">
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="flow-section flow-contact">
        <h2>{contact.headline}</h2>
        <a className="flow-contact-email" href={`mailto:${site.email}`}>
          {site.email} →
        </a>
        <p className="flow-section-lede">{contact.body}</p>
        <ul className="flow-contact-list">
          <li>
            <span>Email</span>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </li>
          <li>
            <span>LinkedIn</span>
            <a
              href="https://www.linkedin.com/in/mohamad-bitar-721b90324"
              target="_blank"
              rel="noreferrer"
            >
              linkedin.com/in/mohamad-bitar-721b90324
            </a>
          </li>
          <li>
            <span>GitHub</span>
            <a
              href="https://github.com/Mody-B"
              target="_blank"
              rel="noreferrer"
            >
              github.com/Mody-B
            </a>
          </li>
          <li>
            <span>Web</span>
            <a href={`https://${site.domain}`}>{site.domain}</a>
          </li>
        </ul>
      </section>

      <footer className="flow-footer">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p>
          <Link href="/design/">archived design refs</Link>
        </p>
      </footer>
    </div>
  );
}

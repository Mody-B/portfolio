"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { AskAboutWork } from "@/components/interactives/AskAboutWork";
import { EvalDashboard } from "@/components/interactives/EvalDashboard";
import { SkillOrbit } from "@/components/interactives/SkillOrbit";
import { VectorSearchViz } from "@/components/interactives/VectorSearchViz";
import {
  about,
  contact,
  projects,
  site,
} from "@/content/portfolio";

export function PortfolioHome() {
  const reduce = useReducedMotion();

  return (
    <div className="atelier">
      <div className="atelier-atmosphere" aria-hidden />

      <div className="atelier-stage">
        <header className="atelier-nav">
          <div className="atelier-available">
            <span className="atelier-available-dot" />
            {site.availability}
          </div>
          <nav aria-label="Primary">
            <a href="#work">
              Work <span>[2]</span>
            </a>
            <a href="#studio">
              Studio <span>[3]</span>
            </a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="atelier-pill-btn" href="#contact">
            Let&apos;s Talk
            <span aria-hidden>↗</span>
          </a>
        </header>

        <section className="atelier-hero" id="top" aria-label="Hero">
          <motion.h1
            className="atelier-name"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="atelier-name-outline">
              {site.firstName.toUpperCase()}
            </span>{" "}
            <span className="atelier-name-solid">
              {site.lastName.toUpperCase()}
            </span>
          </motion.h1>

          <div className="atelier-hero-floor">
            <motion.div
              className="atelier-hero-copy"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
            >
              <h2>{site.role}</h2>
              <p>{site.tagline}</p>
              <a className="atelier-pill-btn" href="#studio">
                Explore the studio
                <span aria-hidden>↗</span>
              </a>
            </motion.div>

            <motion.ul
              className="atelier-socials"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel={s.href.startsWith("http") ? "noreferrer" : undefined}>
                    {s.label}
                  </a>
                </li>
              ))}
            </motion.ul>
          </div>
        </section>
      </div>

      <section id="studio" className="atelier-section">
        <div className="atelier-section-intro">
          <p className="atelier-kicker">Studio</p>
          <h2>Interact with how I build AI</h2>
          <p>
            Local demos—chat, vector search, and an eval dashboard. No API keys;
            curated to show RAG grounding and quality gates.
          </p>
        </div>
        <div className="atelier-studio-stack">
          <AskAboutWork />
          <VectorSearchViz />
          <EvalDashboard />
        </div>
      </section>

      <section id="work" className="atelier-section">
        <div className="atelier-section-intro">
          <p className="atelier-kicker">Selected work</p>
          <h2>Systems that have to hold</h2>
          <p>Real projects from production study AI to classical ML baselines.</p>
        </div>
        <ol className="atelier-projects">
          {projects.map((project, index) => (
            <li key={project.id} className="atelier-project">
              <div className="atelier-project-meta">
                <span>{String(index + 1).padStart(2, "0")}</span>
                {project.period ? <em>{project.period}</em> : null}
                {project.role ? <em>{project.role}</em> : null}
              </div>
              <h3>{project.title}</h3>
              <p className="atelier-project-summary">{project.summary}</p>
              <div className="atelier-project-detail">
                <p>
                  <strong>Problem</strong> {project.problem}
                </p>
                <p>
                  <strong>Approach</strong> {project.approach}
                </p>
                <p>
                  <strong>Outcome</strong> {project.outcome}
                </p>
              </div>
              <ul className="atelier-stack">
                {project.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section id="skills" className="atelier-section">
        <div className="atelier-section-intro">
          <p className="atelier-kicker">Skills</p>
          <h2>Where attention gathers</h2>
        </div>
        <SkillOrbit />
      </section>

      <section id="about" className="atelier-section">
        <div className="atelier-section-intro">
          <p className="atelier-kicker">About</p>
          <h2>{about.headline}</h2>
        </div>
        <div className="atelier-about">
          {about.body.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
          <div className="atelier-education">
            <strong>{site.education.school}</strong>
            <span>{site.education.program}</span>
            <span>{site.education.status}</span>
          </div>
          <p className="atelier-meta">{site.location}</p>
        </div>
      </section>

      <section id="contact" className="atelier-section atelier-contact">
        <div className="atelier-section-intro">
          <p className="atelier-kicker">Contact</p>
          <h2>{contact.headline}</h2>
          <p>{contact.body}</p>
        </div>
        <a className="atelier-pill-btn" href={`mailto:${site.email}`}>
          {contact.cta}
          <span aria-hidden>↗</span>
        </a>
        <ul className="atelier-contact-links">
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
        </ul>
        <p className="atelier-meta">{site.domain}</p>
      </section>

      <footer className="atelier-footer">
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

"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { AmbientField } from "@/components/motion/AmbientField";
import { Reveal } from "@/components/motion/Reveal";
import { SkillOrbit } from "@/components/interactives/SkillOrbit";
import { WhisperLine } from "@/components/interactives/WhisperLine";
import {
  about,
  contact,
  projects,
  site,
} from "@/content/portfolio";

export function PortfolioHome() {
  const heroRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);
  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.75],
    [1, reduce ? 1 : 0.35]
  );

  return (
    <div className="lumen" data-theme="lumen">
      <AmbientField />

      <header className="lumen-nav">
        <a href="#top" className="lumen-brand">
          {site.name}
        </a>
        <nav aria-label="Primary">
          <a href="#work">Work</a>
          <a href="#craft">Craft</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <motion.section
        id="top"
        ref={heroRef}
        className="lumen-hero"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <div className="lumen-hero-inner">
          <motion.p
            className="lumen-kicker"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {site.role}
          </motion.p>
          <motion.h1
            className="lumen-name"
            initial={reduce ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {site.name.split(" ").map((part, i) => (
              <span key={part} className="lumen-name-part">
                {i > 0 ? " " : null}
                {part}
              </span>
            ))}
          </motion.h1>
          <motion.p
            className="lumen-tagline"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            {site.tagline}
          </motion.p>
          <motion.div
            className="lumen-hero-actions"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
          >
            <a className="lumen-btn lumen-btn-primary" href="#work">
              Enter the work
            </a>
            <a className="lumen-btn lumen-btn-ghost" href="#craft">
              Feel the craft
            </a>
          </motion.div>
        </div>
        <motion.div
          className="lumen-scroll-cue"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.2 }}
          aria-hidden
        >
          <span />
        </motion.div>
      </motion.section>

      <section id="craft" className="lumen-section lumen-craft">
        <Reveal>
          <p className="lumen-section-kicker">Presence</p>
          <h2 className="lumen-section-title">Think with me for a moment</h2>
          <p className="lumen-section-lede">
            Not a chat farm—one quiet line. Local, curated responses in an
            AI-engineering voice. The page listens; the field softens around
            what you name.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <WhisperLine />
        </Reveal>
      </section>

      <section id="work" className="lumen-section lumen-work">
        <Reveal>
          <p className="lumen-section-kicker">Selected systems</p>
          <h2 className="lumen-section-title">Work that has to hold</h2>
          <p className="lumen-section-lede">
            Placeholder case studies—swap outcomes in{" "}
            <code>src/content/portfolio.ts</code>. Hover to lean in.
          </p>
        </Reveal>
        <ol className="lumen-projects">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.08}>
              <li className="lumen-project">
                <div className="lumen-project-index">
                  {String(index + 1).padStart(2, "0")}
                  {project.placeholder ? (
                    <span className="lumen-pill">Placeholder</span>
                  ) : null}
                </div>
                <h3>{project.title}</h3>
                <p className="lumen-project-summary">{project.summary}</p>
                <div className="lumen-project-reveal">
                  <p>
                    <strong>Problem</strong> {project.problem}
                  </p>
                  <p>
                    <strong>Approach</strong> {project.approach}
                  </p>
                  <p>
                    <strong>Outcome</strong> {project.outcome}
                  </p>
                  <ul className="lumen-stack">
                    {project.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section id="skills" className="lumen-section lumen-skills">
        <Reveal>
          <p className="lumen-section-kicker">Threads</p>
          <h2 className="lumen-section-title">Where attention gathers</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <SkillOrbit />
        </Reveal>
      </section>

      <section id="about" className="lumen-section lumen-about">
        <Reveal>
          <p className="lumen-section-kicker">About</p>
          <h2 className="lumen-section-title">{about.headline}</h2>
          <div className="lumen-about-body">
            {about.body.map((p) => (
              <p key={p.slice(0, 28)}>{p}</p>
            ))}
            <p className="lumen-meta">{site.location}</p>
          </div>
        </Reveal>
      </section>

      <section id="contact" className="lumen-section lumen-contact">
        <Reveal>
          <p className="lumen-section-kicker">Contact</p>
          <h2 className="lumen-section-title">{contact.headline}</h2>
          <p className="lumen-section-lede">{contact.body}</p>
          <a className="lumen-btn lumen-btn-primary lumen-magnetic" href={`mailto:${site.email}`}>
            {contact.cta}
          </a>
          <ul className="lumen-socials">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href}>{s.label}</a>
              </li>
            ))}
          </ul>
          <p className="lumen-meta">{site.domain}</p>
        </Reveal>
      </section>

      <footer className="lumen-footer">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p>
          Motions prefer elegance over noise ·{" "}
          <Link href="/design/">archived design refs</Link>
        </p>
      </footer>
    </div>
  );
}

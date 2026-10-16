"use client";

import { useState } from "react";
import { ChatWidget } from "@/components/interactives/ChatWidget";
import { Citation } from "@/components/grounded/Citation";
import { Pipeline } from "@/components/grounded/Pipeline";
import { QueryBar } from "@/components/grounded/QueryBar";
import { ScreenshotCarousel } from "@/components/grounded/ScreenshotCarousel";
import { Section } from "@/components/grounded/Section";
import { SiteNav } from "@/components/grounded/SiteNav";
import { StreamLine } from "@/components/grounded/StreamLine";
import {
  about,
  activities,
  citations,
  flagship,
  otherWork,
  site,
  stackGroups,
} from "@/content/grounded";

export function PortfolioHome() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  }

  return (
    <div className="grounded">
      <div className="g-texture" aria-hidden />
      <SiteNav />

      <main>
        <section className="g-hero" id="top" aria-label="Hero">
          <p className="g-mono g-meta">{site.metaLine}</p>
          <h1 className="g-name">{site.name}</h1>
          <StreamLine text={site.streamLine} className="g-stream" />
          <QueryBar />
          <div className="g-hero-actions">
            <a
              className="g-btn-primary"
              href={site.bacaiLive}
              target="_blank"
              rel="noreferrer"
            >
              See BAC AI live →
            </a>
            <div className="g-hero-links">
              <a href={site.resumeHref}>Résumé (PDF)</a>
              <a href={site.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href={site.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={`mailto:${site.email}`}>Email</a>
            </div>
          </div>
        </section>

        <Section id="flagship" doc={flagship.doc} wide>
          <div className="g-flagship-grid">
            <div className="g-flagship-copy">
              <h2 className="g-h2">
                <a
                  className="g-title-link"
                  href={site.bacaiLive}
                  target="_blank"
                  rel="noreferrer"
                >
                  {flagship.title}
                </a>
              </h2>
              <p className="g-sub">{flagship.subtitle}</p>
              <p className="g-mono g-meta">
                {flagship.role} · {flagship.period}
              </p>
              <p className="g-lede">{flagship.lede}</p>
              <ul className="g-fact-list">
                {flagship.facts.map((fact) => (
                  <li key={fact.text}>
                    {fact.text}{" "}
                    <Citation citation={citations[fact.cite]} pulse />
                  </li>
                ))}
              </ul>
              <div className="g-flagship-links">
                <a href={site.bacaiLive} target="_blank" rel="noreferrer">
                  bacai.dev →
                </a>
                <a href={site.bacaiApp} target="_blank" rel="noreferrer">
                  app.bacai.dev →
                </a>
              </div>
            </div>
            <ScreenshotCarousel
              shots={flagship.screenshots}
              linkHref={site.bacaiLive}
            />
          </div>
          <div className="g-pipeline-wrap">
            <p className="g-mono g-meta">pipeline · retrieval path</p>
            <Pipeline />
          </div>
        </Section>

        <Section id="other-work" doc={otherWork.doc}>
          <h2 className="g-h2">Other work</h2>
          <p className="g-lede">{otherWork.intro}</p>
          <div className="g-work-grid">
            {otherWork.items.map((item) => (
              <article key={item.id} className="g-work-card">
                <p className="g-mono g-meta">{item.stack}</p>
                <h3>{item.title}</h3>
                <p>
                  {item.summary}{" "}
                  <Citation citation={citations[item.cite]} />
                </p>
                <div className="g-metric">
                  <strong>{item.metricValue}</strong>
                  <span>{item.metricLabel}</span>
                  <em>{item.metricNote}</em>
                </div>
              </article>
            ))}
            <article className="g-work-card g-work-slot" aria-label="Future project">
              <p className="g-mono g-meta">reserved</p>
              <h3>{otherWork.slot.title}</h3>
              <p>{otherWork.slot.body}</p>
            </article>
          </div>
        </Section>

        <Section id="stack" doc="doc_03 · stack · retrieved 0.95" wide>
          <h2 className="g-h2">Stack</h2>
          <p className="g-lede g-stack-lede">
            Compact index. Lime markers cite where BAC AI (or the CV) uses the
            item — tap to open the source.
          </p>
          <div className="g-stack">
            {stackGroups.map((group) => (
              <div key={group.title} className="g-stack-col">
                <h3 className="g-mono">{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <span>{item.label}</span>
                      {item.cite ? (
                        <Citation citation={citations[item.cite]} />
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="activities" doc={activities.doc}>
          <h2 className="g-h2">Activities</h2>
          <ul className="g-activities">
            {activities.items.map((item) => (
              <li key={item.id} className="g-activity">
                <div className="g-activity-head">
                  <h3>{item.title}</h3>
                  <p className="g-mono g-meta">
                    {item.org} · {item.when}
                  </p>
                </div>
                <p>
                  {item.body}{" "}
                  <Citation citation={citations[item.cite]} />
                </p>
                {item.links.length ? (
                  <div className="g-activity-links">
                    {item.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </Section>

        <Section id="about" doc={about.doc}>
          <div className="g-spotlight g-spotlight-about">
            <p className="g-mono g-spotlight-kicker">identity · education</p>
            <h2 className="g-h2">About + Education</h2>
            <p className="g-lede g-spotlight-lede">
              {about.body} <Citation citation={citations.resume} />
            </p>
            <ol className="g-timeline">
              {about.timeline.map((row) => (
                <li key={row.when}>
                  <span className="g-mono">{row.when}</span>
                  <span>{row.what}</span>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        <Section id="contact" doc="doc_06 · contact · retrieved 1.00">
          <div className="g-spotlight g-spotlight-contact">
            <p className="g-mono g-spotlight-kicker">reach out</p>
            <h2 className="g-contact-line">
              Have a role or idea? Let&apos;s talk.
            </h2>
            <p className="g-lede">
              Internships, junior AI/ML roles, or collaborations — one email is
              enough.
            </p>
            <div className="g-contact-row">
              <button
                type="button"
                className="g-btn-primary g-btn-xl"
                onClick={copyEmail}
              >
                {copied ? "Copied ✓" : site.email}
              </button>
              <a href={site.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={site.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </div>
        </Section>
      </main>

      <footer className="g-footer">
        <p className="g-mono">
          © {new Date().getFullYear()} {site.name} · {site.domain}
        </p>
        <p className="g-mono g-footer-note">Grounded — ask, retrieve, cite.</p>
      </footer>

      <ChatWidget />
    </div>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import { Citation } from "@/components/grounded/Citation";
import { Pipeline } from "@/components/grounded/Pipeline";
import { QueryBar } from "@/components/grounded/QueryBar";
import { Section } from "@/components/grounded/Section";
import { SiteNav } from "@/components/grounded/SiteNav";
import { StreamLine } from "@/components/grounded/StreamLine";
import {
  about,
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
              <h2 className="g-h2">{flagship.title}</h2>
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
                  Live site →
                </a>
                <a href={site.bacaiApp} target="_blank" rel="noreferrer">
                  App →
                </a>
              </div>
            </div>
            <div className="g-flagship-media">
              {flagship.screenshots.map((shot) => (
                <figure key={shot.src} className="g-browser">
                  <div className="g-browser-bar">
                    <span />
                    <span />
                    <span />
                    <em>{shot.caption}</em>
                  </div>
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={1200}
                    height={750}
                    className="g-browser-img"
                    sizes="(max-width: 900px) 100vw, 52vw"
                  />
                </figure>
              ))}
            </div>
          </div>
          <div className="g-pipeline-wrap">
            <p className="g-mono g-meta">pipeline · retrieval path</p>
            <Pipeline />
          </div>
        </Section>

        <Section id="other-work" doc={otherWork.doc}>
          <h2 className="g-h2">Other work</h2>
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

        <Section id="about" doc={about.doc}>
          <h2 className="g-h2">About + Education</h2>
          <p className="g-lede">
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
        </Section>

        <Section id="contact" doc="doc_05 · contact · retrieved 1.00">
          <h2 className="g-contact-line">Have a role or idea? Let&apos;s talk.</h2>
          <div className="g-contact-row">
            <button type="button" className="g-btn-primary" onClick={copyEmail}>
              {copied ? "Copied email" : site.email}
            </button>
            <a href={site.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={site.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </Section>
      </main>

      <footer className="g-footer">
        <p className="g-mono">
          © {new Date().getFullYear()} {site.name} · {site.domain}
        </p>
        <p className="g-mono g-footer-note">Grounded — ask, retrieve, cite.</p>
      </footer>
    </div>
  );
}

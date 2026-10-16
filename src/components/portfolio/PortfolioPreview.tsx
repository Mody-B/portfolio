import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  about,
  contact,
  projects,
  site,
  skills,
} from "@/content/portfolio";
import type { DesignSlug } from "@/content/design-directions";

type Props = {
  design: DesignSlug;
};

export function PortfolioPreview({ design }: Props) {
  return (
    <div className="design-root" data-design={design}>
      <header className="site-nav">
        <Link href="/" className="brand-mark">
          {site.name}
        </Link>
        <nav className="nav-links" aria-label="Section">
          <a href="#work">Work</a>
          <a href="#skills">Skills</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <Link href="/design/" className="back-picker">
          ← Design refs
        </Link>
      </header>

      <section className="hero" aria-label="Hero">
        <div className="hero-atmosphere" aria-hidden />
        <div className="hero-content">
          <p className="hero-role">{site.role}</p>
          <h1 className="hero-name">{site.name}</h1>
          <p className="hero-tagline">{site.tagline}</p>
          <div className="hero-ctas">
            <Button nativeButton={false} render={<a href="#work" />} className="cta-primary">
              View work
            </Button>
            <Button
              nativeButton={false}
              render={<a href="#contact" />}
              variant="outline"
              className="cta-secondary"
            >
              Get in touch
            </Button>
          </div>
        </div>
      </section>

      <section id="work" className="section work">
        <div className="section-intro">
          <h2>Featured work</h2>
          <p>
            Placeholder case studies — edit{" "}
            <code>src/content/portfolio.ts</code> to swap titles, stack, and
            outcomes.
          </p>
        </div>
        <ol className="project-list">
          {projects.map((project, index) => (
            <li key={project.id} className="project">
              <div className="project-meta">
                <span className="project-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {project.placeholder ? (
                  <span className="placeholder-badge">Placeholder</span>
                ) : null}
              </div>
              <h3>{project.title}</h3>
              <p className="project-summary">{project.summary}</p>
              <dl className="project-detail">
                <div>
                  <dt>Problem</dt>
                  <dd>{project.problem}</dd>
                </div>
                <div>
                  <dt>Approach</dt>
                  <dd>{project.approach}</dd>
                </div>
                <div>
                  <dt>Outcome</dt>
                  <dd>{project.outcome}</dd>
                </div>
              </dl>
              <ul className="stack-list">
                {project.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section id="skills" className="section skills">
        <div className="section-intro">
          <h2>{skills.headline}</h2>
        </div>
        <div className="skill-groups">
          {skills.groups.map((group) => (
            <div key={group.title} className="skill-group">
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

      <section id="about" className="section about">
        <div className="section-intro">
          <h2>{about.headline}</h2>
        </div>
        <div className="about-body">
          {about.body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
          <p className="about-meta">{site.location}</p>
        </div>
      </section>

      <section id="contact" className="section contact">
        <div className="contact-panel">
          <h2>{contact.headline}</h2>
          <p>{contact.body}</p>
          <Button
            nativeButton={false}
            render={<a href={`mailto:${site.email}`} />}
            className="cta-primary"
          >
            {contact.cta}
          </Button>
          <ul className="social-list">
            {site.socials.map((social) => (
              <li key={social.label}>
                <a href={social.href} rel="noreferrer">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="about-meta">{site.domain}</p>
        </div>
      </section>

      <footer className="site-footer">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="footer-note">
          Design preview: <strong>{design}</strong> · live home uses{" "}
          <Link href="/">Atelier</Link>
        </p>
      </footer>
    </div>
  );
}

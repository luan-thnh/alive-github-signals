import { Builder } from "@/components/Builder";

const endpoints = [
  ["/api/signal", "Full editorial system panel"],
  ["/api/stats", "Contributions, commits and core metrics"],
  ["/api/languages", "Language field or orbital composition"],
  ["/api/repo", "Repository specimen / pin card"],
  ["/api/streak", "Current and longest continuity index"],
  ["/api/activity", "Contribution calendar trace"],
  ["/api/profile", "Identity card with optional embedded avatar"],
  ["/api/terminal", "Developer identity as a live terminal"],
  ["/api/badge", "Data-driven compact metric badge"],
  ["/api/button", "Static README CTA artwork"],
  ["/api/status", "Availability and broadcast status"],
];

const capabilities = [
  ["QUERY NATIVE", "Username, repository, theme, colors, dimensions and composition are controlled through URL parameters."],
  ["LIVE GITHUB DATA", "GraphQL-powered profile, language, contribution, streak and repository data with configurable CDN caching."],
  ["ONE VISUAL SYSTEM", "Editorial typography, technical annotations, living grids, signal lines, orbit fields and acid accents."],
  ["VERCEL READY", "A single Next.js repository with server route handlers, token rotation and zero database requirements."],
];

export default function HomePage() {
  return (
    <main>
      <header className="site-header">
        <a href="#top" className="brand" aria-label="Alive GitHub Signals home">
          <span className="brand-mark">A/</span>
          <span>ALIVE GITHUB SIGNALS</span>
        </a>
        <nav>
          <a href="#cards">CARDS</a>
          <a href="#builder">BUILDER</a>
          <a href="#deploy">DEPLOY</a>
          <a href="https://github.com" target="_blank" rel="noreferrer">GITHUB ↗</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="signal-dot" /> DYNAMIC SVG INFRASTRUCTURE</div>
          <h1>YOUR GITHUB<br /><em>IS A LIVING</em><br />INTERFACE.</h1>
          <p>
            Deploy one repository. Pass a username through the URL. Receive expressive,
            always-current badges, buttons and statistics artwork for any GitHub README.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#builder">BUILD A SIGNAL <span>↘</span></a>
            <a className="secondary-action" href="#deploy">DEPLOY TO VERCEL</a>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="coordinate coordinate-a">X / 08.31</div>
          <div className="coordinate coordinate-b">Y / 47.09</div>
          <div className="orbit orbit-a" />
          <div className="orbit orbit-b" />
          <div className="orbit orbit-c" />
          <div className="core"><span>API</span><strong>LIVE</strong></div>
          <svg viewBox="0 0 600 300" className="hero-wave">
            <path d="M0 172C44 172 54 120 92 120C132 120 136 224 180 224C226 224 224 76 278 76C326 76 338 194 380 194C424 194 442 134 478 134C520 134 538 170 600 170" />
          </svg>
          <div className="scan-label">SIGNAL / GITHUB GRAPHQL / SVG</div>
        </div>
      </section>

      <section className="capabilities">
        <div className="section-rail"><span>01 / SYSTEM</span><span>WHY IT EXISTS</span></div>
        <div className="capability-grid">
          {capabilities.map(([title, body], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{title}</h2>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cards-section" id="cards">
        <div className="section-rail"><span>02 / ENDPOINTS</span><span>ONE URL, MANY FORMS</span></div>
        <div className="cards-intro">
          <h2>NOT ANOTHER<br />GENERIC STATS CARD.</h2>
          <p>
            Every endpoint has a distinct composition while sharing the same Alive Interface
            grammar. Use the defaults or control the artwork with query parameters.
          </p>
        </div>
        <div className="endpoint-list">
          {endpoints.map(([path, description], index) => (
            <article key={path}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <code>{path}</code>
              <p>{description}</p>
              <b>↗</b>
            </article>
          ))}
        </div>
      </section>

      <Builder />

      <section className="deploy" id="deploy">
        <div className="section-rail"><span>04 / DEPLOY</span><span>VERCEL / 3 STEPS</span></div>
        <div className="deploy-grid">
          <div>
            <span className="deploy-index">01</span>
            <h2>CREATE THE REPOSITORY</h2>
            <p>Push this source to GitHub and import the repository into Vercel.</p>
          </div>
          <div>
            <span className="deploy-index">02</span>
            <h2>ADD THE TOKEN</h2>
            <p>Set <code>GITHUB_TOKEN</code> as a server-side Vercel environment variable.</p>
          </div>
          <div>
            <span className="deploy-index">03</span>
            <h2>USE THE URL</h2>
            <p>Embed <code>/api/signal?username=...</code> directly inside a README image.</p>
          </div>
        </div>
        <div className="deploy-command">
          <span>READY /</span>
          <code>https://your-domain.vercel.app/api/signal?username=luan-thnh&amp;theme=alive</code>
        </div>
      </section>

      <footer>
        <div className="footer-wordmark">ALIVE / SIGNALS</div>
        <div><span className="signal-dot" /> OPEN SOURCE / MIT / BUILT BY LUANTHNH</div>
      </footer>
    </main>
  );
}

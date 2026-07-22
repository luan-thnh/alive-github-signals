import { Builder } from "@/components/Builder";

const liveComponents = [
  {
    name: "Developer Radar",
    endpoint: "/api/radar",
    description: "A six-axis activity map derived from commits, repositories, collaboration, impact, streak and contributions.",
    src: "/api/radar?username=luan-thnh&animate=true&cache_seconds=300",
  },
  {
    name: "Language Constellation",
    endpoint: "/api/constellation",
    description: "Repository languages become a responsive orbital system weighted by real code mass.",
    src: "/api/constellation?username=luan-thnh&langs_count=8&animate=true&cache_seconds=300",
  },
  {
    name: "Contribution Timeline",
    endpoint: "/api/timeline",
    description: "Twelve real months of contributions rendered as an animated editorial skyline.",
    src: "/api/timeline?username=luan-thnh&animate=true&cache_seconds=300",
  },
  {
    name: "Repository Stack",
    endpoint: "/api/repos",
    description: "The user’s latest updated repositories with language, stars, forks and update time.",
    src: "/api/repos?username=luan-thnh&count=5&animate=true&cache_seconds=300",
  },
  {
    name: "Year In Code",
    endpoint: "/api/year",
    description: "A real 12-month recap with active days, strongest month, streak and primary language.",
    src: "/api/year?username=luan-thnh&animate=true&cache_seconds=300",
  },
  {
    name: "Contribution Pulse",
    endpoint: "/api/pulse",
    description: "A compact 52-week activity waveform designed for README headers and project pages.",
    src: "/api/pulse?username=luan-thnh&animate=true&cache_seconds=300",
  },
];

const endpointGroups = [
  {
    title: "PROFILE SYSTEMS",
    items: [
      ["/api/signal", "Full editorial GitHub system panel"],
      ["/api/stats", "Core GitHub metrics"],
      ["/api/radar", "Normalized developer activity radar"],
      ["/api/compare", "Real user-versus-user comparison"],
      ["/api/profile", "Identity and public profile card"],
      ["/api/terminal", "Developer profile as a live terminal"],
    ],
  },
  {
    title: "ACTIVITY SYSTEMS",
    items: [
      ["/api/pulse", "52-week contribution waveform"],
      ["/api/timeline", "Twelve-month contribution skyline"],
      ["/api/year", "Year In Code recap"],
      ["/api/activity", "Contribution calendar trace"],
      ["/api/streak", "Current and longest streak index"],
      ["/api/ticker", "Animated live metrics ticker"],
    ],
  },
  {
    title: "CODE & REPOSITORIES",
    items: [
      ["/api/languages", "Language field and orbit layouts"],
      ["/api/constellation", "Animated language constellation"],
      ["/api/repos", "Recent repository stack"],
      ["/api/repo", "Single repository specimen"],
    ],
  },
  {
    title: "README UTILITIES",
    items: [
      ["/api/badge", "Compact real GitHub metric badge"],
      ["/api/social", "Social account published on GitHub"],
      ["/api/button", "Custom SVG action button"],
      ["/api/status", "Availability and project status"],
    ],
  },
];

const queryOptions = [
  ["username", "GitHub user used as the real data source"],
  ["theme", "alive, paper, cobalt, ember or mono"],
  ["animate", "Native SVG animation; enabled by default"],
  ["accent", "Custom hexadecimal accent color"],
  ["period", "year or all for authored commits"],
  ["cache_seconds", "Vercel CDN freshness from 300 to 86400 seconds"],
  ["width / height", "Responsive output dimensions within safe limits"],
];

export default function HomePage() {
  const repositoryUrl = process.env.NEXT_PUBLIC_REPOSITORY_URL || "https://github.com/luan-thnh";

  return (
    <main>
      <header className="site-header">
        <a href="#top" className="brand" aria-label="Alive GitHub Signals home">
          <span className="brand-mark">A/</span>
          <span>ALIVE GITHUB SIGNALS</span>
        </a>
        <nav>
          <a href="#components">COMPONENTS</a>
          <a href="#api">API</a>
          <a href="#builder">BUILDER</a>
          <a href="#deploy">DEPLOY</a>
          <a href={repositoryUrl} target="_blank" rel="noreferrer">SOURCE ↗</a>
        </nav>
      </header>

      <section className="hero product-hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="signal-dot" /> DYNAMIC GITHUB SVG API</div>
          <h1>REAL GITHUB DATA.<br /><em>ALIVE SVG</em><br />COMPONENTS.</h1>
          <p>
            Deploy one Next.js repository to Vercel, pass a GitHub username through
            query parameters, and embed the returned animated SVG directly in any README.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#builder">GENERATE A COMPONENT <span>↘</span></a>
            <a className="secondary-action" href="#api">EXPLORE THE API</a>
          </div>
          <div className="hero-proof">
            <span>NO MOCK USER DATA</span>
            <span>GITHUB GRAPHQL + REST</span>
            <span>SVG MOTION</span>
            <span>VERCEL CDN</span>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="coordinate coordinate-a">REQUEST / USERNAME</div>
          <div className="coordinate coordinate-b">RESPONSE / IMAGE.SVG</div>
          <div className="orbit orbit-a" />
          <div className="orbit orbit-b" />
          <div className="orbit orbit-c" />
          <div className="core"><span>GET</span><strong>SVG</strong></div>
          <svg viewBox="0 0 600 300" className="hero-wave">
            <path d="M0 172C44 172 54 120 92 120C132 120 136 224 180 224C226 224 224 76 278 76C326 76 338 194 380 194C424 194 442 134 478 134C520 134 538 170 600 170" />
          </svg>
          <div className="scan-label">USERNAME → GITHUB API → SVG RENDERER → CDN</div>
        </div>
      </section>

      <section className="live-components" id="components">
        <div className="section-rail"><span>01 / LIVE COMPONENTS</span><span>RENDERED FROM GITHUB</span></div>
        <div className="product-section-head">
          <div>
            <span className="section-kicker">NEW IN V1.3</span>
            <h2>MORE THAN<br />A STATS CARD.</h2>
          </div>
          <p>
            Each component has a distinct information purpose and visual composition.
            The examples below call this project’s own API and are not screenshots.
          </p>
        </div>
        <div className="live-component-grid">
          {liveComponents.map((component, index) => (
            <article key={component.endpoint} className={index < 2 ? "is-featured" : ""}>
              <div className="component-meta">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{component.name}</h3><code>{component.endpoint}</code></div>
              </div>
              <div className="component-preview">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={component.src} alt={`${component.name} live GitHub SVG`} loading="lazy" />
              </div>
              <p>{component.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="api-catalog" id="api">
        <div className="section-rail"><span>02 / API CATALOG</span><span>20 SVG ENDPOINTS</span></div>
        <div className="api-group-grid">
          {endpointGroups.map((group, groupIndex) => (
            <article key={group.title}>
              <div className="api-group-title"><span>{String(groupIndex + 1).padStart(2, "0")}</span><h2>{group.title}</h2></div>
              <div className="api-items">
                {group.items.map(([endpoint, description]) => (
                  <div key={endpoint}><code>{endpoint}</code><p>{description}</p><b>↗</b></div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <Builder />

      <section className="request-section" id="request">
        <div className="section-rail"><span>04 / REQUEST MODEL</span><span>EVERY OPTION IS A PARAMETER</span></div>
        <div className="request-grid">
          <div className="request-example">
            <span>EXAMPLE REQUEST</span>
            <code>GET /api/constellation<br />?username=luan-thnh<br />&amp;langs_count=8<br />&amp;theme=alive<br />&amp;animate=true</code>
            <div className="request-flow">
              <i>01</i><b>VALIDATE</b><span />
              <i>02</i><b>FETCH GITHUB</b><span />
              <i>03</i><b>RENDER SVG</b><span />
              <i>04</i><b>CACHE</b>
            </div>
          </div>
          <div className="query-list">
            {queryOptions.map(([name, description]) => (
              <div key={name}><code>{name}</code><p>{description}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="truth-section">
        <div className="section-rail"><span>05 / DATA CONTRACT</span><span>REAL OR EXPLICIT ERROR</span></div>
        <div className="truth-grid">
          <div><strong>01</strong><h2>NO BUNDLED USER DATA</h2><p>The deployed service does not ship a sample profile, invented metric or fallback account.</p></div>
          <div><strong>02</strong><h2>PUBLIC GITHUB SOURCE</h2><p>Profile, repository, contribution, language and social information comes from GitHub APIs.</p></div>
          <div><strong>03</strong><h2>HONEST FAILURE</h2><p>Missing tokens, users, repositories or social accounts return a designed error SVG.</p></div>
          <div><strong>04</strong><h2>CONTROLLED FRESHNESS</h2><p>Use cache_seconds to balance live updates with GitHub rate limits and Vercel performance.</p></div>
        </div>
      </section>

      <section className="compact-lab">
        <div className="section-rail"><span>06 / COMPACT COMPONENTS</span><span>README DETAILS</span></div>
        <div className="compact-preview-grid">
          <div>
            <h3>LIVE METRIC TICKER</h3>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/api/ticker?username=luan-thnh&animate=true&cache_seconds=300" alt="Live GitHub metric ticker" />
          </div>
          <div>
            <h3>REAL CONTRIBUTION BADGE</h3>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/api/badge?username=luan-thnh&metric=contributions&label=CONTRIBUTIONS&animate=true&cache_seconds=300" alt="Real GitHub contribution badge" />
          </div>
          <div>
            <h3>GITHUB SOCIAL SIGNAL</h3>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/api/social?username=luan-thnh&platform=github&variant=stack&animate=true&cache_seconds=300" alt="Real GitHub social signal" />
          </div>
        </div>
      </section>

      <section className="deploy" id="deploy">
        <div className="section-rail"><span>07 / DEPLOY</span><span>VERCEL / THREE STEPS</span></div>
        <div className="deploy-grid">
          <div><span className="deploy-index">01</span><h2>PUSH THE SOURCE</h2><p>Create a GitHub repository and push this project.</p></div>
          <div><span className="deploy-index">02</span><h2>SET THE TOKEN</h2><p>Add <code>GITHUB_TOKEN</code> and the complete <code>NEXT_PUBLIC_SITE_URL</code> in Vercel.</p></div>
          <div><span className="deploy-index">03</span><h2>EMBED THE SVG</h2><p>Copy the generated Markdown or HTML from the builder into a README.</p></div>
        </div>
        <div className="deploy-command"><span>READY /</span><code>https://your-domain.vercel.app/api/radar?username=luan-thnh&amp;animate=true</code></div>
      </section>

      <footer>
        <div className="footer-wordmark">GITHUB / ALIVE</div>
        <div><span className="signal-dot" /> DYNAMIC SVG API / REAL DATA / OPEN SOURCE / MIT</div>
      </footer>
    </main>
  );
}

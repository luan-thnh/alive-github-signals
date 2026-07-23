<div align="center">
  <img src="public/mark.svg" width="82" alt="Alive GitHub Signals mark" />
  <h1>Alive GitHub Signals</h1>
  <p><strong>A Vercel-ready API for animated GitHub SVG components powered by real GitHub data.</strong></p>
  <p>
    <a href="#quick-start">Quick start</a> ·
    <a href="#svg-endpoints">Endpoints</a> ·
    <a href="docs/API.md">API reference</a> ·
    <a href="docs/DEPLOY.md">Deploy</a>
  </p>
</div>

## Product

Deploy this repository once, pass a GitHub username through query parameters,
and embed the returned SVG directly in a README, documentation page, portfolio
or repository landing page.

```md
![GitHub radar](https://your-domain.vercel.app/api/radar?username=luan-thnh)
```

The project is not a collection of static screenshots. Each user-backed endpoint:

1. validates the request,
2. fetches current GitHub GraphQL or REST data,
3. renders an original Alive Interface SVG,
4. returns it through a cacheable Vercel route.

There is no bundled sample profile, bundled user values or fallback account. GitHub failures
produce an explicit error SVG.

## What is new in v1.3.4

Four composition endpoints now create varied desktop layouts inside one responsive SVG:

- **System Overview Board** — identity, metrics, materials, and recent systems in a 61/39 layout.
- **Project Board** — one featured repository and a stacked recent-system queue.
- **Signal Board** — radar, fixed language orbit, and language-density rails.
- **Year Board** — annual recap, weekly pulse, and monthly timeline.
- **Developer Radar** — six-axis activity map derived from real GitHub metrics.
- **Language Constellation** — animated language nodes weighted by repository code mass.
- **Contribution Pulse** — compact 52-week contribution waveform.
- **Contribution Timeline** — twelve-month contribution skyline.
- **Repository Stack** — recently updated repositories with language, stars and forks.
- **Year In Code** — active days, strongest month, streak and primary language.
- **Signal Compare** — real GitHub user-versus-user comparison.
- **Metrics Ticker** — animated compact line of live profile metrics.

The landing page was also rewritten around the product: live endpoint examples,
API categories, request flow, builder, data contract and deployment.

## Core features

- 20 canonical SVG endpoints plus compatibility aliases.
- Real GitHub profile, repository, contribution, streak, language and social data.
- Native SVG animation enabled by default.
- Five coordinated themes and query-level color overrides.
- Visual builder that outputs URL, Markdown and HTML.
- GitHub token rotation through `GITHUB_TOKEN_2`, `GITHUB_TOKEN_3`, and so on.
- Vercel CDN cache control using `cache_seconds`.
- No database and no client-side token exposure.
- Designed error SVGs for invalid queries, missing users and rate limits.
- `prefers-reduced-motion` support in every animated SVG.

## Quick start

```bash
git clone https://github.com/YOUR_USERNAME/alive-github-signals.git
cd alive-github-signals
npm install
cp .env.example .env.local
npm run dev
```

Create `.env.local`:

```env
GITHUB_TOKEN=github_pat_xxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_REPOSITORY_URL=https://github.com/YOUR_USERNAME/alive-github-signals
DEFAULT_CACHE_SECONDS=300
```

Open `http://localhost:3000` to use the live builder.

## Deploy to Vercel

1. Push this source to a GitHub repository.
2. Import the repository into Vercel.
3. Add `GITHUB_TOKEN` as a server-side environment variable.
4. Set `NEXT_PUBLIC_SITE_URL` with the complete `https://` URL.
5. Deploy and open `/api/health`.
6. Test `/api/signal?username=YOUR_USERNAME`.

Full instructions: [docs/DEPLOY.md](docs/DEPLOY.md).

## SVG endpoints

### Profile systems

| Endpoint | Output |
|---|---|
| `/api/signal` | Full editorial GitHub system panel |
| `/api/stats` | Core metrics in editorial or orbit layouts |
| `/api/radar` | Developer activity radar |
| `/api/compare` | User-versus-user comparison |
| `/api/profile` | Profile identity card with optional avatar |
| `/api/terminal` | GitHub identity rendered as a terminal |

### Activity systems

| Endpoint | Output |
|---|---|
| `/api/pulse` | 52-week contribution waveform |
| `/api/timeline` | Twelve-month contribution skyline |
| `/api/year` | Year In Code recap |
| `/api/activity` | Contribution calendar trace |
| `/api/streak` | Current and longest streak |
| `/api/ticker` | Animated compact metric ticker |

### Code and repositories

| Endpoint | Output |
|---|---|
| `/api/languages` | Language field or orbit |
| `/api/constellation` | Animated language constellation |
| `/api/repos` | Recently updated repository stack |
| `/api/repo` | Single repository specimen |

### README utilities

| Endpoint | Output |
|---|---|
| `/api/badge` | Real compact GitHub metric badge |
| `/api/social` | Social link published on the GitHub profile |
| `/api/button` | Query-controlled SVG action button |
| `/api/status` | Availability or broadcast status |

Compatibility aliases include `/api`, `/api/top-langs`, `/api/pin`,
`/api/calendar`, `/api/repo-stack`, `/api/year-in-code` and `/api/marquee`.

## Examples

```text
/api/radar?username=luan-thnh&animate=true
/api/constellation?username=luan-thnh&langs_count=8
/api/timeline?username=luan-thnh&theme=cobalt
/api/repos?username=luan-thnh&count=6
/api/year?username=luan-thnh
/api/pulse?username=luan-thnh&width=980
/api/compare?username=luan-thnh&compare_username=torvalds
/api/ticker?username=luan-thnh
/api/repo?username=luan-thnh&repo=music-player
/api/badge?username=luan-thnh&metric=contributions&label=CONTRIBUTIONS
/api/social?username=luan-thnh&platform=github&variant=stack
```

## Shared query parameters

```text
username          GitHub login used as the real data source
compare_username  Second GitHub login for /api/compare
repo              Repository name for /api/repo
count             Repository count for /api/repos, 2–10
langs_count       Language count for language endpoints
theme             alive | paper | cobalt | ember | mono
accent            Custom hexadecimal accent color
accent2           Secondary hexadecimal color
bg                 Background color
text               Primary text color
muted              Secondary text color
border             Border color
width / height     Bounded SVG dimensions
title              Accessible custom title
animate            true by default; false disables SVG motion
period             year | all
exclude_langs      Comma-separated languages to exclude
repo_pages         1–5 repository pages used for aggregation
cache_seconds      300–86400 seconds
download           1 returns SVG as an attachment
```

Complete endpoint-specific parameters: [docs/API.md](docs/API.md).

## Animation system

Every SVG can include:

- moving technical grid,
- scan beam,
- frame and line drawing,
- staggered metric reveal,
- contribution heat pulses,
- animated waveforms,
- orbiting language geometry,
- floating constellation nodes,
- radar polygon reveal,
- social icon breathing,
- compact ticker motion.

Motion is enabled by default. Use `animate=false` for a static asset.

## Data contract

User-backed endpoints always require `username`. The service does not substitute
fake metrics when a token, user, repository or social account is unavailable.
Instead it returns an `ERR / SIGNAL INTERRUPTED` SVG containing the real failure.

`/api/social` resolves the requested public account from the GitHub profile.
It does not accept a fabricated handle as a data fallback.

## Caching

The GitHub API is called on a cache miss. Vercel then caches the generated SVG.
The default is 300 seconds. Increase `cache_seconds` on high-traffic deployments
to preserve GitHub API quota.

## Project structure

```text
app/
  api/[card]/route.ts       Endpoint dispatcher
  api/health/route.ts       Deployment health check
  page.tsx                  Product landing and live examples
components/
  Builder.tsx               Query, Markdown and HTML generator
lib/
  github/client.ts          GitHub GraphQL and REST client
  render/cards.ts           SVG component renderers
  render/svg.ts             Shared motion and visual primitives
  themes.ts                 Theme tokens
scripts/
  render-live-previews.ts   Token-required real preview generator
docs/
  API.md
  DEPLOY.md
  THEMES.md
  VALIDATION.md
```

## Checks

```bash
npm run typecheck
npm test
npm run build
```

Generate local previews from a real user:

```bash
GITHUB_TOKEN=github_pat_xxx \
LIVE_PREVIEW_USERNAME=luan-thnh \
npm run preview:generate
```

## Security

- Never expose the token with a `NEXT_PUBLIC_` prefix.
- Use minimum GitHub token permissions.
- Rotate leaked tokens immediately.
- Query text is bounded and XML-escaped.
- Dimensions and cache duration are clamped.

## License

MIT © luanthnh

## Upgrading from v1.1 or v1.2

Do not only copy the new files over the old repository. Removed files must also
be deleted from Git:

```bash
git rm -f lib/demo.ts 2>/dev/null || true
git rm -f tests/render.test.ts 2>/dev/null || true
git rm -f scripts/render-previews.ts 2>/dev/null || true
git add -A
git commit -m "fix: remove legacy demo runtime"
```

Version 1.3.1 also runs an automatic cleanup before build and type-check, so a
stale `lib/demo.ts` cannot break a Vercel deployment.


## GitHub profile responsive usage

GitHub Markdown tables remain multi-column on narrow screens. For profile READMEs,
render each live component as a separate full-width image:

```html
<img
  src="https://your-domain.vercel.app/api/languages?username=USER&layout=orbit&width=1200&height=430"
  width="100%"
  alt="Language orbit"
/>
```

Version 1.3.3 keeps orbit circle geometry static so GitHub Camo cannot displace it.


## Composition endpoints

```text
/api/overview?username=luan-thnh
/api/projects?username=luan-thnh
/api/signal-board?username=luan-thnh
/api/year-board?username=luan-thnh
```

These endpoints keep the README image at `width=100%` while creating asymmetric
60/40 and featured/stacked layouts inside the SVG. This avoids GitHub table
problems on mobile without forcing every section to look like a single-column card.

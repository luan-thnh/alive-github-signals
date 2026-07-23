<div align="center">
  <img src="public/mark.svg" width="96" alt="Alive GitHub Signals mark" />
  <h1>Alive GitHub Signals</h1>
  <p><strong>Animated GitHub SVG components powered by real GitHub data.</strong></p>
  <p>Deploy once · pass a username · embed the returned SVG anywhere</p>

  <p>
    <a href="https://alive-github-signals.vercel.app/">Live builder</a> ·
    <a href="#quick-use">Quick use</a> ·
    <a href="#component-gallery">Component gallery</a> ·
    <a href="#deploy-your-own-instance">Deploy</a> ·
    <a href="docs/API.md">Full API reference</a>
  </p>
</div>

---

## What this project does

Alive GitHub Signals turns public GitHub information into animated SVG components for:

- GitHub profile READMEs
- repository landing pages
- documentation
- portfolios
- project dashboards
- social and status links

Every user-backed request:

1. validates the query,
2. fetches current GitHub GraphQL or REST data,
3. renders an original Alive Interface SVG,
4. returns a cacheable image response.

There is **no demo profile, fake metric, fallback account, or bundled user data**. When GitHub cannot provide the requested information, the endpoint returns an explicit error SVG.

## Live instance

```text
https://alive-github-signals.vercel.app
```

Health check:

```text
https://alive-github-signals.vercel.app/api/health
```

---

<a id="quick-use"></a>

## Quick use

Replace `YOUR_USERNAME` with a GitHub login:

```md
![GitHub signal](https://alive-github-signals.vercel.app/api/signal?username=YOUR_USERNAME)
```

Example:

```md
![GitHub signal](https://alive-github-signals.vercel.app/api/signal?username=luan-thnh)
```

GitHub automatically renders the returned SVG:

![Alive GitHub signal](https://alive-github-signals.vercel.app/api/signal?username=luan-thnh&theme=alive&width=1100&height=590&animate=true&cache_seconds=21600&readme=v2)

### HTML version

```html
<img
  src="https://alive-github-signals.vercel.app/api/signal?username=YOUR_USERNAME"
  width="100%"
  alt="GitHub signal"
/>
```

Animation is enabled by default. Disable it with:

```text
&animate=false
```

---

<a id="component-gallery"></a>

# Component gallery

Each component includes a live preview, a copy-ready Markdown snippet, and its most useful parameters.

## 01 — Composition boards

Composition boards combine several visualizations inside one responsive SVG. They are recommended for GitHub profile READMEs because Markdown tables do not collapse cleanly on mobile.

### System Overview

Identity, headline metrics, language materials, and recent repositories in one 61/39 composition.

![System Overview](https://alive-github-signals.vercel.app/api/overview?username=luan-thnh&theme=alive&width=1200&height=620&animate=true&cache_seconds=21600&readme=v2)

```md
![System Overview](https://alive-github-signals.vercel.app/api/overview?username=YOUR_USERNAME&theme=alive&width=1200&height=620)
```

### Project Board

One featured repository with a stacked queue of recently updated systems.

![Project Board](https://alive-github-signals.vercel.app/api/projects?username=luan-thnh&theme=alive&width=1200&height=620&animate=true&cache_seconds=21600&readme=v2)

```md
![Project Board](https://alive-github-signals.vercel.app/api/projects?username=YOUR_USERNAME&theme=alive&width=1200&height=620)
```

### Signal Board

Developer radar, language orbit, and language-density rails in one asymmetric board.

![Signal Board](https://alive-github-signals.vercel.app/api/signal-board?username=luan-thnh&theme=alive&width=1200&height=620&animate=true&cache_seconds=21600&readme=v2)

```md
![Signal Board](https://alive-github-signals.vercel.app/api/signal-board?username=YOUR_USERNAME&theme=alive&width=1200&height=620)
```

### Year Board

Annual recap, weekly contribution pulse, and monthly timeline.

![Year Board](https://alive-github-signals.vercel.app/api/year-board?username=luan-thnh&theme=alive&width=1200&height=620&animate=true&cache_seconds=21600&readme=v2)

```md
![Year Board](https://alive-github-signals.vercel.app/api/year-board?username=YOUR_USERNAME&theme=alive&width=1200&height=620)
```

---

## 02 — Profile systems

### Full GitHub Signal

Contributions, metrics, languages, calendar trace, and signal waveform.

![Full GitHub Signal](https://alive-github-signals.vercel.app/api/signal?username=luan-thnh&theme=alive&width=1100&height=590&animate=true&cache_seconds=21600&readme=v2)

```md
![Full GitHub Signal](https://alive-github-signals.vercel.app/api/signal?username=YOUR_USERNAME&theme=alive)
```

### Stats

![GitHub Stats](https://alive-github-signals.vercel.app/api/stats?username=luan-thnh&variant=editorial&theme=alive&width=760&height=340&animate=true&cache_seconds=21600&readme=v2)

```md
![GitHub Stats](https://alive-github-signals.vercel.app/api/stats?username=YOUR_USERNAME&variant=editorial)
```

Variants:

```text
variant=editorial
variant=orbit
```

### Profile Identity

![Profile Identity](https://alive-github-signals.vercel.app/api/profile?username=luan-thnh&avatar=false&theme=alive&width=780&height=350&animate=true&cache_seconds=21600&readme=v2)

```md
![Profile Identity](https://alive-github-signals.vercel.app/api/profile?username=YOUR_USERNAME&avatar=false)
```

Avatar option:

```text
avatar=true
```

For GitHub READMEs, `avatar=false` is usually faster and more reliable through GitHub Camo.

### Developer Radar

![Developer Radar](https://alive-github-signals.vercel.app/api/radar?username=luan-thnh&theme=alive&width=780&height=520&animate=true&cache_seconds=21600&readme=v2)

```md
![Developer Radar](https://alive-github-signals.vercel.app/api/radar?username=YOUR_USERNAME)
```

### Terminal

![GitHub Terminal](https://alive-github-signals.vercel.app/api/terminal?username=luan-thnh&theme=alive&width=760&height=370&animate=true&cache_seconds=21600&readme=v2)

```md
![GitHub Terminal](https://alive-github-signals.vercel.app/api/terminal?username=YOUR_USERNAME)
```

### Compare two users

![User Compare](https://alive-github-signals.vercel.app/api/compare?username=luan-thnh&compare_username=torvalds&theme=alive&width=1040&height=500&animate=true&cache_seconds=21600&readme=v2)

```md
![GitHub Compare](https://alive-github-signals.vercel.app/api/compare?username=USER_ONE&compare_username=USER_TWO)
```

---

## 03 — Languages and repositories

### Language Field

![Language Field](https://alive-github-signals.vercel.app/api/languages?username=luan-thnh&layout=field&langs_count=7&theme=alive&width=760&height=390&animate=true&cache_seconds=21600&readme=v2)

```md
![Languages](https://alive-github-signals.vercel.app/api/languages?username=YOUR_USERNAME&layout=field&langs_count=7)
```

### Language Orbit

![Language Orbit](https://alive-github-signals.vercel.app/api/languages?username=luan-thnh&layout=orbit&langs_count=7&theme=alive&width=760&height=430&animate=true&cache_seconds=21600&readme=v2)

```md
![Language Orbit](https://alive-github-signals.vercel.app/api/languages?username=YOUR_USERNAME&layout=orbit&langs_count=7)
```

### Language Constellation

![Language Constellation](https://alive-github-signals.vercel.app/api/constellation?username=luan-thnh&langs_count=9&theme=alive&width=860&height=500&animate=true&cache_seconds=21600&readme=v2)

```md
![Language Constellation](https://alive-github-signals.vercel.app/api/constellation?username=YOUR_USERNAME&langs_count=9)
```

### Repository Stack

![Repository Stack](https://alive-github-signals.vercel.app/api/repos?username=luan-thnh&count=6&theme=alive&width=940&height=540&animate=true&cache_seconds=21600&readme=v2)

```md
![Repository Stack](https://alive-github-signals.vercel.app/api/repos?username=YOUR_USERNAME&count=6)
```

`count` accepts values from `2` to `10`.

### Single Repository

![Repository Card](https://alive-github-signals.vercel.app/api/repo?username=luan-thnh&repo=alive-github-signals&theme=alive&width=720&height=310&animate=true&cache_seconds=21600&readme=v2)

```md
![Repository Card](https://alive-github-signals.vercel.app/api/repo?username=OWNER&repo=REPOSITORY_NAME)
```

---

## 04 — Activity systems

### Contribution Pulse

![Contribution Pulse](https://alive-github-signals.vercel.app/api/pulse?username=luan-thnh&theme=alive&width=980&height=190&animate=true&cache_seconds=21600&readme=v2)

```md
![Contribution Pulse](https://alive-github-signals.vercel.app/api/pulse?username=YOUR_USERNAME)
```

### Contribution Timeline

![Contribution Timeline](https://alive-github-signals.vercel.app/api/timeline?username=luan-thnh&theme=alive&width=940&height=360&animate=true&cache_seconds=21600&readme=v2)

```md
![Contribution Timeline](https://alive-github-signals.vercel.app/api/timeline?username=YOUR_USERNAME)
```

### Year In Code

![Year In Code](https://alive-github-signals.vercel.app/api/year?username=luan-thnh&theme=alive&width=940&height=520&animate=true&cache_seconds=21600&readme=v2)

```md
![Year In Code](https://alive-github-signals.vercel.app/api/year?username=YOUR_USERNAME)
```

### Activity Calendar

![Activity Calendar](https://alive-github-signals.vercel.app/api/activity?username=luan-thnh&theme=alive&width=920&height=300&animate=true&cache_seconds=21600&readme=v2)

```md
![GitHub Activity](https://alive-github-signals.vercel.app/api/activity?username=YOUR_USERNAME)
```

### Streak

![GitHub Streak](https://alive-github-signals.vercel.app/api/streak?username=luan-thnh&theme=alive&width=690&height=280&animate=true&cache_seconds=21600&readme=v2)

```md
![GitHub Streak](https://alive-github-signals.vercel.app/api/streak?username=YOUR_USERNAME)
```

### Metrics Ticker

![Metrics Ticker](https://alive-github-signals.vercel.app/api/ticker?username=luan-thnh&theme=alive&width=1100&height=64&animate=true&cache_seconds=21600&readme=v2)

```md
![GitHub Metrics](https://alive-github-signals.vercel.app/api/ticker?username=YOUR_USERNAME)
```

---

## 05 — README utilities

### Real metric badge

![Contribution Badge](https://alive-github-signals.vercel.app/api/badge?username=luan-thnh&metric=contributions&label=CONTRIBUTIONS&theme=alive&animate=true&cache_seconds=21600&readme=v2)

```md
![Contributions](https://alive-github-signals.vercel.app/api/badge?username=YOUR_USERNAME&metric=contributions&label=CONTRIBUTIONS)
```

Supported metrics:

```text
commits
contributions
stars
followers
repos
repositories
prs
issues
streak
```

### Social signal

The account must be publicly listed on the requested GitHub profile.

![GitHub Social](https://alive-github-signals.vercel.app/api/social?username=luan-thnh&platform=github&variant=stack&theme=alive&animate=true&cache_seconds=21600&readme=v2)

```md
![GitHub](https://alive-github-signals.vercel.app/api/social?username=YOUR_USERNAME&platform=github&variant=stack)
```

Platforms:

```text
github
youtube
facebook
linkedin
instagram
tiktok
x
discord
telegram
zalo
website
email
```

Variants:

```text
rail
bracket
stack
compact
```

### Button

![Alive Button](https://alive-github-signals.vercel.app/api/button?label=VIEW+SYSTEM&icon=github&variant=bracket&theme=alive&width=240&height=46&animate=true&readme=v2)

```md
![View System](https://alive-github-signals.vercel.app/api/button?label=VIEW+SYSTEM&icon=github&variant=bracket)
```

### Status

![Alive Status](https://alive-github-signals.vercel.app/api/status?label=AVAILABLE+FOR+WORK&state=online&theme=alive&width=300&height=58&animate=true&readme=v2)

```md
![Status](https://alive-github-signals.vercel.app/api/status?label=AVAILABLE+FOR+WORK&state=online)
```

---

# Query parameter reference

## Shared parameters

| Parameter | Description | Example |
|---|---|---|
| `username` | GitHub login used as the real data source | `username=luan-thnh` |
| `theme` | Built-in theme | `theme=alive` |
| `width` | SVG width within endpoint bounds | `width=1200` |
| `height` | SVG height within endpoint bounds | `height=620` |
| `animate` | Enable or disable SVG motion | `animate=false` |
| `cache_seconds` | CDN cache duration, 300–86400 | `cache_seconds=21600` |
| `period` | Commit period | `period=year` or `period=all` |
| `repo_pages` | Repository pages used for aggregation, 1–5 | `repo_pages=1` |
| `exclude_langs` | Languages to exclude | `exclude_langs=HTML,CSS` |
| `title` | Accessible custom title | `title=My+GitHub+Signal` |
| `download` | Return SVG as an attachment | `download=1` |

## Color overrides

```text
accent=C8FF4D
accent2=F3F0EA
bg=080808
text=F3F0EA
muted=94978F
border=2B302D
```

Example:

```md
![Custom Stats](https://alive-github-signals.vercel.app/api/stats?username=YOUR_USERNAME&accent=58F4FF&bg=050511&text=FFFFFF)
```

## Built-in themes

```text
alive
paper
cobalt
ember
mono
```

---

# Recommended GitHub profile layout

```md
![Overview](https://alive-github-signals.vercel.app/api/overview?username=YOUR_USERNAME&width=1200&height=620)

![Projects](https://alive-github-signals.vercel.app/api/projects?username=YOUR_USERNAME&width=1200&height=620)

![Signal Board](https://alive-github-signals.vercel.app/api/signal-board?username=YOUR_USERNAME&width=1200&height=620)

![Year Board](https://alive-github-signals.vercel.app/api/year-board?username=YOUR_USERNAME&width=1200&height=620)

![Activity](https://alive-github-signals.vercel.app/api/activity?username=YOUR_USERNAME&width=1200&height=320)
```

Avoid putting large SVGs inside Markdown tables. GitHub tables remain multi-column on narrow screens and can leave empty space or make the text too small.

---

<a id="deploy-your-own-instance"></a>

# Deploy your own instance

## 1. Clone

```bash
git clone https://github.com/luan-thnh/alive-github-signals.git
cd alive-github-signals
npm install
```

## 2. Create `.env.local`

```env
GITHUB_TOKEN=github_pat_xxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_REPOSITORY_URL=https://github.com/YOUR_USERNAME/alive-github-signals
DEFAULT_CACHE_SECONDS=300
```

Never prefix the GitHub token with `NEXT_PUBLIC_`.

## 3. Run locally

```bash
npm run dev
```

Test:

```text
http://localhost:3000/api/signal?username=YOUR_USERNAME
```

## 4. Deploy to Vercel

1. Push the repository to GitHub.
2. Import it into Vercel.
3. Add `GITHUB_TOKEN` in **Settings → Environment Variables**.
4. Set `NEXT_PUBLIC_SITE_URL` to the complete `https://` production URL.
5. Deploy.
6. Open `/api/health`.

Multiple tokens can be configured for rotation:

```env
GITHUB_TOKEN=github_pat_first
GITHUB_TOKEN_2=github_pat_second
GITHUB_TOKEN_3=github_pat_third
```

---

# Data and caching behavior

- User-backed endpoints require `username`.
- Repository cards require `username` and `repo`.
- Compare requires `username` and `compare_username`.
- Social endpoints use accounts published on the GitHub profile.
- GitHub API failures become designed error SVGs.
- The default cache duration is 300 seconds.
- `cache_seconds=21600` is recommended for public READMEs.

## GitHub Camo cache

When a direct endpoint works but GitHub still displays an old error, add a harmless version parameter and commit the changed URL:

```text
&v=2
```

```md
![Activity](https://alive-github-signals.vercel.app/api/activity?username=YOUR_USERNAME&v=2)
```

---

# Compatibility aliases

```text
/api
/api/top-langs
/api/pin
/api/calendar
/api/repo-stack
/api/year-in-code
/api/galaxy
/api/marquee
/api/heartbeat
```

Canonical endpoints are recommended for new integrations.

# Development checks

```bash
npm run typecheck
npm test
npm run build
```

Generate previews from real data:

```bash
GITHUB_TOKEN=github_pat_xxx \
LIVE_PREVIEW_USERNAME=luan-thnh \
npm run preview:generate
```

# Security

- Keep GitHub tokens server-side.
- Use minimum token permissions.
- Rotate exposed tokens immediately.
- Query text is bounded and XML-escaped.
- Dimensions and cache duration are clamped.
- No database is required.
- No client-side token exposure occurs.

# License

MIT © luanthnh

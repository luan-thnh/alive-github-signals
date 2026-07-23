# Alive GitHub Signals API

Base URL:

```text
https://your-domain.vercel.app
```

All user-backed routes require `username` and fetch real GitHub data. Responses
are SVG images unless the route is `/api/health`.

## Profile systems

### `/api/signal`

Full Alive Interface system panel.

```text
/api/signal?username=luan-thnh&theme=alive&animate=true
```

### `/api/stats`

```text
/api/stats?username=luan-thnh&variant=editorial
/api/stats?username=luan-thnh&variant=orbit
```

Parameters: `variant=editorial|orbit`, `period=year|all`.

### `/api/radar`

Six-axis activity radar derived from real metrics. The polygon uses logarithmic
normalization so very large GitHub accounts remain readable.

```text
/api/radar?username=luan-thnh
```

Axes: code, ship, collaboration, impact, streak and activity.

### `/api/compare`

```text
/api/compare?username=luan-thnh&compare_username=torvalds
```

`compare_username` is required.

### `/api/profile`

```text
/api/profile?username=luan-thnh&avatar=true
```

`avatar=true` embeds the public GitHub avatar into the SVG.

### `/api/terminal`

```text
/api/terminal?username=luan-thnh
```

## Activity systems

### `/api/pulse`

```text
/api/pulse?username=luan-thnh
```

Compact real 52-week contribution waveform.

### `/api/timeline`

```text
/api/timeline?username=luan-thnh
```

Aggregates the contribution calendar into the latest twelve months.

### `/api/year`

```text
/api/year?username=luan-thnh
```

Displays total contributions, active days, strongest month, longest streak,
daily average and primary language.

### `/api/activity`

```text
/api/activity?username=luan-thnh
```

### `/api/streak`

```text
/api/streak?username=luan-thnh
```

### `/api/ticker`

```text
/api/ticker?username=luan-thnh&width=1100
```

Animated compact metric ticker.

## Code and repository systems

### `/api/languages`

```text
/api/languages?username=luan-thnh&layout=field&langs_count=6
/api/languages?username=luan-thnh&layout=orbit&langs_count=8
```

### `/api/constellation`

```text
/api/constellation?username=luan-thnh&langs_count=8
```

Language node size is based on real repository language percentage.

### `/api/repos`

```text
/api/repos?username=luan-thnh&count=6
/api/repos?username=luan-thnh&count=8&include_archived=true
```

Repositories are ordered by GitHub `UPDATED_AT`.

### `/api/repo`

```text
/api/repo?username=luan-thnh&repo=music-player
```

## Compact utilities

### `/api/badge`

```text
/api/badge?username=luan-thnh&metric=commits&label=COMMITS
```

Real metrics: `commits`, `contributions`, `stars`, `followers`, `repos`,
`repositories`, `prs`, `issues`, `streak`.

### `/api/social`

```text
/api/social?username=luan-thnh&platform=github&variant=stack
```

Platforms: `github`, `youtube`, `facebook`, `linkedin`, `instagram`, `tiktok`,
`x`, `discord`, `telegram`, `zalo`, `website`, `email`.

The account must be publicly available through the selected GitHub profile.

### `/api/button`

```text
/api/button?label=VIEW+PROJECT&icon=github&variant=bracket
```

This route renders query-controlled artwork and does not claim GitHub metrics.

### `/api/status`

```text
/api/status?label=AVAILABLE+FOR+WORK&state=online
```

## Shared parameters

| Parameter | Description |
|---|---|
| `username` | Real GitHub login |
| `theme` | `alive`, `paper`, `cobalt`, `ember`, `mono` |
| `animate` | Defaults to `true` |
| `accent` | Primary custom hex color |
| `accent2` | Secondary custom hex color |
| `bg` | Background color |
| `text` | Main text color |
| `muted` | Secondary text color |
| `border` | Border color |
| `width` | Bounded SVG width |
| `height` | Bounded SVG height |
| `title` | Accessible custom title |
| `period` | `year` or `all` |
| `exclude_langs` | Comma-separated languages |
| `repo_pages` | Repository pages used for aggregation, 1–5 |
| `cache_seconds` | CDN cache, 300–86400 seconds |
| `download` | `1` sends SVG as an attachment |

## Errors

Invalid queries and GitHub failures are returned as designed SVG error cards.
No user-backed endpoint substitutes bundled values.


## Composition boards

| Endpoint | Purpose |
|---|---|
| `/api/overview` | Identity, live metrics, primary material, and recent systems |
| `/api/projects` | Featured project with a secondary repository queue |
| `/api/signal-board` | Radar, language orbit, and language density |
| `/api/year-board` | Annual recap, 52-week pulse, and monthly timeline |

All composition boards require `username` and use real GitHub data.

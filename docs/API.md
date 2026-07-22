# API reference

Every card endpoint responds with `image/svg+xml` and can be embedded directly in
Markdown or HTML.

```md
![Alive signal](https://your-domain.vercel.app/api/signal?username=luan-thnh)
```

## Shared parameters

| Parameter | Purpose | Example |
|---|---|---|
| `username` | GitHub login | `luan-thnh` |
| `theme` | `alive`, `paper`, `cobalt`, `ember`, `mono` | `alive` |
| `accent` | Custom hex without `#` | `C8FF4D` |
| `accent2` | Secondary custom hex | `F3F0EA` |
| `bg` | Background hex | `090B0E` |
| `text` | Main text hex | `F3F0EA` |
| `muted` | Supporting text hex | `94978F` |
| `border` | Border hex | `2B302D` |
| `width` / `height` | Bounded SVG dimensions | `width=900` |
| `title` | Accessible custom title | `title=My+Signal` |
| `animate` | Enable SVG pulse/scan animation | `true` |
| `cache_seconds` | CDN cache, 300–86400 seconds; default 300 | `300` |
| `demo` | Use built-in sample data without a token | `true` |
| `download` | Return an attachment header | `1` |
| `period` | `year` or `all` commit count | `all` |
| `exclude_langs` | Comma-separated languages | `HTML,CSS` |
| `repo_pages` | Repository pages to aggregate, 1–5 | `3` |

## Endpoints

### `/api/stats`

```text
/api/stats?username=luan-thnh&variant=editorial
/api/stats?username=luan-thnh&variant=orbit&theme=cobalt
```

`/api` is a compatibility alias for `/api/stats`.

### `/api/languages`

```text
/api/languages?username=luan-thnh&layout=field&langs_count=6
/api/top-langs?username=luan-thnh&layout=orbit
```

Aliases: `/api/top-langs`, `/api/langs`.

### `/api/repo`

```text
/api/repo?username=luan-thnh&repo=music-player
/api/pin?username=luan-thnh&repo=music-player
```

### `/api/streak`

```text
/api/streak?username=luan-thnh&theme=alive
```

### `/api/activity`

```text
/api/activity?username=luan-thnh&width=1000
```

Alias: `/api/calendar`.

### `/api/profile`

```text
/api/profile?username=luan-thnh&avatar=true
```

`avatar=true` fetches the GitHub avatar server-side and embeds it as a data URI.

### `/api/signal`

The full Alive Interface composition.

```text
/api/signal?username=luan-thnh&animate=true
```

### `/api/terminal`

```text
/api/terminal?username=luan-thnh&theme=mono
```

### `/api/badge`

Data-driven metrics:

```text
/api/badge?username=luan-thnh&metric=commits&label=COMMITS
/api/badge?username=luan-thnh&metric=followers&variant=bracket
```

Supported metrics: `commits`, `contributions`, `stars`, `followers`, `repos`,
`repositories`, `prs`, `issues`, `streak`.

Static badge:

```text
/api/badge?label=BUILD&value=PASSING
```

### `/api/button`

Buttons are SVG artwork. Wrap them in a Markdown or HTML link to make them
clickable.

```md
[![Portfolio](https://your-domain.vercel.app/api/button?label=VIEW+PORTFOLIO)](https://example.com)
```

Parameters: `label`, `icon=arrow|github|code|plus|play`,
`variant=rail|bracket`, `width`.

### `/api/status`

```text
/api/status?label=AVAILABLE+FOR+WORK&state=online
/api/status?label=FOCUS+MODE&state=busy&theme=ember
```

States: `online`, `busy`, `offline`, `error`. Use `value` to override the visible
state text.

## Cache behavior

The server requests fresh data from GitHub on a cache miss. Vercel's CDN then
caches the generated SVG according to `cache_seconds`. The default is five minutes (`300` seconds). Increase the value for high-traffic deployments to preserve GitHub API rate limits.


## Social

```text
GET /api/social
```

Parameters:

- `platform`: `github`, `youtube`, `facebook`, `linkedin`, `instagram`, `tiktok`, `x`, `discord`, `telegram`, `zalo`, `website`, `email`
- `label`: main uppercase label
- `handle`: account name, URL hint, or contact detail
- `variant`: `rail`, `bracket`, `stack`, `compact`
- `brand=true`: use the platform accent color
- Common theme, color, size, and animation parameters remain supported.

The `/api/button` endpoint accepts the same platform names through `icon=`.

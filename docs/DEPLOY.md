# Deploy to Vercel

## 1. Create a GitHub repository

Push this project without committing `.env.local`.

## 2. Import into Vercel

Vercel detects Next.js automatically. The included `vercel.json` prefers the
Singapore region for lower latency in Southeast Asia.

## 3. Add environment variables

Required:

```text
GITHUB_TOKEN=github_pat_xxxxxxxxxxxxxxxxxxxx
```

Optional:

```text
GITHUB_TOKEN_2=github_pat_xxxxxxxxxxxxxxxxxxxx
GITHUB_TOKEN_3=github_pat_xxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_REPOSITORY_URL=https://github.com/YOUR_USERNAME/alive-github-signals
DEFAULT_CACHE_SECONDS=300
```

Tokens stay on the server and are never rendered into SVG output or client-side
JavaScript. Multiple tokens are selected randomly to spread requests.

## 4. Verify

```text
https://your-domain.vercel.app/api/health
https://your-domain.vercel.app/api/signal?username=luan-thnh
```

## GitHub token guidance

For public-profile data, use the minimum access required. Do not expose the token
in a `NEXT_PUBLIC_` variable. Rotate it immediately if it is ever committed.


## Required behavior

`GITHUB_TOKEN` is mandatory for every user-backed SVG. The service intentionally
does not substitute bundled user data when the token is absent or rate-limited.

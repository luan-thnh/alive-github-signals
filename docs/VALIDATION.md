# Validation report — v1.1.0

## Passed

- TypeScript syntax transpilation passed for all `app`, `components`, `lib`, `scripts`, and `tests` source files.
- Full-source TypeScript structure check passed with local framework shims.
- Strict type checking passed for the renderer, params, themes, demo data, and custom social icon modules.
- Eight compiled Node tests passed, including the new `/api/social` renderer.
- Fourteen social/button preview SVG compositions were generated.
- Every generated social SVG parsed successfully as XML.
- Custom social glyph smoke tests passed for GitHub, YouTube, Facebook, LinkedIn, Instagram, TikTok, X, Discord, Telegram, Zalo, website, and email.
- Demo mode is opt-in; the Builder defaults to live GitHub data.
- Username and repository fields are debounced, and preview refresh uses a cache-busting query value.
- The metadata site URL is normalized before calling `new URL()`, preventing Vercel `ERR_INVALID_URL` failures when the protocol is omitted.
- No credentials or environment values are exposed to the client bundle.

## Environment limitation

The package registry did not complete dependency installation in this container, so a real `next build` was not claimed as successful here. Run the following in Vercel or a networked local environment:

```bash
npm install
npm run check
```

The source does not include a fabricated lockfile or a false production-build claim.

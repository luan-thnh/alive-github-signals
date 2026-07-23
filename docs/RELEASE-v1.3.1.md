# v1.3.1 — Legacy Build Cleanup

## Fixed

Next.js type-checking includes every TypeScript file matched by `tsconfig.json`,
even when a file is no longer imported. Repositories upgraded by copying new
files over an old checkout could therefore retain `lib/demo.ts` from v1.1.

That stale file used the previous `ProfileData` structure and caused errors for:

- `websiteUrl`
- `email`
- `twitterUsername`
- `socialAccounts`
- `recentRepositories`

## Protection added

- Removed `lib/demo.ts` from the release.
- Added `scripts/clean-legacy.mjs`.
- Cleanup runs before dev, build, type-check and tests.
- Added explicit TypeScript exclusions for known legacy files.
- Removed stale generated preview and incremental build files.

The service remains real-data-only. No replacement demo object was added.

# v1.3.2 — GitHub Camo and Orbit Stability

## Fixed

- Language Orbit no longer animates CSS `transform` on SVG circles.
- Orbit motion now uses `stroke-dashoffset`, preserving the exact center in GitHub Camo.
- The same safe orbit primitive is used by stats rings and Language Constellation.
- README-critical activity/profile endpoints default to one repository page; language-heavy endpoints retain broader aggregation unless `repo_pages` is supplied.
- Avatar downloads are resized, limited to 1.8 seconds and capped at 256 KB.
- Added explicit CDN and cross-origin response headers for README image proxies.

## GitHub README recommendation

Use `repo_pages=1`, a long `cache_seconds`, and a version query such as `v=20260723-2` to bypass a previously cached Camo failure. For maximum reliability, use `avatar=false` in the profile card embedded on GitHub.

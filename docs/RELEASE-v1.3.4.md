# v1.3.4 — Composition Boards

## Added

- `/api/overview` — asymmetric identity and metric board.
- `/api/projects` — featured repository plus recent-system stack.
- `/api/signal-board` — radar, language orbit, and density rail in one SVG.
- `/api/year-board` — year recap, pulse, and monthly timeline in one SVG.

Each endpoint is one full-width responsive SVG, but its internal composition uses
unequal columns, nested rails, featured panels, and layered data regions.

## Why

GitHub Markdown tables do not collapse reliably on mobile. Composition boards
provide visual variety on desktop while scaling as a single image on mobile.

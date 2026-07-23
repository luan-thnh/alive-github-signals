# Validation Report — v1.3.0

## Passed in the delivery environment

- 20 TS/TSX files passed TypeScript syntax transpilation.
- Core data and renderer files passed strict TypeScript validation with environment declarations.
- Eight new renderer outputs were generated successfully.
- Pulse, radar, constellation, timeline, repository stack, year recap, compare and ticker SVGs parsed as valid XML.
- New endpoint aliases resolve to canonical card kinds.
- No runtime bundled sample profile or numeric metric fallback is present.
- Animated renderers retain `prefers-reduced-motion` support.

## Full project build

The complete Next.js build requires installed npm dependencies:

```bash
npm install
npm run check
```

## v1.3.1 build regression

- Release archive does not contain `lib/demo.ts`.
- `clean:legacy` removes stale demo and generated files.
- Cleanup runs before build, type-check, tests and development.
- `tsconfig.json` excludes known v1.1 legacy files.
- No mock `ProfileData` object was introduced.

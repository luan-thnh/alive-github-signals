import { rm } from "node:fs/promises";

const stalePaths = [
  "lib/demo.ts",
  "tests/render.test.ts",
  "scripts/render-previews.ts",
  "docs/previews",
  "docs/previews-v1.1",
  "tsconfig.tsbuildinfo",
];

for (const stalePath of stalePaths) {
  await rm(stalePath, { recursive: true, force: true });
}

console.log("Legacy demo and generated build files removed.");

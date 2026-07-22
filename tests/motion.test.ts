import assert from "node:assert/strict";
import test from "node:test";
import { buildContext } from "../lib/render";
import { resolveTheme } from "../lib/themes";
import { svgDocument } from "../lib/render/svg";

test("motion is enabled by default", () => {
  const context = buildContext("button", new URLSearchParams());
  assert.equal(context.animate, true);
});

test("animate=false disables animation definitions", () => {
  const context = buildContext("button", new URLSearchParams({ animate: "false" }));
  assert.equal(context.animate, false);
});

test("animated SVG contains native motion primitives", () => {
  const theme = resolveTheme(new URLSearchParams());
  const svg = svgDocument({
    width: 240,
    height: 80,
    theme,
    body: '<circle class="pulse" cx="40" cy="40" r="6"/>',
    title: "motion test",
    description: "motion test",
    animate: true,
  });
  assert.match(svg, /@keyframes alive-scan/);
  assert.match(svg, /class="scan-beam"/);
  assert.match(svg, /prefers-reduced-motion/);
});

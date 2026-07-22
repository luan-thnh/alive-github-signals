import assert from "node:assert/strict";
import test from "node:test";
import { demoProfile } from "../lib/demo";
import { buildContext } from "../lib/render";
import { renderBadge, renderSignal, renderStats } from "../lib/render/cards";

test("signal renderer emits accessible SVG and escapes title input", () => {
  const params = new URLSearchParams({ title: "<unsafe>&title", demo: "true" });
  const context = buildContext("signal", params);
  const svg = renderSignal(demoProfile, context);
  assert.match(svg, /^<svg/);
  assert.match(svg, /role="img"/);
  assert.doesNotMatch(svg, /<unsafe>/);
  assert.match(svg, /ALIVE GITHUB SIGNAL/);
});

test("stats renderer supports orbit composition", () => {
  const params = new URLSearchParams({ variant: "orbit" });
  const context = buildContext("stats", params);
  const svg = renderStats(demoProfile, context);
  assert.match(svg, /GITHUB ORBIT/);
  assert.match(svg, /CONTRIBUTIONS/);
});

test("badge renderer can use a live profile metric", () => {
  const params = new URLSearchParams({ metric: "commits", label: "commits" });
  const context = buildContext("badge", params);
  const svg = renderBadge(demoProfile, context);
  assert.match(svg, /COMMITS/);
  assert.match(svg, /340/);
});

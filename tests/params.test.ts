import assert from "node:assert/strict";
import test from "node:test";
import {
  parseBoolean,
  parseCardKind,
  parseHex,
  parseInteger,
} from "../lib/params";

test("card aliases resolve to canonical card kinds", () => {
  assert.equal(parseCardKind("top-langs"), "languages");
  assert.equal(parseCardKind("pin"), "repo");
  assert.equal(parseCardKind("signal"), "signal");
  assert.equal(parseCardKind("unknown"), null);
});

test("boolean and integer parsing is bounded", () => {
  assert.equal(parseBoolean("yes"), true);
  assert.equal(parseBoolean("0"), false);
  assert.equal(parseInteger("1000", 20, 10, 100), 100);
  assert.equal(parseInteger("bad", 20, 10, 100), 20);
});

test("hex colors are normalized for SVG alpha composition", () => {
  assert.equal(parseHex("c8f"), "#CC88FF");
  assert.equal(parseHex("#c8ff4d"), "#C8FF4D");
  assert.equal(parseHex("#c8ff4d99"), "#C8FF4D");
  assert.equal(parseHex("not-a-color"), null);
});

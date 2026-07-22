import assert from "node:assert/strict";
import test from "node:test";
import { calculateStreaks } from "../lib/github/client";

const day = (date: string, count: number) => ({ date, count, weekday: 0 });

test("streak calculator finds current and longest sequences", () => {
  const calendar = [
    day("2026-07-15", 1),
    day("2026-07-16", 2),
    day("2026-07-17", 0),
    day("2026-07-18", 1),
    day("2026-07-19", 3),
    day("2026-07-20", 1),
  ];
  assert.deepEqual(calculateStreaks(calendar), { current: 3, longest: 3 });
});

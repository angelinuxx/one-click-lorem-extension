import { test } from "node:test";
import assert from "node:assert/strict";
import { FRAGMENTS, buildText } from "./lorem.js";

const paragraphsOf = (text) => text.split("\n\n");

test("1x1 returns the first fragment without a trailing period", () => {
  assert.equal(buildText(1, 1), "Lorem ipsum dolor sit amet");
});

test("1x3 joins fragments with their leading separators and ends with a period", () => {
  assert.equal(
    buildText(1, 3),
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
  );
});

test("2x3 continues from the next fragment, dropping its separator and capitalizing", () => {
  const paragraphs = paragraphsOf(buildText(2, 3));
  assert.equal(paragraphs.length, 2);
  assert.equal(paragraphs[1], "Ut labore et dolore magna aliqua. Ut enim ad minim veniam.");
});

test("5x6 returns 5 well-formed paragraphs", () => {
  const paragraphs = paragraphsOf(buildText(5, 6));
  assert.equal(paragraphs.length, 5);
  for (const p of paragraphs) {
    assert.match(p, /^[A-Z]/, "paragraph starts with a capital letter");
    assert.ok(p.endsWith("."), "paragraph ends with a period");
    assert.ok(!p.includes("  "), "no double spaces");
    assert.ok(!/[,.]\s*[,.]/.test(p), "no adjacent punctuation");
  }
});

test("fragments cycle back to the beginning as a new sentence", () => {
  assert.ok(FRAGMENTS.length >= 30);
  assert.equal(FRAGMENTS[0], ". Lorem ipsum dolor sit amet");
  for (const f of FRAGMENTS) {
    assert.match(f, /^(, |\. | ut | et )\S/, `fragment starts with a separator: "${f}"`);
    assert.ok(!f.endsWith("."), `fragment does not end with a period: "${f}"`);
  }
});

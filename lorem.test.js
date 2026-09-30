import { test } from "node:test";
import assert from "node:assert/strict";
import { SENTENCES, buildText } from "./lorem.js";

const paragraphsOf = (text) => text.split("\n\n");

test("1x1 returns the first sentence only", () => {
  assert.equal(buildText(1, 1), SENTENCES[0]);
});

test("2x3 returns 2 paragraphs of 3 sentences each", () => {
  const paragraphs = paragraphsOf(buildText(2, 3));
  assert.equal(paragraphs.length, 2);
  assert.equal(paragraphs[0], SENTENCES.slice(0, 3).join(" "));
  assert.equal(paragraphs[1], SENTENCES.slice(3, 6).join(" "));
});

test("5x6 returns 5 paragraphs of 6 sentences, cycling the source", () => {
  const paragraphs = paragraphsOf(buildText(5, 6));
  assert.equal(paragraphs.length, 5);
  for (const p of paragraphs) {
    assert.equal(p.split(". ").length, 6);
  }
  assert.ok(paragraphs[0].startsWith("Lorem ipsum dolor sit amet"));
  const all = paragraphs.join(" ").split(". ");
  for (let i = 1; i < all.length; i++) {
    assert.notEqual(all[i], all[i - 1], "no two consecutive sentences repeat");
  }
});

test("source has at least 20 sentences, each ending with a period", () => {
  assert.ok(SENTENCES.length >= 20);
  for (const s of SENTENCES) {
    assert.ok(s.endsWith("."), `sentence should end with a period: ${s}`);
    assert.ok(!s.includes("\n"));
  }
});

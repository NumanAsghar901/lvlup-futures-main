import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const readProjectFile = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('evaluation controls are re-initialized whenever the route mounts', async () => {
  const [page, bridge, legacyScript] = await Promise.all([
    readProjectFile('src/app/evaluation/page.tsx'),
    readProjectFile('src/app/evaluation/EvaluationInteractions.tsx'),
    readProjectFile('public/assets/js/live/evaluation.js'),
  ]);

  assert.match(page, /<EvaluationInteractions\s*\/>/);
  assert.match(bridge, /^['"]use client['"];?/);
  assert.match(bridge, /onReady=\{initializeEvaluationPage\}/);
  assert.match(legacyScript, /window\.lvevInitializePage\s*=\s*initializeEvaluationPage/);
});

test('evaluation initialization is idempotent for pricing and configuration controls', async () => {
  const legacyScript = await readProjectFile('public/assets/js/live/evaluation.js');

  assert.match(legacyScript, /root\.dataset\.lvevE2Ready/);
  assert.match(legacyScript, /root\.dataset\.lvevE3Ready/);
  assert.match(legacyScript, /window\.lvevInitializePage\(\)/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { inlineCss } from '../scripts/inline-css.mjs';

const read = (p) => readFileSync(p, 'utf8');
const page = '<head><link rel="stylesheet" href="css/tokens.css">\n<link rel="stylesheet" href="css/styles.css"></head>';

test('replaces both stylesheet links with their contents, in order', () => {
  const out = inlineCss(page, (p) => `/* ${p} */`);
  assert.ok(!out.includes('<link'));
  assert.ok(out.indexOf('css/tokens.css') < out.indexOf('css/styles.css'));
  assert.equal(out.match(/<style>/g).length, 2);
});

test('keeps $ sequences in the CSS literal', () => {
  assert.ok(inlineCss(page, () => 'a::after{content:"$&"}').includes('content:"$&"'));
});

test('throws when a stylesheet link is missing, so a broken page is never deployed', () => {
  assert.throws(() => inlineCss('<head></head>', () => ''), /no <link/);
});

test('the real index.html inlines cleanly and keeps no local stylesheet link', () => {
  const out = inlineCss(read('index.html'), read);
  assert.ok(!/href="css\//.test(out));
  assert.ok(out.includes(':root'));
});

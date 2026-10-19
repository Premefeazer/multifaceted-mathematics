import test from 'node:test';
import assert from 'node:assert/strict';
import { STARS, INITIAL, evaluate, equation, describeSlope } from '../js/lineit.js';

const text = (m, b) => equation(m, b).map((t) => t.text).join('');

test('the line through both stars solves the puzzle', () => {
  const r = evaluate(-1.5, 1);
  assert.deepEqual(r.hits, [true, true]);
  assert.equal(r.solved, true);
  assert.equal(r.hint, '');
});

test('the starting line does not solve it', () => {
  assert.equal(evaluate(INITIAL.m, INITIAL.b).solved, false);
});

test('hints point a direction without giving the answer', () => {
  assert.match(evaluate(1, 0).hint, /slope is too high/);
  assert.match(evaluate(-3, 0).hint, /slope is too low/);
  assert.match(evaluate(-1.5, 0).hint, /raising b/);
  assert.match(evaluate(-1.5, 3).hint, /lowering b/);
  assert.ok(!/-?1\.5|\b1\b/.test(evaluate(1, 0).hint), 'hint must not reveal numbers');
});

test('a line through only one star lights only that star', () => {
  const r = evaluate(0, STARS[0].y);
  assert.deepEqual(r.hits, [true, false]);
  assert.match(r.hint, /One star/);
});

test('equation drops a 1 coefficient and a zero intercept', () => {
  assert.equal(text(-1.5, 1), 'y=−1.5x+1');
  assert.equal(text(1, 0), 'y=x');
  assert.equal(text(-1, -2), 'y=−x−2');
  assert.equal(text(0, 3), 'y=3');
  assert.equal(text(2, 0), 'y=2x');
});

test('describeSlope reads naturally', () => {
  assert.equal(describeSlope(2), 'rises 2 for every step right');
  assert.equal(describeSlope(-1.5), 'falls 1.5 for every step right');
  assert.equal(describeSlope(0), 'stays level');
});

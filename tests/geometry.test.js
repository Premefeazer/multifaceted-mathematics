import test from 'node:test';
import assert from 'node:assert/strict';
import { VERTICES, FACES, faceNormal, dot, sub, normalize, apply, rotationBetween } from '../js/geometry.js';

const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} is not close to ${b}`);
const edges = [...new Set(FACES.flatMap(([a, b, c]) => [[a, b], [b, c], [c, a]].map((e) => e.sort((x, y) => x - y).join('-'))))];

test('12 vertices, 30 edges, 20 faces satisfy Euler V - E + F = 2', () => {
  assert.equal(VERTICES.length, 12);
  assert.equal(edges.length, 30);
  assert.equal(FACES.length, 20);
  assert.equal(VERTICES.length - edges.length + FACES.length, 2);
});

test('vertices are unit length and every edge has the same length', () => {
  VERTICES.forEach((v) => near(Math.hypot(...v), 1));
  const lengths = edges.map((e) => Math.hypot(...sub(...e.split('-').map((i) => VERTICES[i]))));
  lengths.forEach((len) => near(len, lengths[0]));
});

test('every face winds outward (normal points away from the center)', () => {
  FACES.forEach((f, i) => {
    const centroid = f.map((j) => VERTICES[j]).reduce((s, v) => [s[0] + v[0], s[1] + v[1], s[2] + v[2]], [0, 0, 0]);
    assert.ok(dot(faceNormal(i), centroid) > 0, `face ${i} points inward`);
  });
});

test('rotationBetween maps a onto b, including the opposite and identical cases', () => {
  const pairs = [
    [faceNormal(3), normalize([0.3, 0.25, 0.92])],
    [[1, 0, 0], [-1, 0, 0]],
    [[0, 0, 1], [0, 0, 1]],
  ];
  pairs.forEach(([a, b]) => apply(rotationBetween(a, b), a).forEach((v, k) => near(v, b[k])));
});

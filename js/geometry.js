// Pure icosahedron math. No DOM, so node --test can import it.
const PHI = (1 + Math.sqrt(5)) / 2;

export const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
export const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
export const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
export const normalize = (a) => {
  const len = Math.hypot(...a);
  return [a[0] / len, a[1] / len, a[2] / len];
};

export const VERTICES = [
  [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
  [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
  [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1],
].map(normalize);

// Vertex indices per triangle, counter-clockwise seen from outside.
export const FACES = [
  [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
  [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
  [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
  [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
];

export const faceNormal = (i) => {
  const [a, b, c] = FACES[i].map((j) => VERTICES[j]);
  return normalize(cross(sub(b, a), sub(c, a)));
};

// 3x3 matrices: row-major arrays, applied to column vectors.
export const IDENTITY = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
export const rotX = (t) => [[1, 0, 0], [0, Math.cos(t), -Math.sin(t)], [0, Math.sin(t), Math.cos(t)]];
export const rotY = (t) => [[Math.cos(t), 0, Math.sin(t)], [0, 1, 0], [-Math.sin(t), 0, Math.cos(t)]];
export const mul = (a, b) => a.map((row) => [0, 1, 2].map((j) => row[0] * b[0][j] + row[1] * b[1][j] + row[2] * b[2][j]));
export const apply = (m, v) => m.map((row) => dot(row, v));

// Smallest rotation taking unit vector a onto unit vector b (Rodrigues' formula).
export function rotationBetween(a, b) {
  const axis = cross(a, b);
  const s = Math.hypot(...axis);
  const c = dot(a, b);
  if (s < 1e-9) {
    if (c > 0) return IDENTITY;
    const u = normalize(cross(a, Math.abs(a[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0]));
    return IDENTITY.map((row, i) => row.map((_, j) => 2 * u[i] * u[j] - (i === j ? 1 : 0)));
  }
  const [x, y, z] = axis.map((v) => v / s);
  const K = [[0, -z, y], [z, 0, -x], [-y, x, 0]];
  const K2 = mul(K, K);
  return IDENTITY.map((row, i) => row.map((v, j) => v + s * K[i][j] + (1 - c) * K2[i][j]));
}

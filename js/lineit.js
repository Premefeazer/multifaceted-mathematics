// Pure logic for puzzle 1, "Line it up". No DOM, so node --test can import it.
export const STARS = [{ x: -2, y: 4 }, { x: 2, y: -2 }];
export const INITIAL = { m: 1, b: 0 };

const EPS = 1e-9;
const MINUS = '−';

// The one line through both stars: y = TARGET.m * x + TARGET.b.
const TARGET = (() => {
  const [p, q] = STARS;
  const m = (q.y - p.y) / (q.x - p.x);
  return { m, b: p.y - m * p.x };
})();

export const fmt = (n) => (n < 0 ? MINUS : '') + String(Math.abs(n));

// y = mx + b as MathML tokens, dropping a 1 coefficient and a zero term.
export function equation(m, b) {
  const tokens = [{ tag: 'mi', text: 'y' }, { tag: 'mo', text: '=' }];
  if (m === 0) return [...tokens, { tag: 'mn', text: fmt(b) }];
  if (m === -1) tokens.push({ tag: 'mo', text: MINUS });
  else if (m !== 1) tokens.push({ tag: 'mn', text: fmt(m) });
  tokens.push({ tag: 'mi', text: 'x' });
  if (b !== 0) tokens.push({ tag: 'mo', text: b > 0 ? '+' : MINUS }, { tag: 'mn', text: fmt(Math.abs(b)) });
  return tokens;
}

export function describeSlope(m) {
  if (m === 0) return 'stays level';
  return `${m > 0 ? 'rises' : 'falls'} ${Math.abs(m)} for every step right`;
}

// Hints point in a direction but never give the answer.
function hint(m, b, hits) {
  if (hits.some(Boolean)) return 'One star is on the line. Adjust the slope and the intercept together to catch the other.';
  if (Math.abs(m - TARGET.m) > EPS) {
    return m > TARGET.m ? 'The slope is too high. Try lowering it.' : 'The slope is too low. Try raising it.';
  }
  return b > TARGET.b
    ? 'The slope is right. Slide the line down by lowering b.'
    : 'The slope is right. Slide the line up by raising b.';
}

export function evaluate(m, b) {
  const hits = STARS.map(({ x, y }) => Math.abs(m * x + b - y) < EPS);
  const solved = hits.every(Boolean);
  return { hits, solved, hint: solved ? '' : hint(m, b, hits) };
}

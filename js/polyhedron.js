// Draws the draggable icosahedron on a 2D canvas. Colors come from the CSS tokens in tokens.css.
import { VERTICES, FACES, faceNormal, rotationBetween, rotX, rotY, mul, apply, dot, normalize } from './geometry.js';

const EYE = 4; // camera distance, in shape radii
const LIGHT = normalize([-0.5, 0.7, 0.8]);
const SPIN = 0.35; // idle auto-rotation, rad/s
const SETTLE = 2.5; // 1/s: how fast spin eases toward its target
const IDLE_MS = 1500; // pause before auto-rotation resumes
const TAP_PX = 6; // less movement than this counts as a tap, not a drag
const NORMALS = FACES.map((_, i) => faceNormal(i));

const token = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const inTriangle = (p, [a, b, c]) => {
  const side = (u, v) => (p.x - v.x) * (u.y - v.y) - (u.x - v.x) * (p.y - v.y);
  const d1 = side(a, b), d2 = side(b, c), d3 = side(c, a);
  return !((d1 < 0 || d2 < 0 || d3 < 0) && (d1 > 0 || d2 > 0 || d3 > 0));
};

// `accentFace` is drawn orange. `labels` maps a face index to the symbol printed on it; only those faces can be picked.
// `onFace(i)` fires when a labeled face is tapped, and with -1 when the tap lands anywhere else.
// Keyboard: arrow keys turn the shape, Enter or Space steps through the topic faces, Escape clears the pick.
export function mountPolyhedron(canvas, { accentFace, onFace, labels = {} }) {
  const ctx = canvas.getContext('2d');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const color = {
    shades: [1, 2, 3, 4, 5].map((n) => token(`--facet-${n}`)),
    accent: token('--color-accent'),
    accentDeep: token('--color-accent-deep'),
    edge: token('--color-edge'),
    ink: token('--color-ink'),
    font: token('--font-math'),
    sheet: token('--color-sheet'),
    shadow: token('--color-shadow'),
  };

  let R = rotationBetween(NORMALS[accentFace], normalize([0.3, 0.25, 0.92]));
  let vx = 0, vy = 0; // angular velocity around the screen's X and Y axes
  let selected = -1, drag = null, hit = [];
  let lastInput = -Infinity, last = 0, raf = 0, onScreen = true;
  let w = 0, h = 0, dpr = 1;

  const radius = () => Math.min(w, h) * 0.3;
  const rotate = (ax, ay) => { R = mul(rotY(ay), mul(rotX(ax), R)); };

  function draw() {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const r = radius(), cx = w / 2, cy = h / 2 - r * 0.1;

    ctx.fillStyle = color.shadow;
    ctx.beginPath();
    ctx.ellipse(cx, cy + r * 1.45, r * 0.85, r * 0.13, 0, 0, Math.PI * 2);
    ctx.fill();

    const rv = VERTICES.map((v) => apply(R, v));
    const sp = rv.map((p) => {
      const k = EYE / (EYE - p[2]);
      return { x: cx + p[0] * r * k, y: cy - p[1] * r * k };
    });

    ctx.lineJoin = 'round';
    ctx.lineWidth = 1.75;
    ctx.strokeStyle = color.edge;
    hit = [];
    const faces = [];
    FACES.forEach((f, i) => {
      const n = apply(R, NORMALS[i]);
      const c = [0, 1, 2].map((a) => (rv[f[0]][a] + rv[f[1]][a] + rv[f[2]][a]) / 3);
      if (dot(n, [-c[0], -c[1], EYE - c[2]]) <= 0) return; // facing away: convex, so skipping is enough

      const view = [-c[0], -c[1], EYE - c[2]];
      const facing = dot(n, view) / Math.hypot(...view);
      const lit = dot(n, LIGHT);
      const shade = color.shades[Math.max(0, Math.min(4, Math.floor(((lit + 0.3) / 1.3) * 5)))];
      ctx.fillStyle = i === accentFace ? (lit > 0.1 ? color.accent : color.accentDeep) : shade;
      ctx.beginPath();
      f.forEach((j, k) => (k ? ctx.lineTo(sp[j].x, sp[j].y) : ctx.moveTo(sp[j].x, sp[j].y)));
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      const tri = f.map((j) => sp[j]);
      hit.push([i, tri]);
      faces.push({ i, tri, facing });
    });

    // symbols stay upright and fade as their face turns away
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color.ink;
    faces.forEach(({ i, tri, facing }) => {
      const alpha = Math.min(1, (facing - 0.3) / 0.4);
      if (labels[i] === undefined || alpha <= 0) return;
      ctx.globalAlpha = alpha;
      ctx.font = `700 ${r * 0.2 * (0.6 + 0.4 * facing)}px ${color.font}`;
      ctx.fillText(labels[i], (tri[0].x + tri[1].x + tri[2].x) / 3, (tri[0].y + tri[1].y + tri[2].y) / 3);
    });
    ctx.globalAlpha = 1;

    const pick = faces.find((f) => f.i === selected);
    if (pick) {
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = color.ink;
      ctx.beginPath();
      pick.tri.forEach((q, k) => (k ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y)));
      ctx.closePath();
      ctx.stroke();
    }
  }

  const needsFrame = () =>
    onScreen && !document.hidden && (!reduced.matches || drag || Math.abs(vx) > 0.01 || Math.abs(vy) > 0.01);

  function frame(now) {
    raf = 0;
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (!drag) {
      const auto = !reduced.matches && now - lastInput > IDLE_MS;
      const k = 1 - Math.exp(-SETTLE * dt);
      vx -= vx * k;
      vy += ((auto ? SPIN : 0) - vy) * k;
      rotate(vx * dt, vy * dt);
    }
    draw();
    if (needsFrame()) raf = requestAnimationFrame(frame);
  }

  function schedule() {
    if (raf) return;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }

  canvas.addEventListener('pointerdown', (e) => {
    drag = { id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now(), t0: performance.now(), moved: 0 };
    canvas.setPointerCapture(e.pointerId);
    lastInput = drag.t;
    schedule();
  });

  canvas.addEventListener('pointermove', (e) => {
    if (!drag) {
      const rect = canvas.getBoundingClientRect();
      const p = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      canvas.style.cursor = hit.some(([i, tri]) => labels[i] !== undefined && inTriangle(p, tri)) ? 'pointer' : '';
      return;
    }
    if (e.pointerId !== drag.id) return;
    const now = performance.now();
    const dt = Math.max(now - drag.t, 8) / 1000;
    const ay = (e.clientX - drag.x) / radius();
    const ax = (e.clientY - drag.y) / radius();
    rotate(ax, ay);
    vy = 0.7 * vy + 0.3 * (ay / dt);
    vx = 0.7 * vx + 0.3 * (ax / dt);
    drag.moved += Math.hypot(e.clientX - drag.x, e.clientY - drag.y);
    Object.assign(drag, { x: e.clientX, y: e.clientY, t: now });
    lastInput = now;
    schedule();
  });

  function release(e) {
    if (!drag || e.pointerId !== drag.id) return;
    const now = performance.now();
    if (e.type === 'pointerup' && drag.moved < TAP_PX && now - drag.t0 < 500) {
      const rect = canvas.getBoundingClientRect();
      const p = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      const found = hit.find(([, tri]) => inTriangle(p, tri));
      selected = found && labels[found[0]] !== undefined ? found[0] : -1;
      onFace(selected);
    }
    if (reduced.matches || now - drag.t > 80) vx = vy = 0; // no inertia if held still or reduced motion
    drag = null;
    lastInput = now;
    schedule();
  }
  canvas.addEventListener('pointerup', release);
  canvas.addEventListener('pointercancel', release);

  const topicFaces = Object.keys(labels).map(Number).sort((a, b) => a - b);

  canvas.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && topicFaces.length) {
      e.preventDefault();
      selected = topicFaces[(topicFaces.indexOf(selected) + 1) % topicFaces.length];
      R = rotationBetween(NORMALS[selected], normalize([0.3, 0.25, 0.92])); // turn the picked face toward the viewer
      vx = vy = 0;
      lastInput = performance.now();
      onFace(selected);
      schedule();
      return;
    }
    if (e.key === 'Escape' && selected !== -1) {
      selected = -1;
      onFace(-1);
      schedule();
      return;
    }
    const dir = { ArrowLeft: [0, -1], ArrowRight: [0, 1], ArrowUp: [-1, 0], ArrowDown: [1, 0] }[e.key];
    if (!dir) return;
    e.preventDefault();
    lastInput = performance.now();
    if (reduced.matches) rotate(dir[0] * 0.3, dir[1] * 0.3);
    else { vx += dir[0] * 2; vy += dir[1] * 2; }
    schedule();
  });

  new ResizeObserver(() => {
    const rect = canvas.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    draw();
  }).observe(canvas);

  new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    if (onScreen) schedule();
  }).observe(canvas);
  document.addEventListener('visibilitychange', () => !document.hidden && schedule());
  reduced.addEventListener('change', schedule);

  schedule();
}

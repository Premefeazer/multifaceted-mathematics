// UI for puzzle 1, "Line it up". The logic lives in lineit.js.
import { STARS, INITIAL, evaluate, equation, describeSlope, fmt } from './lineit.js';

const SVG_NS = 'http://www.w3.org/2000/svg';
const MATHML_NS = 'http://www.w3.org/1998/Math/MathML';
const EDGE = 6.5; // half-width of the graph, in math units
const STAR_POINTS = '0,-0.6 0.153,-0.21 0.571,-0.185 0.247,0.08 0.353,0.485 0,0.26 -0.353,0.485 -0.247,0.08 -0.571,-0.185 -0.153,-0.21';
const IDLE = [
  'Move the sliders. A star lights up when the line touches it.',
  'One star is lit. Can you catch the other?',
  'Both stars are on the line. Press Check.',
];

function svgEl(tag, attrs, parent) {
  const el = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  parent.append(el);
  return el;
}

export function mountLineIt(root) {
  const $ = (sel) => root.querySelector(sel);
  const mIn = $('#li-m'), bIn = $('#li-b');
  const mOut = $('#li-m-out'), bOut = $('#li-b-out');
  const graph = $('.puzzle__graph'), grid = $('#li-grid'), starsLayer = $('#li-stars'), line = $('#li-line');
  const eq = $('#li-eq'), feedback = $('.feedback');
  const title = $('.feedback__title'), body = $('.feedback__text');
  const check = $('#li-check'), reset = $('#li-reset'), step = $('[data-step="1"]');
  let solved = false;

  // graph paper: grid lines, axes, and a number every 2 units
  for (let i = -6; i <= 6; i++) {
    const cls = i === 0 ? 'g-axis' : 'g-grid-line';
    svgEl('line', { x1: i, y1: -EDGE, x2: i, y2: EDGE, class: cls }, grid);
    svgEl('line', { x1: -EDGE, y1: i, x2: EDGE, y2: i, class: cls }, grid);
    if (i !== 0 && i % 2 === 0) {
      svgEl('text', { x: i, y: 0.75, class: 'g-tick', 'text-anchor': 'middle' }, grid).textContent = fmt(i);
      svgEl('text', { x: -0.2, y: -i + 0.17, class: 'g-tick', 'text-anchor': 'end' }, grid).textContent = fmt(i);
    }
  }
  svgEl('text', { x: EDGE - 0.25, y: -0.25, class: 'g-tick', 'text-anchor': 'end' }, grid).textContent = 'x';
  svgEl('text', { x: 0.25, y: -EDGE + 0.6, class: 'g-tick' }, grid).textContent = 'y';

  const starEls = STARS.map(({ x, y }) => {
    const g = svgEl('g', { class: 'star', transform: `translate(${x} ${-y})` }, starsLayer);
    svgEl('circle', { class: 'star__halo', r: 1 }, g);
    svgEl('polygon', { class: 'star__shape', points: STAR_POINTS }, g);
    svgEl('text', { class: 'star__label', x: 0.8, y: -0.75 }, g).textContent = `(${fmt(x)}, ${fmt(y)})`;
    return g;
  });

  function setFeedback(state, heading, text) {
    feedback.dataset.state = state;
    if (title.textContent !== heading) title.textContent = heading;
    if (body.textContent !== text) body.textContent = text; // same text again would be re-announced
  }

  function render() {
    const m = +mIn.value, b = +bIn.value;
    line.setAttribute('x1', -EDGE);
    line.setAttribute('y1', -(m * -EDGE + b));
    line.setAttribute('x2', EDGE);
    line.setAttribute('y2', -(m * EDGE + b));
    mOut.textContent = fmt(m);
    bOut.textContent = fmt(b);
    eq.replaceChildren(...equation(m, b).map(({ tag, text }) => {
      const el = document.createElementNS(MATHML_NS, tag);
      el.textContent = text;
      return el;
    }));
    const result = evaluate(m, b);
    result.hits.forEach((hit, i) => starEls[i].classList.toggle('is-lit', hit));
    return { m, b, ...result };
  }

  function onInput() {
    solved = false;
    check.removeAttribute('aria-disabled');
    step.classList.remove('is-done');
    const lit = render().hits.filter(Boolean).length;
    step.style.setProperty('--progress', (lit / 2) * 0.9);
    setFeedback('idle', '', IDLE[lit]);
  }

  check.addEventListener('click', () => {
    if (solved) return;
    const r = render();
    if (r.solved) {
      solved = true;
      check.setAttribute('aria-disabled', 'true');
      step.classList.add('is-done');
      step.style.setProperty('--progress', 1);
      setFeedback(
        'success',
        "That's the one.",
        `Slope ${fmt(r.m)} means the line ${describeSlope(r.m)}. The intercept ${fmt(r.b)} is where it crosses the y-axis. More puzzles are on the way.`,
      );
    } else {
      setFeedback('error', 'Not yet.', r.hint);
      graph.classList.remove('is-shaking');
      void graph.offsetWidth; // restart the shake if it is already playing
      graph.classList.add('is-shaking');
    }
  });

  reset.addEventListener('click', () => {
    mIn.value = INITIAL.m;
    bIn.value = INITIAL.b;
    onInput();
  });

  graph.addEventListener('animationend', () => graph.classList.remove('is-shaking'));
  mIn.addEventListener('input', onInput);
  bIn.addEventListener('input', onInput);
  mIn.value = INITIAL.m;
  bIn.value = INITIAL.b;
  onInput();
}

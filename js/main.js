import { mountPolyhedron } from './polyhedron.js';
import './lesson.js';

// Same order and names as the cards in chapters.html (id) and the ticker (data-topic); update all three when a topic changes.
// `face` is which of the 20 faces carries the topic.
const TOPICS = [
  { name: 'Logic', symbol: '⇒', id: 'logic', face: 0 },
  { name: 'Set Theory', symbol: '∈', id: 'set-theory', face: 4 },
  { name: 'Real Numbers', symbol: 'ℝ', id: 'real-numbers', face: 7 },
  { name: 'Functions & Relations', symbol: 'f(x)', id: 'functions', face: 10 },
  { name: 'Number Theory', symbol: '≡', id: 'number-theory', face: 12 },
  { name: 'Combinatorics', symbol: '!', id: 'combinatorics', face: 15 },
  { name: 'Sequences & Series', symbol: 'Σ', id: 'sequences', face: 17 },
  { name: 'Calculus Basics', symbol: '∫', id: 'calculus', face: 19 },
];

const readout = document.getElementById('ico-readout');
const tickerItems = [...document.querySelectorAll('.ticker li')];

// k is the picked topic's index, or -1 when nothing is picked
function show(k) {
  tickerItems.forEach((li) => li.classList.toggle('is-active', Number(li.dataset.topic) === k));
  if (k < 0) {
    readout.hidden = true;
    readout.replaceChildren();
    return;
  }
  const link = document.createElement('a');
  link.href = `chapters.html#${TOPICS[k].id}`;
  link.textContent = `${TOPICS[k].name} · ${k === 0 ? 'first up, coming soon' : 'coming soon'}`;
  readout.replaceChildren(link);
  readout.hidden = false;
}

mountPolyhedron(document.getElementById('ico'), {
  accentFace: TOPICS[0].face,
  labels: Object.fromEntries(TOPICS.map((t) => [t.face, t.symbol])),
  onFace: (face) => show(TOPICS.findIndex((t) => t.face === face)),
});

// WCAG 2.2.2: the ticker can be stopped without a mouse
const ticker = document.querySelector('.ticker');
const pause = ticker.querySelector('.ticker__pause');
pause.addEventListener('click', () => {
  const paused = !ticker.classList.contains('is-paused');
  ticker.classList.toggle('is-paused', paused);
  pause.setAttribute('aria-label', paused ? 'Resume the scrolling topics' : 'Pause the scrolling topics'); // the label changes, so no aria-pressed
});

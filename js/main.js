import { mountPolyhedron } from './polyhedron.js';

const TOPIC_FACES = [0, 4, 7, 10, 12, 15, 17, 19]; // which of the 20 faces stands for each topic, in learning order
const names = [...document.querySelectorAll('.topic__name')].map((el) => el.textContent); // the HTML is the single source

const readout = document.getElementById('ico-readout');
readout.hidden = false;
readout.textContent = 'Drag to turn. Tap a face.';

mountPolyhedron(document.getElementById('ico'), {
  accentFace: TOPIC_FACES[0],
  onFace(face) {
    const k = TOPIC_FACES.indexOf(face);
    readout.textContent =
      k < 0 ? 'Still unexplored.' : `${names[k]} · ${k === 0 ? 'first up, coming soon' : 'coming soon'}`;
  },
});

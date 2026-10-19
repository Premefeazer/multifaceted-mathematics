import { mountPolyhedron } from './polyhedron.js';
import { FACETS } from './facets.js';
import { mountLineIt } from './puzzle.js';

const FACET_FACES = [0, 4, 7, 10, 12, 15, 17, 19]; // which of the 20 faces stands for each facet
const TRY_IT = 3; // Functions & Graphs: the facet that puzzle 1 belongs to

mountLineIt(document.getElementById('line-it'));

const readout = document.getElementById('ico-readout');
readout.hidden = false;
readout.textContent = 'Drag to turn. Tap a face.';

mountPolyhedron(document.getElementById('ico'), {
  accentFace: FACET_FACES[TRY_IT],
  onFace(face) {
    const k = FACET_FACES.indexOf(face);
    readout.textContent =
      k < 0 ? 'Still unexplored.' : `${FACETS[k].name} · ${k === TRY_IT ? 'try it below' : 'coming soon'}`;
  },
});

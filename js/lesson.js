// The example lesson card: pick an answer, see its own explanation. Any answer can be tried again.
const card = document.querySelector('.lesson__card');

if (card) {
  const options = [...card.querySelectorAll('.option')];
  const notes = [...card.querySelectorAll('.explain')]; // notes[0] is the prompt, notes[n + 1] answers option n
  const status = card.querySelector('#lesson-status');

  options.forEach((option, n) => {
    option.addEventListener('click', () => {
      options.forEach((other) => {
        const on = other === option;
        other.setAttribute('aria-pressed', on);
        other.classList.toggle('is-picked', on && 'correct' in other.dataset);
        other.classList.toggle('is-wrong', on && !('correct' in other.dataset));
        other.querySelector('.option__icon').hidden = !on;
      });
      notes.forEach((note, k) => note.classList.toggle('is-on', k === n + 1));
      status.textContent = notes[n + 1].textContent; // the stacked notes are hidden from screen readers, this carries the message
    });
  });
}

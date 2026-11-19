const lenses = [
  { id: 'natural', name: 'Sem lente', line: 'Original', kind: 'none' },
  { id: 'uzumaki', name: 'Uzumaki', line: 'Naruto', kind: 'anime', tone: 'tone-naruto', pupil: 'round' },
  { id: 'kurama', name: 'Kurama', line: 'Naruto', kind: 'anime', tone: 'tone-kurama', pupil: 'slit' },
  { id: 'sabio', name: 'Sábio', line: 'Naruto', kind: 'anime', tone: 'tone-sabio', pupil: 'bar' },
  { id: 'circuit', name: 'Circuit', line: 'Cyberpunk', kind: 'cyber', tone: 'cyan' },
  { id: 'glitch', name: 'Glitch', line: 'Cyberpunk', kind: 'cyber', tone: 'magenta' },
  { id: 'volt', name: 'Volt', line: 'Cyberpunk', kind: 'cyber', tone: 'volt' },
  { id: 'geass', name: 'Geass', line: 'Code Geass', kind: 'geass', tone: 'lelouch' },
  { id: 'cc', name: 'C.C.', line: 'Code Geass', kind: 'geass', tone: 'cc' },
  { id: 'zero', name: 'Zero', line: 'Code Geass', kind: 'geass', tone: 'zero' },
  { id: 'anya', name: 'Anya', line: 'Spy x Family', kind: 'spy', tone: 'anya' },
  { id: 'yor', name: 'Yor', line: 'Spy x Family', kind: 'spy', tone: 'yor' },
  { id: 'loid', name: 'Loid', line: 'Spy x Family', kind: 'spy', tone: 'loid' }
];

const sigil = '<svg class="sigil" viewBox="0 0 100 100"><circle cx="50" cy="50" r="31" fill="none" stroke="#2b070c" stroke-width="2.5"/><path fill="#2b070c" d="M50 16 C47 34 38 38 16 34 C34 42 42 48 47 70 L50 56 L53 70 C58 48 66 42 84 34 C62 38 53 34 50 16 Z"/><circle cx="50" cy="42" r="3.2" fill="#ffd0c8"/></svg>';

function markup(lens) {
  if (lens.kind === 'none') return '';
  if (lens.kind === 'anime') {
    return `<span class="try-eye lens ${lens.tone}"><span class="pupil ${lens.pupil}"></span><i></i><i class="b"></i></span>`;
  }
  if (lens.kind === 'cyber' && lens.tone === 'magenta') {
    return '<span class="try-eye cyber-lens magenta"><span class="core slit"></span><span class="scan"></span><span class="spark"></span></span>';
  }
  if (lens.kind === 'cyber' && lens.tone === 'volt') {
    return '<span class="try-eye cyber-lens volt"><span class="core diamond"></span><span class="spark"></span></span>';
  }
  if (lens.kind === 'cyber') {
    return '<span class="try-eye cyber-lens cyan"><span class="ticks"></span><span class="core"></span><span class="spark"></span></span>';
  }
  if (lens.kind === 'geass' && lens.tone === 'lelouch') {
    return `<span class="try-eye geass-lens lelouch">${sigil}<span class="spark"></span></span>`;
  }
  if (lens.kind === 'geass' && lens.tone === 'cc') {
    return '<span class="try-eye geass-lens cc"><span class="pupil round"></span><i></i><i class="b"></i></span>';
  }
  if (lens.kind === 'geass') {
    return '<span class="try-eye geass-lens zero"><span class="visor"></span><span class="spark"></span></span>';
  }
  if (lens.tone === 'anya') {
    return '<span class="try-eye spy-lens anya"><span class="pupil round"></span><i></i><span class="star"></span></span>';
  }
  return `<span class="try-eye spy-lens ${lens.tone}"><span class="pupil round"></span><i></i><i class="b"></i></span>`;
}

const picker = document.getElementById('picker');
const eyeLeft = document.getElementById('eyeLeft');
const eyeRight = document.getElementById('eyeRight');
const gameNow = document.getElementById('gameNow');

if (picker && eyeLeft && eyeRight && gameNow) {
  const lines = [...new Set(lenses.map((lens) => lens.line))];

  lines.forEach((line) => {
    const group = document.createElement('div');
    group.className = 'lens-group';
    group.innerHTML = `<p class="eyebrow">${line}</p>`;
    const row = document.createElement('div');
    row.className = 'lens-row';
    lenses.filter((lens) => lens.line === line).forEach((lens) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'lens-choice';
      button.dataset.id = lens.id;
      button.innerHTML = `<span class="choice-preview">${markup(lens) || '<span class="bare-eye"></span>'}</span><span>${lens.name}</span>`;
      button.addEventListener('click', () => applyLens(lens));
      row.appendChild(button);
    });
    group.appendChild(row);
    picker.appendChild(group);
  });

  function applyLens(lens) {
    const html = markup(lens);
    eyeLeft.innerHTML = html;
    eyeRight.innerHTML = html;
    eyeLeft.classList.remove('pop');
    eyeRight.classList.remove('pop');
    void eyeLeft.offsetWidth;
    if (html) {
      eyeLeft.classList.add('pop');
      eyeRight.classList.add('pop');
    }
    gameNow.textContent = lens.kind === 'none'
      ? 'Olhos originais do avatar'
      : `${lens.name} · ${lens.line}`;
    document.querySelectorAll('.lens-choice').forEach((button) => {
      button.classList.toggle('is-on', button.dataset.id === lens.id);
    });
  }

  applyLens(lenses[0]);
}

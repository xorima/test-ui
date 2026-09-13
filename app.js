function nextMenuState(isOpen) {
  const nextIsOpen = !isOpen;

  return {
    isOpen: nextIsOpen,
    ariaExpanded: String(nextIsOpen),
  };
}

if (typeof module !== 'undefined') {
  module.exports = { nextMenuState };
}

const sidebar = typeof document !== 'undefined' ? document.querySelector('.sidebar') : null;
const toggle = typeof document !== 'undefined' ? document.querySelector('.sidebar-burger') : null;
const appShell = typeof document !== 'undefined' ? document.querySelector('.app-shell') : null;

if (sidebar && toggle && appShell) {
  toggle.addEventListener('click', () => {
    const currentIsOpen = sidebar.getAttribute('data-open') === 'true';
    const nextState = nextMenuState(currentIsOpen);

    sidebar.setAttribute('data-open', String(nextState.isOpen));
    appShell.setAttribute('data-menu-open', String(nextState.isOpen));
    toggle.setAttribute('aria-expanded', nextState.ariaExpanded);
  });
}

const subpages = {
  'index.html': [['collection-board.html', 'Collection board'], ['model-detail.html', 'Model detail']],
  'armies.html': [['army-list-detail.html', 'Army list detail']],
  'paint.html': [['paint-recipe-detail.html', 'Paint recipe detail']],
  'games.html': [['collection-history.html', 'Collection history']],
  'notes.html': [['locations.html', 'Locations']],
};

if (typeof document !== 'undefined') {
  document.querySelectorAll('.nav-item').forEach((link) => {
    const pages = subpages[link.getAttribute('href')];
    const group = link.parentElement;

    if (!pages || !group || group.querySelector('.subnav')) {
      return;
    }

    const subnav = document.createElement('div');
    subnav.className = 'subnav';
    subnav.innerHTML = pages.map(([href, label]) => `<a href="${href}">${label}</a>`).join('');
    group.append(subnav);
  });

  document.querySelectorAll('[draggable="true"]').forEach((unit) => {
    unit.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', unit.id);
    });
  });

  document.querySelectorAll('[data-drop-zone]').forEach((zone) => {
    zone.addEventListener('dragover', (event) => event.preventDefault());
    zone.addEventListener('drop', (event) => {
      event.preventDefault();
      const unit = document.getElementById(event.dataTransfer.getData('text/plain'));

      if (unit) {
        zone.append(unit);
      }
    });
  });
}

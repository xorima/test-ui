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
  'armies.html': [['army-list-detail.html', 'Army list detail'], ['upcoming-games.html', 'Upcoming games']],
  'paint.html': [['paint-recipe-detail.html', 'Paint recipe detail']],
  'games.html': [['collection-history.html', 'Collection history']],
  'photos.html': [['inspiration.html', 'Inspiration']],
  'notes.html': [['locations.html', 'Locations']],
  'wishlist.html': [['must-buy.html', 'Must buy']],
  'supplies.html': [],
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

  const gameDetails = {
    friday: {
      date: 'Friday, 17 January',
      venue: "Dragon's Hoard Games",
      system: 'Warhammer 40,000',
      list: 'Crimson Wardens 2,000 pts',
      status: 'Action needed',
      statusClass: 'action-needed',
      units: [['Bladeguard Veterans', 'Home Display Shelf'], ['Scout Squad', 'Needs grass tufts'], ['Terminator Squad', "Ready at Dragon's Hoard"]],
      tasks: ["Take Bladeguard Veterans from Home Display Shelf to Dragon's Hoard before Friday.", 'Buy grass tufts for Scout Squad bases.'],
      opponent: 'Tyranids',
    },
    saturday: {
      date: 'Saturday, 25 January',
      venue: 'Guildhall Wargames',
      system: 'Warhammer Age of Sigmar',
      list: 'Iron Hallow Vanguard',
      status: 'Ready',
      statusClass: 'ready',
      units: [['Vindictor Host', 'Ready at Guildhall Wargames'], ['Annihilators', 'Ready at Guildhall Wargames'], ['Lord-Imperatant', 'Ready at Guildhall Wargames']],
      tasks: ['All required units are available at the game venue.'],
      opponent: 'Orruk Warclans',
    },
    february: {
      date: 'Saturday, 08 February',
      venue: 'The Tabletop Forge',
      system: 'Horus Heresy',
      list: 'Forge Spearhead, 3,000 pts',
      status: 'At risk',
      statusClass: 'at-risk',
      units: [['Contemptor Dreadnought', 'Missing weapon loadout'], ['Tactical Squad', 'Ready at The Tabletop Forge'], ['Spartan Assault Tank', 'Awaiting transport case']],
      tasks: ['Confirm the Contemptor weapon loadout before the list deadline.', 'Arrange safe transport for the Spartan Assault Tank.'],
      opponent: 'Sons of Horus',
    },
  };

  const gameEntries = document.querySelectorAll('[data-game]');
  const selectedGame = document.querySelector('[data-selected-game]');

  const renderSelectedGame = (game) => {
    selectedGame.innerHTML = `
      <div class="panel__header">
        <div><p class="panel__eyebrow">Selected game</p><h3>${game.date}</h3></div>
        <span class="game-status game-status--${game.statusClass}">${game.status}</span>
      </div>
      <div class="selected-game-panel__meta"><span>${game.venue}</span><span>${game.system}</span><span>${game.list}</span></div>
      <section class="readiness-section"><h4>Required list units</h4><ul class="readiness-list">${game.units.map(([unit, availability]) => `<li><strong>${unit}</strong><span>${availability}</span></li>`).join('')}</ul></section>
      <section class="readiness-section readiness-section--tasks"><h4>Deadline tasks</h4><ul class="task-list">${game.tasks.map((task) => `<li>${task}</li>`).join('')}</ul></section>
      <form class="post-game-record"><h4>Post-game record</h4><div class="post-game-record__fields"><label>Opponent faction<input name="opponent-faction" value="${game.opponent}" /></label><label>Your score <span>Optional</span><input name="your-score" type="number" inputmode="numeric" /></label><label>Opponent score <span>Optional</span><input name="opponent-score" type="number" inputmode="numeric" /></label></div></form>`;
  };

  if (selectedGame) {
    gameEntries.forEach((entry) => {
      entry.addEventListener('click', () => {
        const game = gameDetails[entry.dataset.game];

        if (!game) {
          return;
        }

        gameEntries.forEach((item) => item.removeAttribute('aria-current'));
        entry.setAttribute('aria-current', 'true');
        renderSelectedGame(game);
      });
    });
  }
}

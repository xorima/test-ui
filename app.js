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

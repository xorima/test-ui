# Forge Ledger App Shell Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished, responsive static app shell for Forge Ledger that can be opened locally in a browser and later published to GitHub Pages.

**Architecture:** This is a single-page static prototype with no build step. `index.html` provides the app shell structure, `styles.css` defines the premium dark visual system and responsive layout, and `app.js` handles lightweight UI interactions such as menu toggling and section state. The design should feel premium and collectible first, while still being practical on desktop, tablet, and mobile.

**Tech Stack:** HTML5, CSS3, Vanilla JavaScript, optional local preview via `python3 -m http.server`.

---

### Task 1: Create the premium app shell structure

**Files:**
- Create: `index.html`

- [ ] **Step 1: Write the shell markup**

Create a single-page document with this structure:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Forge Ledger</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div class="app-shell">
      <aside class="sidebar" aria-label="Primary navigation">
        <div class="sidebar__brand">
          <div class="brand-mark">FL</div>
          <div>
            <p class="brand-kicker">Premium hobby ledger</p>
            <h1>Forge Ledger</h1>
          </div>
        </div>

        <button class="sidebar__toggle" type="button" aria-expanded="true" aria-controls="sidebar-nav">
          <span class="sidebar__toggle-icon" aria-hidden="true">☰</span>
          <span>Menu</span>
        </button>

        <nav id="sidebar-nav" class="sidebar__nav">
          <a class="nav-item nav-item--active" href="#collection">Collection</a>
          <a class="nav-item" href="#armies">Armies</a>
          <a class="nav-item" href="#paint">Paint</a>
          <a class="nav-item" href="#games">Games</a>
          <a class="nav-item" href="#photos">Photos</a>
          <a class="nav-item" href="#notes">Notes</a>
        </nav>
      </aside>

      <div class="app-main">
        <header class="topbar">
          <div class="topbar__context">
            <p class="topbar__eyebrow">Warhammer collection control</p>
            <h2>Collection / Space Marines</h2>
          </div>
          <div class="topbar__actions">
            <button type="button" class="action-pill">Import list</button>
            <button type="button" class="action-pill action-pill--accent">Add unit</button>
          </div>
        </header>

        <main class="content" id="collection">
          <section class="hero-card">
            <div>
              <p class="hero-card__label">Current project</p>
              <h3>Keep every army, paint scheme, and game result in one premium workspace.</h3>
              <p class="hero-card__body">
                Track what you own, where it is, how it is painted, what it has fought as, and what it cost to build in time and money.
              </p>
            </div>
            <div class="hero-card__stats" aria-label="Summary stats">
              <div class="stat">
                <span class="stat__value">128</span>
                <span class="stat__label">Models</span>
              </div>
              <div class="stat">
                <span class="stat__value">14</span>
                <span class="stat__label">Units painted</span>
              </div>
              <div class="stat">
                <span class="stat__value">9</span>
                <span class="stat__label">Lists logged</span>
              </div>
            </div>
          </section>

          <section class="card-grid" aria-label="Feature summaries">
            <article class="feature-card" id="armies">
              <p class="feature-card__label">Ownership</p>
              <h3>Inventory by game type</h3>
              <p>Log models, unit status, tags like battle ready or magnetised, and multiple battlefield roles.</p>
            </article>
            <article class="feature-card">
              <p class="feature-card__label">Location</p>
              <h3>Know where everything is</h3>
              <p>Home, store, club case, tournament bag, or any custom place with a richer note.</p>
            </article>
            <article class="feature-card" id="photos">
              <p class="feature-card__label">Visual reference</p>
              <h3>Photos beside notes</h3>
              <p>Capture what a model looked like at each stage so you never lose the reference.</p>
            </article>
            <article class="feature-card" id="paint">
              <p class="feature-card__label">Paint schemes</p>
              <h3>Record the recipe</h3>
              <p>Store completed unit schemes, step-by-step methods, and repeatable paint process notes.</p>
            </article>
            <article class="feature-card" id="games">
              <p class="feature-card__label">Game history</p>
              <h3>Army lists and results</h3>
              <p>Import lists, note scores, and remember when you last ran a force and under which edition.</p>
            </article>
            <article class="feature-card" id="notes">
              <p class="feature-card__label">Notes</p>
              <h3>Collector context</h3>
              <p>Capture acquisition notes, conversion ideas, storage notes, and anything else worth remembering.</p>
            </article>
          </section>

          <section class="detail-surface" aria-label="Sample workspace panels">
            <article class="detail-panel">
              <div class="detail-panel__header">
                <h3>Latest unit</h3>
                <span class="detail-chip">Battle ready</span>
              </div>
              <p>Intercessor Squad Alpha</p>
              <ul>
                <li>Status: Painted</li>
                <li>Location: Home display shelf</li>
                <li>Tags: Magnetised, table-ready</li>
              </ul>
            </article>

            <article class="detail-panel detail-panel--media">
              <div class="detail-panel__header">
                <h3>Photo reference</h3>
                <span class="detail-chip detail-chip--soft">3 images</span>
              </div>
              <div class="photo-stack" aria-hidden="true">
                <div class="photo-placeholder"></div>
                <div class="photo-placeholder photo-placeholder--mid"></div>
                <div class="photo-placeholder photo-placeholder--top"></div>
              </div>
            </article>
          </section>
        </main>
      </div>
    </div>

    <script src="app.js"></script>
  </body>
</html>
```

- [ ] **Step 2: Confirm the page opens cleanly in a browser**

Run a local preview server from the project root:

```bash
python3 -m http.server 4173
```

Expected: `index.html` loads in `http://localhost:4173/` with the shell structure visible and no console errors from missing elements.

---

### Task 2: Style the premium dark visual system

**Files:**
- Create: `styles.css`

- [ ] **Step 1: Write the full visual system**

Create styles that establish the premium collector look:

```css
:root {
  color-scheme: dark;
  --bg: #090a0f;
  --surface: #10131b;
  --surface-2: #151a24;
  --surface-3: #1b2230;
  --text: #f3efe6;
  --muted: #a7adbc;
  --accent: #c7a56a;
  --accent-soft: rgba(199, 165, 106, 0.18);
  --border: rgba(255, 255, 255, 0.08);
  --shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
  --radius-xl: 28px;
  --radius-lg: 22px;
  --radius-md: 16px;
  --radius-sm: 12px;
}

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  min-height: 100%;
  background:
    radial-gradient(circle at top left, rgba(199, 165, 106, 0.12), transparent 30%),
    linear-gradient(180deg, #0b0d12 0%, #090a0f 100%);
  color: var(--text);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

body {
  padding: 24px;
}

.app-shell {
  display: grid;
  grid-template-columns: 290px minmax(0, 1fr);
  gap: 24px;
  min-height: calc(100vh - 48px);
}

.sidebar,
.topbar,
.hero-card,
.feature-card,
.detail-panel {
  backdrop-filter: blur(18px);
  background: linear-gradient(180deg, rgba(21, 26, 36, 0.92), rgba(12, 15, 21, 0.95));
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}

.sidebar {
  border-radius: var(--radius-xl);
  padding: 22px;
  position: sticky;
  top: 24px;
  height: calc(100vh - 48px);
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.sidebar__brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-mark {
  width: 54px;
  height: 54px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  background: linear-gradient(145deg, #3b2f1c, #b58c49);
  color: #f7edd8;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.brand-kicker,
.topbar__eyebrow,
.feature-card__label,
.hero-card__label {
  margin: 0 0 6px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.72rem;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1 {
  font-size: 1.2rem;
  margin-bottom: 0;
}

.sidebar__toggle {
  display: none;
  align-items: center;
  gap: 10px;
  justify-content: center;
  width: 100%;
  padding: 12px 14px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.03);
  color: var(--text);
}

.sidebar__nav {
  display: grid;
  gap: 8px;
  margin-top: 10px;
}

.nav-item {
  display: flex;
  align-items: center;
  min-height: 48px;
  padding: 0 14px;
  border-radius: 14px;
  color: var(--muted);
  text-decoration: none;
  border: 1px solid transparent;
  transition: 160ms ease;
}

.nav-item:hover,
.nav-item--active {
  color: var(--text);
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--border);
}

.app-main {
  min-width: 0;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 20px;
}

.topbar {
  border-radius: var(--radius-xl);
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.topbar h2 {
  margin-bottom: 0;
  font-size: clamp(1.2rem, 1vw + 1rem, 1.8rem);
}

.topbar__actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.action-pill,
.detail-chip {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.03);
  color: var(--text);
}

.action-pill--accent,
.detail-chip {
  background: var(--accent-soft);
  border-color: rgba(199, 165, 106, 0.28);
}

.content {
  display: grid;
  gap: 20px;
}

.hero-card,
.detail-panel,
.feature-card {
  border-radius: var(--radius-lg);
}

.hero-card {
  padding: clamp(22px, 3vw, 34px);
  display: grid;
  grid-template-columns: minmax(0, 1.8fr) minmax(260px, 0.9fr);
  gap: 20px;
}

.hero-card h3 {
  font-size: clamp(1.7rem, 2vw + 1rem, 2.7rem);
  line-height: 1.05;
  max-width: 14ch;
}

.hero-card__body {
  max-width: 60ch;
  color: var(--muted);
  line-height: 1.6;
}

.hero-card__stats {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-content: start;
}

.stat {
  padding: 18px;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border);
}

.stat__value {
  display: block;
  font-size: 1.8rem;
  font-weight: 700;
}

.stat__label {
  color: var(--muted);
}

.card-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.feature-card {
  padding: 20px;
  min-height: 180px;
}

.feature-card h3,
.detail-panel h3 {
  margin-bottom: 10px;
}

.feature-card p,
.detail-panel p,
.detail-panel li {
  color: var(--muted);
  line-height: 1.55;
}

.detail-surface {
  display: grid;
  gap: 16px;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
}

.detail-panel {
  padding: 20px;
}

.detail-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.detail-panel--media {
  overflow: hidden;
}

.photo-stack {
  position: relative;
  min-height: 210px;
  margin-top: 20px;
}

.photo-placeholder {
  position: absolute;
  inset: auto 0 0;
  margin: auto;
  width: 78%;
  height: 170px;
  border-radius: 22px;
  background:
    linear-gradient(145deg, rgba(199, 165, 106, 0.2), rgba(255, 255, 255, 0.05)),
    radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.14), transparent 32%);
  border: 1px solid rgba(199, 165, 106, 0.22);
  box-shadow: 0 18px 38px rgba(0, 0, 0, 0.35);
}

.photo-placeholder--mid {
  transform: translateY(-16px) scale(0.92);
  opacity: 0.72;
}

.photo-placeholder--top {
  transform: translateY(-32px) scale(0.84);
  opacity: 0.5;
}

@media (max-width: 1100px) {
  .app-shell {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: static;
    height: auto;
  }

  .hero-card,
  .detail-surface,
  .card-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  body {
    padding: 14px;
  }

  .app-shell {
    gap: 14px;
  }

  .topbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .hero-card__stats {
    grid-template-columns: 1fr;
  }

  .sidebar__toggle {
    display: inline-flex;
  }

  .sidebar__nav {
    display: none;
  }

  .sidebar[data-open="true"] .sidebar__nav {
    display: grid;
  }
}
```

- [ ] **Step 2: Verify the layout at desktop, tablet, and mobile widths**

Use browser resizing against `http://localhost:4173/`.

Expected:
- Desktop shows a left sidebar and right content surface.
- Tablet stacks the shell vertically while preserving the premium spacing.
- Mobile hides the nav by default and keeps buttons and cards touch-friendly.

---

### Task 3: Add lightweight navigation behavior and responsive menu state

**Files:**
- Create: `app.js`

- [ ] **Step 1: Write minimal interaction logic**

Create a tiny script to toggle the sidebar menu on mobile and keep the UI state accessible:

```javascript
const sidebar = document.querySelector('.sidebar');
const toggle = document.querySelector('.sidebar__toggle');

if (sidebar && toggle) {
  toggle.addEventListener('click', () => {
    const nextState = sidebar.getAttribute('data-open') !== 'true';
    sidebar.setAttribute('data-open', String(nextState));
    toggle.setAttribute('aria-expanded', String(nextState));
  });
}
```

- [ ] **Step 2: Confirm menu behavior in mobile width**

Resize the browser to a narrow width and click the menu button.

Expected:
- The sidebar nav appears and disappears cleanly.
- `aria-expanded` updates with the menu state.
- No console errors occur when the button is clicked.

---

### Task 4: Polish content labels and prepare the prototype for sharing

**Files:**
- Modify: `index.html`
- Modify: `styles.css` if needed for final spacing tweaks

- [ ] **Step 1: Tighten copy so the shell sells the concept clearly**

Keep the content focused on the premium collector pitch:
- inventory by game type
- location tracking
- photos and notes
- paint scheme recipes
- army list history and results

Add one short line somewhere in the hero or topbar about the product being built for an expensive hobby, so the value proposition is obvious at a glance.

- [ ] **Step 2: Review the page as a GitHub Pages candidate**

Open `index.html` directly or via the local server and verify:
- all assets are local relative paths
- no framework build step is required
- the prototype still works if copied into a GitHub Pages repository root

Expected: the page can be published as-is with only static files.

---

### Task 5: Final manual QA pass

**Files:**
- Review: `index.html`
- Review: `styles.css`
- Review: `app.js`

- [ ] **Step 1: Check the full experience against the design goal**

Verify the following manually:
- The shell feels premium rather than grimy or generic.
- The left navigation reads clearly as a control rail.
- The top bar gives context without taking too much space.
- The content area feels like a real product dashboard, not a marketing page.
- The layout works on desktop, tablet, and mobile.

- [ ] **Step 2: Stop if anything feels overdesigned**

If texture, decoration, or motion starts to reduce readability, remove it. The prototype should lean premium and restrained, not theatrical.

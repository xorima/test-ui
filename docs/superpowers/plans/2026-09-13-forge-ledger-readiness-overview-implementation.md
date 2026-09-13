# Forge Ledger Readiness Overview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the existing static Forge Ledger mock into a collection-wide readiness dashboard with game planning, collection health, buying priorities, and personal/community inspiration screens.

**Architecture:** Keep the prototype build-free and static. A shared `app.js` owns the expanding sidebar, contextual subpage injection, collection-board drag/drop, and upcoming-game selection; `styles.css` owns the collector-admin system. Every HTML page uses the same app shell, while the page content illustrates one product responsibility.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, local preview with `python3 -m http.server`.

---

## File Structure

- Modify: `index.html` - collection-wide, readiness-first overview.
- Modify: `styles.css` - dashboard charts, calendar, action states, buying and inspiration layouts.
- Modify: `app.js` - selected-game panel behavior and shared sidebar subpages.
- Create: `upcoming-games.html` - calendar/list plus selected game readiness.
- Create: `must-buy.html` - deadline-aware purchase requirements.
- Create: `wishlist.html` - non-urgent models wishlist.
- Create: `supplies.html` - supplies and tools list.
- Create: `inspiration.html` - collector photo gallery and linked community references.
- Modify: `armies.html`, `paint.html`, `games.html`, `photos.html`, `notes.html`, `collection-board.html`, `model-detail.html`, `army-list-detail.html`, `paint-recipe-detail.html`, `locations.html`, `collection-history.html` - add the new Wishlist and Supplies primary groups and all contextual child links.
- Modify: `test/app.test.js` - preserve browser-independent checks for shared state helper behavior.

### Task 1: Make the shared navigation complete

**Files:**
- Modify: `app.js`
- Modify: every `*.html` page listed above

- [ ] **Step 1: Add all parent/subpage mappings to the shared navigation definition**

```javascript
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
```

- [ ] **Step 2: Add primary Wishlist and Supplies links to each page sidebar**

```html
<div class="nav-group"><a class="nav-item" href="wishlist.html"><span class="nav-icon">☆</span><span class="nav-label">Wishlist</span></a></div>
<div class="nav-group"><a class="nav-item" href="supplies.html"><span class="nav-icon">⌁</span><span class="nav-label">Supplies</span></a></div>
```

- [ ] **Step 3: Verify all sidebar links resolve**

Run:

```bash
python3 -m http.server 4173
```

Open every primary page, expand the rail, and click every subpage link.

Expected: every route is a static HTML document, the rail position remains stable, and all supporting pages use the same shell.

### Task 2: Replace the collection dashboard with readiness-first signals

**Files:**
- Modify: `index.html`
- Modify: `styles.css`

- [ ] **Step 1: Replace the record-level dashboard panels with collection state by project**

Use a project table with state bars rather than individual unit records:

```html
<section class="panel panel--wide">
  <div class="panel__header"><h3>Collection state</h3><a class="detail-chip" href="collection-board.html">Open board</a></div>
  <div class="project-row">
    <div><strong>Crimson Wardens</strong><span>Warhammer 40,000 · 72 models</span></div>
    <div class="readiness-bar" aria-label="62% battle ready"><span style="--progress: 62%"></span></div>
    <strong>62%</strong>
    <span>Scout Squad needs basing</span>
  </div>
</section>
```

Include three project rows: Crimson Wardens, Iron Hallow, and Knights of the Forge. Every row must show game system, total models, battle-ready percentage, and the next priority.

- [ ] **Step 2: Add dashboard sections for selected-game readiness, collection health, activity, purchase priority, and inspiration**

```html
<section class="dashboard-grid">
  <article class="panel"><h3>Upcoming games</h3><p>Three scheduled engagements. One needs action.</p><a href="upcoming-games.html">View calendar</a></article>
  <article class="panel"><h3>Collection health</h3><p>4 missing photos · 2 unknown locations · 1 undocumented loadout</p></article>
  <article class="panel"><h3>Recent activity</h3><p>Intercessor Squad Alpha became battle ready today.</p></article>
  <article class="panel"><h3>Must buy</h3><p>Grass tufts and black primer needed before Friday.</p><a href="must-buy.html">Review purchases</a></article>
</section>
```

- [ ] **Step 3: Add responsive chart/card styling**

```css
.project-row { display:grid; grid-template-columns:1.1fr minmax(130px,1fr) auto 1fr; gap:12px; align-items:center; padding:12px 0; border-top:1px solid var(--border); }
.readiness-bar { height:8px; overflow:hidden; border-radius:999px; background:var(--surface-3); }
.readiness-bar span { display:block; width:var(--progress); height:100%; background:linear-gradient(90deg, var(--accent), var(--gold)); }
@media (max-width:720px) { .project-row { grid-template-columns:1fr; } }
```

- [ ] **Step 4: Verify the dashboard stays collection-wide by default**

Expected: no single game dominates the page; the selected-game indicator is a priority card alongside project readiness, health, activity, purchasing, and inspiration.

### Task 3: Add upcoming-game calendar and readiness actions

**Files:**
- Create: `upcoming-games.html`
- Modify: `app.js`
- Modify: `styles.css`

- [ ] **Step 1: Create the Upcoming Games screen with three selectable game entries**

Each entry must include date, venue, game system, saved list, and status:

```html
<button class="game-entry" type="button" data-game="friday" data-status="action-needed">
  <strong>Fri 17 Jan</strong><span>Dragon's Hoard Games · Crimson Wardens</span><em>Action needed</em>
</button>
```

- [ ] **Step 2: Implement selection that updates one readiness panel**

```javascript
const gameEntries = document.querySelectorAll('[data-game]');
const selectedGame = document.querySelector('[data-selected-game]');

gameEntries.forEach((entry) => {
  entry.addEventListener('click', () => {
    gameEntries.forEach((game) => game.removeAttribute('aria-current'));
    entry.setAttribute('aria-current', 'true');
    selectedGame.textContent = entry.dataset.game === 'friday'
      ? "Take Bladeguard Veterans from Home Display Shelf to Dragon's Hoard Games before Friday. Buy grass tufts for Scout Squad bases."
      : 'Every required unit is available at the game venue.';
  });
});
```

- [ ] **Step 3: Include post-game recording fields in the selected panel**

```html
<label>Opponent faction <input value="Tyranids"></label>
<label>Your score <input type="number" value="81"></label>
<label>Opponent score <input type="number" value="72"></label>
```

- [ ] **Step 4: Verify selected game states**

Expected:
- `Ready`: all required models are owned, prepared, and at the venue.
- `Action needed`: dated tasks exist, such as basing or a location transfer.
- `At risk`: a required model or supply is missing or overdue.

### Task 4: Add buying-plan pages

**Files:**
- Create: `must-buy.html`
- Create: `wishlist.html`
- Create: `supplies.html`
- Modify: `styles.css`

- [ ] **Step 1: Create Must Buy with dates and reasons**

```html
<div class="purchase-row purchase-row--urgent">
  <div><strong>Grass tufts</strong><span>Needed to base Scout Squad</span></div>
  <span>Before Fri 17 Jan</span>
  <a href="upcoming-games.html">Required for Dragon's Hoard game</a>
</div>
```

Include an unowned required model, a basing supply, and a case/transport requirement.

- [ ] **Step 2: Create Models Wishlist linked to a planned project/list**

```html
<div class="purchase-row"><div><strong>Brutalis Dreadnought</strong><span>Iron Hallow expansion</span></div><span>Wishlist</span><a href="armies.html">Planned 2,000 point list</a></div>
```

- [ ] **Step 3: Create Supplies And Tools linked to a recipe/project**

```html
<div class="purchase-row"><div><strong>Black primer</strong><span>Low stock</span></div><span>Paint doctrine</span><a href="paint-recipe-detail.html">Crimson Wardens</a></div>
```

- [ ] **Step 4: Verify buying categories remain distinct**

Expected: Must Buy clearly states a game-linked reason and deadline; Wishlist is non-urgent model desire; Supplies And Tools is a separate replenishment view.

### Task 5: Add personal-first inspiration

**Files:**
- Create: `inspiration.html`
- Modify: `styles.css`

- [ ] **Step 1: Create a Your Collection gallery using supplied miniature photography**

```html
<section class="panel"><div class="panel__header"><h3>Your collection</h3><span class="detail-chip">Recent and favourite work</span></div><div class="photo-grid"><figure class="photo-frame"><img src="space-marine-1.png" alt="Finished Crimson Wardens Space Marine"></figure><figure class="photo-frame"><img src="space-marine-2.png" alt="Finished blue Space Marine"></figure><figure class="photo-frame"><img src="space-marine-3.png" alt="Finished Space Marine with heavy weapon"></figure></div></section>
```

- [ ] **Step 2: Add saved community reference entries with explicit purpose**

```html
<div class="reference-row"><strong>Winter basing reference</strong><span>Community image</span><a href="paint-recipe-detail.html">Linked to Crimson Wardens basing</a></div>
```

Add entries for paint technique, basing, and conversion ideas. Do not simulate a social feed.

- [ ] **Step 3: Verify hierarchy**

Expected: personal miniature photography is visually larger and shown first; community references are a smaller, linked utility section.

### Task 6: Final static prototype verification

**Files:**
- Review: all static HTML pages
- Review: `styles.css`
- Review: `app.js`
- Test: `test/app.test.js`

- [ ] **Step 1: Run the existing behavior test**

Run:

```bash
node --test test/app.test.js
```

Expected: both menu-state tests pass.

- [ ] **Step 2: Serve and verify every page**

Run:

```bash
python3 -m http.server 4173
```

Open: `index.html`, `collection-board.html`, `model-detail.html`, `armies.html`, `army-list-detail.html`, `upcoming-games.html`, `paint.html`, `paint-recipe-detail.html`, `games.html`, `collection-history.html`, `photos.html`, `inspiration.html`, `notes.html`, `locations.html`, `wishlist.html`, `must-buy.html`, and `supplies.html`.

Expected: all pages load with the shared shell, expanded navigation reveals all relevant links, the Collection Board accepts draggable unit cards, and Upcoming Games updates its selected readiness panel.

- [ ] **Step 3: Check direct-file behavior**

Open `index.html` by direct file URL and click the burger.

Expected: normal script loading attaches the handler under `file://`, and the left rail expands without the burger control changing size.

# Forge Ledger Readiness-First Overview Design

## Purpose

Forge Ledger is the command desk for a valuable, evolving tabletop collection. The default Collection overview answers four questions at a glance:

1. What is the state of my collection, by army or project?
2. Do I have the models I need for an upcoming game, and what must happen before its date?
3. Is my collection healthy and moving forward?
4. What should I buy now, and what can remain on the wishlist?

The overview is collection-wide by default. Users can select a future game from the schedule to focus readiness without losing the broader collection context.

## Design Direction

Use the existing premium collector-admin visual language:

- Dark left utility rail that expands in place to show labels and shallow contextual subpages.
- Thin, flush top command bar.
- Warm bone-white working surfaces, off-black rail, restrained crimson accents, and small gold details.
- Dense enough to be useful as an admin dashboard, but with personal miniature photography providing hobby character.

The dashboard is readiness-first rather than gallery-first or calendar-first. Personal collection images enrich the experience but never displace operational priorities.

## Collection Overview

### Collection State By Army Or Project

The primary visual summarizes every army or project through the states:

`In box` -> `Built` -> `Painted` -> `Based` -> `Battle ready`

Each army/project row shows:

- Project name and game system.
- Unit and model totals.
- Counts in each completion state.
- A segmented readiness graphic and overall battle-ready percentage.
- The active hobby priority where one exists.

Detailed state changes remain on the Collection Board. That page uses drag-and-drop cards to move a unit between stages.

### Upcoming Games Calendar And Readiness

The overview includes a calendar/list showing all upcoming games. Each entry shows the date, event/opponent when known, game system, selected saved army list, and venue.

The user selects a saved list while creating or editing an upcoming game. A selected game opens a readiness panel containing:

- Required list units and their availability.
- Readiness status: `Ready`, `Action needed`, or `At risk`.
- Dated preparation tasks, including build, paint, base, repair, photograph, and assign a magnetised loadout.
- Location-transfer tasks when a required model is not at the game venue. Example: “Take Bladeguard Veterans from Home Display Shelf to Dragon's Hoard Games before Friday.”
- The must-buy items needed for that game.

After the game date, Forge Ledger prompts the user to record the opponent's faction and optional final score. The scheduled game then becomes a Battle Record.

### Collection Health And Activity

Collection Health groups exceptions that reduce the collection's usefulness:

- Model/unit has no known location.
- Model/unit has no reference photo.
- Painted unit has no documented paint doctrine.
- Magnetised model has no chosen or documented loadout.
- Unit is unassigned to an army/project.
- Required game unit has outstanding work or is in the wrong location.

Recent Activity is a chronological, compact feed of events such as acquisitions, state transitions, recipe updates, photos added, games completed, and location changes.

### Buying Plan

Purchasing is presented in three related but separate views:

- **Must Buy Before Next Game:** deadline-aware requirements for the selected game, including unowned list models, required paints/basing materials, tools, and transport/storage needs.
- **Models Wishlist:** desired future model purchases, optionally linked to an army, project, or planned list.
- **Supplies And Tools:** paints, consumables, magnets, cases, basing materials, and hobby tools, optionally linked to a paint doctrine or project.

An item promoted to Must Buy is linked to the game/action that made it necessary, keeping the reason visible.

### Collection Inspiration

The inspiration strip is primarily the collector's own latest, favourite, and completed-unit photos. It supports pride of ownership and makes progress visible.

A smaller community inspiration section supports saved external references for colour, technique, basing, conversion, or unit ideas. Every community reference must be linked to a project, paint doctrine, wishlist item, or unit. Forge Ledger is not a social feed.

## Supporting Pages

The expanding sidebar exposes shallow contextual links:

| Parent | Page | Purpose |
|---|---|---|
| Collection | Collection Board | Drag units through completion states. |
| Collection | Model Detail | Premium model/unit dossier with images, provenance, condition, locations, tags, loadouts, linked lists, paint doctrine, and notes. |
| Armies | Army List Detail | Saved list, edition, points version, owned-model check, readiness, and game history. |
| Armies | Upcoming Games | Calendar/list of upcoming games and selected game readiness actions. |
| Paint | Paint Recipe Detail | Repeatable doctrine with steps, paints, references, and linked units. |
| Games | Collection History | Timeline of acquisitions, progress, games, and recipe changes. |
| Notes | Locations | Private or external locations, optional external address, and storage detail. |
| Wishlist | Must Buy | Deadline-aware purchases tied to a selected game. |
| Wishlist | Models Wishlist | Non-urgent future model purchases. |
| Supplies | Supplies And Tools | Consumables and tools linked to projects or recipes. |
| Photos | Inspiration | Personal collection gallery plus purposeful community references. |

Wishlist and Supplies are primary sidebar sections. The existing Collection, Armies, Paint, Games, Photos, and Notes sections retain their specified subpages.

## Core Data Relationships

- A **Game** selects one saved **Army List** and one **Location**.
- An **Army List** contains required **Units/Models** from the collection.
- A required unit's readiness depends on state, availability, selected loadout, and location relative to the game's venue.
- A readiness gap creates one or more actionable tasks and may create a Must Buy item with a deadline.
- A **Location** may contain a private storage description only, or an optional full address for an external venue/store/club.
- A **Model/Unit** can have photographs, a paint doctrine, notes, tags, and game/list references.
- A **Community Inspiration Reference** has a link to at least one project, recipe, wishlist item, or unit.

## Mock Scope

The static prototype should demonstrate the story without pretending to be a complete product:

- `index.html` becomes the collection-wide readiness-first dashboard.
- Add an Upcoming Games page showing a calendar and selected readiness panel.
- Add Must Buy, Models Wishlist, Supplies And Tools, and Inspiration pages.
- Retain existing pages as supporting screens.
- Collection Board drag-and-drop is illustrative only; state does not persist after a refresh.
- Future implementation will use actual data, saved task completion, real game/list selection, and persistent readiness calculations.

## Acceptance Criteria

- [ ] The default dashboard represents the whole collection, not only one upcoming game.
- [ ] The primary dashboard visual shows state/progress by army or project.
- [ ] All upcoming games appear in a calendar/list and a selected game shows readiness status and required actions.
- [ ] A game creation/editing flow is represented as choosing a saved army list.
- [ ] Post-game information explicitly includes opponent faction and optional score.
- [ ] Location-transfer work is represented when a required model and venue differ.
- [ ] Collection Health and Recent Activity are clearly distinct dashboard areas.
- [ ] Must Buy, Models Wishlist, and Supplies And Tools are separate views.
- [ ] Inspiration prioritizes owned collection photos and permits linked community references.
- [ ] Navigation exposes Collection, Armies, Paint, Games, Photos, Notes, Wishlist, and Supplies as primary sections; each supporting page appears under the parent defined in the Supporting Pages table.

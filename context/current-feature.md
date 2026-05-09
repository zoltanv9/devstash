# Current Feature

Dashboard UI — Phase 3: main area with stats, recent collections, pinned items, and recent items.

## Status

Completed

## Goals

Phase 3 of 3 for the dashboard UI layout. Use the screenshot referenced below for how it should look. Use the data from the mock data file referenced below. Just import it directly for now until we implement a database.

- The main area to the right
- Recent collections
- Pinned Items
- 10 Recent items
- 4 stats cards at the top for number of items, collections, favorite items and favorite collections (Not in screenshot)

## References

- @context/features/dashboard-phase-3-spec.md
- @context/screenshots/dashboard-ui-main.png
- @context/project-overview.md
- @src/lib/mock-data.ts
- @context/features/dashboard-phase-1-spec.md
- @context/features/dashboard-phase-2-spec.md

## History

- 2026-05-06 — Initial Next.js and Tailwind setup (`abb7722`).
- 2026-05-09 — Dashboard UI Phase 1 completed: shadcn/ui init, `/dashboard` route, dark-mode root layout, top bar (logo, centered search, New Collection + New Item), sidebar/main placeholders.
- 2026-05-09 — Dashboard UI Phase 2 completed: collapsible sidebar (item types + collections sections), quick access links, type links to `/items/[type]`, favorited collections sorted first, user avatar footer, panel toggle in top bar, mobile sheet drawer. Layout moved into `(app)` route group so `/dashboard` and `/items/[type]` share the shell.
- 2026-05-09 — Dashboard UI Phase 3 completed: Card UI primitive, 4 stats cards (items, collections, favorite items, favorite collections), Collections section (4 favorited-first cards with type-color tint), Pinned Items section (hidden when empty), Recent Items section (10 most recent by createdAt). Refactored `SidebarContent` to drop the shared `ICON_MAP` in favor of a local `typeIcon()` switch.

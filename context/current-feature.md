# Current Feature

Dashboard UI — Phase 2: collapsible sidebar with item types, collections, and user avatar area.

## Status

Completed

## Goals

Phase 2 of 3 for the dashboard UI layout. Use the screenshot referenced below for how it should look. Use the data from the mock data file referenced below. Just import it directly for now until we implement a database.

- Collapsible sidebar
- Items/types with links to /items/TYPE (eg. items/snippets)
- Favorite collections
- Most recent collections
- User avatar area at the bottom
- Drawer icon to open/close sidebar
- Always a drawer on mobile view

## Notes

Subsequent phase is tracked in `context/features/dashboard-phase-3-spec.md`.

## References

- @context/features/dashboard-phase-2-spec.md
- @context/screenshots/dashboard-ui-main.png
- @context/project-overview.md
- @src/lib/mock-data.ts
- @context/features/dashboard-phase-1-spec.md
- @context/features/dashboard-phase-3-spec.md

## History

- 2026-05-06 — Initial Next.js and Tailwind setup (`abb7722`).
- 2026-05-09 — Dashboard UI Phase 1 completed: shadcn/ui init, `/dashboard` route, dark-mode root layout, top bar (logo, centered search, New Collection + New Item), sidebar/main placeholders.
- 2026-05-09 — Dashboard UI Phase 2 completed: collapsible sidebar (item types + collections sections), quick access links, type links to `/items/[type]`, favorited collections sorted first, user avatar footer, panel toggle in top bar, mobile sheet drawer. Layout moved into `(app)` route group so `/dashboard` and `/items/[type]` share the shell.

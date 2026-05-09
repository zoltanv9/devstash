# Current Feature

Dashboard UI — Phase 1: shell, top bar, and sidebar/main placeholders.

## Status

Completed

## Goals

Phase 1 of 3 for the dashboard UI layout. Reference the dashboard screenshot for visual direction.

- ShadCN UI initialization and components
- ShadCN component installation
- Dashboard route at `/dashboard`
- Main dashboard layout and any global styles
- Dark mode by default
- Top bar with search and new item button (display only)
- Placeholder for sidebar and main area — just an `h2` with "Sidebar" and "Main" for now

## Notes

Subsequent phases are tracked in `context/features/dashboard-phase-2-spec.md` and `context/features/dashboard-phase-3-spec.md`.

## References

- @context/features/dashboard-phase-1-spec.md
- @context/screenshots/dashboard-ui-main.png
- @context/project-overview.md
- @src/lib/mock-data.ts

## History

- 2026-05-06 — Initial Next.js and Tailwind setup (`abb7722`).
- 2026-05-09 — Dashboard UI Phase 1 completed: shadcn/ui init, `/dashboard` route, dark-mode root layout, top bar (logo, centered search, New Collection + New Item), sidebar/main placeholders.
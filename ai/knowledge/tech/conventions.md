# Tech Conventions

## Stack

- **Next.js** (App Router). The app lives in `app/` at the project root (i.e. `app/app/` holds the routes, `app/package.json` is the app's own manifest — the project root above it holds context files like this one, `PRODUCT.md`, and `DESIGN.md`).
- No Tailwind, no shadcn/ui, no other shared UI/styling framework. This was a deliberate setup choice — styling is custom CSS only.

## Styling

- **Custom CSS only, built from [`DESIGN.md`](../../../DESIGN.md) tokens.** Every color, font, spacing, and shadow value used in the app must trace back to a token defined in DESIGN.md's frontmatter (the `signal-*` / `neutral-*` color ramps, the Manrope typography scale, the `shadow-none` / `shadow-hairline` elevation states, and the 8px-rooted spacing scale).
- Don't hardcode a color, font size, or shadow value that doesn't correspond to a DESIGN.md token. If a screen needs something DESIGN.md doesn't define yet, that's a signal to update DESIGN.md first, not to freelance a one-off value.
- **Mobile-first breakpoints.** Write base styles for small screens first, then layer on `min-width` media queries for larger viewports — never the reverse. This matches the product's primary context: visitors checking status or showing a pass on their phone.

## File structure

- **Components** live in `app/components/`. Anything reusable across more than one screen (buttons, form fields, status chips, the pass card, nav) belongs here.
- **Screens** (routes) live in `app/app/`, following Next.js App Router conventions — one folder per route segment.
- Keep role-specific screens grouped in a way that reflects the actual roles in [`ai/product/roles/`](../../product/roles/) (Visitor, Approving Officer, Gate Security, Facility Admin) rather than a flat, undifferentiated screen list.

## General

- Prefer editing existing components/screens over creating new ones when the existing one is close to what's needed.
- Keep this file up to date as real conventions emerge (e.g. once real components exist, note naming patterns, state-management approach, or data-fetching conventions here).

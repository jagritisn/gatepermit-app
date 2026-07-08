---
name: Entry Permit
description: Responsive web app for requesting and presenting government office entry permits, efficiently and without friction.
colors:
  signal-50: "oklch(97% 0.02 200)"
  signal-100: "oklch(93% 0.035 200)"
  signal-200: "oklch(86% 0.05 200)"
  signal-300: "oklch(76% 0.07 200)"
  signal-400: "oklch(66% 0.09 200)"
  signal-500: "oklch(55% 0.11 200)"
  signal-600: "oklch(46% 0.10 200)"
  signal-700: "oklch(38% 0.085 200)"
  signal-800: "oklch(30% 0.065 200)"
  signal-900: "oklch(22% 0.045 200)"
  neutral-0: "oklch(98% 0.003 220)"
  neutral-50: "oklch(96% 0.004 220)"
  neutral-100: "oklch(93% 0.005 220)"
  neutral-200: "oklch(88% 0.006 220)"
  neutral-300: "oklch(78% 0.007 220)"
  neutral-400: "oklch(64% 0.008 220)"
  neutral-500: "oklch(50% 0.008 220)"
  neutral-600: "oklch(38% 0.007 220)"
  neutral-700: "oklch(28% 0.006 220)"
  neutral-800: "oklch(18% 0.005 220)"
  neutral-900: "oklch(12% 0.004 220)"
typography:
  display:
    fontFamily: "Manrope, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(1.75rem, 4vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Manrope, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "normal"
  title:
    fontFamily: "Manrope, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "normal"
  body:
    fontFamily: "Manrope, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Manrope, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.01em"
rounded:
  none: "0px"
  sm: "6px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  "2xl": "48px"
  "3xl": "64px"
---

<!-- This design system was hand-authored ahead of implementation (colors, typography, elevation, spacing, and components below are all committed decisions) and is now being built out in code (app/app/globals.css + app/components). Re-run /impeccable document once real screens exist to reconcile any drift between this spec and the shipped CSS. -->

# Design System: Entry Permit

## 1. Overview

**Creative North Star: "The Efficient Gatekeeper"**

This system reads like a well-run service counter, not a paper form digitized as-is: quiet, precise, and fast. Every screen exists to move a visitor one step closer to a submitted request or a verified pass, nothing more. Color, type, and motion all serve legibility and speed first; decoration is not part of the vocabulary.

The system explicitly rejects two failure modes named in PRODUCT.md: the dense, dated, bureaucratic government-portal look (small text, cluttered forms, unclear steps), and consumer-app gloss (playful illustration, marketing-style flourish, anything that reads as a lifestyle app rather than an official service).

**Key Characteristics:**
- A single signal-color ramp, spent almost entirely on primary actions and the approved/pass state; everything else is neutral.
- Manrope carries the whole hierarchy — one voice, weight and size do the work.
- Elevation sits at near-zero; the interface is flat by conviction, not by accident.
- Spacing follows one 8px-rooted scale so rhythm stays consistent across the request and pass-display flows.
- Every screen assumes a first-time, possibly anxious visitor: plain language, one task at a time.

## 2. Colors

Restrained strategy, expressed as two tonal ramps rather than one-off values: a **signal ramp** (the single accent, used sparingly) and a **neutral ramp** (background, text, borders). Ramping both means every tint, hover, and text-on-tint pairing comes from the same system instead of an ad-hoc pick.

### Primary — Signal Teal ramp
- **signal-50** (`oklch(97% 0.02 200)`): subtle tinted backgrounds — e.g. a pending/approved status chip fill.
- **signal-100** (`oklch(93% 0.035 200)`): hover fill for ghost/secondary signal buttons.
- **signal-200** (`oklch(86% 0.05 200)`): active/pressed tint, subtle borders on signal-tinted elements.
- **signal-300** (`oklch(76% 0.07 200)`): decorative use only (icons on tint); not for text or fill at body scale.
- **signal-400** (`oklch(66% 0.09 200)`): large-text/UI-component accents where full signal-600 would be too heavy.
- **signal-500** (`oklch(55% 0.11 200)`): mid-ramp reference value; rarely used directly, mainly a gradient/interpolation anchor.
- **signal-600** (`oklch(46% 0.10 200)`): **the primary action color** — submit/confirm buttons, the approved-pass state, primary links. Paired with `neutral-0` text.
- **signal-700** (`oklch(38% 0.085 200)`): hover/active state for signal-600 elements.
- **signal-800** (`oklch(30% 0.065 200)`): pressed state, or text-on-signal-tint when a darker mark is needed.
- **signal-900** (`oklch(22% 0.045 200)`): highest-contrast signal value; text set directly on `signal-50`/`signal-100` tints.

### Neutral ramp
- **neutral-0** (`oklch(98% 0.003 220)`): page background — a true, low-chroma cool neutral, not a warm cream/sand default.
- **neutral-50 / neutral-100** (`oklch(96% 0.004 220)` / `oklch(93% 0.005 220)`): surface/card backgrounds one step above the page.
- **neutral-200 / neutral-300** (`oklch(88% 0.006 220)` / `oklch(78% 0.007 220)`): borders, dividers, disabled fills.
- **neutral-400 / neutral-500** (`oklch(64% 0.008 220)` / `oklch(50% 0.008 220)`): placeholder text, secondary icons — never body copy.
- **neutral-600 / neutral-700** (`oklch(38% 0.007 220)` / `oklch(28% 0.006 220)`): secondary body text, captions.
- **neutral-900** (`oklch(12% 0.004 220)`): **primary body text (ink)** against `neutral-0`/`neutral-50` — verify ≥4.5:1 against the final rendered background before shipping.

### Named Rules
**The Restrained Signal Rule.** The signal ramp appears on ≤10% of any given screen — reserved for primary actions and the passing/approved state. Everywhere else stays neutral. If a screen reaches for signal color to feel "less boring," that's the rule breaking.

**The One Ramp Rule.** Every tint, hover, and pressed state is a step on the signal or neutral ramp — never a one-off hex picked to "look right" in isolation.

## 3. Typography

**Display Font:** Manrope (fallback: `'Helvetica Neue', Arial, sans-serif`)
**Body Font:** Manrope (same family, different weight/size steps)
**Label/Mono Font:** Manrope (label steps use tighter size + slight positive tracking, no separate family)

**Character:** One typeface, Manrope — geometric but warm enough not to feel cold, contemporary without being trendy. Precise, legible at small sizes, comfortable for visitors with varying tech familiarity and literacy.

### Hierarchy
- **Display** (700, `clamp(1.75rem, 4vw, 2.5rem)`, line-height 1.15, letter-spacing -0.01em): the permit status or primary confirmation (e.g. "Request submitted", "Pass approved").
- **Headline** (600, 1.5rem, line-height 1.25): section and step titles within the request/pass flow.
- **Title** (600, 1.125rem, line-height 1.35): field group labels, card titles.
- **Body** (400, 1rem, line-height 1.5, cap line length 65–75ch): instructions, help text, plain-language explanations.
- **Label** (500, 0.8125rem, letter-spacing 0.01em, line-height 1.4): form field captions, status tags, timestamps. Sentence case, not uppercase-tracked — this is a label, not a section eyebrow.

### Named Rules
**The One Voice Rule.** Manrope, full stop — no second family. Hierarchy comes from weight and size only.

## 4. Elevation

Near-zero by conviction, not by accident. The interface is flat at rest everywhere; the handful of functionally load-bearing moments (a modal confirming a submission, a toast confirming a status change, the pass card when presented at the gate) get a single hairline shadow, never a shadow stack.

### Shadow Vocabulary
- **shadow-none** (`none`): default for every surface at rest — page background, form cards, list rows, nav.
- **shadow-hairline** (`box-shadow: 0 1px 2px oklch(0% 0 0 / 0.06)`): the *only* other shadow value in the system. Used exclusively for: modal/dialog surfaces, toast confirmations, and the pass card when displayed for verification.

### Named Rules
**The Near-Zero Elevation Rule.** There are exactly two elevation states: `shadow-none` and `shadow-hairline`. No mid-tier "card hover lift," no multi-layer ambient shadows. If a shadow needs a second `box-shadow` layer to look right, it doesn't belong in this system.

## 5. Spacing

*(Extension to the standard DESIGN.md spec: this project tracks spacing as its own visual foundation alongside color, typography, and elevation, rather than folding it into Overview/Components.)*

One scale, rooted in 8px, used for every gap, padding, and margin in the system — this is what keeps a restrained, single-typeface, near-flat interface from feeling arbitrary.

- **xs** (`4px`): icon-to-label gaps, tight inline spacing.
- **sm** (`8px`): internal padding for compact controls (chips, small buttons).
- **md** (`16px`): default field spacing, card internal padding, standard gap between related elements.
- **lg** (`24px`): spacing between distinct field groups, card-to-card gaps.
- **xl** (`32px`): section-level spacing within a single screen.
- **2xl** (`48px`): spacing between major sections (e.g. form vs. summary).
- **3xl** (`64px`): top-level page margins on larger viewports.

### Named Rules
**The One Scale Rule.** Every spacing value in the interface is one of the seven steps above. No arbitrary `13px` or `22px` gaps — if a spot needs "something in between," round to the nearest step rather than inventing a new one.

**The Touch Target Floor.** Interactive elements (buttons, form inputs, tappable rows) never go below a `44px` effective touch target, achieved via padding from the scale above (e.g. `sm` + `sm` vertical padding around a compact label), not by shrinking below it.

## 6. Components

Excludes Facility Admin components — those aren't specified yet.

### Shared conventions (apply to every component below)

- **Radius:** structural surfaces (cards, modals, containers, list rows) stay sharp (`rounded.none`, 0px). Controls (buttons, inputs, chips, textareas) use `rounded.sm` (6px). Nothing else.
- **Icons:** [Lucide](https://lucide.dev), inline, no other icon source. Two sizes only, reusing existing spacing tokens so no new number system is introduced: **compact** (`spacing.md`, 16px) inline with labels/chips; **default** (`spacing.lg`, 24px) standalone (empty states, result panels).
- **Motion:** all hover/focus/active transitions are 140ms ease-out (`cubic-bezier(0.22, 1, 0.36, 1)`). Ambient states (skeleton loading pulse) run on a separate ~1.2s loop, not the interaction timing. Every transition has a `prefers-reduced-motion` fallback of an instant/crossfade swap — no animation is ever the only way to perceive a state change.
- **Focus-visible:** every interactive element gets a `2px solid signal-600` outline, `2px` offset, on `neutral-0`/light surfaces. On the signal-600-filled primary button specifically, the ring shifts to `signal-900` so it's visible against its own fill. Never removed, never a subtler substitute.
- **Errors & non-approved status:** there is no error/danger color in this system — only `signal` (actions/approved) and `neutral`. Every error, denial, and expiry state is communicated via **icon + text + weight**, not color, using `neutral-100`/`neutral-700`/`neutral-900` only. This keeps The One Ramp Rule (§2) intact and satisfies WCAG's don't-rely-on-color-alone guidance for free.
- **Breakpoint:** two-tier, mobile-first. Base styles target `<768px`; a single `min-width: 768px` media query layers on desktop treatment. No intermediate tablet tier.

### Named Rules
**The Icon-Text Rule.** No status, error, or result state is ever communicated by color alone — a Lucide icon and a text label carry the meaning; color (when signal is used at all) is reinforcement, never the sole signal.

---

### App Shell *(foundational frame)*
The outer frame for **authenticated app screens** (visitor home/request, officer queue/detail). Login and onboarding are deliberately chrome-less full-bleed focus screens and do **not** use it. Replaces the per-page `.screen` wrapper (max-width + padding + min-height) that route CSS would otherwise duplicate.

- **Structure:** a sticky top bar over a centered, width-constrained main region. Shell is a `min-height: 100dvh` flex column; the header is `position: sticky; top: 0`; main is `flex: 1`.
- **Header:** `neutral-0` background, 1px `neutral-200` bottom border, `shadow-none` (flat, per §4 — the border does the separation, not a shadow). Clears the 44px touch-target floor. Contents, left to right:
  - **Back** (optional): a ghost icon button (chevron-left, `neutral-700`) shown only on drill-in screens (e.g. officer request detail → queue); omitted on top-level screens.
  - **Logo / wordmark:** "Entry Permit" in the `title` token, `neutral-900`.
  - **Search** (opt-in per screen): a compact leading-icon input reusing Text Input's border/radius/focus tokens, with an accessible label. Present only on list/queue screens (officer queue); the visitor's linear one-task screens omit it, per PRODUCT.md's "one task at a time."
  - **Notification button:** ghost icon button (bell). Optional unread **count badge** — a small `neutral-900` circle (`rounded.full`) with `neutral-0` label text, top-right of the bell. Presentational: driven by a count + onClick, not a built-in notification system.
  - **Profile card:** an initials **avatar** (`neutral-200` fill, `neutral-700` initials, `rounded.full`) plus the user's name (`label` token) on desktop. Opens a menu holding the user's identity, language options, and **Sign out** — this is where the language switcher and session control live.
- **Main:** centered column, horizontal padding `spacing.lg`, respects mobile safe-area insets, min-height fills the viewport below the header. Content width via a `size` prop — `narrow` (≈480px, visitor flows) or `wide` (≈640px, officer). Full-width under 768px; constrained + centered at ≥768px.
- **Responsive (mobile-first):** under 768px the top bar is a single row of `[Back?] [Logo] … [Notification] [Avatar]` — the profile collapses to **avatar only** (name hidden) and, when search is enabled, the **search field reflows to its own full-width row** beneath the bar. At ≥768px everything sits in one row with search inline (flex-grow, capped ~360px) and the profile showing avatar + name.
- **Profile / notification menus:** bottom sheet on mobile, anchored dropdown on desktop (same treatment as Modal and Language Switcher). Light-dismiss (backdrop click), Escape closes.

### Named Rules
**The Chrome-Is-Optional Rule.** Every header element beyond the logo is an opt-in slot (back, search, notifications, profile). A screen shows only what its task needs — the shell never forces search or a full profile onto a screen that doesn't use them. This keeps "one task at a time" intact even with a capable header.

**The Flat Header Rule.** The header separates from content with a 1px `neutral-200` border, never a shadow — consistent with §4's near-zero elevation. It does not gain elevation on scroll.

*Informal z-index ladder (until a formal scale is documented): header `40` < fallback banner `50` < modal/menu `100` < toast `200`.*

---

### Buttons
- **Shape:** `rounded.sm`. Label text: `body` size/weight, bumped to 600 weight for emphasis (a weight step within Manrope, not a new typeface — consistent with The One Voice Rule).
- **Primary:** `signal-600` fill, `neutral-0` text. Padding from the spacing scale, sized to clear the 44px Touch Target Floor (§5) regardless of label length.
  - Hover → `signal-700` fill (140ms ease-out). Active/pressed → `signal-800` fill. Focus-visible → `signal-900` ring (see Shared conventions). Disabled → `neutral-200` fill, `neutral-400` text, no transitions, `cursor: not-allowed`.
- **Secondary (ghost):** transparent fill, `signal-600` text + 1px `signal-600` border. Hover → `signal-50` fill. Active → `signal-100` fill.
- **Tertiary / de-emphasized (e.g. "Deny"):** transparent fill, `neutral-700` text + 1px `neutral-300` border — deliberately quieter than Primary/Secondary so the interface doesn't visually push toward denial. Hover → `neutral-100` fill.
- **Responsive:** primary action is full-width on mobile (`<768px`, one-handed reach); auto-width and inline with secondary/tertiary actions (`spacing.md` gap) on desktop.

### Text Input
- **Shape:** `rounded.sm`, 1px `neutral-300` border, `neutral-0` background. Field caption uses the `label` token above the field; value text uses `body`.
- **States:** default (`neutral-300` border) → focus (`signal-600` border + focus ring) → filled (unchanged from default, just populated) → disabled (`neutral-100` background, `neutral-400` text, `neutral-200` border) → **error** (border becomes `neutral-900`, 2px instead of 1px; a leading alert-circle icon in `neutral-900` appears; helper text below switches to `neutral-900` — no red, per Shared conventions).
- **Responsive:** full-width within its container at every breakpoint; only the container's max-width changes (see App Shell).

### Select / Dropdown
- **Shape:** a native `<select>` restyled to Text Input's language — `rounded.sm`, 1px `neutral-300` border, `neutral-0` background, `label`-token caption above, `body` value text — with a trailing chevron-down icon (`neutral-500`). Native, not a custom listbox: same "don't fight the platform" rationale as the Date/Time Picker (free mobile-optimized picker UX + built-in keyboard/screen-reader support).
- **Placeholder:** the first option is a disabled, non-selectable prompt (e.g. "Select a reason") shown in `neutral-500` until a real value is chosen.
- **States:** default → focus (`signal-600` border + focus ring) → disabled (`neutral-100` background, `neutral-400` text) → **error** (2px `neutral-900` border + leading alert-circle icon + `neutral-900` helper text, per Shared conventions — no red).
- **Responsive:** full-width within its container at every breakpoint.

### OTP Input
- **Shape:** six individual boxes (matches the demo's fixed `123456`), each `rounded.sm`, 1px `neutral-300` border, digit rendered at `headline`-token size for legibility, centered.
- **States:** empty → typing (border shifts to `signal-600` on the active box, auto-advances focus) → complete → **error** (all six boxes' borders shift to `neutral-900`, inline error text below using the icon+neutral pattern, boxes clear for re-entry — no shake/bounce motion per the general motion rules).
- **Responsive:** boxes scale down slightly on very narrow viewports to stay on one row without wrapping; never stack vertically.

### Status Chip / Badge
- **Shape:** `rounded.sm`, compact padding (`spacing.xs` vertical, `spacing.sm` horizontal), `label` typography token.
- **Only two color treatments exist**, per the Restrained Signal Rule: **signal** (`signal-50` background, `signal-800` text) reserved exclusively for *approved* / *valid* / *pass* states — and **neutral** (`neutral-100` background, `neutral-700` text) for everything else (pending, denied, expired, invalid, used). The four neutral states are told apart by their leading icon + label text (e.g. clock for pending, x-circle for denied, alert-triangle for expired), never by a color variant.
- **Responsive:** identical at every breakpoint; it's a small inline element.

### Card / Container
- **Shape:** `rounded.none` (sharp, per Shared conventions) — cards are a background/grouping device here, not a decorative shape.
- **Elevation:** `shadow-none` at rest, always (Elevation §4). A card never gets a hover-lift shadow.
- **Background/border:** `neutral-50` background on `neutral-0` page background, no border by default; a 1px `neutral-200` border only where two adjacent cards would otherwise be indistinguishable (e.g. stacked summary cards).
- **Padding:** `spacing.md` on mobile, `spacing.lg` on desktop.
- **Responsive:** full-width on mobile; constrained to the App Shell's content max-width on desktop.

### Modal / Dialog
- **Shape:** `rounded.none`, `shadow-hairline` (the rare load-bearing elevation case, per §4).
- **Background:** `neutral-0`. Backdrop: `neutral-900` at low opacity (scrim), no blur (glassmorphism is a hard ban).
- **Padding:** `spacing.lg`. Title uses `headline`, body copy uses `body`.
- **States:** entrance/exit are a 140ms ease-out fade + slight scale (no bounce); reduced-motion → instant show/hide.
- **Responsive:** full-screen sheet on mobile (`<768px`, anchored to the bottom, matches native app-like patterns); centered fixed-width panel (max ~480px) on desktop.

### Toast / Inline Confirmation
- **Shape:** `rounded.sm`, `shadow-hairline`, `neutral-0` background, 1px `neutral-200` border.
- **Content:** leading icon (`signal-800` check for success confirmations tied to the approved/pass state, `neutral-900` check for neutral confirmations like "logged"), `body` text, optional close icon.
- **Behavior:** auto-dismiss ~4–5s, manually dismissible, 140ms ease-out entrance.
- **Responsive:** bottom-anchored, full-width minus `spacing.lg` margins on mobile (thumb-reachable); top-right, fixed ~360px width on desktop.

### Empty State
- **Shape:** no container/card — sits directly on the page background.
- **Content:** centered icon (`neutral-400`, default size), `headline` token for the message, `body`/`neutral-600` for supporting text, optional Primary button.
- **Responsive:** vertically centered within available content height on both breakpoints; icon and type scale down slightly on mobile only if the default sizes would force scrolling above the fold.

### Loading / Skeleton State
- **Shape:** matches the shape of the content it replaces (text-line rectangles, card blocks), always `rounded.sm` regardless of the real content's radius, `neutral-100` fill.
- **Motion:** ambient ~1.2s pulse loop (opacity `neutral-100` ↔ `neutral-200`); reduced-motion fallback is a static `neutral-100` block, no pulse.
- **Responsive:** mirrors the responsive layout of the real content it's standing in for.

### Language Switcher
- **Shape:** ghost-button styling (see Buttons/Secondary), showing the current language code (e.g. "EN") in `label` token.
- **Interaction:** opens a small popover/list of language options as flat `neutral-0` rows with `signal-50` hover, divided by `neutral-200` hairlines — not a full modal.
- **Responsive:** lives in the App Shell header at every breakpoint; popover anchors below the control on desktop, opens as a bottom sheet on mobile (consistent with Modal's mobile treatment).

### Photo Capture / Upload
- **Shape:** `rounded.sm`, 1px solid `neutral-300` border (not dashed — stays minimal), ID-card aspect ratio (3:2).
- **States:** empty (centered camera icon + `body` label "Add ID photo") → captured (fills with the preview image, small ghost "Retake" button overlaid, bottom-aligned) → error (same neutral+icon treatment as Text Input error, e.g. "Photo unclear, try again").
- **Responsive:** full-width within its form container at both breakpoints; the 3:2 ratio is preserved, height adjusts accordingly.

### Live Photo Capture *(Visitor)*
- **Shape:** the same `rounded.sm`, 3:2 frame as Photo Capture — the live/upload variants are visually interchangeable so a form doesn't shift when it falls back.
- **Camera:** an in-app live preview via `getUserMedia` (the same API the Gate Security QR Scanner uses), front-facing by default for an ID selfie. A **shutter** button (`signal-600` primary, the deliberate action) captures the current frame to a canvas and freezes it.
- **States:** requesting-permission → **live preview** (video fills the frame, shutter button below) → **captured** (frozen still + a ghost "Retake" that restarts the stream) → **fallback**. Output is a photo **data URL**.
- **Fallback:** on permission-denied or no camera (e.g. a desktop without a webcam), it degrades to the file-upload Photo Capture rather than dead-ending — the visitor can still attach an ID photo.
- **Responsive:** full-width in its form container; 3:2 preserved at both breakpoints. Camera stream is stopped on unmount/retake so the device light doesn't stay on.

### Reason / Justification Textarea
- **Shape:** same visual language as Text Input (`rounded.sm`, `neutral-300` border, `signal-600` focus), but multi-line, min-height ≈ 3 lines of `body` text.
- **Used by:** Approving Officer's "request more info," Gate Security's manual-override reason.
- **Responsive:** full-width at both breakpoints; min-height stays fixed, grows with content.

### Audit / Log List Row
- **Shape:** flat row, no card wrapper, no shadow — divided by 1px `neutral-200` hairlines only.
- **Content:** timestamp (`label`, `neutral-500`) + actor (`body`, `neutral-900`) + action description (`body`, `neutral-700`) + optional reason (`body`, `neutral-600`, truncated with a "show more" affordance).
- **Responsive:** all fields inline in one row on desktop; stacks to two lines (timestamp+actor on one line, action+reason on the next) on mobile rather than truncating aggressively.

### Step Progress Dots *(Onboarding)*
- **Shape:** small filled circles, `spacing.sm` (8px) diameter, `rounded.full` — the one documented use of the pill radius, since a progress dot is neither a structural surface nor a standard control. `rounded.full` is reserved for genuinely circular/pill shapes only; it is not a softer alternative to `rounded.sm` on controls.
- **Color:** active step is `signal-600`; inactive steps are `neutral-300`. No hover/focus state — this is a status indicator, not an interactive control.
- **Layout:** horizontal row, `spacing.xs` gap between dots, centered under the explainer content.
- **Responsive:** identical at both breakpoints — it's a small inline element.

---

### Permit Request Form *(Visitor — composed pattern)*
The system is **walk-in**: a visitor submits on arrival for immediate entry, so there is no scheduled date/time. Composes three fields only — Text Input (full name), Select (reason for visit), Live Photo Capture (ID selfie) — plus a Primary Button (submit). Single-column, one field group visible at a time on mobile (matches PRODUCT.md's "one task at a time" principle); all fields visible in one column on desktop, still single-column (never worth two columns — it's not a data-dense table).

### Date/Time Picker *(Visitor — retained, not used in the walk-in request flow)*
Uses native `<input type="date">`/`<input type="time">`, restyled to match Text Input's border/radius/focus tokens rather than a custom-built calendar widget — free mobile-optimized keyboard/picker UX, consistent with "efficient, minimal, don't fight the platform." Kept in the library for any future scheduled-visit surface; the current walk-in Permit Request Form does not use it.

### Request Status Tracker *(Visitor)*
A single persistent Status Chip + supporting `body` text explaining what happens next, inside a Card. Not a multi-step progress bar — the visitor cares about *current state*, not a step-count.

### Pass Card *(Visitor — signature component)*
- **Shape:** `rounded.sm` (an explicit exception to "structural surfaces stay sharp" — this is the one object a visitor physically presents, and a card-like, wallet-pass-like shape is the point), `shadow-hairline` (the pass-display exception named in §4).
- **Content:** QR code (top), visitor's simulated identity photo + name (`headline`), pass validity (`body`, e.g. "Valid until 4:30 PM" — walk-in passes expire a few hours after approval), single-use Status Chip.
- **Critical exception:** the QR code itself renders in true black/`neutral-0` — **never** tinted with `signal` or any ramp step, regardless of how the rest of the card looks. Scanner hardware needs maximum real contrast; brand consistency loses to function here.
- **Responsive:** fixed aspect ratio, centered, comfortably large on mobile (this is the primary use case — shown at the gate on a phone); doesn't scale beyond a comfortable "held up to a scanner" size even on desktop.

### QR Code Display *(Visitor — used inside Pass Card, and standalone if needed)*
Same true-black-on-white rule as above. No other styling variance.

---

### Request Queue List + List Item *(Approving Officer)*
Flat list, hairline-divided (same pattern as Audit/Log List Row), **not** a card grid (avoids the identical-card-grid anti-pattern for what's fundamentally a scannable queue). Each row: Status Chip (pending) + visitor name (`body`, `neutral-900`) + purpose (`body`, `neutral-600`, truncated) + requested window (`label`, `neutral-500`).

### Request Detail View *(Approving Officer)*
Identity photo (~96–120px square, `rounded.sm`) + `headline` name + `body` purpose/window/submitted-timestamp, followed by the Decision Action Bar.

### Decision Action Bar *(Approving Officer)*
Primary Button "Approve" (signal-600), Secondary/ghost Button "Request more info," Tertiary/de-emphasized Button "Deny" (per Buttons above — deliberately quieter, not a red destructive button). Sticky at the bottom on mobile (thumb reach); inline row on desktop.

### Decision History List *(Approving Officer)*
Directly reuses Audit / Log List Row, filtered to this officer's own decisions — not a separate component.

---

### QR Scanner *(Gate Security)*
Camera viewport, full-bleed on mobile/kiosk display, `neutral-900` frame overlay with a `signal-600` scan-target outline (the one legitimate non-approved use of signal color — it's a live targeting affordance, not a status). Falls back to Manual Lookup Form when camera access fails.

### Verification Result Panel *(Gate Security)*
- **Valid:** `signal-50` background wash (the "approved/passing state" exception, per Restrained Signal Rule), large check icon (`signal-800`), visitor photo, `headline` name, `body` approved window.
- **Invalid:** `neutral-900` background fill (not signal, not a new color), `neutral-0` text and large X icon for maximum contrast, `headline`-weight reason ("Expired" / "Already used" / "Not found"). This is deliberately the heaviest, highest-contrast treatment in the entire system — a safety-critical result must never be mistaken for "still loading" or "valid."
- **Responsive:** near-full-viewport on both breakpoints — this result needs to be readable at a glance regardless of device.

### Manual Lookup Form *(Gate Security)*
Text Input (name or reference code) + Primary Button. Identical at both breakpoints.

### Fallback-Mode Banner *(Gate Security)*
Persistent full-width bar, `neutral-900` background, `neutral-0` text (`label` token, uppercase avoided per the eyebrow ban — sentence case, just bold), pinned to the top of the viewport whenever manual mode is active.

### Manual Override Confirmation *(Gate Security)*
Composed from Modal + Reason/Justification Textarea + Primary Button ("Confirm override") — not a new primitive.

## 7. Do's and Don'ts

### Do:
- **Do** write body copy in plain language, short sentences, assuming a first-time, possibly anxious visitor.
- **Do** reserve the signal ramp for primary actions and the approved/pass state only (The Restrained Signal Rule).
- **Do** pull every color from the signal or neutral ramp (The One Ramp Rule) — no one-off hex values.
- **Do** set all type in Manrope, using weight/size to build hierarchy (The One Voice Rule).
- **Do** keep elevation to `shadow-none` or `shadow-hairline` only (The Near-Zero Elevation Rule).
- **Do** pull every spacing value from the 8px-rooted scale (The One Scale Rule), and keep interactive targets ≥44px (The Touch Target Floor).
- **Do** meet WCAG 2.1 AA contrast, full keyboard navigation, and screen-reader support on every screen.
- **Do** support multiple languages across the visitor-facing flow.
- **Do** keep one task per screen — requesting a permit and presenting an approved pass are separate flows, not tabs on the same view.

### Don't:
- **Don't** build a dense, bureaucratic government-portal layout: small text, cluttered forms, unclear steps, unclear progress.
- **Don't** add consumer-app gloss: playful illustration, marketing-style flourish, gradients, or anything that reads as a lifestyle app rather than an official service.
- **Don't** default to a cream/sand/warm-neutral background; the neutral ramp is deliberately cool and low-chroma.
- **Don't** introduce a second typeface for "contrast" — Manrope carries display through label.
- **Don't** stack shadows or add a mid-tier hover-lift shadow; there are only two elevation states.
- **Don't** invent one-off spacing values outside the scale.
- **Don't** choreograph decorative motion, scroll effects, or staggered reveals; every animation ties to a real state change.
- **Don't** use gray-on-tint body text that fails 4.5:1 contrast "for elegance."

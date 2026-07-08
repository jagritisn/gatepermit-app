# Agent Rules — Entry Permit

## Always / Never

**Always:**
- Always read [`PRODUCT.md`](PRODUCT.md), [`DESIGN.md`](DESIGN.md), and [`ai/INDEX.md`](ai/INDEX.md) before designing or building any screen.
- Always open the specific role, jobs, and workflow file(s) under [`ai/product/`](ai/product/) that are relevant to the current brief before writing code.
- Always draft missing or outdated `ai/` context (role, jobs, workflow, domain, or tech files) first, show the draft in chat, and wait for approval before relying on it or building anything that depends on it.
- Always build screens using only colors, typography, elevation, and spacing tokens, plus components/patterns, that already exist in DESIGN.md.
- Always propose a new DESIGN.md token, color, component, or pattern in chat and get explicit approval before adding it to DESIGN.md or using it in a screen.
- Always show the finished screen and wait for review before treating it as done.

**Never:**
- Never design or build a screen without first reading PRODUCT.md, DESIGN.md, and ai/INDEX.md.
- Never invent a color, token, component, or pattern inline that isn't already in DESIGN.md — propose it first (see Gate 2 below).
- Never skip a gate, even for a change that looks small or obvious.
- Never silently work around missing `ai/` context — write it, surface it in chat, and wait for approval.
- Never mark a screen "finished" without explicit review and approval.
- Never violate the domain privacy rule: no real biometric or citizen data, ever (see [`ai/knowledge/domain/privacy-and-compliance.md`](ai/knowledge/domain/privacy-and-compliance.md)).

## Gates

Before building or changing **any** screen, follow these gates **in order**, and **STOP for approval at each one**. Never skip a gate.

### 1. Context-setup gate

Read:
- [`ai/INDEX.md`](ai/INDEX.md) — the map
- [`PRODUCT.md`](PRODUCT.md) — product vision
- [`DESIGN.md`](DESIGN.md) — design vision
- The relevant files under [`ai/product/roles/`](ai/product/roles/), [`ai/product/jobs/`](ai/product/jobs/), and [`ai/product/workflows/`](ai/product/workflows/) for the brief — execution vision

If any of this context is missing, or exists but needs updating for the brief at hand, draft it, show it in chat, and **wait for approval** before continuing to Gate 2.

If unsure whether relevant context already exists, run this gate to check. If it doesn't exist, propose it (product or design context) in chat and proceed only once approved.

### 2. Design-system gate

If the screen needs a color, token, component, or pattern that isn't already in DESIGN.md, do **not** invent it inline. Propose the addition to DESIGN.md in chat, show the exact change, and **wait for approval**. Only after approval: add it to DESIGN.md, then build using it.

### 3. Screen-execution gate

Build using only DESIGN.md tokens, components, and patterns, plus the relevant `ai/product/workflows/` context from Gate 1. When done, show the result and **wait for review** before calling it finished.

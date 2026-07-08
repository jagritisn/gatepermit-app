# AI Context Layer — Entry Permit

This `ai/` folder is the project's context layer. Read this file first, then follow the links below to whatever's relevant to the task at hand — you don't need to read everything for every task.

For strategic and visual context, also see the project root:
- [`PRODUCT.md`](../PRODUCT.md) — register, users, brand personality, anti-references, accessibility requirements
- [`DESIGN.md`](../DESIGN.md) — color ramps, typography (Manrope), elevation, spacing tokens

## Product

### Roles — who uses this system
- [`product/roles/visitor.md`](product/roles/visitor.md) — the public visitor requesting/presenting a permit
- [`product/roles/approving-officer.md`](product/roles/approving-officer.md) — reviews and decides on permit requests
- [`product/roles/gate-security.md`](product/roles/gate-security.md) — verifies passes at the physical entrance
- [`product/roles/facility-admin.md`](product/roles/facility-admin.md) — configures and administers the system

### Jobs-to-be-done — why each role uses it
- [`product/jobs/visitor.md`](product/jobs/visitor.md)
- [`product/jobs/approving-officer.md`](product/jobs/approving-officer.md)
- [`product/jobs/gate-security.md`](product/jobs/gate-security.md)
- [`product/jobs/facility-admin.md`](product/jobs/facility-admin.md)

### Workflows — how the key flows work end-to-end
- [`product/workflows/request-and-approval.md`](product/workflows/request-and-approval.md) — Visitor requests, Approving Officer decides
- [`product/workflows/gate-verification.md`](product/workflows/gate-verification.md) — Visitor presents pass, Gate Security verifies
- [`product/workflows/manual-fallback.md`](product/workflows/manual-fallback.md) — what happens when the digital flow can't complete
- [`product/workflows/onboarding-visitor.md`](product/workflows/onboarding-visitor.md) — first-time visitor welcome → login → journey explainer
- [`product/workflows/onboarding-approving-officer.md`](product/workflows/onboarding-approving-officer.md) — first-time officer welcome → queue/decision walkthrough
- [`product/workflows/onboarding-gate-security.md`](product/workflows/onboarding-gate-security.md) — first-time security welcome → scanner/result walkthrough

## Knowledge

### Domain — the rules of this world
- [`knowledge/domain/permit-rules.md`](knowledge/domain/permit-rules.md) — single-visit, time-boxed pass
- [`knowledge/domain/auth-otp.md`](knowledge/domain/auth-otp.md) — OTP login, demo code `123456`
- [`knowledge/domain/identity-simulation.md`](knowledge/domain/identity-simulation.md) — simulated identity from an ID photo
- [`knowledge/domain/privacy-and-compliance.md`](knowledge/domain/privacy-and-compliance.md) — never real biometric/citizen data

### Tech — how we build this
- [`knowledge/tech/conventions.md`](knowledge/tech/conventions.md) — Next.js, custom CSS from DESIGN.md tokens, file structure

## How to use this layer

- Building a screen for a specific role? Read that role's file, its jobs file, and the workflow(s) it appears in.
- Touching permit logic, OTP, identity, or privacy? Read the matching `knowledge/domain/` file — these are hard rules, not suggestions.
- Writing any code? Read `knowledge/tech/conventions.md` first.
- This index is the map, not the territory — when a linked file and this index disagree, the linked file wins; update this index instead of trusting a stale summary.

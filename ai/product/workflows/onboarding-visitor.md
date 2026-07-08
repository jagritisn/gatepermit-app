# Workflow: Onboarding — Visitor

## Actors
- **Visitor** — first-time user of the app.

## Steps
1. Welcome screen, before login: one or two short screens in plain language explaining what
   the app does ("Request permission to enter a government office, then show your pass at
   the gate") — sets expectation before asking for a phone number.
2. A one-line reassurance on data use (ties to [`privacy-and-compliance.md`](../../knowledge/domain/privacy-and-compliance.md)) — the ID photo is
   for this visit only, not stored as a permanent record. Builds trust upfront for a
   government-adjacent service visitors may be wary of.
3. OTP login (existing mechanism, [`auth-otp.md`](../../knowledge/domain/auth-otp.md)) — onboarding does not change or duplicate this,
   just precedes it with context.
4. A single explainer screen framing the two-step journey: "1. Request a permit. 2. Show your
   pass at the gate" — matches PRODUCT.md's "one task at a time" principle and maps directly
   to the two existing workflows ([`request-and-approval.md`](request-and-approval.md), [`gate-verification.md`](gate-verification.md)).
5. Lands on the first-time empty state (no request yet) with one clear primary action:
   "Request a permit."

## Screen states
- Welcome/intro (skippable for returning visitors)
- Data-use reassurance (can be folded into the welcome screen, not necessarily separate)
- OTP login (existing)
- Journey explainer ("Request → Show pass")
- First-time empty state with primary CTA

## Edge cases
- Returning visitor with an existing request/pass — onboarding must not reappear; go straight
  to their current status/pass view.
- Visitor skips or backs out of onboarding early — must still land safely on the empty state
  with the CTA, never blocked or stuck.
- Low-tech-familiarity visitor — copy stays extremely plain, minimal screens, large touch
  targets (PRODUCT.md accessibility requirements apply here as much as anywhere).

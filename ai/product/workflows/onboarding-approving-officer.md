# Workflow: Onboarding — Approving Officer

## Actors
- **Approving Officer** — new staff member.

## Steps
1. Welcome/context screen: one sentence on the role ("You review permit requests and decide
   whether to approve, deny, or ask for more information").
2. Queue walkthrough: explain how to read a queued request at a glance (status chip, name,
   purpose, requested window) and how to open the full detail view.
3. Decision walkthrough: explain the three actions on the Decision Action Bar and when each
   applies — particularly that "Request more info" exists so an officer is never forced to
   approve or deny on incomplete information (ties to [`roles/approving-officer.md`](../roles/approving-officer.md)'s "must never
   approve without the minimum required information").
4. Audit-trail reminder: every decision is logged with actor and reason — sets expectation of
   accountability without needing to explain a whole audit UI up front.
5. Lands on the real queue.

## Screen states
- Welcome/context screen
- Queue walkthrough (explainer screen, not a live-UI overlay — see note below)
- Decision walkthrough (explainer screen)
- Completion → real queue (empty state if nothing pending yet)

## Edge cases
- Officer skips onboarding — must remain accessible later (e.g. a "View guide" entry point),
  not forced every login.
- Empty real queue at first login — reuse the existing Empty State pattern; onboarding
  completing into "nothing to do yet" should read as normal, not broken.
- Experienced officer reassigned from another office — onboarding must be skippable up front,
  not mandatory friction for someone who already knows the job.

**Design note carried into Gate 2:** rather than an interactive tooltip/coachmark pointing at
live UI (a "product tour" pattern closer to the consumer-app gloss PRODUCT.md explicitly
rejects), onboarding uses plain sequential explainer screens — consistent with the "efficient,
minimal" personality and requiring no new overlay/spotlight component.

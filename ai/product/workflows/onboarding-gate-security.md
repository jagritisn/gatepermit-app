# Workflow: Onboarding — Gate Security

## Actors
- **Gate Security** — new staff member.

## Steps
1. Welcome/context screen: one sentence on the role ("You verify passes at the gate — scan,
   read the result, admit or don't").
2. Scanner walkthrough: what the camera viewport and scan-target frame do.
3. Result-reading walkthrough — the most important step: show both the Valid and Invalid
   result states explicitly, side by side or in sequence, so the visual difference (signal-
   tinted wash vs. heavy neutral-900 fill) is memorized *before* real time pressure at the
   gate. This directly reinforces the safety-critical design decision already made for
   VerificationResultPanel.
4. Manual fallback walkthrough: when/how to use manual lookup and override, and that a reason
   is always required and logged.
5. Escalation reminder: uncertain result → escalate, never guess or override alone (ties to
   [`roles/gate-security.md`](../roles/gate-security.md)'s "must never override an invalid/expired result on their own
   judgment").
6. Lands on the real scan/lookup screen.

## Screen states
- Welcome/context screen
- Scanner walkthrough (explainer screen)
- Result states walkthrough (both Valid and Invalid shown explicitly)
- Manual fallback walkthrough (explainer screen)
- Completion → real scan/lookup screen

## Edge cases
- New staff onboarding while the gate is live/busy — must be quick (a handful of screens,
  skippable), never a long course blocking someone from starting work.
- Needs to be revisitable later as a refresher, not just a first-login-only flow.
- Shared/kiosk device — "has seen onboarding" must be tracked per user/session, not per
  device, so it doesn't wrongly skip onboarding for the next person who logs in on the same
  hardware.

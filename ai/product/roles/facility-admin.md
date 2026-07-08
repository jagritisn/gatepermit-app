# Role: Facility Admin

## Who they are

The person responsible for configuring and operating the entry-permit system for a specific government office or facility. They're not reviewing individual visitor requests day-to-day (that's the Approving Officer) and they're not standing at the gate (that's Gate Security) — they set up the rules everyone else works within, manage who has staff access, and step in when something breaks.

## What they need to see and do

- Configure office-specific rules: visiting hours, capacity limits, and any permit constraints specific to their facility.
- Manage accounts and access for Approving Officers and Gate Security staff as staff change.
- View logs and basic analytics on requests, approvals, and gate entries to understand how the office is being used.
- Access manual-fallback tools and review any manual overrides that were logged (see [`product/workflows/manual-fallback.md`](../workflows/manual-fallback.md)).
- Confirm, when asked, that the system holds only simulated/demo identity data — never real biometric or citizen records (see [`knowledge/domain/privacy-and-compliance.md`](../../knowledge/domain/privacy-and-compliance.md)).

## What they must never do

- Never grant a permit directly, bypassing the Approving Officer's decision, outside of the explicit, logged manual-fallback path.
- Never expose real citizen or biometric data through configuration or reporting tools — the system doesn't hold any, and admin tooling shouldn't imply otherwise.
- Never let staff account management happen without a trace — access changes should be attributable to the admin who made them.
- Never let manual overrides go unreviewed — every fallback action needs to surface for admin review.

## What success looks like

The office runs smoothly on rules the admin configured once and rarely has to touch again, staff access always reflects who's currently working there, and if anything goes wrong (an outage, a disputed entry), the admin has the logs to reconstruct exactly what happened.

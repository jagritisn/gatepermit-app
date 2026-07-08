# Workflow: Manual Fallback

## Actors

- **Gate Security** — triggers and performs most manual verifications.
- **Facility Admin** — reviews and reconciles fallback actions after the fact.

## Steps

1. A fallback is triggered when the normal digital verification can't complete: device or network failure at the gate, an unreadable pass, or a visitor without a working device.
2. Gate Security switches into manual mode and looks up the visitor by name or a reference code instead of scanning.
3. Gate Security (or, for edge cases, Facility Admin) performs the entry decision manually, and must supply a short reason for the override.
4. The manual override is logged with the reason, timestamp, and who performed it — this is not optional.
5. Once systems are restored, Facility Admin reviews all manual-fallback entries logged during the outage, reconciling them against the normal request/pass records.

## Screen states

- **Fallback mode banner/toggle** — a clearly visible indicator that the gate is operating in manual mode, so no one mistakes it for the normal flow.
- **Manual lookup form** — search by visitor name or reference code.
- **Manual override confirmation** — requires a reason before the override is logged and entry is granted.
- **Fallback log / reconciliation view** (Facility Admin) — lists every manual override for review, with reason, actor, and timestamp.

## Edge cases

- Fallback used when it isn't actually needed — mandatory reason field and mandatory admin review make this visible after the fact, even though it isn't blocked in the moment (blocking would defeat the point of a fallback).
- No record found for the visitor in manual mode — Gate Security must escalate rather than admit on trust alone.
- System comes back online mid-fallback — reconcile any manual entries against digital records to avoid duplicate or conflicting entries for the same visitor.
- Facility Admin fails to review fallback entries within a reasonable time — this should be visible as an outstanding item, not silently dropped.

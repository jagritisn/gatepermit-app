# Workflow: Gate Verification

## Actors

- **Visitor** — presents their pass.
- **Gate Security** — verifies it.

## Steps

1. Visitor arrives at the gate and presents their pass (e.g. a QR code or lookup reference) on their phone.
2. Gate Security scans or looks up the pass in the verification screen.
3. The system validates three things at once: identity match (simulated photo shown for a visual check), the current time falls within the pass's approved window, and the pass has not already been used (see [`knowledge/domain/permit-rules.md`](../../knowledge/domain/permit-rules.md)).
4. The system returns a clear result: **valid** or **invalid**, with a reason if invalid.
5. On valid, the pass is immediately marked as used (enforcing the single-visit rule), and Gate Security admits the visitor.
6. On invalid, Gate Security denies entry and, if warranted, routes to [`product/workflows/manual-fallback.md`](manual-fallback.md).

## Screen states

- **Scan / lookup** — default gate screen, ready to scan a code or manually search a reference.
- **Valid result** — clear affirmative state (visitor's simulated photo + name + approved window), one glance to confirm.
- **Invalid result** — clear negative state with a specific reason: expired, already used, or not found.
- **Manual lookup fallback** — entry point into the manual-fallback workflow when scanning isn't possible.

## Edge cases

- Pass already used — a second presentation must show "already used," never re-validate as valid.
- Pass presented outside its time window (too early or after expiry) — reject with the specific reason, not a generic "invalid."
- QR code unreadable or damaged — Gate Security falls back to manual lookup by name/reference.
- Network or device failure at the gate — triggers [`product/workflows/manual-fallback.md`](manual-fallback.md) rather than blocking entry entirely.
- Identity photo doesn't visually match the person presenting the pass — Gate Security escalates rather than admitting or unilaterally denying.

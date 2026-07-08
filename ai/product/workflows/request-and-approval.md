# Workflow: Request and Approval

## Actors

- **Visitor** — submits the request.
- **Approving Officer** — reviews and decides.

## Steps

1. Visitor logs in via OTP (see [`knowledge/domain/auth-otp.md`](../../knowledge/domain/auth-otp.md)).
2. Visitor fills out the permit request: stated purpose, requested visit date/time, and captures a simulated identity from a government-ID-style photo (see [`knowledge/domain/identity-simulation.md`](../../knowledge/domain/identity-simulation.md)).
3. Visitor submits the request; it enters the Approving Officer's queue as **pending**.
4. Approving Officer opens the request from the queue and reviews the visitor's simulated identity, stated purpose, and requested window.
5. Approving Officer takes one of three actions: **approve**, **deny**, or **request more information**.
6. If more information is requested, the flow loops back to step 2 for the visitor to supply it, and the request returns to the queue.
7. On approval, the system issues a single-visit, time-boxed pass (see [`knowledge/domain/permit-rules.md`](../../knowledge/domain/permit-rules.md)) tied to the requested window.
8. Visitor is notified automatically of the outcome (approved / denied / info requested).

## Screen states

- **Login** — phone number entry.
- **OTP verify** — code entry (demo: `123456`).
- **Request form** — purpose, date/time, ID photo capture.
- **Request submitted / pending** — visitor-facing confirmation, no action available except waiting or (if requested) supplying more info.
- **Officer queue** — list of pending requests, ordered by age/priority.
- **Officer review detail** — full request detail with approve / deny / request-info actions.
- **Decision confirmation** — officer-facing acknowledgment of the action taken.
- **Visitor status** — pending / approved / denied, shown persistently until resolved.
- **Pass view** — the issued pass, visible only after approval.

## Edge cases

- OTP fails or expires — visitor must re-request a code; no request data is lost.
- Visitor submits a duplicate request for the same window — the system should surface the existing request rather than creating a second one.
- Officer requests more info — the request stays open, not denied, and re-enters the queue once the visitor responds.
- Request sits unreviewed past the requested visit window — it auto-expires rather than staying pending indefinitely.
- Visitor's requested date/time passes before a decision is made — treat as expired, not silently approvable after the fact.
- Denied request — visitor sees the denial clearly; there is no in-app appeal path in this version.

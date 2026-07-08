# Workflow: Request and Approval

**Model: walk-in.** A visitor submits on arrival for immediate entry — there is no scheduled date/time. An approved pass is valid for a few hours (currently 4h) after approval, then expires.

## Actors

- **Visitor** — submits the request.
- **Approving Officer** — reviews and decides.

## Steps

1. Visitor logs in via OTP (see [`auth-otp.md`](../../knowledge/domain/auth-otp.md)).
2. Visitor fills out the permit request — three fields only:
   - **Full name**
   - **Reason for visit** (a dropdown: Document renewal, Appointment / meeting, Hearing, Application submission, Grievance / complaint, Other)
   - **Live ID photo** captured in-app with the device camera (a simulated identity, see [`identity-simulation.md`](../../knowledge/domain/identity-simulation.md); falls back to file upload if no camera)
3. Visitor submits the request; it enters the Approving Officer's queue as **pending**.
4. Approving Officer opens the request from the queue and reviews the visitor's simulated identity, name, and stated reason.
5. Approving Officer takes one of three actions: **approve**, **deny**, or **request more information**.
6. If more information is requested, the flow loops back for the visitor to supply it, and the request returns to the queue as pending.
7. On approval, the system issues a single-visit pass valid for immediate entry, expiring a few hours later (see [`permit-rules.md`](../../knowledge/domain/permit-rules.md)).
8. Visitor is notified automatically of the outcome (approved / denied / info requested), and — once approved — can present the pass to enter the premises right away.

## Screen states

- **Login** — phone number entry.
- **OTP verify** — code entry (demo: `123456`).
- **Request form** — full name, reason dropdown, live photo capture.
- **Request submitted / pending** — visitor-facing confirmation ("sent for approval"), no action available except waiting or (if requested) supplying more info.
- **Officer queue** — list of pending requests, ordered by age/priority, each showing name, reason, and submitted time.
- **Officer review detail** — full request detail with approve / deny / request-info actions.
- **Decision confirmation** — officer-facing acknowledgment of the action taken.
- **Visitor status** — pending / approved / denied / expired, shown persistently until resolved.
- **Pass view** — the issued pass, visible only after approval, showing its validity window ("Valid until …").

## Edge cases

- OTP fails or expires — visitor must re-request a code; no request data is lost.
- Visitor already has an active request (pending / info-requested / approved) — the app surfaces that existing request rather than letting them start a second one.
- Officer requests more info — the request stays open, not denied, and re-enters the queue once the visitor responds.
- Camera permission denied / no camera — live capture falls back to file upload so the visitor can still attach an ID photo.
- Approved pass reaches its validity limit before use — it auto-expires (shown as an expired state), and the visitor must submit a new request.
- Denied request — visitor sees the denial clearly; there is no in-app appeal path in this version.

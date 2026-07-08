# Role: Gate Security

## Who they are

Staff physically stationed at the office's entrance whose job is to confirm that each person walking in has a valid, approved entry permit. They work standing at a checkpoint, often with a line of visitors, under time pressure — every extra second per visitor compounds into a longer queue. They are not making judgment calls about whether someone *should* be allowed in (that's the Approving Officer's job); they're verifying that someone already *was* allowed in, and that the pass in front of them is genuinely theirs and still valid.

## What they need to see and do

- Quickly verify a visitor's presented pass (e.g. scan or look up a code) the moment they arrive at the gate.
- See an unambiguous result: valid (with the visitor's photo/identity for a visual match) or invalid, with a clear reason (expired, already used, not found).
- Mark a valid pass as used at the point of entry, enforcing the single-visit rule (see [`knowledge/domain/permit-rules.md`](../../knowledge/domain/permit-rules.md)).
- Fall back to a manual process when the digital check can't complete (see [`product/workflows/manual-fallback.md`](../workflows/manual-fallback.md)).
- Escalate to a supervisor or the Approving Officer when a result is ambiguous.

## What they must never do

- Never admit a visitor without a valid verification result — a friendly face is not a substitute for a valid pass.
- Never override an invalid/expired result on their own judgment; that requires the manual-fallback path with a logged reason.
- Never access or need the approval workflow — they verify, they don't decide.
- Never mark a pass as used more than once, and never let an already-used pass verify as valid again.

## What success looks like

Every legitimate visitor gets through in seconds with a single glance at a clear valid/invalid result, no unauthorized entry ever gets through, and when something's ambiguous, security has an obvious next step instead of having to guess.

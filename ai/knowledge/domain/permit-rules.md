# Domain Rule: Single-Visit, Time-Boxed Pass

An entry permit issued by this system is **single-visit and time-boxed**:

- **Single-visit**: a pass is valid for exactly one entry. The moment it's successfully verified at the gate ([`product/workflows/gate-verification.md`](../../product/workflows/gate-verification.md)), it is marked as used and can never verify as valid again — not even for the same visitor on the same day.
- **Time-boxed**: a pass is only valid within the specific date/time window that was requested by the visitor and approved by the Approving Officer ([`product/workflows/request-and-approval.md`](../../product/workflows/request-and-approval.md)). Presenting it before or after that window is treated as invalid, with the specific reason surfaced (not a generic error).
- **No reuse across visits**: a new visit always requires a new request and a new approval. There is no "renew" or "extend" action on an existing pass in this version.

This rule is the reason gate verification checks three things simultaneously (identity match, time window, single-use status) rather than just checking that a pass exists — a pass existing is not the same as a pass being currently valid.

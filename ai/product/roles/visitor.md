# Role: Visitor

## Who they are

A member of the public who needs to enter a government office for some official business — renewing a document, attending a hearing, submitting paperwork, meeting an officer. They are not a system expert. Tech comfort varies widely, from smartphone-native to someone who rarely uses apps. Many are visiting this specific office for the first time, and some are anxious about bureaucratic process in general. See [PRODUCT.md](../../../PRODUCT.md) for the full strategic profile.

## What they need to see and do

- Log in quickly (OTP-based, see [`knowledge/domain/auth-otp.md`](../../knowledge/domain/auth-otp.md)).
- Submit an entry permit request: stated purpose, requested date/time, and a simulated identity captured from a government-ID-style photo (see [`knowledge/domain/identity-simulation.md`](../../knowledge/domain/identity-simulation.md)).
- Check the status of their request at any time (pending / approved / denied).
- Once approved, view and present their pass — a single-visit, time-boxed permit (see [`knowledge/domain/permit-rules.md`](../../knowledge/domain/permit-rules.md)).
- Understand clearly what to do if something goes wrong (denied request, expired pass, no signal at the gate).

## What they must never do

- Never see another visitor's request, pass, or personal details.
- Never bypass the approval step — a pass only exists after an Approving Officer decision.
- Never be asked for real government credentials or real biometric data; identity in this system is simulated (see [`knowledge/domain/privacy-and-compliance.md`](../../knowledge/domain/privacy-and-compliance.md)).
- Never be able to reuse a pass beyond its single visit or outside its time window.

## What success looks like

A visitor completes a permit request in under a couple of minutes, always knows what state their request is in without needing to ask anyone, and presents their pass at the gate with a verification that takes seconds — no confusion, no printed paperwork, no waiting in an unclear line.

# Domain Rule: OTP Login (Demo)

Visitor authentication is phone-number + OTP based, simulating the real-world pattern of most public-sector digital services without wiring up a real SMS provider for this demo/prototype stage.

- **Demo OTP code: `123456`** — this fixed code works for any phone number in this environment, so the OTP flow's UX can be built, tested, and demoed end-to-end without a live SMS gateway.
- Treat the OTP step as a real step in the flow (its own screen, its own validation, its own failure/expiry state) — don't shortcut it just because the code is fixed. The UX should look and behave exactly like it would with a real provider.
- **This is explicitly a demo mechanism, not a production auth strategy.** Before any real deployment, this needs to be replaced with a real OTP/SMS provider integration. Do not treat `123456` as a value that should ever appear in production code paths or documentation implying it's production-ready.

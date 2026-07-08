# Domain Rule: Privacy — Never Real Biometric or Citizen Data

This is the hardest, non-negotiable rule in the system.

- **Never store, process, or transmit real biometric data** (fingerprints, real facial-recognition templates, or similar) and **never store or process real citizen-registry data**, even if it would be technically easy to add.
- All identity data in this system is **simulated/demo data only** — see [`knowledge/domain/identity-simulation.md`](identity-simulation.md). Nothing here connects to, or is a substitute for, an actual government identity or biometric database.
- This product is conceptually inspired by real-world models like **DigiYatra** (biometric boarding in Indian airports) and is designed to respect the spirit of India's **DPDP Act** (Digital Personal Data Protection Act) around consent and data minimization — but it does **not** integrate with either. It is a self-contained demo that mimics the *shape* of such a system without any of the real regulated data.
- Any future step toward handling real citizen or biometric data would be a fundamentally different product with its own compliance, security, and legal review — not an incremental extension of this one. Treat that as out of scope unless explicitly redirected.
- When in doubt about whether a piece of data is "real" or "simulated," treat it as real and stop — don't guess your way into a privacy violation.

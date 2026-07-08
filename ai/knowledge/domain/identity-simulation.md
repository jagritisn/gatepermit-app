# Domain Rule: Simulated Identity from a Government ID Photo

When a visitor submits a permit request, they capture or upload a photo styled as a government ID (e.g. an ID card). This produces a **simulated identity** used within the app — it is not a real identity verification.

- The photo is used to display a name/photo/identity-style record within the app (e.g. for the Approving Officer to review, and for Gate Security to visually match against the person presenting the pass).
- There is **no real OCR, no real government database lookup, and no real identity verification** happening against this photo. Whatever the photo shows is taken at face value for the purposes of this prototype.
- This is a deliberate simplification for a demo/prototype product. It exists to make the request-and-approval and gate-verification flows feel real and complete, without requiring integration with an actual identity-verification system or real government records.
- Because this is simulated, it must never be described in the product, in code, or in documentation as "verified identity," "KYC," or similar language that implies real-world identity assurance. See [`knowledge/domain/privacy-and-compliance.md`](privacy-and-compliance.md) for the related privacy rule.

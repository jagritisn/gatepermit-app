import { PermitRequest } from "./permitStore";

/** e.g. "8 Jul, 3:42 PM" — used for submitted time in the officer views. */
export function formatSubmittedAt(request: PermitRequest): string {
  return new Date(request.submittedAt).toLocaleString(undefined, {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

/** e.g. "Valid until 7:42 PM" for an approved walk-in pass. */
export function formatPassValidity(request: PermitRequest): string {
  if (!request.expiresAt) return "Valid for entry";
  const until = new Date(request.expiresAt).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
  return `Valid until ${until}`;
}

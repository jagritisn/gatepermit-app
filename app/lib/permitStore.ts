"use client";

/**
 * Client-side shared store simulating a backend for the request-and-approval workflow
 * (ai/product/workflows/request-and-approval.md). There is no real backend in this
 * prototype — one browser plays both the Visitor and Approving Officer sessions,
 * persisted via localStorage so a submitted request actually flows into the officer
 * queue and a decision actually updates the visitor's status. Consistent with this
 * project's existing simulated/demo conventions (fixed OTP, simulated identity —
 * see ai/knowledge/domain/).
 */

export type RequestStatus = "pending" | "info_requested" | "approved" | "denied" | "expired";

export interface PermitRequest {
  id: string;
  visitorPhone: string;
  visitorName: string;
  visitorPhotoUrl: string;
  purpose: string;
  requestedDate: string; // yyyy-mm-dd
  requestedTime: string; // HH:mm
  submittedAt: string; // ISO
  status: RequestStatus;
  /** Officer's message when requesting more info */
  infoRequestMessage?: string;
  /** Visitor's reply to an info request */
  visitorResponseMessage?: string;
  decidedAt?: string;
}

const REQUESTS_KEY = "entry-permit:requests";
const SESSION_KEY = "entry-permit:session";

function readRequests(): PermitRequest[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(REQUESTS_KEY);
    return raw ? (JSON.parse(raw) as PermitRequest[]) : [];
  } catch {
    return [];
  }
}

function writeRequests(requests: PermitRequest[]) {
  window.localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
}

/** Requested date/time in the past while still pending/info_requested -> expired
    (ai/product/workflows/request-and-approval.md edge cases). Runs on every read so
    no background timer is needed. */
function expireStaleRequests(requests: PermitRequest[]): PermitRequest[] {
  const now = new Date();
  let changed = false;

  const next = requests.map((request) => {
    if (request.status !== "pending" && request.status !== "info_requested") return request;
    const requestedAt = new Date(`${request.requestedDate}T${request.requestedTime}`);
    if (requestedAt < now) {
      changed = true;
      return { ...request, status: "expired" as const };
    }
    return request;
  });

  if (changed) writeRequests(next);
  return next;
}

function getAllRequests(): PermitRequest[] {
  return expireStaleRequests(readRequests());
}

export function getSession(): { phone: string } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as { phone: string }) : null;
  } catch {
    return null;
  }
}

export function setSession(phone: string) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify({ phone }));
}

export function clearSession() {
  window.localStorage.removeItem(SESSION_KEY);
}

const ACTIVE_STATUSES: RequestStatus[] = ["pending", "info_requested", "approved"];

/** A visitor has at most one active (non-final) request at a time — this is what
    "surface the existing request rather than creating a second one" (duplicate-request
    edge case) resolves to, and matches PRODUCT.md's "one task at a time" principle. */
export function getActiveRequestForVisitor(phone: string): PermitRequest | undefined {
  return getAllRequests()
    .filter((r) => r.visitorPhone === phone && ACTIVE_STATUSES.includes(r.status))
    .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))[0];
}

/** Most recent request regardless of status, for showing a denied/expired outcome. */
export function getLatestRequestForVisitor(phone: string): PermitRequest | undefined {
  return getAllRequests()
    .filter((r) => r.visitorPhone === phone)
    .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))[0];
}

export function createRequest(
  input: Omit<PermitRequest, "id" | "submittedAt" | "status">
): PermitRequest {
  const request: PermitRequest = {
    ...input,
    id: `REQ-${Date.now().toString(36).toUpperCase()}`,
    submittedAt: new Date().toISOString(),
    status: "pending",
  };
  writeRequests([...readRequests(), request]);
  return request;
}

export function getQueue(): PermitRequest[] {
  return getAllRequests()
    .filter((r) => r.status === "pending")
    .sort((a, b) => a.submittedAt.localeCompare(b.submittedAt));
}

export function getRequestById(id: string): PermitRequest | undefined {
  return getAllRequests().find((r) => r.id === id);
}

export function decideRequest(
  id: string,
  status: Extract<RequestStatus, "approved" | "denied" | "info_requested">,
  infoRequestMessage?: string
) {
  const requests = readRequests();
  const next = requests.map((r) =>
    r.id === id
      ? {
          ...r,
          status,
          decidedAt: new Date().toISOString(),
          infoRequestMessage: status === "info_requested" ? infoRequestMessage : r.infoRequestMessage,
        }
      : r
  );
  writeRequests(next);
}

/** Visitor responds to an info request — re-enters the queue as pending. */
export function respondToInfoRequest(id: string, visitorResponseMessage: string) {
  const requests = readRequests();
  const next = requests.map((r) =>
    r.id === id ? { ...r, status: "pending" as const, visitorResponseMessage } : r
  );
  writeRequests(next);
}

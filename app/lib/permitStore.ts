"use client";

/**
 * Client-side shared store simulating a backend for the request-and-approval workflow
 * (ai/product/workflows/request-and-approval.md). There is no real backend in this
 * prototype — one browser plays both the Visitor and Approving Officer sessions,
 * persisted via localStorage so a submitted request actually flows into the officer
 * queue and a decision actually updates the visitor's status. Consistent with this
 * project's existing simulated/demo conventions (fixed OTP, simulated identity —
 * see ai/knowledge/domain/).
 *
 * Model is WALK-IN: no scheduled date/time. An approved pass is valid for immediate
 * entry and expires PASS_VALIDITY_MS after approval.
 */

export type RequestStatus = "pending" | "info_requested" | "approved" | "denied" | "expired";

/** How long an approved walk-in pass stays valid (4 hours). */
export const PASS_VALIDITY_MS = 4 * 60 * 60 * 1000;

export interface PermitRequest {
  id: string;
  visitorPhone: string;
  visitorName: string;
  visitorPhotoUrl: string;
  /** Reason-for-visit option value (see REASON_OPTIONS) */
  reason: string;
  submittedAt: string; // ISO
  status: RequestStatus;
  /** Officer's message when requesting more info */
  infoRequestMessage?: string;
  /** Visitor's reply to an info request */
  visitorResponseMessage?: string;
  decidedAt?: string;
  /** ISO expiry, set on approval (approvedAt + PASS_VALIDITY_MS) */
  expiresAt?: string;
}

export interface ReasonOption {
  value: string;
  label: string;
}

export const REASON_OPTIONS: ReasonOption[] = [
  { value: "document-renewal", label: "Document renewal" },
  { value: "appointment", label: "Appointment / meeting" },
  { value: "hearing", label: "Hearing" },
  { value: "application", label: "Application submission" },
  { value: "grievance", label: "Grievance / complaint" },
  { value: "other", label: "Other" },
];

export function reasonLabel(value: string): string {
  return REASON_OPTIONS.find((r) => r.value === value)?.label ?? value;
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

/** An approved pass past its expiry becomes expired (ai/product/workflows/request-and-approval.md).
    Runs on every read so no background timer is needed. */
function expireStaleRequests(requests: PermitRequest[]): PermitRequest[] {
  const now = Date.now();
  let changed = false;

  const next = requests.map((request) => {
    if (request.status !== "approved" || !request.expiresAt) return request;
    if (new Date(request.expiresAt).getTime() < now) {
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
  const decidedAt = new Date();
  const next = requests.map((r) => {
    if (r.id !== id) return r;
    return {
      ...r,
      status,
      decidedAt: decidedAt.toISOString(),
      infoRequestMessage:
        status === "info_requested" ? infoRequestMessage : r.infoRequestMessage,
      expiresAt:
        status === "approved"
          ? new Date(decidedAt.getTime() + PASS_VALIDITY_MS).toISOString()
          : r.expiresAt,
    };
  });
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

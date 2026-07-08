import { PermitRequest } from "./permitStore";

export function formatRequestWindow(request: PermitRequest): string {
  const date = new Date(`${request.requestedDate}T${request.requestedTime}`);
  return date.toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

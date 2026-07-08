import { AuditLogRow } from "../AuditLogRow";

export interface DecisionHistoryEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  reason?: string;
}

interface DecisionHistoryListProps {
  entries: DecisionHistoryEntry[];
}

/**
 * Directly reuses AuditLogRow (DESIGN.md §6: "not a separate component") —
 * this wrapper only exists for a convenient, role-scoped import name.
 */
export function DecisionHistoryList({ entries }: DecisionHistoryListProps) {
  return (
    <div>
      {entries.map((entry) => (
        <AuditLogRow
          key={entry.id}
          timestamp={entry.timestamp}
          actor={entry.actor}
          action={entry.action}
          reason={entry.reason}
        />
      ))}
    </div>
  );
}

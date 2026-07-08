import { useState } from "react";
import styles from "./AuditLogRow.module.css";

interface AuditLogRowProps {
  timestamp: string;
  actor: string;
  action: string;
  reason?: string;
  /** Character count before the reason is truncated with a "show more" toggle */
  reasonTruncateAt?: number;
}

export function AuditLogRow({
  timestamp,
  actor,
  action,
  reason,
  reasonTruncateAt = 80,
}: AuditLogRowProps) {
  const [expanded, setExpanded] = useState(false);
  const isTruncatable = Boolean(reason) && reason!.length > reasonTruncateAt;
  const displayedReason =
    isTruncatable && !expanded ? `${reason!.slice(0, reasonTruncateAt)}…` : reason;

  return (
    <div className={styles.row}>
      <div className={styles.primaryLine}>
        <span className={styles.timestamp}>{timestamp}</span>
        <span className={styles.actor}>{actor}</span>
      </div>
      <span className={styles.action}>
        {action}
        {reason ? (
          <span className={styles.reason}>
            {" — "}
            {displayedReason}
            {isTruncatable ? (
              <button
                type="button"
                className={styles.reasonToggle}
                onClick={() => setExpanded((prev) => !prev)}
              >
                {expanded ? "Show less" : "Show more"}
              </button>
            ) : null}
          </span>
        ) : null}
      </span>
    </div>
  );
}

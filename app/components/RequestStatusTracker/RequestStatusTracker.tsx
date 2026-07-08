import { Card } from "../Card";
import { StatusChip, PermitStatus } from "../StatusChip";
import styles from "./RequestStatusTracker.module.css";

interface RequestStatusTrackerProps {
  status: PermitStatus;
  /** Plain-language explanation of what happens next for this status */
  message: string;
}

export function RequestStatusTracker({ status, message }: RequestStatusTrackerProps) {
  return (
    <Card>
      <div className={styles.tracker}>
        <StatusChip status={status} />
        <p className={styles.message}>{message}</p>
      </div>
    </Card>
  );
}

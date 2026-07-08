import { StatusChip } from "../StatusChip";
import styles from "./RequestQueueList.module.css";

export interface QueueRequest {
  id: string;
  visitorName: string;
  reason: string;
  submittedAt: string;
}

interface RequestQueueListProps {
  requests: QueueRequest[];
  onSelect: (id: string) => void;
}

export function RequestQueueList({ requests, onSelect }: RequestQueueListProps) {
  return (
    <div className={styles.list} role="list">
      {requests.map((request) => (
        <button
          key={request.id}
          type="button"
          className={styles.item}
          role="listitem"
          onClick={() => onSelect(request.id)}
        >
          <div className={styles.itemHeader}>
            <StatusChip status="pending" />
            <span className={styles.window}>{request.submittedAt}</span>
          </div>
          <span className={styles.name}>{request.visitorName}</span>
          <span className={styles.purpose}>{request.reason}</span>
        </button>
      ))}
    </div>
  );
}

import { ReactNode } from "react";
import styles from "./RequestDetailView.module.css";

interface RequestDetailViewProps {
  visitorName: string;
  visitorPhotoUrl: string;
  reason: string;
  submittedAt: string;
  /** Decision Action Bar, rendered by the caller */
  actions?: ReactNode;
}

export function RequestDetailView({
  visitorName,
  visitorPhotoUrl,
  reason,
  submittedAt,
  actions,
}: RequestDetailViewProps) {
  return (
    <div className={styles.detail}>
      <div className={styles.identity}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={visitorPhotoUrl} alt={visitorName} className={styles.photo} />
        <span className={styles.name}>{visitorName}</span>
      </div>
      <div className={styles.fields}>
        <div>
          <div className={styles.fieldLabel}>Reason for visit</div>
          <div className={styles.fieldValue}>{reason}</div>
        </div>
        <div>
          <div className={styles.fieldLabel}>Submitted</div>
          <div className={styles.fieldValue}>{submittedAt}</div>
        </div>
      </div>
      {actions}
    </div>
  );
}

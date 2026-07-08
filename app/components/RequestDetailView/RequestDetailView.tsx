import { ReactNode } from "react";
import styles from "./RequestDetailView.module.css";

interface RequestDetailViewProps {
  visitorName: string;
  visitorPhotoUrl: string;
  purpose: string;
  requestedWindow: string;
  submittedAt: string;
  /** Decision Action Bar, rendered by the caller */
  actions?: ReactNode;
}

export function RequestDetailView({
  visitorName,
  visitorPhotoUrl,
  purpose,
  requestedWindow,
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
          <div className={styles.fieldLabel}>Purpose</div>
          <div className={styles.fieldValue}>{purpose}</div>
        </div>
        <div>
          <div className={styles.fieldLabel}>Requested window</div>
          <div className={styles.fieldValue}>{requestedWindow}</div>
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

import { CheckCircle2, XCircle } from "lucide-react";
import styles from "./VerificationResultPanel.module.css";

type ValidResult = {
  outcome: "valid";
  visitorName: string;
  visitorPhotoUrl: string;
  approvedWindow: string;
};

type InvalidResult = {
  outcome: "invalid";
  reason: "Expired" | "Already used" | "Not found";
};

/** compact reduces the min-height + icon size for embedding (e.g. onboarding walkthrough).
    The full-size default remains the real gate result — a near-full-viewport, glance-readable panel. */
type VerificationResultPanelProps = (ValidResult | InvalidResult) & {
  compact?: boolean;
};

export function VerificationResultPanel(props: VerificationResultPanelProps) {
  const panelClass = props.compact ? `${styles.panel} ${styles.compact}` : styles.panel;

  if (props.outcome === "valid") {
    return (
      <div className={`${panelClass} ${styles.valid}`} role="status">
        <CheckCircle2 className={styles.validIcon} aria-hidden="true" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={props.visitorPhotoUrl} alt={props.visitorName} className={styles.photo} />
        <span className={styles.name}>{props.visitorName}</span>
        <span className={styles.window}>{props.approvedWindow}</span>
      </div>
    );
  }

  return (
    <div className={`${panelClass} ${styles.invalid}`} role="alert">
      <XCircle className={styles.invalidIcon} aria-hidden="true" />
      <span className={styles.reason}>{props.reason}</span>
    </div>
  );
}

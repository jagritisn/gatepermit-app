import { AlertCircle, AlertTriangle, Ban, CheckCircle2, Clock, XCircle } from "lucide-react";
import styles from "./StatusChip.module.css";

export type PermitStatus =
  | "pending"
  | "approved"
  | "valid"
  | "denied"
  | "expired"
  | "invalid"
  | "used";

const STATUS_CONFIG: Record<
  PermitStatus,
  { label: string; icon: typeof Clock; tone: "signal" | "neutral" }
> = {
  pending: { label: "Pending", icon: Clock, tone: "neutral" },
  approved: { label: "Approved", icon: CheckCircle2, tone: "signal" },
  valid: { label: "Valid", icon: CheckCircle2, tone: "signal" },
  denied: { label: "Denied", icon: XCircle, tone: "neutral" },
  expired: { label: "Expired", icon: AlertTriangle, tone: "neutral" },
  invalid: { label: "Invalid", icon: AlertCircle, tone: "neutral" },
  used: { label: "Already used", icon: Ban, tone: "neutral" },
};

interface StatusChipProps {
  status: PermitStatus;
  /** Override the default label (e.g. localized copy) while keeping the status's icon/tone */
  label?: string;
}

export function StatusChip({ status, label }: StatusChipProps) {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  return (
    <span className={`${styles.chip} ${styles[config.tone]}`}>
      <Icon className={styles.icon} aria-hidden="true" />
      {label ?? config.label}
    </span>
  );
}

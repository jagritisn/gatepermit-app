import { useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";
import styles from "./Toast.module.css";

type ToastVariant = "success" | "neutral";

interface ToastProps {
  message: string;
  variant?: ToastVariant;
  onDismiss: () => void;
  /** Auto-dismiss delay in ms — DESIGN.md §6 Toast specifies ~4-5s */
  autoDismissMs?: number;
}

export function Toast({
  message,
  variant = "neutral",
  onDismiss,
  autoDismissMs = 4500,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, autoDismissMs);
    return () => clearTimeout(timer);
  }, [onDismiss, autoDismissMs]);

  return (
    <div className={`${styles.toast} ${styles[variant]}`} role="status" aria-live="polite">
      <CheckCircle2 className={styles.icon} aria-hidden="true" />
      <span className={styles.message}>{message}</span>
      <button
        type="button"
        className={styles.closeButton}
        onClick={onDismiss}
        aria-label="Dismiss"
      >
        <X aria-hidden="true" />
      </button>
    </div>
  );
}

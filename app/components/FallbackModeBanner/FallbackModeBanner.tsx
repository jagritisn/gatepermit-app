import { AlertTriangle } from "lucide-react";
import styles from "./FallbackModeBanner.module.css";

export function FallbackModeBanner() {
  return (
    <div className={styles.banner} role="status">
      <AlertTriangle className={styles.icon} aria-hidden="true" />
      Manual verification mode
    </div>
  );
}

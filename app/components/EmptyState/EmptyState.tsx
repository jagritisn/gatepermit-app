import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import styles from "./EmptyState.module.css";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className={styles.emptyState}>
      <Icon className={styles.icon} aria-hidden="true" />
      <p className={styles.title}>{title}</p>
      <p className={styles.description}>{description}</p>
      {action ? <div className={styles.action}>{action}</div> : null}
    </div>
  );
}

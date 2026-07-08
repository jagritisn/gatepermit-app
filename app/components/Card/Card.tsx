import { HTMLAttributes, ReactNode } from "react";
import styles from "./Card.module.css";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Adds a 1px neutral-200 border — only for stacked cards that would otherwise blend together */
  bordered?: boolean;
  children: ReactNode;
}

export function Card({ bordered = false, className, children, ...rest }: CardProps) {
  const classes = [styles.card, bordered ? styles.bordered : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}

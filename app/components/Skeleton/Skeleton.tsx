import { CSSProperties } from "react";
import styles from "./Skeleton.module.css";

interface SkeletonProps {
  /** CSS width value, e.g. "100%", "120px" */
  width?: string;
  /** CSS height value, e.g. "1rem", "96px" */
  height?: string;
  className?: string;
}

export function Skeleton({ width = "100%", height = "1rem", className }: SkeletonProps) {
  const style: CSSProperties = { width, height };
  const classes = [styles.skeleton, className].filter(Boolean).join(" ");

  return <div className={classes} style={style} aria-hidden="true" />;
}

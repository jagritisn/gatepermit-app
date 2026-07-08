import styles from "./StepProgressDots.module.css";

interface StepProgressDotsProps {
  total: number;
  /** Zero-based index of the active step */
  current: number;
}

export function StepProgressDots({ total, current }: StepProgressDotsProps) {
  return (
    <div
      className={styles.dots}
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current + 1}
      aria-label={`Step ${current + 1} of ${total}`}
    >
      {Array.from({ length: total }, (_, index) => (
        <span
          key={index}
          className={`${styles.dot} ${index === current ? styles.active : ""}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

import { useId } from "react";
import styles from "./DateTimePicker.module.css";

interface DateTimePickerProps {
  dateLabel?: string;
  timeLabel?: string;
  dateValue: string;
  timeValue: string;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  min?: string;
}

export function DateTimePicker({
  dateLabel = "Visit date",
  timeLabel = "Visit time",
  dateValue,
  timeValue,
  onDateChange,
  onTimeChange,
  min,
}: DateTimePickerProps) {
  const dateId = useId();
  const timeId = useId();

  return (
    <div className={styles.row}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor={dateId}>
          {dateLabel}
        </label>
        <input
          id={dateId}
          type="date"
          className={styles.input}
          value={dateValue}
          min={min}
          onChange={(event) => onDateChange(event.target.value)}
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor={timeId}>
          {timeLabel}
        </label>
        <input
          id={timeId}
          type="time"
          className={styles.input}
          value={timeValue}
          onChange={(event) => onTimeChange(event.target.value)}
        />
      </div>
    </div>
  );
}

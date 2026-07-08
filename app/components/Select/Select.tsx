import { SelectHTMLAttributes, useId } from "react";
import { AlertCircle, ChevronDown } from "lucide-react";
import styles from "./Select.module.css";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "value" | "onChange"> {
  label: string;
  options: SelectOption[];
  value: string;
  onValueChange: (value: string) => void;
  /** Disabled first option shown until a real value is chosen */
  placeholder?: string;
  errorMessage?: string;
}

export function Select({
  label,
  options,
  value,
  onValueChange,
  placeholder = "Select an option",
  errorMessage,
  id,
  ...rest
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const errorId = `${selectId}-error`;
  const hasError = Boolean(errorMessage);
  const showingPlaceholder = value === "";

  const selectClasses = [
    styles.select,
    showingPlaceholder ? styles.placeholderShown : "",
    hasError ? styles.selectError : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={selectId}>
        {label}
      </label>
      <div className={styles.control}>
        <select
          id={selectId}
          className={selectClasses}
          value={value}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          onChange={(event) => onValueChange(event.target.value)}
          {...rest}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className={styles.chevron} aria-hidden="true" />
      </div>
      {hasError ? (
        <span className={styles.errorMessage} id={errorId}>
          <AlertCircle className={styles.errorIcon} aria-hidden="true" />
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
}

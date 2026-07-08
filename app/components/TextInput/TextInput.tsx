import { InputHTMLAttributes, useId } from "react";
import { AlertCircle } from "lucide-react";
import styles from "./TextInput.module.css";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  /** Plain-language error message shown below the field (DESIGN.md §6 Text Input > error state) */
  errorMessage?: string;
}

export function TextInput({
  label,
  errorMessage,
  id,
  className,
  ...rest
}: TextInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;
  const hasError = Boolean(errorMessage);

  const inputClasses = [styles.input, hasError ? styles.inputError : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        className={inputClasses}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
        {...rest}
      />
      {hasError ? (
        <span className={styles.errorMessage} id={errorId}>
          <AlertCircle className={styles.errorIcon} aria-hidden="true" />
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
}

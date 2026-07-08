import { TextareaHTMLAttributes, useId } from "react";
import { AlertCircle } from "lucide-react";
import styles from "./Textarea.module.css";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  /** Plain-language error message shown below the field */
  errorMessage?: string;
}

export function Textarea({ label, errorMessage, id, className, ...rest }: TextareaProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const errorId = `${fieldId}-error`;
  const hasError = Boolean(errorMessage);

  const textareaClasses = [styles.textarea, hasError ? styles.textareaError : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={fieldId}>
        {label}
      </label>
      <textarea
        id={fieldId}
        className={textareaClasses}
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

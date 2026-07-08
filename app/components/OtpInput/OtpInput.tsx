import { ClipboardEvent, KeyboardEvent, useRef, useState } from "react";
import { AlertCircle } from "lucide-react";
import styles from "./OtpInput.module.css";

const OTP_LENGTH = 6;

interface OtpInputProps {
  onComplete: (code: string) => void;
  errorMessage?: string;
  disabled?: boolean;
}

export function OtpInput({ onComplete, errorMessage, disabled }: OtpInputProps) {
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const hasError = Boolean(errorMessage);

  const setDigit = (index: number, value: string) => {
    const next = [...digits];
    next[index] = value;
    setDigits(next);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (next.every((digit) => digit !== "")) {
      onComplete(next.join(""));
    }
  };

  const handleChange = (index: number, rawValue: string) => {
    const value = rawValue.replace(/\D/g, "").slice(-1);
    setDigit(index, value);
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    event.preventDefault();

    const next = Array(OTP_LENGTH).fill("");
    for (let i = 0; i < pasted.length; i += 1) next[i] = pasted[i];
    setDigits(next);

    const lastFilledIndex = Math.min(pasted.length, OTP_LENGTH) - 1;
    inputRefs.current[lastFilledIndex]?.focus();

    if (next.every((digit) => digit !== "")) {
      onComplete(next.join(""));
    }
  };

  return (
    <div className={styles.field}>
      <div className={styles.boxes} role="group" aria-label="Verification code">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            className={`${styles.box} ${hasError ? styles.boxError : ""}`}
            inputMode="numeric"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            maxLength={1}
            value={digit}
            disabled={disabled}
            aria-invalid={hasError}
            onChange={(event) => handleChange(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={handlePaste}
          />
        ))}
      </div>
      {hasError ? (
        <span className={styles.errorMessage}>
          <AlertCircle className={styles.errorIcon} aria-hidden="true" />
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
}

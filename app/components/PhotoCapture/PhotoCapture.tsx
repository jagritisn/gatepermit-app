import { ChangeEvent, MouseEvent, useId, useState } from "react";
import { AlertCircle, Camera } from "lucide-react";
import { Button } from "../Button";
import styles from "./PhotoCapture.module.css";

interface PhotoCaptureProps {
  label?: string;
  onCapture: (file: File) => void;
  errorMessage?: string;
}

export function PhotoCapture({
  label = "Add ID photo",
  onCapture,
  errorMessage,
}: PhotoCaptureProps) {
  const inputId = useId();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const hasError = Boolean(errorMessage);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setPreviewUrl(URL.createObjectURL(file));
    onCapture(file);
  };

  const handleRetakeClick = (event: MouseEvent) => {
    event.preventDefault();
    setPreviewUrl(null);
    document.getElementById(inputId)?.click();
  };

  return (
    <div>
      <label
        htmlFor={inputId}
        className={`${styles.dropzone} ${hasError ? styles.dropzoneError : ""}`}
      >
        {previewUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previewUrl} alt="Captured ID preview" className={styles.preview} />
            <div className={styles.retakeButton}>
              <Button variant="secondary" onClick={handleRetakeClick}>
                Retake
              </Button>
            </div>
          </>
        ) : (
          <>
            <Camera className={styles.icon} aria-hidden="true" />
            <span className={styles.label}>{label}</span>
          </>
        )}
        <input
          id={inputId}
          className={styles.hiddenInput}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleChange}
          aria-invalid={hasError}
        />
      </label>
      {hasError ? (
        <span className={styles.errorMessage}>
          <AlertCircle className={styles.errorIcon} aria-hidden="true" />
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
}

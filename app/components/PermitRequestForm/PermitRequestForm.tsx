"use client";

import { FormEvent, useState } from "react";
import { Button } from "../Button";
import { TextInput } from "../TextInput";
import { Select } from "../Select";
import { LivePhotoCapture } from "../LivePhotoCapture";
import { REASON_OPTIONS } from "@/lib/permitStore";
import styles from "./PermitRequestForm.module.css";

export interface PermitRequestFormValues {
  fullName: string;
  reason: string;
  /** Photo data URL from the live capture (or upload fallback) */
  photoDataUrl: string;
}

interface PermitRequestFormProps {
  onSubmit: (values: PermitRequestFormValues) => void;
}

const STEP_COUNT = 3;

export function PermitRequestForm({ onSubmit }: PermitRequestFormProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [fullName, setFullName] = useState("");
  const [reason, setReason] = useState("");
  const [photoDataUrl, setPhotoDataUrl] = useState("");

  const isLastStep = activeStep === STEP_COUNT - 1;

  // Gate each step's Continue on that step's field being filled
  const stepReady = [fullName.trim() !== "", reason !== "", photoDataUrl !== ""];

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit({ fullName, reason, photoDataUrl });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={`${styles.step} ${activeStep === 0 ? styles.stepActive : ""}`}>
        <span className={styles.stepTitle}>What&apos;s your name?</span>
        <TextInput
          label="Full name"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          placeholder="e.g. Priya Sharma"
        />
      </div>

      <div className={`${styles.step} ${activeStep === 1 ? styles.stepActive : ""}`}>
        <span className={styles.stepTitle}>What&apos;s the reason for your visit?</span>
        <Select
          label="Reason for visit"
          placeholder="Select a reason"
          options={REASON_OPTIONS}
          value={reason}
          onValueChange={setReason}
        />
      </div>

      <div className={`${styles.step} ${activeStep === 2 ? styles.stepActive : ""}`}>
        <span className={styles.stepTitle}>Take a photo of yourself</span>
        <LivePhotoCapture onCapture={setPhotoDataUrl} />
      </div>

      <div className={styles.mobileNav}>
        {activeStep > 0 ? (
          <Button variant="tertiary" onClick={() => setActiveStep((step) => step - 1)}>
            Back
          </Button>
        ) : (
          <span />
        )}
        {!isLastStep ? (
          <Button
            variant="primary"
            disabled={!stepReady[activeStep]}
            onClick={() => setActiveStep((step) => step + 1)}
          >
            Continue
          </Button>
        ) : null}
      </div>

      <Button
        variant="primary"
        type="submit"
        fullWidthMobile
        disabled={!stepReady.every(Boolean)}
        className={`${styles.submitButton} ${isLastStep ? styles.submitButtonVisible : ""}`}
      >
        Submit request
      </Button>
    </form>
  );
}

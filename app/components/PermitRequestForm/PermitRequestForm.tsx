import { FormEvent, useState } from "react";
import { Button } from "../Button";
import { TextInput } from "../TextInput";
import { DateTimePicker } from "../DateTimePicker";
import { PhotoCapture } from "../PhotoCapture";
import styles from "./PermitRequestForm.module.css";

export interface PermitRequestFormValues {
  purpose: string;
  date: string;
  time: string;
  idPhoto: File | null;
}

interface PermitRequestFormProps {
  onSubmit: (values: PermitRequestFormValues) => void;
}

const STEP_COUNT = 3;

export function PermitRequestForm({ onSubmit }: PermitRequestFormProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [purpose, setPurpose] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [idPhoto, setIdPhoto] = useState<File | null>(null);

  const isLastStep = activeStep === STEP_COUNT - 1;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit({ purpose, date, time, idPhoto });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={`${styles.step} ${activeStep === 0 ? styles.stepActive : ""}`}>
        <span className={styles.stepTitle}>What&apos;s the purpose of your visit?</span>
        <TextInput
          label="Purpose of visit"
          value={purpose}
          onChange={(event) => setPurpose(event.target.value)}
          placeholder="e.g. Document renewal"
        />
      </div>

      <div className={`${styles.step} ${activeStep === 1 ? styles.stepActive : ""}`}>
        <span className={styles.stepTitle}>When would you like to visit?</span>
        <DateTimePicker
          dateValue={date}
          timeValue={time}
          onDateChange={setDate}
          onTimeChange={setTime}
          min={new Date().toISOString().slice(0, 10)}
        />
      </div>

      <div className={`${styles.step} ${activeStep === 2 ? styles.stepActive : ""}`}>
        <span className={styles.stepTitle}>Add an ID photo</span>
        <PhotoCapture onCapture={setIdPhoto} />
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
          <Button variant="primary" onClick={() => setActiveStep((step) => step + 1)}>
            Continue
          </Button>
        ) : null}
      </div>

      <Button
        variant="primary"
        type="submit"
        fullWidthMobile
        className={`${styles.submitButton} ${isLastStep ? styles.submitButtonVisible : ""}`}
      >
        Submit request
      </Button>
    </form>
  );
}

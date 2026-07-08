import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { Button } from "../Button";
import { StepProgressDots } from "../StepProgressDots";
import styles from "./OnboardingScreen.module.css";

interface OnboardingScreenProps {
  icon?: LucideIcon;
  title: string;
  body: string;
  /** Optional custom content below the body (journey list, embedded panels, etc.) */
  children?: ReactNode;
  totalSteps: number;
  /** Zero-based index of the current step */
  currentStep: number;
  nextLabel?: string;
  onNext: () => void;
  /** Omit to hide Back (e.g. on the first step) */
  onBack?: () => void;
  /** Omit to hide Skip (e.g. on the last step) */
  onSkip?: () => void;
}

export function OnboardingScreen({
  icon: Icon,
  title,
  body,
  children,
  totalSteps,
  currentStep,
  nextLabel = "Continue",
  onNext,
  onBack,
  onSkip,
}: OnboardingScreenProps) {
  return (
    <div className={styles.screen}>
      <div className={styles.skipRow}>
        {onSkip ? (
          <Button variant="tertiary" onClick={onSkip}>
            Skip
          </Button>
        ) : null}
      </div>

      <div className={styles.content}>
        {Icon ? <Icon className={styles.icon} aria-hidden="true" /> : null}
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.body}>{body}</p>
        {children ? <div className={styles.custom}>{children}</div> : null}
      </div>

      <div className={styles.footer}>
        <StepProgressDots total={totalSteps} current={currentStep} />
        <div className={styles.nav}>
          {onBack ? (
            <div className={styles.backSlot}>
              <Button variant="tertiary" onClick={onBack}>
                Back
              </Button>
            </div>
          ) : null}
          <div className={styles.nextSlot}>
            <Button variant="primary" fullWidthMobile onClick={onNext}>
              {nextLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

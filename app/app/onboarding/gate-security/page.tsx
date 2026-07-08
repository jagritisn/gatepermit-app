"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, ScanLine, Search, ShieldCheck } from "lucide-react";
import { OnboardingScreen } from "@/components/OnboardingScreen";
import { VerificationResultPanel } from "@/components/VerificationResultPanel";
import styles from "./onboarding.module.css";

/**
 * Gate Security onboarding — ai/product/workflows/onboarding-gate-security.md.
 * The result-reading step (index 2) embeds the real VerificationResultPanel in compact mode
 * so the valid (signal wash) vs invalid (heavy neutral-900) contrast is memorized before the gate.
 *
 * NOTE: completion/skip navigate to "/" as a placeholder — the real scan/lookup screen isn't
 * built as a route yet.
 */

const PLACEHOLDER_PHOTO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23c7ccd1'/%3E%3C/svg%3E";

const TOTAL_STEPS = 5;

export default function GateSecurityOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const finish = () => router.push("/");
  const back = (target: number) => () => setStep(target);

  if (step === 0) {
    return (
      <OnboardingScreen
        icon={ShieldCheck}
        title="Verify passes at the gate"
        body="Your job is simple: scan a visitor's pass, read the result, and admit them only if it's valid. You're confirming an approved pass — not deciding who gets in."
        totalSteps={TOTAL_STEPS}
        currentStep={0}
        onNext={() => setStep(1)}
        onSkip={finish}
      />
    );
  }

  if (step === 1) {
    return (
      <OnboardingScreen
        icon={ScanLine}
        title="Point and scan"
        body="Hold a visitor's pass inside the scan frame. The camera reads it automatically and shows you the result in a second."
        totalSteps={TOTAL_STEPS}
        currentStep={1}
        onBack={back(0)}
        onNext={() => setStep(2)}
        onSkip={finish}
      />
    );
  }

  if (step === 2) {
    return (
      <OnboardingScreen
        title="Two results, one glance"
        body="A tinted result means the pass is valid — let them in. A solid dark result means it isn't — don't admit. Learn the difference now, so it's instant at the gate."
        totalSteps={TOTAL_STEPS}
        currentStep={2}
        onBack={back(1)}
        onNext={() => setStep(3)}
        onSkip={finish}
      >
        <div className={styles.results}>
          <div className={styles.result}>
            <span className={styles.caption}>Valid — let them in</span>
            <VerificationResultPanel
              compact
              outcome="valid"
              visitorName="Priya Sharma"
              visitorPhotoUrl={PLACEHOLDER_PHOTO}
              approvedWindow="Today, 2:00–2:30 PM"
            />
          </div>
          <div className={styles.result}>
            <span className={styles.caption}>Invalid — don&apos;t admit</span>
            <VerificationResultPanel compact outcome="invalid" reason="Already used" />
          </div>
        </div>
      </OnboardingScreen>
    );
  }

  if (step === 3) {
    return (
      <OnboardingScreen
        icon={Search}
        title="When scanning isn't possible"
        body="If a pass won't scan or a device fails, switch to manual lookup by name or reference code. Any manual entry needs a short reason, and it's always logged."
        totalSteps={TOTAL_STEPS}
        currentStep={3}
        onBack={back(2)}
        onNext={() => setStep(4)}
        onSkip={finish}
      />
    );
  }

  return (
    <OnboardingScreen
      icon={AlertTriangle}
      title="When in doubt, escalate"
      body="If a result is unclear or something doesn't add up, escalate to a supervisor. Never override an invalid result on your own judgment."
      totalSteps={TOTAL_STEPS}
      currentStep={4}
      nextLabel="Start verifying"
      onBack={back(3)}
      onNext={finish}
    />
  );
}

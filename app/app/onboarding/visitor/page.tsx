"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, ListChecks, Lock } from "lucide-react";
import { OnboardingScreen } from "@/components/OnboardingScreen";
import styles from "./onboarding.module.css";

/**
 * Visitor onboarding — ai/product/workflows/onboarding-visitor.md.
 * Precedes login with context; does not replace the OTP login step.
 *
 * NOTE: completion/skip navigate to "/" as a placeholder — the real post-onboarding
 * destination (login → request flow) isn't built as a route yet.
 */

const JOURNEY = [
  "Request a permit for your visit.",
  "Show your approved pass at the gate.",
];

export default function VisitorOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const finish = () => router.push("/");
  const totalSteps = 3;

  if (step === 0) {
    return (
      <OnboardingScreen
        icon={Building2}
        title="Enter government offices, the easy way"
        body="Request permission to visit an office and get a pass on your phone — no paperwork, no guessing which line to stand in."
        totalSteps={totalSteps}
        currentStep={0}
        onNext={() => setStep(1)}
        onSkip={finish}
      />
    );
  }

  if (step === 1) {
    return (
      <OnboardingScreen
        icon={Lock}
        title="Your ID photo stays private"
        body="You'll add a photo of your ID for this visit only. It isn't kept as a permanent record, and it's never shared beyond verifying your entry."
        totalSteps={totalSteps}
        currentStep={1}
        onBack={() => setStep(0)}
        onNext={() => setStep(2)}
        onSkip={finish}
      />
    );
  }

  return (
    <OnboardingScreen
      icon={ListChecks}
      title="Two simple steps"
      body="That's the whole process. You'll always know exactly where your request stands."
      totalSteps={totalSteps}
      currentStep={2}
      nextLabel="Get started"
      onBack={() => setStep(1)}
      onNext={finish}
    >
      <div className={styles.journey}>
        {JOURNEY.map((text, index) => (
          <div className={styles.journeyItem} key={index}>
            <span className={styles.journeyNumber}>{index + 1}</span>
            <span className={styles.journeyText}>{text}</span>
          </div>
        ))}
      </div>
    </OnboardingScreen>
  );
}

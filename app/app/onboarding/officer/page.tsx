"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ClipboardCheck, History, Inbox, Scale } from "lucide-react";
import { OnboardingScreen } from "@/components/OnboardingScreen";

/**
 * Approving Officer onboarding — ai/product/workflows/onboarding-approving-officer.md.
 * Plain sequential explainer screens (no live-UI product tour), skippable and revisitable.
 *
 * NOTE: completion/skip navigate to "/" as a placeholder — the real officer queue screen
 * isn't built as a route yet.
 */

const STEPS = [
  {
    icon: ClipboardCheck,
    title: "Review requests, decide with confidence",
    body: "You review permit requests for this office and decide whether to approve, deny, or ask the visitor for more information.",
  },
  {
    icon: Inbox,
    title: "Your queue, at a glance",
    body: "Incoming requests appear in a prioritized queue. Each shows the visitor's name, purpose, and requested time — open one to see the full details and identity photo.",
  },
  {
    icon: Scale,
    title: "Three ways to respond",
    body: "Approve, deny, or request more information. If a request is missing something, ask for more info — you should never have to approve or deny on incomplete details.",
  },
  {
    icon: History,
    title: "Every decision is recorded",
    body: "Your approvals and denials are logged with the reason, so any decision can be accounted for later. Nothing here is silently reversible.",
  },
];

export default function OfficerOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const finish = () => router.push("/");
  const isLast = step === STEPS.length - 1;
  const current = STEPS[step];

  return (
    <OnboardingScreen
      icon={current.icon}
      title={current.title}
      body={current.body}
      totalSteps={STEPS.length}
      currentStep={step}
      nextLabel={isLast ? "Go to queue" : "Continue"}
      onNext={() => (isLast ? finish() : setStep(step + 1))}
      onBack={step > 0 ? () => setStep(step - 1) : undefined}
      onSkip={isLast ? undefined : finish}
    />
  );
}

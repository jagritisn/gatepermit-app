"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TextInput } from "@/components/TextInput";
import { OtpInput } from "@/components/OtpInput";
import { Button } from "@/components/Button";
import { Toast } from "@/components/Toast";
import { getSession, setSession } from "@/lib/permitStore";
import styles from "./login.module.css";

const DEMO_OTP = "123456";

export default function VisitorLoginPage() {
  const router = useRouter();
  const [stage, setStage] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState<string | undefined>();
  const [otpError, setOtpError] = useState<string | undefined>();
  const [otpAttempt, setOtpAttempt] = useState(0);
  const [showResendToast, setShowResendToast] = useState(false);

  useEffect(() => {
    if (getSession()) router.replace("/visitor");
  }, [router]);

  const handleContinue = () => {
    if (!phone.trim()) {
      setPhoneError("Please enter your phone number");
      return;
    }
    setPhoneError(undefined);
    setStage("otp");
  };

  const handleOtpComplete = (code: string) => {
    if (code !== DEMO_OTP) {
      setOtpError("Incorrect code. Try again — the demo code is 123456.");
      setOtpAttempt((n) => n + 1);
      return;
    }
    setOtpError(undefined);
    setSession(phone.trim());
    router.push("/visitor");
  };

  const handleResend = () => {
    setOtpError(undefined);
    setOtpAttempt((n) => n + 1);
    setShowResendToast(true);
  };

  if (stage === "phone") {
    return (
      <div className={styles.screen}>
        <div className={styles.header}>
          <h1 className={styles.title}>Sign in to request a permit</h1>
          <p className={styles.body}>We&apos;ll send a one-time code to verify it&apos;s you.</p>
        </div>
        <div className={styles.form}>
          <TextInput
            label="Phone number"
            type="tel"
            placeholder="e.g. 98765 43210"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            errorMessage={phoneError}
          />
          <Button variant="primary" fullWidthMobile onClick={handleContinue}>
            Continue
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <h1 className={styles.title}>Enter the code</h1>
        <p className={styles.body}>We sent a 6-digit code to {phone}. (Demo code: 123456)</p>
      </div>
      <div className={styles.form}>
        <OtpInput key={otpAttempt} onComplete={handleOtpComplete} errorMessage={otpError} />
        <Button variant="tertiary" className={styles.resend} onClick={handleResend}>
          Resend code
        </Button>
      </div>
      {showResendToast ? (
        <Toast
          variant="neutral"
          message="A new code has been sent."
          onDismiss={() => setShowResendToast(false)}
        />
      ) : null}
    </div>
  );
}

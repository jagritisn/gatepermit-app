"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TextInput } from "@/components/TextInput";
import { Button } from "@/components/Button";
import { PermitRequestForm, PermitRequestFormValues } from "@/components/PermitRequestForm";
import { Toast } from "@/components/Toast";
import { createRequest, getActiveRequestForVisitor, getSession } from "@/lib/permitStore";
import styles from "./request.module.css";

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export default function VisitorRequestPage() {
  const router = useRouter();
  const [phone, setPhone] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [nameEntered, setNameEntered] = useState(false);
  const [nameError, setNameError] = useState<string | undefined>();
  const [formError, setFormError] = useState<string | undefined>();

  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.replace("/visitor/login");
      return;
    }
    // Duplicate-request prevention: a visitor with an active request is sent back
    // to see it rather than starting a second one (request-and-approval.md edge case).
    if (getActiveRequestForVisitor(session.phone)) {
      router.replace("/visitor");
      return;
    }
    // localStorage doesn't exist during SSR — hydrate post-mount. See the note in
    // officer/[requestId]/page.tsx on why useSyncExternalStore isn't a safe swap here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPhone(session.phone);
  }, [router]);

  const handleNameContinue = () => {
    if (!name.trim()) {
      setNameError("Please enter your name");
      return;
    }
    setNameError(undefined);
    setNameEntered(true);
  };

  const handleSubmit = async (values: PermitRequestFormValues) => {
    if (!phone) return;
    if (!values.purpose.trim() || !values.date || !values.time) {
      setFormError("Please fill in every field before submitting.");
      return;
    }
    if (!values.idPhoto) {
      setFormError("Please add an ID photo before submitting.");
      return;
    }

    setFormError(undefined);
    const visitorPhotoUrl = await readFileAsDataUrl(values.idPhoto);
    createRequest({
      visitorPhone: phone,
      visitorName: name.trim(),
      visitorPhotoUrl,
      purpose: values.purpose.trim(),
      requestedDate: values.date,
      requestedTime: values.time,
    });
    router.push("/visitor");
  };

  if (!phone) return null;

  if (!nameEntered) {
    return (
      <div className={styles.screen}>
        <div className={styles.header}>
          <h1 className={styles.title}>What&apos;s your name?</h1>
          <p className={styles.body}>This appears on your request and your pass.</p>
        </div>
        <div className={styles.form}>
          <TextInput
            label="Full name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            errorMessage={nameError}
          />
          <Button variant="primary" fullWidthMobile onClick={handleNameContinue}>
            Continue
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.screen}>
      <PermitRequestForm onSubmit={handleSubmit} />
      {formError ? (
        <Toast variant="neutral" message={formError} onDismiss={() => setFormError(undefined)} />
      ) : null}
    </div>
  );
}

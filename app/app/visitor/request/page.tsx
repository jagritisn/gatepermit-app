"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { PermitRequestForm, PermitRequestFormValues } from "@/components/PermitRequestForm";
import { Toast } from "@/components/Toast";
import {
  clearSession,
  createRequest,
  getActiveRequestForVisitor,
  getSession,
} from "@/lib/permitStore";

export default function VisitorRequestPage() {
  const router = useRouter();
  const [phone, setPhone] = useState<string | null>(null);
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

  const handleSubmit = (values: PermitRequestFormValues) => {
    if (!phone) return;
    if (!values.fullName.trim() || !values.reason || !values.photoDataUrl) {
      setFormError("Please complete every step before submitting.");
      return;
    }

    setFormError(undefined);
    createRequest({
      visitorPhone: phone,
      visitorName: values.fullName.trim(),
      visitorPhotoUrl: values.photoDataUrl,
      reason: values.reason,
    });
    router.push("/visitor");
  };

  const handleSignOut = () => {
    clearSession();
    router.replace("/visitor/login");
  };

  if (!phone) return null;

  return (
    <AppShell
      size="narrow"
      user={{ name: "Visitor", secondary: phone }}
      onBack={() => router.push("/visitor")}
      onSignOut={handleSignOut}
    >
      <PermitRequestForm onSubmit={handleSubmit} />
      {formError ? (
        <Toast variant="neutral" message={formError} onDismiss={() => setFormError(undefined)} />
      ) : null}
    </AppShell>
  );
}

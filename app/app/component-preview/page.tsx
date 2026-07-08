"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { TextInput } from "@/components/TextInput";
import { Textarea } from "@/components/Textarea";
import { OtpInput } from "@/components/OtpInput";
import { StatusChip, PermitStatus } from "@/components/StatusChip";
import { Card } from "@/components/Card";
import { Modal } from "@/components/Modal";
import { Toast } from "@/components/Toast";
import { EmptyState } from "@/components/EmptyState";
import { Skeleton } from "@/components/Skeleton";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { PhotoCapture } from "@/components/PhotoCapture";
import { AuditLogRow } from "@/components/AuditLogRow";
import { PermitRequestForm } from "@/components/PermitRequestForm";
import { DateTimePicker } from "@/components/DateTimePicker";
import { RequestStatusTracker } from "@/components/RequestStatusTracker";
import { PassCard } from "@/components/PassCard";
import { QRCodeDisplay } from "@/components/QRCodeDisplay";
import { RequestQueueList } from "@/components/RequestQueueList";
import { RequestDetailView } from "@/components/RequestDetailView";
import { DecisionActionBar } from "@/components/DecisionActionBar";
import { DecisionHistoryList } from "@/components/DecisionHistoryList";
import { QRScanner } from "@/components/QRScanner";
import { VerificationResultPanel } from "@/components/VerificationResultPanel";
import { ManualLookupForm } from "@/components/ManualLookupForm";
import { FallbackModeBanner } from "@/components/FallbackModeBanner";
import { ManualOverrideConfirmation } from "@/components/ManualOverrideConfirmation";
import { Inbox } from "lucide-react";
import styles from "./preview.module.css";

const PLACEHOLDER_PHOTO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23c7ccd1'/%3E%3C/svg%3E";

const ALL_STATUSES: PermitStatus[] = [
  "pending",
  "approved",
  "valid",
  "denied",
  "expired",
  "invalid",
  "used",
];

export default function ComponentPreviewPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [overrideOpen, setOverrideOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showNeutralToast, setShowNeutralToast] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [langCode, setLangCode] = useState("en");

  return (
    <div className={styles.page}>
      <div>
        <h1 className={styles.pageTitle}>Component preview</h1>
        <p className={styles.pageSubtitle}>
          Dev-only gallery — not a product screen. Renders every non-Admin component from
          DESIGN.md §6 with sample data for visual review.
        </p>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Buttons</h2>
        <div className={styles.row}>
          <Button variant="primary">Approve</Button>
          <Button variant="secondary">Request more info</Button>
          <Button variant="tertiary">Deny</Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Text Input / Textarea / OTP</h2>
        <div className={styles.column}>
          <TextInput label="Purpose of visit" placeholder="e.g. Document renewal" />
          <TextInput label="Reference code" errorMessage="This field is required" />
          <Textarea label="Reason for override" placeholder="Explain what happened" />
          <div className={styles.componentBlock}>
            <span className={styles.componentLabel}>
              OTP input (demo code 123456) — captured: {otpCode || "—"}
            </span>
            <OtpInput onComplete={setOtpCode} />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Status Chip (all statuses)</h2>
        <div className={styles.row}>
          {ALL_STATUSES.map((status) => (
            <StatusChip key={status} status={status} />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Card / Modal / Toast</h2>
        <div className={styles.row}>
          <Card>Flat card, sharp corners, shadow-none.</Card>
          <Card bordered>Bordered card (adjacent-card case).</Card>
        </div>
        <div className={styles.row}>
          <Button onClick={() => setModalOpen(true)}>Open modal</Button>
          <Button variant="secondary" onClick={() => setShowSuccessToast(true)}>
            Show success toast
          </Button>
          <Button variant="secondary" onClick={() => setShowNeutralToast(true)}>
            Show neutral toast
          </Button>
        </div>
        <Modal open={modalOpen} title="Confirm submission" onClose={() => setModalOpen(false)}>
          <p>This is the modal body — bottom sheet on mobile, centered panel on desktop.</p>
        </Modal>
        {showSuccessToast && (
          <Toast
            variant="success"
            message="Pass approved"
            onDismiss={() => setShowSuccessToast(false)}
          />
        )}
        {showNeutralToast && (
          <Toast
            variant="neutral"
            message="Entry logged"
            onDismiss={() => setShowNeutralToast(false)}
          />
        )}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Empty State / Skeleton / Language Switcher</h2>
        <div className={styles.row}>
          <EmptyState
            icon={Inbox}
            title="No requests yet"
            description="New permit requests will appear here as visitors submit them."
            action={<Button variant="primary">Refresh</Button>}
          />
        </div>
        <div className={styles.column}>
          <Skeleton width="60%" height="1.5rem" />
          <Skeleton width="100%" height="96px" />
        </div>
        <LanguageSwitcher
          languages={[
            { code: "en", label: "English" },
            { code: "hi", label: "Hindi" },
          ]}
          currentCode={langCode}
          onSelect={setLangCode}
        />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Photo Capture / Audit Log Row</h2>
        <div className={styles.column}>
          <PhotoCapture onCapture={() => {}} />
          <AuditLogRow
            timestamp="09:41 AM"
            actor="Officer R. Iyer"
            action="Approved request"
            reason="Purpose and identity photo both matched the stated visit window without any discrepancy."
          />
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Visitor — Permit Request Form</h2>
        <PermitRequestForm onSubmit={() => setShowSuccessToast(true)} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Visitor — Date/Time, Status Tracker, Pass Card</h2>
        <div className={styles.column}>
          <DateTimePicker
            dateValue={date}
            timeValue={time}
            onDateChange={setDate}
            onTimeChange={setTime}
          />
          <RequestStatusTracker
            status="pending"
            message="An officer will review your request shortly."
          />
        </div>
        <div className={styles.row}>
          <PassCard
            passReference="REF-1234"
            visitorName="Priya Sharma"
            visitorPhotoUrl={PLACEHOLDER_PHOTO}
            approvedWindow="Today, 2:00–2:30 PM"
            status="valid"
          />
          <QRCodeDisplay value="REF-1234" />
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Approving Officer</h2>
        <RequestQueueList
          requests={[
            { id: "1", visitorName: "Priya Sharma", reason: "Document renewal", submittedAt: "8 Jul, 2:00 PM" },
            { id: "2", visitorName: "Arjun Mehta", reason: "Hearing", submittedAt: "8 Jul, 10:00 AM" },
          ]}
          onSelect={() => {}}
        />
        <RequestDetailView
          visitorName="Priya Sharma"
          visitorPhotoUrl={PLACEHOLDER_PHOTO}
          reason="Document renewal"
          submittedAt="Yesterday, 6:12 PM"
          actions={
            <DecisionActionBar onApprove={() => {}} onRequestInfo={() => {}} onDeny={() => {}} />
          }
        />
        <DecisionHistoryList
          entries={[
            { id: "1", timestamp: "Yesterday", actor: "Officer R. Iyer", action: "Approved", reason: "Matched" },
          ]}
        />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Gate Security</h2>
        <FallbackModeBanner />
        <div className={`${styles.frame} ${styles.scannerFrame}`}>
          <QRScanner onFallback={() => {}} />
        </div>
        <ManualLookupForm onSearch={() => {}} />
        <div className={styles.row}>
          <Button variant="tertiary" onClick={() => setOverrideOpen(true)}>
            Manual override
          </Button>
        </div>
        <ManualOverrideConfirmation
          open={overrideOpen}
          onClose={() => setOverrideOpen(false)}
          onConfirm={() => setOverrideOpen(false)}
        />
        <div className={styles.column}>
          <VerificationResultPanel
            outcome="valid"
            visitorName="Priya Sharma"
            visitorPhotoUrl={PLACEHOLDER_PHOTO}
            approvedWindow="Today, 2:00–2:30 PM"
          />
          <VerificationResultPanel outcome="invalid" reason="Already used" />
        </div>
      </section>
    </div>
  );
}

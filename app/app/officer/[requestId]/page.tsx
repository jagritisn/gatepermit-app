"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/Button";
import { RequestDetailView } from "@/components/RequestDetailView";
import { DecisionActionBar } from "@/components/DecisionActionBar";
import { Modal } from "@/components/Modal";
import { Textarea } from "@/components/Textarea";
import { decideRequest, getRequestById, PermitRequest, reasonLabel } from "@/lib/permitStore";
import { formatSubmittedAt } from "@/lib/format";
import { FileQuestion } from "lucide-react";
import styles from "./detail.module.css";

export default function OfficerRequestDetailPage() {
  const router = useRouter();
  const params = useParams<{ requestId: string }>();
  const [loaded, setLoaded] = useState(false);
  const [request, setRequest] = useState<PermitRequest | undefined>();
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    // localStorage doesn't exist during SSR, so this hydration can only happen
    // post-mount. useSyncExternalStore isn't a safe swap here: every store read
    // does a fresh JSON.parse, so its snapshot is never referentially stable.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRequest(getRequestById(params.requestId));
    setLoaded(true);
  }, [params.requestId]);

  if (!loaded) return null;

  if (!request) {
    return (
      <AppShell size="wide" onBack={() => router.push("/officer")}>
        <div className={styles.notFound}>
          <EmptyState
            icon={FileQuestion}
            title="Request not found"
            description="This request may have already been decided or the link is out of date."
            action={
              <Button variant="primary" onClick={() => router.push("/officer")}>
                Back to queue
              </Button>
            }
          />
        </div>
      </AppShell>
    );
  }

  const handleApprove = () => {
    decideRequest(request.id, "approved");
    router.push("/officer");
  };

  const handleDeny = () => {
    decideRequest(request.id, "denied");
    router.push("/officer");
  };

  const handleConfirmInfoRequest = () => {
    if (!infoMessage.trim()) return;
    decideRequest(request.id, "info_requested", infoMessage.trim());
    setInfoModalOpen(false);
    router.push("/officer");
  };

  return (
    <AppShell size="wide" onBack={() => router.push("/officer")}>
      <RequestDetailView
        visitorName={request.visitorName}
        visitorPhotoUrl={request.visitorPhotoUrl}
        reason={reasonLabel(request.reason)}
        submittedAt={formatSubmittedAt(request)}
        actions={
          <DecisionActionBar
            onApprove={handleApprove}
            onRequestInfo={() => setInfoModalOpen(true)}
            onDeny={handleDeny}
          />
        }
      />
      <Modal
        open={infoModalOpen}
        title="Request more information"
        onClose={() => setInfoModalOpen(false)}
      >
        <Textarea
          label="What do you need from the visitor?"
          value={infoMessage}
          onChange={(event) => setInfoMessage(event.target.value)}
          placeholder="e.g. Please clarify the exact department you're visiting"
        />
        <Button
          variant="primary"
          fullWidthMobile
          disabled={!infoMessage.trim()}
          onClick={handleConfirmInfoRequest}
          className={styles.confirmButton}
        >
          Send request
        </Button>
      </Modal>
    </AppShell>
  );
}

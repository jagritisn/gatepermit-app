"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { RequestStatusTracker } from "@/components/RequestStatusTracker";
import { StatusChip } from "@/components/StatusChip";
import { PassCard } from "@/components/PassCard";
import { Textarea } from "@/components/Textarea";
import { Toast } from "@/components/Toast";
import {
  getActiveRequestForVisitor,
  getLatestRequestForVisitor,
  getSession,
  PermitRequest,
  respondToInfoRequest,
} from "@/lib/permitStore";
import { formatRequestWindow } from "@/lib/format";
import styles from "./visitor.module.css";

export default function VisitorHomePage() {
  const router = useRouter();
  const [phone, setPhone] = useState<string | null>(null);
  const [request, setRequest] = useState<PermitRequest | null | undefined>(undefined);
  const [response, setResponse] = useState("");
  const [showResponseToast, setShowResponseToast] = useState(false);

  const refresh = useCallback((currentPhone: string) => {
    const active = getActiveRequestForVisitor(currentPhone);
    setRequest(active ?? getLatestRequestForVisitor(currentPhone) ?? null);
  }, []);

  useEffect(() => {
    // localStorage doesn't exist during SSR — hydrate post-mount. See the note in
    // officer/[requestId]/page.tsx on why useSyncExternalStore isn't a safe swap here.
    const session = getSession();
    if (!session) {
      router.replace("/visitor/login");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPhone(session.phone);
    refresh(session.phone);
  }, [router, refresh]);

  if (!phone || request === undefined) return null;

  if (!request) {
    return (
      <div className={styles.screen}>
        <div className={styles.centered}>
          <EmptyState
            icon={FileText}
            title="No active request"
            description="Request a permit to visit the office. It only takes a couple of minutes."
            action={
              <Button variant="primary" onClick={() => router.push("/visitor/request")}>
                Request a permit
              </Button>
            }
          />
        </div>
      </div>
    );
  }

  if (request.status === "pending") {
    return (
      <div className={styles.screen}>
        <RequestStatusTracker
          status="pending"
          message="An officer will review your request shortly."
        />
      </div>
    );
  }

  if (request.status === "info_requested") {
    const handleRespond = () => {
      if (!response.trim()) return;
      respondToInfoRequest(request.id, response.trim());
      refresh(phone);
      setResponse("");
      setShowResponseToast(true);
    };

    return (
      <div className={styles.screen}>
        <Card>
          <div className={styles.infoBlock}>
            <StatusChip status="pending" label="Action needed" />
            <div className={styles.officerMessage}>
              <span className={styles.officerMessageLabel}>The officer asked:</span>
              <span className={styles.officerMessageBody}>{request.infoRequestMessage}</span>
            </div>
            <Textarea
              label="Your response"
              value={response}
              onChange={(event) => setResponse(event.target.value)}
              placeholder="Provide the requested information"
            />
            <Button variant="primary" fullWidthMobile onClick={handleRespond}>
              Send response
            </Button>
          </div>
        </Card>
        {showResponseToast ? (
          <Toast
            variant="neutral"
            message="Response sent — your request is back with the officer."
            onDismiss={() => setShowResponseToast(false)}
          />
        ) : null}
      </div>
    );
  }

  if (request.status === "approved") {
    return (
      <div className={styles.screen}>
        <div className={styles.centered}>
          <PassCard
            passReference={request.id}
            visitorName={request.visitorName}
            visitorPhotoUrl={request.visitorPhotoUrl}
            approvedWindow={formatRequestWindow(request)}
            status="valid"
          />
        </div>
      </div>
    );
  }

  // denied or expired — terminal states, no in-app appeal (request-and-approval.md)
  const isDenied = request.status === "denied";

  return (
    <div className={styles.screen}>
      <Card>
        <div className={styles.outcomeBlock}>
          <StatusChip status={request.status} />
          <p className={styles.outcomeMessage}>
            {isDenied
              ? "Your permit request wasn't approved for this visit."
              : "This request expired before it was reviewed in time."}
          </p>
          <Button variant="primary" fullWidthMobile onClick={() => router.push("/visitor/request")}>
            Submit a new request
          </Button>
        </div>
      </Card>
    </div>
  );
}

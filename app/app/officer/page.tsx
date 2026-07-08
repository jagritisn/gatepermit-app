"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Inbox } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { RequestQueueList } from "@/components/RequestQueueList";
import { getQueue, reasonLabel } from "@/lib/permitStore";
import { formatSubmittedAt } from "@/lib/format";
import styles from "./officer.module.css";

export default function OfficerQueuePage() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [queue, setQueue] = useState<ReturnType<typeof getQueue>>([]);

  useEffect(() => {
    // localStorage doesn't exist during SSR — hydrate post-mount. See the note in
    // officer/[requestId]/page.tsx on why useSyncExternalStore isn't a safe swap here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQueue(getQueue());
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  return (
    <div className={styles.screen}>
      <h1 className={styles.header}>Permit requests</h1>
      {queue.length === 0 ? (
        <div className={styles.centered}>
          <EmptyState
            icon={Inbox}
            title="No requests to review"
            description="New permit requests will appear here as visitors submit them."
          />
        </div>
      ) : (
        <RequestQueueList
          requests={queue.map((request) => ({
            id: request.id,
            visitorName: request.visitorName,
            reason: reasonLabel(request.reason),
            submittedAt: formatSubmittedAt(request),
          }))}
          onSelect={(id) => router.push(`/officer/${id}`)}
        />
      )}
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Inbox, SearchX } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { EmptyState } from "@/components/EmptyState";
import { RequestQueueList } from "@/components/RequestQueueList";
import { getQueue, reasonLabel } from "@/lib/permitStore";
import { formatSubmittedAt } from "@/lib/format";
import styles from "./officer.module.css";

export default function OfficerQueuePage() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [queue, setQueue] = useState<ReturnType<typeof getQueue>>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // localStorage doesn't exist during SSR — hydrate post-mount. See the note in
    // officer/[requestId]/page.tsx on why useSyncExternalStore isn't a safe swap here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQueue(getQueue());
    setLoaded(true);
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return queue;
    return queue.filter(
      (r) =>
        r.visitorName.toLowerCase().includes(q) ||
        reasonLabel(r.reason).toLowerCase().includes(q)
    );
  }, [queue, search]);

  if (!loaded) return null;

  return (
    <AppShell
      size="wide"
      search={{
        value: search,
        onChange: setSearch,
        placeholder: "Search by name or reason",
        label: "Search requests",
      }}
    >
      <h1 className={styles.header}>Permit requests</h1>
      {queue.length === 0 ? (
        <div className={styles.centered}>
          <EmptyState
            icon={Inbox}
            title="No requests to review"
            description="New permit requests will appear here as visitors submit them."
          />
        </div>
      ) : filtered.length === 0 ? (
        <div className={styles.centered}>
          <EmptyState
            icon={SearchX}
            title="No matches"
            description={`No pending requests match "${search}".`}
          />
        </div>
      ) : (
        <RequestQueueList
          requests={filtered.map((request) => ({
            id: request.id,
            visitorName: request.visitorName,
            reason: reasonLabel(request.reason),
            submittedAt: formatSubmittedAt(request),
          }))}
          onSelect={(id) => router.push(`/officer/${id}`)}
        />
      )}
    </AppShell>
  );
}

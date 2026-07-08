import { QRCodeDisplay } from "../QRCodeDisplay";
import { StatusChip, PermitStatus } from "../StatusChip";
import styles from "./PassCard.module.css";

interface PassCardProps {
  passReference: string;
  visitorName: string;
  visitorPhotoUrl: string;
  approvedWindow: string;
  status: Extract<PermitStatus, "valid" | "used" | "expired">;
}

export function PassCard({
  passReference,
  visitorName,
  visitorPhotoUrl,
  approvedWindow,
  status,
}: PassCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.qr}>
        <QRCodeDisplay value={passReference} />
      </div>
      <div className={styles.identity}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={visitorPhotoUrl} alt={visitorName} className={styles.photo} />
        <span className={styles.name}>{visitorName}</span>
      </div>
      <span className={styles.window}>{approvedWindow}</span>
      <StatusChip status={status} />
    </div>
  );
}

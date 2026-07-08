import { useEffect, useRef, useState } from "react";
import { Button } from "../Button";
import styles from "./QRScanner.module.css";

interface QRScannerProps {
  /** Called when the camera is unavailable/denied — DESIGN.md: falls back to Manual Lookup Form */
  onFallback: () => void;
}

/**
 * Camera viewport only. Actual code decoding is intentionally out of scope for this
 * component — that's detection/business logic to wire in separately, not a UI primitive.
 */
export function QRScanner({ onFallback }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraFailed, setCameraFailed] = useState(false);

  useEffect(() => {
    let stream: MediaStream | null = null;

    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch {
        setCameraFailed(true);
      }
    }

    startCamera();

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return (
    <div className={styles.viewport}>
      {cameraFailed ? (
        <div className={styles.fallbackMessage}>
          <p>Camera unavailable.</p>
          <Button variant="secondary" onClick={onFallback}>
            Look up manually
          </Button>
        </div>
      ) : (
        <>
          <video ref={videoRef} className={styles.video} autoPlay playsInline muted />
          <div className={styles.frame} aria-hidden="true" />
        </>
      )}
    </div>
  );
}

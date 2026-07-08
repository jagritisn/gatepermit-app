"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Camera, RotateCcw } from "lucide-react";
import { Button } from "../Button";
import { PhotoCapture } from "../PhotoCapture";
import styles from "./LivePhotoCapture.module.css";

type Mode = "requesting" | "live" | "captured" | "fallback";

interface LivePhotoCaptureProps {
  /** Called with a photo data URL (empty string clears it, e.g. on retake) */
  onCapture: (dataUrl: string) => void;
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export function LivePhotoCapture({ onCapture }: LivePhotoCaptureProps) {
  const [mode, setMode] = useState<Mode>("requesting");
  const [stillUrl, setStillUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }, []);

  const startCamera = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setMode("fallback");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setMode("live");
    } catch {
      setMode("fallback");
    }
  }, []);

  useEffect(() => {
    // Initializing the camera is a legitimate external-system sync (the effect's intended
    // purpose): setMode reports the camera's actual state — live on success, fallback on
    // denied/no-camera. Stream is stopped on unmount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    startCamera();
    return stopStream;
  }, [startCamera, stopStream]);

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
    stopStream();
    setStillUrl(dataUrl);
    setMode("captured");
    onCapture(dataUrl);
  };

  const handleRetake = () => {
    setStillUrl(null);
    onCapture("");
    setMode("requesting");
    startCamera();
  };

  const handleFallbackCapture = async (file: File) => {
    const dataUrl = await readFileAsDataUrl(file);
    onCapture(dataUrl);
  };

  if (mode === "fallback") {
    return <PhotoCapture label="Add ID photo" onCapture={handleFallbackCapture} />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.frame}>
        {mode === "captured" && stillUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={stillUrl} alt="Captured ID photo" className={styles.still} />
        ) : (
          <video ref={videoRef} className={styles.video} autoPlay playsInline muted />
        )}
        {mode === "requesting" ? (
          <div className={styles.requesting}>Starting camera…</div>
        ) : null}
      </div>

      <canvas ref={canvasRef} className={styles.hiddenCanvas} />

      <div className={styles.controls}>
        {mode === "captured" ? (
          <Button variant="secondary" onClick={handleRetake}>
            <RotateCcw width={16} height={16} aria-hidden="true" />
            Retake
          </Button>
        ) : (
          <Button variant="primary" onClick={handleCapture} disabled={mode !== "live"}>
            <Camera width={16} height={16} aria-hidden="true" />
            Capture photo
          </Button>
        )}
      </div>
    </div>
  );
}

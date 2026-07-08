import { useState } from "react";
import { Modal } from "../Modal";
import { Textarea } from "../Textarea";
import { Button } from "../Button";
import styles from "./ManualOverrideConfirmation.module.css";

interface ManualOverrideConfirmationProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

/**
 * Composed from Modal + Textarea + Button (DESIGN.md §6: "not a new primitive").
 * The reason field is mandatory — every manual override must be justified and logged
 * (see ai/product/workflows/manual-fallback.md).
 */
export function ManualOverrideConfirmation({
  open,
  onClose,
  onConfirm,
}: ManualOverrideConfirmationProps) {
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    if (!reason.trim()) return;
    onConfirm(reason);
    setReason("");
  };

  return (
    <Modal open={open} title="Confirm manual override" onClose={onClose}>
      <Textarea
        label="Reason for manual override"
        value={reason}
        onChange={(event) => setReason(event.target.value)}
        placeholder="e.g. Visitor's phone battery died, verified against printed confirmation"
      />
      <Button
        variant="primary"
        fullWidthMobile
        disabled={!reason.trim()}
        onClick={handleConfirm}
        className={styles.confirmButton}
      >
        Confirm override
      </Button>
    </Modal>
  );
}

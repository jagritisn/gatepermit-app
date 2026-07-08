import { Button } from "../Button";
import styles from "./DecisionActionBar.module.css";

interface DecisionActionBarProps {
  onApprove: () => void;
  onRequestInfo: () => void;
  onDeny: () => void;
}

export function DecisionActionBar({ onApprove, onRequestInfo, onDeny }: DecisionActionBarProps) {
  return (
    <div className={styles.bar}>
      <Button variant="primary" fullWidthMobile onClick={onApprove}>
        Approve
      </Button>
      <Button variant="secondary" fullWidthMobile onClick={onRequestInfo}>
        Request more info
      </Button>
      <Button variant="tertiary" fullWidthMobile onClick={onDeny}>
        Deny
      </Button>
    </div>
  );
}

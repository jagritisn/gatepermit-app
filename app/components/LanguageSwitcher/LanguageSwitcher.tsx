import { useState } from "react";
import { Globe } from "lucide-react";
import styles from "./LanguageSwitcher.module.css";

export interface LanguageOption {
  code: string;
  label: string;
}

interface LanguageSwitcherProps {
  languages: LanguageOption[];
  currentCode: string;
  onSelect: (code: string) => void;
}

export function LanguageSwitcher({ languages, currentCode, onSelect }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const current = languages.find((lang) => lang.code === currentCode);

  const handleSelect = (code: string) => {
    onSelect(code);
    setOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen(true)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Globe className="" aria-hidden="true" width={16} height={16} />
        {current?.code.toUpperCase() ?? currentCode.toUpperCase()}
      </button>
      {open ? (
        <>
          <div className={styles.backdrop} onClick={() => setOpen(false)} />
          <div className={styles.list} role="listbox">
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                role="option"
                aria-selected={lang.code === currentCode}
                className={styles.option}
                onClick={() => handleSelect(lang.code)}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

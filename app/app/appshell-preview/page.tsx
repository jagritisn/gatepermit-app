"use client";

import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import styles from "./preview.module.css";

/**
 * Dev-only preview of the AppShell — exercises every slot (back, search, notifications,
 * profile menu with language + sign out) with realistic props, at the officer "wide" size.
 * Not a product screen.
 */
export default function AppShellPreviewPage() {
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("en");

  return (
    <AppShell
      size="wide"
      onBack={() => window.history.back()}
      user={{ name: "R. Iyer", secondary: "Approving Officer" }}
      search={{
        value: search,
        onChange: setSearch,
        placeholder: "Search requests by name or reference",
        label: "Search requests",
      }}
      notifications={{ count: 3, onClick: () => {} }}
      languages={[
        { code: "en", label: "English" },
        { code: "hi", label: "Hindi" },
      ]}
      currentLanguage={language}
      onLanguageChange={setLanguage}
      onSignOut={() => {}}
    >
      <div className={styles.content}>
        <h1 className={styles.title}>AppShell preview</h1>
        <p className={styles.body}>
          This content renders inside the shell&apos;s width-constrained main region. Resize to
          mobile to see the search reflow to its own row and the profile collapse to an avatar.
          Search value: {search || "—"} · Language: {language}
        </p>
        <div className={styles.placeholder} />
        <div className={styles.placeholder} />
      </div>
    </AppShell>
  );
}

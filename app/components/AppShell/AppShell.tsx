"use client";

import { ReactNode, useEffect, useId, useState } from "react";
import { Bell, Check, ChevronLeft, Globe, LogOut, Search } from "lucide-react";
import styles from "./AppShell.module.css";

export interface AppShellUser {
  name: string;
  /** Secondary identity line, e.g. phone number or role */
  secondary?: string;
}

export interface AppShellLanguage {
  code: string;
  label: string;
}

interface AppShellSearch {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Accessible label for the search input (visually hidden) */
  label?: string;
}

interface AppShellNotifications {
  count?: number;
  onClick: () => void;
}

interface AppShellProps {
  children: ReactNode;
  /** Content width: narrow (~480px, visitor flows) or wide (~640px, officer). Default narrow. */
  size?: "narrow" | "wide";
  wordmark?: string;
  /** Renders a Back control before the wordmark (drill-in screens only) */
  onBack?: () => void;
  user?: AppShellUser;
  /** Opt-in per screen — omit on linear one-task screens */
  search?: AppShellSearch;
  notifications?: AppShellNotifications;
  languages?: AppShellLanguage[];
  currentLanguage?: string;
  onLanguageChange?: (code: string) => void;
  onSignOut?: () => void;
}

function initialsFrom(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function SearchField({ search }: { search: AppShellSearch }) {
  const inputId = useId();
  const label = search.label ?? "Search";
  return (
    <div className={styles.searchField}>
      <Search className={styles.searchIcon} aria-hidden="true" />
      <label className={styles.srOnly} htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        className={styles.searchInput}
        type="search"
        value={search.value}
        placeholder={search.placeholder ?? "Search"}
        onChange={(event) => search.onChange(event.target.value)}
      />
    </div>
  );
}

export function AppShell({
  children,
  size = "narrow",
  wordmark = "Entry Permit",
  onBack,
  user,
  search,
  notifications,
  languages,
  currentLanguage,
  onLanguageChange,
  onSignOut,
}: AppShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const showLanguages = Boolean(languages && languages.length > 0 && onLanguageChange);

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.bar}>
          <div className={styles.leftCluster}>
            {onBack ? (
              <button
                type="button"
                className={styles.iconButton}
                onClick={onBack}
                aria-label="Back"
              >
                <ChevronLeft className={styles.icon} aria-hidden="true" />
              </button>
            ) : null}
            <span className={styles.wordmark}>{wordmark}</span>
          </div>

          {search ? (
            <div className={styles.searchInline}>
              <SearchField search={search} />
            </div>
          ) : null}
          <div className={styles.spacer} />

          <div className={styles.rightCluster}>
            {notifications ? (
              <button
                type="button"
                className={styles.iconButton}
                onClick={notifications.onClick}
                aria-label={
                  notifications.count
                    ? `Notifications, ${notifications.count} unread`
                    : "Notifications"
                }
              >
                <Bell className={styles.icon} aria-hidden="true" />
                {notifications.count ? (
                  <span className={styles.badge}>
                    {notifications.count > 99 ? "99+" : notifications.count}
                  </span>
                ) : null}
              </button>
            ) : null}

            {user ? (
              <button
                type="button"
                className={styles.profileTrigger}
                onClick={() => setMenuOpen((open) => !open)}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                aria-label={`Account: ${user.name}`}
              >
                <span className={styles.avatar} aria-hidden="true">
                  {initialsFrom(user.name)}
                </span>
                <span className={styles.profileName}>{user.name}</span>
              </button>
            ) : null}
          </div>
        </div>

        {/* Mobile-only search row (reflows below the bar; hidden at >=768px) */}
        {search ? (
          <div className={styles.searchRow}>
            <SearchField search={search} />
          </div>
        ) : null}

        {menuOpen && user ? (
          <>
            <div className={styles.menuBackdrop} onClick={() => setMenuOpen(false)} />
            <div className={styles.menu} role="menu">
              <div className={styles.menuIdentity}>
                <span className={styles.menuName}>{user.name}</span>
                {user.secondary ? (
                  <span className={styles.menuSecondary}>{user.secondary}</span>
                ) : null}
              </div>

              {showLanguages ? (
                <>
                  <span className={styles.menuSectionLabel}>Language</span>
                  {languages!.map((language) => {
                    const selected = language.code === currentLanguage;
                    return (
                      <button
                        key={language.code}
                        type="button"
                        role="menuitemradio"
                        aria-checked={selected}
                        className={`${styles.menuItem} ${selected ? styles.menuItemSelected : ""}`}
                        onClick={() => {
                          onLanguageChange!(language.code);
                          setMenuOpen(false);
                        }}
                      >
                        {selected ? (
                          <Check className={styles.menuItemIcon} aria-hidden="true" />
                        ) : (
                          <Globe className={styles.menuItemIcon} aria-hidden="true" />
                        )}
                        {language.label}
                      </button>
                    );
                  })}
                  {onSignOut ? <div className={styles.menuDivider} /> : null}
                </>
              ) : null}

              {onSignOut ? (
                <button
                  type="button"
                  role="menuitem"
                  className={styles.menuItem}
                  onClick={() => {
                    setMenuOpen(false);
                    onSignOut();
                  }}
                >
                  <LogOut className={styles.menuItemIcon} aria-hidden="true" />
                  Sign out
                </button>
              ) : null}
            </div>
          </>
        ) : null}
      </header>

      <main className={`${styles.main} ${size === "wide" ? styles.wide : styles.narrow}`}>
        {children}
      </main>
    </div>
  );
}

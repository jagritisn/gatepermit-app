import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "tertiary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  /** Full-width under 768px, auto-width at desktop (DESIGN.md §6 Buttons > Responsive) */
  fullWidthMobile?: boolean;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  fullWidthMobile = false,
  className,
  type = "button",
  children,
  ...rest
}: ButtonProps) {
  const classes = [
    styles.button,
    styles[variant],
    fullWidthMobile ? styles.fullWidthMobile : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}

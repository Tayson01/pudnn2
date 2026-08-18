import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all active:scale-[0.98]";

function styles(variant: "primary" | "ghost") {
  return variant === "primary"
    ? "bg-brand text-brand-foreground shadow-card hover:brightness-110 hover:-translate-y-0.5"
    : "border border-border bg-card text-foreground hover:bg-surface";
}

export function Btn({
  href,
  variant = "primary",
  children,
  className = "",
}: {
  href: string;
  variant?: "primary" | "ghost";
  children: ReactNode;
  className?: string;
}) {
  return (
    <a href={href} className={`${base} ${styles(variant)} ${className}`}>
      {children}
    </a>
  );
}

export function BtnLink({
  to,
  params,
  variant = "primary",
  children,
  className = "",
}: {
  to: string;
  params?: Record<string, string>;
  variant?: "primary" | "ghost";
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to as never}
      params={params as never}
      className={`${base} ${styles(variant)} ${className}`}
    >
      {children}
    </Link>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="text-sm font-semibold tracking-wide text-brand">{children}</p>;
}

import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CircleDot, Phone, Menu, X, MessageCircle, ChevronRight } from "lucide-react";

import { ThemeToggle } from "@/components/site/ThemeToggle";
import { PHONE, TEL, WA } from "@/lib/site-data";

const nav = [
  { to: "/", label: "Acasă" },
  { to: "/servicii", label: "Servicii" },
  { to: "/zone", label: "Zone deservite" },
  { to: "/intrebari-frecvente", label: "Întrebări" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled ? "border-border bg-background/90 backdrop-blur-md" : "border-transparent bg-background"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:px-5">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-brand text-brand-foreground">
            <CircleDot className="size-5" />
          </span>
          <span className="text-sm font-extrabold leading-tight">
            Vulcanizare Mobilă
            <span className="block text-xs font-medium text-muted-foreground">Constanța · 24/7</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "text-foreground font-semibold" }}
              className="transition-colors hover:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <a
            href={`tel:${TEL}`}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand px-3.5 text-sm font-semibold text-brand-foreground shadow-card transition-all hover:brightness-110 active:scale-95 sm:px-4"
          >
            <Phone className="size-4" />
            <span className="hidden sm:inline">{PHONE}</span>
            <span className="sr-only sm:hidden">Sună</span>
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Meniu"
            aria-expanded={open}
            className="flex size-11 items-center justify-center rounded-xl border border-border bg-card active:scale-95 lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-x-0 bottom-0 top-16 z-50 lg:hidden">
          <button
            aria-label="Închide meniul"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
          />
          <nav className="animate-rise absolute inset-x-0 top-0 max-h-full overflow-y-auto border-b border-border bg-background px-4 pb-6 pt-3 shadow-float">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: n.to === "/" }}
                activeProps={{ className: "!text-brand !border-brand/40 !bg-brand-soft" }}
                className="mb-2 flex min-h-14 items-center justify-between rounded-2xl border border-border bg-card px-4 text-base font-semibold text-foreground active:scale-[0.99]"
              >
                {n.label}
                <ChevronRight className="size-4 text-muted-foreground" />
              </Link>
            ))}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <a
                href={`tel:${TEL}`}
                className="flex min-h-13 items-center justify-center gap-2 rounded-2xl bg-brand text-sm font-bold text-brand-foreground"
              >
                <Phone className="size-4" /> {PHONE}
              </a>
              <a
                href={WA}
                className="flex min-h-13 items-center justify-center gap-2 rounded-2xl border border-border bg-card text-sm font-semibold"
              >
                <MessageCircle className="size-4 text-brand" /> WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

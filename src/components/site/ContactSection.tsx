import { Clock, MapPin, MessageCircle, Phone, ShieldCheck, Navigation } from "lucide-react";

import { SectionLabel } from "@/components/site/ui";
import { ContactForm } from "@/components/site/ContactForm";
import { ADDRESS, MAPS, PHONE, TEL, WA } from "@/lib/site-data";

const trust = [
  { icon: Clock, text: "Non-stop, inclusiv weekend și sărbători" },
  { icon: ShieldCheck, text: "Preț comunicat înainte de deplasare" },
  { icon: Navigation, text: "Venim la tine, oriunde ești blocat" },
];

export function ContactSection() {
  return (
    <section id="contact" className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-5 sm:py-24">
        <div className="max-w-xl">
          <SectionLabel>Contact</SectionLabel>
          <h2 className="mt-2 text-[2rem] font-extrabold leading-[1.1] tracking-tight sm:text-4xl">
            Hai să vorbim.
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
            Sună pentru intervenție urgentă sau trimite-ne locația pe WhatsApp.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:mt-10 lg:grid-cols-[1.05fr_1fr] lg:items-start lg:gap-6">
          {/* Card apel urgență — optimizat pentru degetul mare */}
          <div className="vm-call relative overflow-hidden rounded-[1.75rem] p-5 text-brand-foreground sm:rounded-[2rem] sm:p-9">
            <div className="flex items-center gap-2">
              <span className="vm-live" aria-hidden />
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-foreground/80">
                Suntem online acum · 24/7
              </p>
            </div>

            <a
              href={`tel:${TEL}`}
              className="mt-3 block text-[2.35rem] font-black leading-none tracking-tight tabular-nums transition-opacity active:opacity-80 sm:text-5xl"
            >
              {PHONE}
            </a>
            <p className="mt-2 text-[13px] text-brand-foreground/80">
              Răspundem în mai puțin de un minut.
            </p>

            {/* Butoane mari, full-width pe mobil */}
            <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
              <a
                href={`tel:${TEL}`}
                className="vm-callbtn inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-brand-foreground px-6 text-base font-extrabold text-brand transition-transform active:scale-[0.98]"
              >
                <Phone className="size-5" /> Sună acum
              </a>
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-success px-6 text-base font-extrabold text-brand-foreground transition-transform active:scale-[0.98]"
              >
                <MessageCircle className="size-5" /> WhatsApp
              </a>
            </div>

            <a
              href={MAPS}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex min-h-12 items-center gap-3 rounded-2xl bg-brand-foreground/12 px-4 py-3 text-sm font-semibold transition-colors active:bg-brand-foreground/20"
            >
              <MapPin className="size-4 shrink-0 text-brand-foreground/80" />
              <span className="min-w-0 flex-1 truncate">{ADDRESS}</span>
              <span className="shrink-0 text-xs font-bold uppercase tracking-wide text-brand-foreground/75">
                Hartă
              </span>
            </a>

            <ul className="mt-5 space-y-3 border-t border-brand-foreground/20 pt-5 text-[13px] sm:text-sm">
              {trust.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <Icon className="mt-0.5 size-4 shrink-0 text-brand-foreground/75" />
                  <span className="min-w-0 text-brand-foreground/90">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Formular rapid */}
          <div className="rounded-[1.75rem] border border-border bg-card p-5 shadow-card sm:rounded-[2rem] sm:p-9">
            <p className="text-lg font-extrabold tracking-tight">Trimite mesaj rapid</p>
            <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
              Completezi în 20 de secunde, se deschide direct în WhatsApp.
            </p>
            <div className="mt-5">
              <ContactForm bare />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

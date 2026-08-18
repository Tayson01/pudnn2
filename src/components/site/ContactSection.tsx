import { Clock, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";

import { SectionLabel } from "@/components/site/ui";
import { ContactForm } from "@/components/site/ContactForm";
import { ADDRESS, MAPS, PHONE, TEL, WA } from "@/lib/site-data";

export function ContactSection() {
  return (
    <section id="contact" className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
        <div className="max-w-xl">
          <SectionLabel>Contact</SectionLabel>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Hai să vorbim.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Sună pentru intervenție urgentă sau trimite-ne locația pe WhatsApp.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-[2rem] border border-border bg-card shadow-card lg:grid lg:grid-cols-[1.05fr_1fr]">
          {/* Left: brand panel */}
          <div className="relative bg-brand p-8 text-brand-foreground sm:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-brand-foreground/10 blur-2xl"
            />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-foreground/70">
                Apel de urgență
              </p>
              <a
                href={`tel:${TEL}`}
                className="mt-3 block text-4xl font-black tracking-tight transition-opacity hover:opacity-90 sm:text-5xl"
              >
                {PHONE}
              </a>
              <p className="mt-3 text-sm text-brand-foreground/80">
                Non-stop, 24/7 · răspundem în mai puțin de un minut.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`tel:${TEL}`}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-foreground px-5 py-3 text-sm font-bold text-brand transition-transform hover:-translate-y-0.5"
                >
                  <Phone className="size-4" /> Sună acum
                </a>
                <a
                  href={WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-brand-foreground/35 px-5 py-3 text-sm font-bold transition-colors hover:bg-brand-foreground/10"
                >
                  <MessageCircle className="size-4" /> WhatsApp
                </a>
              </div>

              <div className="mt-10 space-y-4 border-t border-brand-foreground/20 pt-6 text-sm">
                <a
                  href={MAPS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 transition-opacity hover:opacity-80"
                >
                  <MapPin className="mt-0.5 size-4 shrink-0 text-brand-foreground/70" />
                  <span>{ADDRESS}</span>
                </a>
                <p className="flex items-start gap-3">
                  <Clock className="mt-0.5 size-4 shrink-0 text-brand-foreground/70" />
                  <span>Deschis non-stop, inclusiv weekend și sărbători</span>
                </p>
                <p className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand-foreground/70" />
                  <span>Preț comunicat înainte de deplasare, fără costuri ascunse</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="border-t border-border p-8 sm:p-10 lg:border-l lg:border-t-0">
            <p className="text-lg font-bold">Trimite mesaj rapid</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Completezi în 20 de secunde, se deschide direct în WhatsApp.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { Btn, SectionLabel } from "@/components/site/ui";
import { ContactForm } from "@/components/site/ContactForm";
import { ADDRESS, EMAIL, MAPS, PHONE, TEL, WA } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Vulcanizare mobilă Constanța, non-stop" },
      {
        name: "description",
        content:
          "Sună la 0734 573 430 sau trimite locația pe WhatsApp. Vulcanizare mobilă în Constanța, disponibili 24/7, Șos. Mangaliei 126 B.",
      },
      { property: "og:title", content: "Contact — Vulcanizare mobilă Constanța" },
      {
        property: "og:description",
        content: "Telefon, WhatsApp cu locație și adresă — intervenții non-stop în Constanța.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-14">
      <SectionLabel>Contact</SectionLabel>
      <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl tracking-tight">Hai să vorbim.</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Sună-ne pentru intervenții urgente sau trimite-ne mesajul direct pe WhatsApp — opțional cu locația ta
        exactă.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="grid gap-4">
          <a
            href={`tel:${TEL}`}
            className="rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-card"
          >
            <Phone className="size-5 text-brand" />
            <p className="mt-4 text-xs font-semibold text-muted-foreground">Telefon · WhatsApp</p>
            <p className="text-lg font-bold">{PHONE}</p>
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-card"
          >
            <Mail className="size-5 text-brand" />
            <p className="mt-4 text-xs font-semibold text-muted-foreground">Email</p>
            <p className="text-lg font-bold">{EMAIL}</p>
          </a>
          <a
            href={MAPS}
            className="rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-card"
          >
            <MapPin className="size-5 text-brand" />
            <p className="mt-4 text-xs font-semibold text-muted-foreground">Vino la noi</p>
            <p className="text-lg font-bold">{ADDRESS}</p>
          </a>
          <div className="rounded-3xl border border-border bg-card p-6">
            <Clock className="size-5 text-brand" />
            <p className="mt-4 text-xs font-semibold text-muted-foreground">Program</p>
            <p className="text-lg font-bold">Non-stop, 24/7</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Btn href={`tel:${TEL}`}>
              <Phone className="size-4" /> Sună acum
            </Btn>
            <Btn href={WA} variant="ghost">
              <MessageCircle className="size-4" /> WhatsApp
            </Btn>
          </div>
        </div>

        <ContactForm />
      </div>
    </main>
  );
}

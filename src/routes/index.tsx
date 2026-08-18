import { createFileRoute } from "@tanstack/react-router";
import {
  Clock,
  ImageOff,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";

import { Btn, BtnLink, SectionLabel } from "@/components/site/ui";
import { GoogleMark } from "@/components/site/GoogleMark";
import { CoverageMapSection } from "@/components/site/CoverageMapSection";
import { ServicesSection } from "@/components/site/ServicesSection";
import { GallerySection } from "@/components/site/GallerySection";
import { FAQSection } from "@/components/site/FAQSection";
import { ContactSection } from "@/components/site/ContactSection";
import { EMAIL, PHONE, REVIEWS, TEL, WA, reviews, services, zones } from "@/lib/site-data";


export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Vulcanizare Mobilă Constanța – Intervenții 24/7" },
      {
        name: "description",
        content:
          "Vulcanizare mobilă în Constanța și zonele limitrofe: intervenții rapide 24/7 pentru autoturisme, camioane și flote, direct la locația ta.",
      },
      { property: "og:title", content: "Vulcanizare Mobilă Constanța – Intervenții 24/7" },
      {
        property: "og:description",
        content:
          "Intervenții rapide 24/7 pentru autoturisme, camioane și flote, direct la locația ta în Constanța.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AutoRepair",
          name: "Vulcanizare Mobilă Constanța",
          telephone: TEL,
          email: EMAIL,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Șoseaua Mangaliei 126 B",
            addressLocality: "Constanța",
            addressCountry: "RO",
          },
          openingHours: "Mo-Su 00:00-23:59",
          areaServed: zones.map((z) => z.name),
          aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "120" },
        }),
      },
    ],
  }),
});


function Index() {
  return (
    <main>
      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        {/* fundal decorativ */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-brand-soft/60 via-background to-background"
        />
        <div
          aria-hidden
          className="animate-hero-pulse pointer-events-none absolute -top-40 left-1/2 -z-10 size-[680px] -translate-x-1/2 rounded-full bg-brand/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
        />

        <div className="mx-auto max-w-6xl px-5 pb-14 pt-8 sm:pt-14 md:pb-20 md:pt-24">
          <div className="grid items-center gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-14">
            <div className="animate-rise">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-card/80 px-3 py-1.5 text-[11px] font-semibold text-muted-foreground shadow-card backdrop-blur sm:px-3.5 sm:text-xs">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-70" />
                  <span className="relative inline-flex size-2 rounded-full bg-success" />
                </span>
                Disponibili 24/7 în Constanța și împrejurimi
              </span>

              <h1 className="mt-5 text-[2.1rem] font-black leading-[1.06] tracking-tight sm:text-5xl md:text-[4.1rem] md:leading-[1.02]">
                Vulcanizare mobilă în{" "}
                <span className="relative inline-block text-brand">
                  Constanța
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-1 h-2 rounded-full bg-brand/20"
                  />
                </span>
                , oriunde te afli.
              </h1>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
                Asistență rutieră non-stop, reparații pe loc, montaj la domiciliu și intervenții pe
                A2, A4 și litoral. Ajungem la tine în cel mai scurt timp.
              </p>

              <div className="mt-6 grid gap-2.5 sm:mt-8 sm:flex sm:flex-wrap sm:gap-3">
                <Btn href={`tel:${TEL}`} className="min-h-14 w-full text-base shadow-glow sm:min-h-0 sm:w-auto sm:text-sm">
                  <Phone className="size-5 sm:size-4" /> Sună: {PHONE}
                </Btn>
                <div className="grid grid-cols-2 gap-2.5 sm:contents">
                  <Btn href={WA} variant="ghost" className="min-h-13 px-3 sm:min-h-0 sm:px-5">
                    <MessageCircle className="size-4" /> Locația
                  </Btn>
                  <BtnLink to="/contact" variant="ghost" className="min-h-13 px-3 sm:min-h-0 sm:px-5">
                    Cere ofertă
                  </BtnLink>
                </div>
              </div>

              <dl className="mt-7 grid max-w-xl grid-cols-3 gap-2 sm:mt-10 sm:gap-3">
                {[
                  { icon: Clock, k: "< 20 min", v: "timp de răspuns" },
                  { icon: MapPin, k: "40 km", v: "rază acoperire" },
                  { icon: ShieldCheck, k: "Garanție", v: "la fiecare lucrare" },
                ].map((s) => (
                  <div
                    key={s.k}
                    className="rounded-2xl border border-border bg-card/70 p-3 backdrop-blur transition-all hover:-translate-y-0.5 hover:shadow-card sm:p-4"
                  >
                    <s.icon className="size-4 text-brand" />
                    <dt className="mt-2.5 text-sm font-extrabold leading-none sm:text-base">{s.k}</dt>
                    <dd className="mt-1.5 text-[11px] leading-snug text-muted-foreground sm:text-xs">{s.v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground sm:mt-8 sm:text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <span className="flex gap-0.5 text-brand">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-3.5 fill-current" />
                    ))}
                  </span>
                  <strong className="font-bold text-foreground">4.9</strong> · 120+ recenzii Google
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Truck className="size-4 text-brand" /> Autoturisme, camioane & flote
                </span>
              </div>
            </div>

            {/* Vizual DEMO */}
            <div className="relative mt-2 animate-rise px-1 [animation-delay:120ms] md:mt-0 md:px-0">
              <figure className="relative overflow-hidden rounded-[2rem] border border-dashed border-border bg-card shadow-float">
                <div className="relative flex h-[15rem] flex-col items-center justify-center gap-3 bg-gradient-to-br from-muted/40 via-card to-brand-soft/40 sm:h-[22rem] md:h-[26rem]">
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-[0.05] [background-image:repeating-linear-gradient(45deg,currentColor_0,currentColor_1px,transparent_0,transparent_12px)]"
                  />
                  <div
                    aria-hidden
                    className="animate-hero-sweep pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-brand/10 to-transparent"
                  />
                  <span className="pointer-events-none absolute left-4 top-4 rounded-md bg-primary/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                    Intervenție 24/7
                  </span>
                  <ImageOff className="size-10 text-muted-foreground/40" />
                  <span className="text-lg font-black uppercase tracking-[0.3em] text-muted-foreground/30">
                    Demo
                  </span>
                  <span className="max-w-[16rem] text-center text-xs text-muted-foreground/70">
                    Aici va apărea o fotografie reală cu duba de intervenție.
                  </span>
                </div>
              </figure>

              <div className="absolute -top-4 right-4 inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold shadow-card">
                <span className="size-2 rounded-full bg-success" /> Online acum
              </div>
              <div className="absolute -bottom-5 -left-1 rounded-2xl border border-border bg-card px-4 py-3 shadow-float sm:-bottom-6 sm:-left-4 sm:px-5 sm:py-4">
                <p className="text-xl font-extrabold sm:text-2xl">2.000+</p>
                <p className="text-[11px] text-muted-foreground sm:text-xs">intervenții reușite</p>
              </div>
              <div className="absolute -right-3 bottom-10 hidden rounded-2xl border border-border bg-card px-4 py-3 shadow-card sm:block">
                <p className="inline-flex items-center gap-2 text-xs font-bold">
                  <Zap className="size-3.5 text-brand" /> Plecăm în 5 min
                </p>
                <p className="mt-1 inline-flex items-center gap-2 text-[11px] text-muted-foreground">
                  <Wrench className="size-3 text-brand" /> Echipament profesional
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bară urgență */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-10">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <p className="text-base font-bold">Ai pană acum?</p>
              <p className="text-sm text-muted-foreground">
                Răspundem 24/7. Trimite locația pe WhatsApp și pornim spre tine.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Btn href={`tel:${TEL}`}>
                <Phone className="size-4" /> {PHONE}
              </Btn>
              <Btn href={WA} variant="ghost">
                <MessageCircle className="size-4" /> WhatsApp
              </Btn>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {zones.slice(0, 4).map((z) => (
              <BtnLink
                key={z.slug}
                to="/zone/$slug"
                params={{ slug: z.slug }}
                variant="ghost"
                className="flex-col items-start rounded-2xl px-4 py-4 text-left"
              >
                <span className="inline-flex items-center gap-2 text-sm font-semibold">
                  <MapPin className="size-4 text-brand" /> {z.short}
                </span>
                <span className="mt-1 text-xs font-normal text-muted-foreground">{z.eta}</span>
              </BtnLink>
            ))}
          </div>
        </div>
      </section>

      {/* Servicii */}
      <ServicesSection />



      {/* Galerie */}
      <GallerySection />

      {/* Hartă acoperire */}
      <div className="border-y border-border bg-surface">
        <CoverageMapSection />
      </div>


      {/* Recenzii */}
      <section id="recenzii" className="relative overflow-hidden border-y border-border bg-surface">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 size-[520px] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-5 py-14 sm:py-20">
          <SectionLabel>Recenzii Google verificate</SectionLabel>
          <h2 className="mt-3 max-w-xl text-3xl font-extrabold sm:text-4xl tracking-tight">
            Șoferii din Constanța ne recomandă.
          </h2>

          <div className="mt-10 grid gap-5 lg:grid-cols-[320px_1fr]">
            {/* Panou scor */}
            <div className="rounded-3xl border border-border bg-card p-7 shadow-card">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                <GoogleMark />
                Recenzii Google
                <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-brand-soft px-2 py-1 text-[10px] font-bold text-brand">
                  <ShieldCheck className="size-3" /> Verificat
                </span>
              </div>

              <div className="mt-5 flex items-end gap-3">
                <p className="text-6xl font-extrabold leading-none tracking-tight">4.9</p>
                <div className="pb-1">
                  <div className="flex gap-0.5 text-brand">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">120+ recenzii</p>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                {[
                  { stars: 5, pct: 94 },
                  { stars: 4, pct: 5 },
                  { stars: 3, pct: 1 },
                  { stars: 2, pct: 0 },
                  { stars: 1, pct: 0 },
                ].map((row) => (
                  <div key={row.stars} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="w-3 font-semibold text-foreground">{row.stars}</span>
                    <Star className="size-3 fill-current text-brand" />
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-brand-soft">
                      <span
                        className="block h-full rounded-full bg-brand transition-all"
                        style={{ width: `${row.pct}%` }}
                      />
                    </span>
                    <span className="w-8 text-right tabular-nums">{row.pct}%</span>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-2">
                <Btn href={REVIEWS}>Vezi toate recenziile</Btn>
                <Btn href={REVIEWS} variant="ghost">
                  Lasă o recenzie
                </Btn>
              </div>
            </div>

            {/* Carduri recenzii */}
            <div className="grid gap-5 sm:grid-cols-2">
              {reviews.map((r) => (
                <blockquote
                  key={r.name}
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/40"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-2 -top-4 text-7xl font-black text-brand/10 transition-colors group-hover:text-brand/20"
                  >
                    &rdquo;
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-full bg-brand-soft text-sm font-bold text-brand ring-2 ring-brand/15">
                      {r.initials}
                    </span>
                    <div className="min-w-0">
                      <p className="flex items-center gap-1.5 text-sm font-bold">
                        {r.name}
                        <ShieldCheck className="size-3.5 shrink-0 text-brand" />
                      </p>
                      <p className="text-xs text-muted-foreground">{r.when}</p>
                    </div>
                    <span className="ml-auto shrink-0">
                      <GoogleMark />
                    </span>
                  </div>
                  <div className="mt-4 flex gap-0.5 text-brand">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">„{r.text}”</p>
                  <p className="mt-4 border-t border-border pt-3 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                    Recenzie Google verificată
                  </p>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* FAQ */}
      <FAQSection />

      {/* Contact */}
      <ContactSection />
    </main>
  );
}


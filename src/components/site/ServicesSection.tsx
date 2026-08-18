import { useMemo, useState } from "react";
import { ArrowRight, Check, Clock, MapPin, Phone, ShieldCheck, Tag, Zap } from "lucide-react";

import { PHONE, TEL, services } from "@/lib/site-data";
import { ServiceIcon } from "@/components/site/ServiceIcon";
import { SectionLabel } from "@/components/site/ui";
import { Link } from "@tanstack/react-router";

type Category = "all" | "urgente" | "montaj" | "camioane";

const categories: { id: Category; label: string }[] = [
  { id: "all", label: "Toate serviciile" },
  { id: "urgente", label: "Urgențe" },
  { id: "montaj", label: "Montaj & întreținere" },
  { id: "camioane", label: "Camioane & flote" },
];

const serviceCategory: Record<string, Category> = {
  "asistenta-rutiera": "urgente",
  "reparatii-pe-loc": "urgente",
  "transport-auto": "urgente",
  "montaj-domiciliu": "montaj",
  "echilibrare-roti": "montaj",
  "vulcanizare-camioane": "camioane",
};

const featuredSlug = "asistenta-rutiera";

export function ServicesSection() {
  const [active, setActive] = useState<Category>("all");

  const filtered = useMemo(
    () =>
      services.filter(
        (s) => active === "all" || serviceCategory[s.slug] === active,
      ),
    [active],
  );

  const featured = services.find((s) => s.slug === featuredSlug)!;
  const rest = filtered.filter((s) => s.slug !== featuredSlug);
  const showFeatured = active === "all" || active === "urgente";

  return (
    <section id="servicii" className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
      <SectionLabel>Servicii</SectionLabel>
      <div className="mt-3 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="max-w-xl text-3xl font-extrabold sm:text-4xl tracking-tight">
            Tot ce ai nevoie, într-un singur loc.
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            De la pene neașteptate pe drum până la întreținere programată — echipa noastră mobilă din
            Constanța se ocupă de tot.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((c) => {
            const on = active === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActive(c.id)}
                aria-pressed={on}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  on
                    ? "bg-brand text-brand-foreground shadow-card"
                    : "border border-border bg-card text-muted-foreground hover:border-brand/40 hover:text-foreground"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {showFeatured && (
        <div className="group relative mt-10 overflow-hidden rounded-[28px] bg-gradient-to-br from-brand/30 via-brand/5 to-transparent p-[1.5px] shadow-card">
          <div className="relative overflow-hidden rounded-[26px] border border-border/60 bg-card">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-28 size-[320px] rounded-full bg-brand/12 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
            />

            <div className="relative grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="p-6 sm:p-8 md:p-10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-brand">
                    <Zap className="size-3" /> Cel mai solicitat
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-[11px] font-semibold text-muted-foreground">
                    <Clock className="size-3 text-brand" /> {featured.duration}
                  </span>
                </div>

                <span className="mt-6 flex size-14 items-center justify-center rounded-2xl bg-brand text-brand-foreground shadow-card">
                  <ServiceIcon name={featured.icon} className="size-7" />
                </span>

                <h3 className="mt-5 text-2xl font-extrabold tracking-tight md:text-3xl">
                  {featured.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {featured.intro}
                </p>

                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {featured.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-foreground/90">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-soft">
                        <Check className="size-3 text-brand" />
                      </span>
                      <span className="leading-snug">{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Link
                    to="/servicii/$slug"
                    params={{ slug: featured.slug }}
                    className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground shadow-card transition-all hover:brightness-110 hover:-translate-y-0.5"
                  >
                    Detalii complete <ArrowRight className="size-4" />
                  </Link>
                  <a
                    href={`tel:${TEL}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold transition-colors hover:bg-surface"
                  >
                    <Phone className="size-4 text-brand" /> {PHONE}
                  </a>
                </div>
              </div>

              <div className="relative border-t border-border/60 bg-gradient-to-br from-brand-soft/40 via-brand-soft/20 to-transparent p-6 sm:p-8 md:p-10 lg:border-l lg:border-t-0">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  <Tag className="size-3.5 text-brand" /> Prețuri clare
                </div>

                <p className="mt-2 text-4xl font-black tracking-tight text-brand sm:text-5xl">
                  {featured.priceFrom}
                </p>
                <p className="text-sm font-medium text-muted-foreground">
                  {featured.priceNote}
                </p>

                <div className="mt-6 space-y-2">
                  {featured.pricing?.map((p) => (
                    <div
                      key={p.label}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-border/70 bg-card/80 px-4 py-3 backdrop-blur-sm"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold">{p.label}</p>
                        {p.note && <p className="text-[11px] text-muted-foreground">{p.note}</p>}
                      </div>
                      <p className="shrink-0 text-sm font-black text-brand">{p.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-2 rounded-2xl border border-brand/20 bg-brand/10 px-4 py-3 text-xs text-brand">
                  <ShieldCheck className="size-4 shrink-0" />
                  <span className="font-semibold">Preț final comunicat înainte de plecare. Fără costuri ascunse.</span>
                </div>

                <div className="mt-5 flex items-start gap-2 text-xs text-muted-foreground">
                  <MapPin className="mt-0.5 size-3.5 shrink-0 text-brand" />
                  <span>Acoperim A2, A4, DN39, DN3 și tot județul Constanța.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((s) => (
          <div
            key={s.slug}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-card"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-brand/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
            />
            <div className="relative flex items-start justify-between">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-brand-soft text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                <ServiceIcon name={s.icon} />
              </span>
              <span className="rounded-full border border-border px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                {s.price}
              </span>
            </div>

            <h3 className="relative mt-5 text-lg font-bold">{s.title}</h3>
            <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>

            <div className="relative mt-4 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Clock className="size-3.5 text-brand" /> {s.duration}
            </div>

            <ul className="relative mt-4 space-y-2 border-t border-border pt-4">
              {s.bullets.slice(0, 3).map((b) => (
                <li key={b} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-brand" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/servicii/$slug"
              params={{ slug: s.slug }}
              className="relative mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-brand transition-all hover:gap-2.5"
            >
              Află mai mult <ArrowRight className="size-4" />
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-brand p-7 text-brand-foreground">
        <div>
          <p className="text-lg font-bold">Nu găsești ce cauți?</p>
          <p className="text-sm opacity-90">
            Sună-ne și îți oferim o soluție personalizată în câteva minute.
          </p>
        </div>
        <a
          href={`tel:${TEL}`}
          className="inline-flex items-center gap-2 rounded-xl bg-card px-5 py-3 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5"
        >
          <Phone className="size-4" /> Contactează-ne
        </a>
      </div>
    </section>
  );
}

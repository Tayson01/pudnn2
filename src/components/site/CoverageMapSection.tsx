import { Suspense, lazy, useEffect, useState } from "react";
import { Clock, MapPin, Radar, Route as RouteIcon } from "lucide-react";

import { PHONE, TEL, mapRings, zones } from "@/lib/site-data";

const CoverageMap = lazy(() => import("./CoverageMap"));

const ringTones = ["bg-brand", "bg-brand/60", "bg-brand/30"];

const stats = [
  { icon: Clock, value: "25 min", label: "sosire medie" },
  { icon: RouteIcon, value: "50 km", label: "rază acoperită" },
  { icon: Radar, value: "24/7", label: "intervenții" },
];

export function CoverageMapSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section id="harta" className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand/10 px-3 py-1 text-xs font-semibold tracking-wide text-brand">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-brand" />
            </span>
            Hartă acoperire live
          </p>
          <h2 className="mt-4 max-w-xl text-3xl font-extrabold sm:text-4xl tracking-tight">
            Cât de repede ajungem la tine?
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Pornim din Constanța și acoperim întreg județul, litoralul și tronsoanele A2 / A4. Cercurile
            arată timpul estimat de sosire.
          </p>
        </div>

        <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-1 sm:mx-0 sm:overflow-visible sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {stats.map((s) => (
            <div
              key={s.label}
              className="shrink-0 rounded-2xl border border-border bg-card px-4 py-3 text-center shadow-card/40"
            >
              <s.icon className="mx-auto size-4 text-brand" />
              <p className="mt-1.5 text-lg font-extrabold leading-none">{s.value}</p>
              <p className="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="group relative -mx-5 rounded-[28px] bg-gradient-to-br from-brand/40 via-brand/10 to-transparent p-0 shadow-card sm:mx-0 sm:p-[1.5px]">
          <div className="relative overflow-hidden border-border/60 bg-card sm:rounded-[26px] sm:border">
            {mounted ? (
              <Suspense
                fallback={<div className="h-[68svh] min-h-[460px] w-full animate-pulse bg-surface sm:h-[560px]" aria-hidden="true" />}
              >
                <div className="[&_.leaflet-container]:transition-[filter] dark:[&_.leaflet-container]:brightness-[.9] dark:[&_.leaflet-container]:contrast-[1.03]">
                  <CoverageMap />
                </div>
              </Suspense>
            ) : (
              <div className="h-[68svh] min-h-[460px] w-full bg-surface sm:h-[560px]" aria-hidden="true" />
            )}

          </div>
        </div>

        <div className="grid content-start gap-5">
          <div className="rounded-3xl border border-border bg-card p-6">
            <p className="inline-flex items-center gap-2 text-sm font-bold">
              <Clock className="size-4 text-brand" /> Timp estimat de sosire
            </p>
            <ul className="mt-4 space-y-3">
              {mapRings.map((r, i) => (
                <li key={r.km} className="group/ring">
                  <div className="flex items-center justify-between text-sm">
                    <span className="inline-flex items-center gap-2.5 font-semibold">
                      <span className={`size-3 rounded-full ${ringTones[i]}`} /> {r.minutes}
                    </span>
                    <span className="text-muted-foreground">rază {r.km} km</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand to-brand/40 transition-all duration-700"
                      style={{ width: `${(r.km / 50) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6">
            <p className="text-sm font-bold">Localități deservite</p>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              {zones.map((z) => (
                <li key={z.slug}>
                  <a
                    href={`/zone/${z.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-lg px-1.5 py-1 transition-colors hover:bg-brand/10 hover:text-brand"
                  >
                    <MapPin className="size-3.5 text-brand" /> {z.short}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
              Nu vezi localitatea ta?{" "}
              <a href={`tel:${TEL}`} className="font-semibold text-brand">
                Sună-ne la {PHONE}
              </a>
              , deservim întreg județul Constanța.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

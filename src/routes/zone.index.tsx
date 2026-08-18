import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin } from "lucide-react";

import { BtnLink, SectionLabel } from "@/components/site/ui";
import { CoverageMapSection } from "@/components/site/CoverageMapSection";
import { zones } from "@/lib/site-data";

export const Route = createFileRoute("/zone/")({
  head: () => ({
    meta: [
      { title: "Zone deservite — Vulcanizare mobilă Constanța și litoral" },
      {
        name: "description",
        content:
          "Acoperim Constanța, Mamaia, Năvodari, Agigea, A2/A4, Ovidiu, Eforie, Techirghiol și Mangalia. Vezi harta de acoperire și timpii de sosire.",
      },
      { property: "og:title", content: "Zone deservite — Vulcanizare mobilă Constanța" },
      {
        property: "og:description",
        content: "Hartă de acoperire cu timpi estimați de sosire în Constanța și pe litoral.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ZonePage,
});

function ZonePage() {
  return (
    <main>
      <div className="mx-auto max-w-6xl px-5 pt-14">
        <SectionLabel>Zone deservite</SectionLabel>
        <h1 className="mt-3 max-w-2xl text-3xl font-extrabold sm:text-4xl tracking-tight">
          Acoperim Constanța și împrejurimile.
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Selectează zona ta pentru detalii despre trasee, timp de sosire și prețuri orientative.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {zones.map((z) => (
            <div
              key={z.slug}
              className="flex flex-col rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-card"
            >
              <p className="inline-flex items-center gap-2 font-bold">
                <MapPin className="size-4 text-brand" /> {z.name}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{z.desc}</p>
              <p className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                <Clock className="size-3.5 text-brand" /> {z.etaMinutes}
              </p>
              <BtnLink
                to="/zone/$slug"
                params={{ slug: z.slug }}
                variant="ghost"
                className="mt-4 self-start px-4 py-2"
              >
                Detalii →
              </BtnLink>
            </div>
          ))}
        </div>
      </div>

      <CoverageMapSection />
    </main>
  );
}

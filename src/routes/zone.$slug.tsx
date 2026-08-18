import { createFileRoute, notFound } from "@tanstack/react-router";
import { Clock, MapPin, Phone, Route as RouteIcon } from "lucide-react";

import { Btn, BtnLink, SectionLabel } from "@/components/site/ui";
import { ContactForm } from "@/components/site/ContactForm";
import { PHONE, TEL, WA, services, zones } from "@/lib/site-data";

export const Route = createFileRoute("/zone/$slug")({
  loader: ({ params }) => {
    const zone = zones.find((z) => z.slug === params.slug);
    if (!zone) throw notFound();
    return { zone };
  },
  head: ({ loaderData }) => {
    const z = loaderData?.zone;
    const title = z
      ? `Vulcanizare mobilă ${z.name} — sosire ${z.etaMinutes}`
      : "Zonă deservită — Vulcanizare Mobilă Constanța";
    const description = z
      ? `${z.desc} Timp estimat de sosire: ${z.etaMinutes}. Intervenții 24/7, sună la ${PHONE}.`
      : "Zone deservite de vulcanizarea mobilă din Constanța.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ZonePage,
});

function ZonePage() {
  const { zone } = Route.useLoaderData();

  return (
    <main className="mx-auto max-w-5xl px-5 py-14">
      <SectionLabel>Zonă deservită</SectionLabel>
      <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl tracking-tight">Vulcanizare mobilă {zone.name}</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">{zone.intro}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <Clock className="size-4 text-brand" /> Timp de sosire
          </p>
          <p className="mt-1 text-lg font-bold">{zone.etaMinutes}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <MapPin className="size-4 text-brand" /> Program
          </p>
          <p className="mt-1 text-lg font-bold">Non-stop, 24/7</p>
        </div>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${zone.coords[0]},${zone.coords[1]}`}
          className="rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-card"
        >
          <p className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <RouteIcon className="size-4 text-brand" /> Vezi pe hartă
          </p>
          <p className="mt-1 text-lg font-bold">Google Maps →</p>
        </a>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-bold">Trasee acoperite</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {zone.roads.map((r) => (
              <span
                key={r}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground"
              >
                {r}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold">Localități și cartiere</h2>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            {zone.localities.map((l) => (
              <li key={l} className="inline-flex items-center gap-2">
                <MapPin className="size-3.5 text-brand" /> {l}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h2 className="mt-14 text-xl font-bold">Servicii disponibile în {zone.name}</h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div key={s.slug} className="rounded-3xl border border-border bg-card p-5">
            <p className="font-bold">{s.title}</p>
            <p className="mt-2 text-sm text-muted-foreground">{s.price}</p>
            <BtnLink
              to="/servicii/$slug"
              params={{ slug: s.slug }}
              variant="ghost"
              className="mt-4 px-4 py-2"
            >
              Află mai mult →
            </BtnLink>
          </div>
        ))}
      </div>

      <div className="mt-14 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-bold">Cere intervenție în {zone.name}</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Trimite-ne detaliile pe WhatsApp, opțional cu locația exactă, sau sună direct.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Btn href={`tel:${TEL}`}>
              <Phone className="size-4" /> {PHONE}
            </Btn>
            <Btn href={WA} variant="ghost">
              WhatsApp
            </Btn>
          </div>
        </div>
        <ContactForm defaultZone={zone.name} />
      </div>

      <h2 className="mt-14 text-xl font-bold">Alte zone deservite</h2>
      <div className="mt-5 flex flex-wrap gap-2">
        {zones
          .filter((z) => z.slug !== zone.slug)
          .map((z) => (
            <BtnLink
              key={z.slug}
              to="/zone/$slug"
              params={{ slug: z.slug }}
              variant="ghost"
              className="px-4 py-2"
            >
              {z.name}
            </BtnLink>
          ))}
      </div>
    </main>
  );
}

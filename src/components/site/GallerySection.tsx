import { Camera, ImageOff, Upload } from "lucide-react";

const placeholderItems = [
  {
    title: "Intervenție pe traseu",
    desc: "Reparație rapidă direct pe marginea drumului, fără platformă.",
    tag: "Urgență",
  },
  {
    title: "Intervenție nocturnă",
    desc: "Schimb de roată seara, direct lângă mașina clientului.",
    tag: "Noapte",
  },
  {
    title: "Camioane și flote",
    desc: "Echipament profesional pentru TIR-uri și autoutilitare.",
    tag: "Camioane",
  },
  {
    title: "Duba de intervenție",
    desc: "Autospeciala noastră, pregătită pentru ieșiri rapide 24/7.",
    tag: "Echipament",
  },
];

export function GallerySection() {
  return (
    <section id="galerie" className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Camera className="h-3.5 w-3.5" />
            Galerie · Intervenții reale
          </span>
          <h2 className="mt-3 max-w-xl text-3xl font-extrabold sm:text-4xl tracking-tight">
            Poze reale din intervențiile noastre.
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Imagini din teren, cu duba noastră și lucrări făcute direct la
            client, pe autostradă sau în oraș.
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-600 dark:text-amber-400">
          <Upload className="h-4 w-4" />
          În curând — fotografii reale
        </span>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {placeholderItems.map((g) => (
          <figure
            key={g.title}
            className="group relative overflow-hidden rounded-3xl border border-dashed border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg"
          >
            {/* Placeholder imagine - DEMO */}
            <div className="relative flex h-60 w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-muted/40 via-card to-muted/30">
              <div className="absolute inset-0 opacity-[0.04] [background-image:repeating-linear-gradient(45deg,currentColor_0,currentColor_1px,transparent_0,transparent_12px)]" />
              <span className="pointer-events-none absolute right-4 top-4 rounded-md bg-primary/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                {g.tag}
              </span>
              <ImageOff className="h-10 w-10 text-muted-foreground/40" />
              <span className="text-lg font-black uppercase tracking-[0.3em] text-muted-foreground/30">
                Demo
              </span>
            </div>

            <figcaption className="p-5">
              <p className="font-bold">{g.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{g.desc}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-2 rounded-2xl border border-border bg-muted/30 px-6 py-4 text-center text-sm text-muted-foreground">
        <Camera className="h-4 w-4 shrink-0" />
        <span>
          Spațiile de mai sus vor fi completate cu fotografii reale din
          intervenții. Momentan sunt afișate ca locuri de demonstrație
          (<strong className="font-semibold">DEMO</strong>).
        </span>
      </div>
    </section>
  );
}

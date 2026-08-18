import { useMemo, useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";

import { Btn, BtnLink, SectionLabel } from "@/components/site/ui";
import { PHONE, TEL, WA, faqs } from "@/lib/site-data";

const categories = [
  { id: "all", label: "Toate" },
  { id: "prețuri", label: "Prețuri" },
  { id: "disponibilitate", label: "Disponibilitate" },
  { id: "timp-sosire", label: "Timp sosire" },
  { id: "servicii", label: "Servicii" },
  { id: "plată", label: "Plată" },
  { id: "siguranță", label: "Siguranță" },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter((f) => {
      const matchesCategory = category === "all" || f.category === category;
      const matchesQuery =
        !q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <section id="intrebari" className="mx-auto max-w-5xl px-5 py-14 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          <SectionLabel>Întrebări frecvente</SectionLabel>
          <h2 className="mt-3 max-w-xl text-3xl font-extrabold tracking-tight sm:text-4xl">
            Tot ce vrei să știi înainte să suni.
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Răspunsuri clare despre prețuri, timpi de sosire, plăți și servicii. Dacă nu găsești
            ce cauți, sună-ne direct.
          </p>

          {/* Search */}
          <div className="relative mt-8">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Caută o întrebare..."
              className="h-12 w-full rounded-2xl border border-border bg-card pl-11 pr-10 text-sm font-medium outline-none transition-all focus:border-brand focus:ring-2 focus:ring-brand/10"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-full bg-surface text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="size-3" />
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((c) => {
              const on = category === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id)}
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

          {/* Count */}
          <p className="mt-4 text-xs font-medium text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "răspuns" : "răspunsuri"} găsite
            {query && ` pentru „${query.trim()}”`}
            {category !== "all" && ` în categoria ${categories.find((c) => c.id === category)?.label}`}
          </p>

          {/* Accordion */}
          <div className="mt-5 space-y-3">
            {filtered.length === 0 ? (
              <div className="rounded-3xl border border-border bg-card p-8 text-center">
                <HelpCircle className="mx-auto size-10 text-muted-foreground/40" />
                <p className="mt-4 font-semibold">Nu am găsit răspuns pentru căutarea ta</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Sună-ne și îți răspundem personal în câteva secunde.
                </p>
                <div className="mt-5 flex justify-center gap-3">
                  <Btn href={`tel:${TEL}`}>
                    <Phone className="size-4" /> {PHONE}
                  </Btn>
                  <Btn href={WA} variant="ghost">
                    <MessageCircle className="size-4" /> WhatsApp
                  </Btn>
                </div>
              </div>
            ) : (
              filtered.map((f, i) => {
                const isOpen = open === i;
                return (
                  <div
                    key={f.q}
                    className={`overflow-hidden rounded-2xl border transition-colors ${
                      isOpen ? "border-brand/40 bg-card shadow-card" : "border-border bg-card"
                    }`}
                  >
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className={`text-sm font-semibold leading-snug ${isOpen ? "text-brand" : "text-foreground"}`}>
                        {f.q}
                      </span>
                      <span
                        className={`grid size-7 shrink-0 place-items-center rounded-full transition-all ${
                          isOpen ? "bg-brand text-brand-foreground" : "bg-surface text-muted-foreground"
                        }`}
                      >
                        <ChevronDown
                          className={`size-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </span>
                    </button>
                    <div
                      className="grid transition-[grid-template-rows] duration-300 ease-out"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                          {f.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Sidebar sticky */}
        <div className="lg:sticky lg:top-8 lg:self-start">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
            <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand text-brand-foreground shadow-card">
              <Phone className="size-6" />
            </div>
            <p className="mt-5 text-lg font-bold">Nu găsești răspunsul?</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Dispecerul nostru răspunde direct la telefon și pe WhatsApp, 24/7.
            </p>
            <div className="mt-5 flex flex-col gap-2.5">
              <Btn href={`tel:${TEL}`} className="w-full">
                <Phone className="size-4" /> Sună: {PHONE}
              </Btn>
              <Btn href={WA} variant="ghost" className="w-full">
                <MessageCircle className="size-4" /> Scrie pe WhatsApp
              </Btn>
            </div>
            <div className="mt-5 rounded-2xl border border-brand/20 bg-brand/10 p-4 text-xs text-brand">
              <p className="flex items-center gap-2 font-semibold">
                <ShieldCheck className="size-4" /> Răspuns în mai puțin de 1 minut
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-3xl border border-border bg-card p-6">
            <p className="text-sm font-semibold">Actualizate recent</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Răspunsurile reflectă prețurile și timpii de sosire valabili în această perioadă.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <BtnLink to="/intrebari-frecvente" variant="ghost">
          Pagina completă de întrebări frecvente →
        </BtnLink>
      </div>
    </section>
  );
}

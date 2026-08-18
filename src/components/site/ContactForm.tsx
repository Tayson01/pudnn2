import { useState } from "react";
import { MapPin, MessageCircle } from "lucide-react";

import { PHONE, waLink, zones } from "@/lib/site-data";

export function ContactForm({
  defaultZone,
  bare = false,
}: {
  defaultZone?: string;
  bare?: boolean;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [zone, setZone] = useState(defaultZone ?? zones[0]?.name ?? "Constanța");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  function buildText(location?: { lat: number; lng: number }) {
    const lines = [
      "Bună ziua! Am nevoie de vulcanizare mobilă.",
      name && `Nume: ${name}`,
      phone && `Telefon: ${phone}`,
      `Zonă: ${zone}`,
      message && `Detalii: ${message}`,
      location &&
        `Locația mea: https://maps.google.com/?q=${location.lat.toFixed(6)},${location.lng.toFixed(6)}`,
    ].filter(Boolean);
    return lines.join("\n");
  }

  function open(text: string) {
    window.open(waLink(text), "_blank", "noopener,noreferrer");
  }

  function sendWithoutLocation() {
    setStatus(null);
    open(buildText());
  }

  function sendWithLocation() {
    if (!("geolocation" in navigator)) {
      setStatus("Browserul nu permite localizarea. Trimitem mesajul fără locație.");
      open(buildText());
      return;
    }
    setStatus("Se preia locația…");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setStatus(null);
        open(buildText({ lat: pos.coords.latitude, lng: pos.coords.longitude }));
      },
      () => {
        setStatus("Nu am putut prelua locația. Trimitem mesajul fără ea.");
        open(buildText());
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  const field =
    "mt-1.5 min-h-13 w-full rounded-2xl border border-border bg-background px-4 py-3.5 text-base outline-none transition-colors focus:border-brand focus:ring-4 focus:ring-brand/12 sm:text-sm";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendWithLocation();
      }}
      className={bare ? "" : "rounded-3xl border border-border bg-card p-5 shadow-card sm:p-6"}
    >
      <div className="grid gap-3.5 sm:grid-cols-2">
        <label className="block text-xs font-semibold text-muted-foreground">
          Nume
          <input
            className={field}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ion Popescu"
          />
        </label>
        <label className="block text-xs font-semibold text-muted-foreground">
          Telefon
          <input
            className={field}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="07xx xxx xxx"
            inputMode="tel"
          />
        </label>
      </div>
      <label className="mt-4 block text-xs font-semibold text-muted-foreground">
        Zonă
        <select className={field} value={zone} onChange={(e) => setZone(e.target.value)}>
          {zones.map((z) => (
            <option key={z.slug} value={z.name}>
              {z.name}
            </option>
          ))}
          <option value="Altă localitate din județul Constanța">Altă localitate din județ</option>
        </select>
      </label>
      <label className="mt-4 block text-xs font-semibold text-muted-foreground">
        Mesaj
        <textarea
          className={field}
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ex: pană față dreapta, 205/55 R16, sunt în parcare."
        />
      </label>

      <div className="mt-5 grid gap-2.5">
        <button
          type="submit"
          className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-success px-5 text-base font-extrabold text-brand-foreground transition-all hover:brightness-110 active:scale-[0.98]"
        >
          <MapPin className="size-5" /> Trimite cu locația
        </button>
        <button
          type="button"
          onClick={sendWithoutLocation}
          className="inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl border border-border bg-card px-5 text-sm font-bold transition-colors hover:bg-surface active:scale-[0.98]"
        >
          <MessageCircle className="size-4" /> Trimite fără locație
        </button>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        {status ?? `Mesajul se deschide în WhatsApp pe numărul ${PHONE}.`}
      </p>
    </form>
  );
}

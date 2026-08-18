import { useState } from "react";
import { MapPin, MessageCircle } from "lucide-react";

import { PHONE, waLink, zones } from "@/lib/site-data";

export function ContactForm({ defaultZone }: { defaultZone?: string }) {
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
    "mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendWithLocation();
      }}
      className="rounded-3xl border border-border bg-card p-6 shadow-card"
    >
      <div className="grid gap-4 sm:grid-cols-2">
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

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-xl bg-success px-5 py-3 text-sm font-semibold text-brand-foreground transition-all hover:brightness-110"
        >
          <MapPin className="size-4" /> Trimite cu locația
        </button>
        <button
          type="button"
          onClick={sendWithoutLocation}
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold hover:bg-surface"
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

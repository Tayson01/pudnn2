import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Circle,
  CircleMarker,
  MapContainer,
  Marker,
  Polyline,
  Popup,
  ScaleControl,
  TileLayer,
  Tooltip,
  useMap,
  useMapEvents,
} from "react-leaflet";
import {
  Check,
  Crosshair,
  Layers,
  Locate,
  Maximize2,
  Minimize2,
  MessageCircle,
  Navigation,
  Phone,
  Search,
  Target,
  X,
} from "lucide-react";

import { BASE, TEL, mapRings, waLink, zones } from "@/lib/site-data";

type LatLngTuple = [number, number];

const TILE_LAYERS = {
  street: {
    label: "Stradal",
    light: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    subdomains: ["a", "b", "c", "d"],
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
  relief: {
    label: "Relief",
    light: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    dark: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    subdomains: ["a", "b", "c"],
    attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)',
  },
  satellite: {
    label: "Satelit",
    light:
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    dark: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    subdomains: ["a"],
    attribution: "&copy; Esri, Maxar, Earthstar Geographics",
  },
} as const;

type TileKey = keyof typeof TILE_LAYERS;

const baseIcon = L.divIcon({
  className: "",
  html: `<span class="vm-base"><span class="vm-radar"></span><span class="vm-base-pulse"></span><span class="vm-base-dot"></span></span>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

const pinIcon = (color: string) =>
  L.divIcon({
    className: "",
    html: `<span class="vm-pin" style="--vm-pin:${color}"><span class="vm-pin-dot"></span></span>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });

const userIcon = pinIcon("#16a34a");
const pickIcon = pinIcon("#f59e0b");

function useIsDark() {
  const [dark, setDark] = useState(
    typeof document !== "undefined" && document.documentElement.classList.contains("dark"),
  );
  useEffect(() => {
    const el = document.documentElement;
    const obs = new MutationObserver(() => setDark(el.classList.contains("dark")));
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return dark;
}

function distanceKm(a: LatLngTuple, b: LatLngTuple) {
  return L.latLng(a).distanceTo(L.latLng(b)) / 1000;
}

/** ETA aproximativ: 12 min pregătire + ~1.15 min / km rutier (x1.25 factor drum) */
function etaFor(km: number) {
  const road = km * 1.25;
  const min = Math.round(12 + road * 0.95);
  const max = Math.round(18 + road * 1.4);
  return `${min}–${max} min`;
}

function MapEvents({
  picking,
  onPick,
}: {
  picking: boolean;
  onPick: (p: LatLngTuple) => void;
}) {
  useMapEvents({
    click(e) {
      if (picking) onPick([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

function MapApi({ onReady }: { onReady: (m: L.Map) => void }) {
  const map = useMap();
  useEffect(() => {
    onReady(map);
    map.scrollWheelZoom.disable();
    const fix = () => map.invalidateSize({ animate: false });
    const t1 = setTimeout(fix, 120);
    const t2 = setTimeout(fix, 600);
    const ro = new ResizeObserver(fix);
    ro.observe(map.getContainer());
    window.addEventListener("orientationchange", fix);
    const enable = () => map.scrollWheelZoom.enable();
    const disable = () => map.scrollWheelZoom.disable();
    map.on("click", enable);
    map.on("mouseout", disable);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      ro.disconnect();
      window.removeEventListener("orientationchange", fix);
      map.off("click", enable);
      map.off("mouseout", disable);
    };
  }, [map, onReady]);
  return null;
}

export default function CoverageMap() {
  const dark = useIsDark();
  const mapRef = useRef<L.Map | null>(null);

  const [tiles, setTiles] = useState<TileKey>("street");
  const [showRings, setShowRings] = useState(true);
  const [showRoutes, setShowRoutes] = useState(true);
  const [showLabels, setShowLabels] = useState(false);
  const [layersOpen, setLayersOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string | null>(null);
  const [picking, setPicking] = useState(false);
  const [pick, setPick] = useState<LatLngTuple | null>(null);
  const [user, setUser] = useState<LatLngTuple | null>(null);
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [fullscreen, setFullscreen] = useState(false);

  const layer = TILE_LAYERS[tiles];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return zones;
    return zones.filter(
      (z) =>
        z.name.toLowerCase().includes(q) ||
        z.localities.some((l) => l.toLowerCase().includes(q)) ||
        z.roads.some((r) => r.toLowerCase().includes(q)),
    );
  }, [query]);

  const flyTo = useCallback((coords: LatLngTuple, z = 12) => {
    mapRef.current?.flyTo(coords, z, { duration: 0.9 });
  }, []);

  const fitAll = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;
    map.flyToBounds(L.latLngBounds([BASE, ...zones.map((z) => z.coords)]).pad(0.2), {
      duration: 0.9,
      paddingBottomRight: [0, 140],
    });
    setActive(null);
  }, []);

  const locate = useCallback(() => {
    if (!("geolocation" in navigator)) {
      setGeoError("Locația nu este disponibilă în acest browser.");
      return;
    }
    setLocating(true);
    setGeoError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const p: LatLngTuple = [pos.coords.latitude, pos.coords.longitude];
        setUser(p);
        setPick(null);
        setLocating(false);
        flyTo(p, 12);
      },
      () => {
        setLocating(false);
        setGeoError("Nu am putut obține locația. Verifică permisiunile.");
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }, [flyTo]);

  useEffect(() => {
    if (!geoError) return;
    const t = setTimeout(() => setGeoError(null), 4500);
    return () => clearTimeout(t);
  }, [geoError]);

  useEffect(() => {
    const t = setTimeout(() => mapRef.current?.invalidateSize(), 280);
    return () => clearTimeout(t);
  }, [fullscreen]);

  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [fullscreen]);

  const measured = pick ?? user;
  const measuredKm = measured ? distanceKm(BASE, measured) : null;
  const measuredLabel = pick ? "Punct ales pe hartă" : "Locația ta GPS";
  const waHref = measured
    ? waLink(
        `Bună ziua! Am nevoie de vulcanizare mobilă la locația: https://maps.google.com/?q=${measured[0].toFixed(5)},${measured[1].toFixed(5)}`,
      )
    : waLink("Bună ziua! Am nevoie de vulcanizare mobilă.");

  const fabs = [
    {
      key: "locate",
      icon: <Locate className={`size-5 ${locating ? "animate-spin" : ""}`} />,
      label: "Localizează-mă",
      on: !!user,
      action: locate,
    },
    {
      key: "pick",
      icon: <Crosshair className="size-5" />,
      label: "Alege punct",
      on: picking,
      action: () => setPicking((p) => !p),
    },
    {
      key: "fit",
      icon: <Target className="size-5" />,
      label: "Toată acoperirea",
      on: false,
      action: fitAll,
    },
    {
      key: "layers",
      icon: <Layers className="size-5" />,
      label: "Straturi",
      on: layersOpen,
      action: () => setLayersOpen((o) => !o),
    },
    {
      key: "full",
      icon: fullscreen ? <Minimize2 className="size-5" /> : <Maximize2 className="size-5" />,
      label: "Ecran complet",
      on: fullscreen,
      action: () => setFullscreen((f) => !f),
    },
  ];

  return (
    <div
      className={
        fullscreen
          ? "fixed inset-0 z-[9999] bg-background"
          : "relative h-[68svh] min-h-[460px] w-full sm:h-[560px]"
      }
    >
      <div className="relative h-full w-full overflow-hidden sm:rounded-2xl">
        <MapContainer
          center={BASE}
          zoom={9}
          minZoom={6}
          maxZoom={17}
          scrollWheelZoom={false}
          zoomControl={false}
          className="vm-map h-full w-full"
          style={{ background: "transparent" }}
        >
          <MapApi onReady={(m) => (mapRef.current = m)} />
          <MapEvents picking={picking} onPick={(p) => { setPick(p); setPicking(false); }} />
          <TileLayer
            key={tiles + (dark ? "-d" : "-l")}
            attribution={layer.attribution}
            url={dark ? layer.dark : layer.light}
            subdomains={layer.subdomains as unknown as string[]}
          />
          <ScaleControl position="bottomleft" imperial={false} />

          {showRoutes &&
            filtered.map((z) => (
              <Polyline
                key={`route-${z.slug}`}
                positions={[BASE, z.coords]}
                pathOptions={{
                  color: "#2563eb",
                  weight: active === z.slug ? 3 : 1.2,
                  opacity: active === z.slug ? 0.95 : 0.28,
                  dashArray: active === z.slug ? undefined : "4 8",
                }}
              />
            ))}

          {showRings &&
            [...mapRings].reverse().map((ring, i) => (
              <Circle
                key={ring.km}
                center={BASE}
                radius={ring.radius}
                pathOptions={{
                  color: "#2563eb",
                  weight: 1.5,
                  opacity: 0.4 + i * 0.15,
                  dashArray: "6 6",
                  fillColor: "#2563eb",
                  fillOpacity: 0.05 + i * 0.03,
                }}
              />
            ))}

          <Marker position={BASE} icon={baseIcon} zIndexOffset={1000}>
            <Popup className="vm-popup">
              <span className="block text-[13px] font-extrabold">Bază operațională</span>
              <span className="mt-1 block text-[12px] opacity-70">Șos. Mangaliei 126 B, Constanța</span>
            </Popup>
          </Marker>

          {filtered.map((z) => (
            <CircleMarker
              key={z.slug}
              center={z.coords}
              radius={active === z.slug ? 11 : 8}
              eventHandlers={{ click: () => setActive(z.slug) }}
              pathOptions={{
                color: "#ffffff",
                weight: 2.5,
                fillColor: active === z.slug ? "#f59e0b" : "#16a34a",
                fillOpacity: 1,
                className: "vm-zone-dot",
              }}
            >
              <Popup className="vm-popup">
                <span className="block text-[13px] font-extrabold">{z.name}</span>
                <span className="mt-1 block text-[12px] opacity-70">
                  Sosire estimată: {z.etaMinutes} · {distanceKm(BASE, z.coords).toFixed(1)} km
                </span>
                <span className="mt-2 flex gap-3">
                  <a href={`/zone/${z.slug}`} className="text-[12px] font-bold text-blue-600">
                    Detalii →
                  </a>
                  <a href={`tel:${TEL}`} className="text-[12px] font-bold text-green-600">
                    Sună
                  </a>
                </span>
              </Popup>
              {showLabels && (
                <Tooltip direction="top" className="vm-tip">{`${z.name} · ${z.etaMinutes}`}</Tooltip>
              )}
            </CircleMarker>
          ))}

          {user && (
            <>
              <Marker position={user} icon={userIcon} zIndexOffset={900} />
              <Polyline
                positions={[BASE, user]}
                pathOptions={{ color: "#16a34a", weight: 2.6, opacity: 0.9, dashArray: "2 7" }}
              />
            </>
          )}

          {pick && (
            <>
              <Marker position={pick} icon={pickIcon} zIndexOffset={900} />
              <Polyline
                positions={[BASE, pick]}
                pathOptions={{ color: "#f59e0b", weight: 2.6, opacity: 0.9, dashArray: "2 7" }}
              />
            </>
          )}
        </MapContainer>

        {/* ==== Vignette / gradient overlays ==== */}
        <div className="pointer-events-none absolute inset-0 z-[500] vm-vignette" />

        {/* ==== BARA DE SUS ==== */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[600] flex items-center gap-2 p-3"
          style={{ paddingTop: fullscreen ? "max(0.75rem, env(safe-area-inset-top))" : undefined }}
        >
          <span className={`pointer-events-none ${searchOpen ? "hidden sm:inline-flex" : "inline-flex"} shrink-0 whitespace-nowrap items-center gap-2 rounded-full border border-white/15 bg-black/55 px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur`}>
            <span className="vm-live" /> Acoperire live
          </span>

          <div className="ml-auto flex items-center gap-2">
            {searchOpen ? (
              <div className="pointer-events-auto flex w-[62vw] max-w-[320px] items-center gap-2 rounded-full border border-white/15 bg-black/65 px-3 py-2 text-white backdrop-blur">
                <Search className="size-4 shrink-0 opacity-70" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Localitate sau drum…"
                  className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-white/50"
                />
                <button
                  onClick={() => {
                    setQuery("");
                    setSearchOpen(false);
                  }}
                  aria-label="Închide căutarea"
                >
                  <X className="size-4 opacity-80" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="vm-fab pointer-events-auto"
                aria-label="Caută localitate"
              >
                <Search className="size-5" />
              </button>
            )}
            {fullscreen && (
              <button
                onClick={() => setFullscreen(false)}
                className="vm-fab pointer-events-auto"
                aria-label="Închide ecranul complet"
              >
                <X className="size-5" />
              </button>
            )}
          </div>
        </div>

        {/* ==== FAB-uri verticale (thumb zone) ==== */}
        <div className="absolute right-3 top-16 z-[600] flex flex-col gap-2">
          {fabs.map((f) => (
            <button
              key={f.key}
              onClick={f.action}
              aria-label={f.label}
              title={f.label}
              className={`vm-fab ${f.on ? "vm-fab-on" : ""}`}
            >
              {f.icon}
            </button>
          ))}
        </div>

        {/* ==== Panou straturi ==== */}
        {layersOpen && (
          <div className="absolute right-16 top-16 z-[650] w-52 rounded-2xl border border-white/15 bg-black/80 p-2 text-white shadow-2xl backdrop-blur-xl">
            <p className="px-2 pb-1 text-[10px] uppercase tracking-wide opacity-60">Stil hartă</p>
            {(Object.keys(TILE_LAYERS) as TileKey[]).map((k) => (
              <button
                key={k}
                onClick={() => setTiles(k)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-white/10 ${
                  tiles === k ? "bg-white/15" : ""
                }`}
              >
                {TILE_LAYERS[k].label}
                {tiles === k && <Check className="size-4" />}
              </button>
            ))}
            <p className="mt-2 px-2 pb-1 text-[10px] uppercase tracking-wide opacity-60">Suprapuneri</p>
            {[
              { label: "Cercuri ETA", v: showRings, set: setShowRings },
              { label: "Trasee", v: showRoutes, set: setShowRoutes },
              { label: "Etichete", v: showLabels, set: setShowLabels },
            ].map((o) => (
              <button
                key={o.label}
                onClick={() => o.set(!o.v)}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-white/10"
              >
                {o.label}
                <span
                  className={`h-5 w-9 rounded-full p-0.5 transition-colors ${o.v ? "bg-brand" : "bg-white/25"}`}
                >
                  <span
                    className={`block size-4 rounded-full bg-white transition-transform ${
                      o.v ? "translate-x-4" : ""
                    }`}
                  />
                </span>
              </button>
            ))}
          </div>
        )}

        {/* ==== Toast-uri ==== */}
        {(picking || geoError) && (
          <div className="pointer-events-none absolute left-1/2 top-28 z-[650] w-max max-w-[80%] -translate-x-1/2 rounded-full border border-white/15 bg-black/75 px-3.5 py-2 text-center text-xs font-semibold text-white backdrop-blur">
            {geoError ?? "Atinge harta ca să marchezi locația ta"}
          </div>
        )}

        {/* ==== BOTTOM SHEET ==== */}
        <div
          className="absolute inset-x-0 bottom-0 z-[640] p-3 pb-20 sm:pb-3"
          style={{ paddingBottom: fullscreen ? "max(0.75rem, env(safe-area-inset-bottom))" : undefined }}
        >
          <div className="vm-sheet overflow-hidden rounded-3xl">
            {measuredKm !== null ? (
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wide text-white/60">
                      {measuredLabel}
                    </p>
                    <p className="mt-1 flex items-baseline gap-2 text-white">
                      <span className="text-3xl font-extrabold leading-none tabular-nums">
                        {measuredKm.toFixed(1)} km
                      </span>
                      <span className="text-sm font-semibold text-white/70">
                        ≈ {etaFor(measuredKm)}
                      </span>
                    </p>
                    <p
                      className={`mt-1.5 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-bold ${
                        measuredKm <= 50
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-amber-500/20 text-amber-300"
                      }`}
                    >
                      {measuredKm <= 50 ? "În zona de acoperire" : "În afara razei standard"}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setPick(null);
                      setUser(null);
                    }}
                    className="rounded-full border border-white/20 p-2 text-white/80"
                    aria-label="Resetează"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${TEL}`}
                    className="inline-flex h-13 min-h-13 items-center justify-center gap-2 rounded-2xl bg-brand text-sm font-extrabold text-white"
                  >
                    <Phone className="size-4" /> Sună acum
                  </a>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-13 min-h-13 items-center justify-center gap-2 rounded-2xl bg-emerald-500 text-sm font-extrabold text-white"
                  >
                    <MessageCircle className="size-4" /> Trimite locația
                  </a>
                </div>
              </div>
            ) : (
              <div className="p-3">
                <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {filtered.map((z) => (
                    <button
                      key={z.slug}
                      onClick={() => {
                        setActive(z.slug);
                        flyTo(z.coords, 12);
                      }}
                      className={`shrink-0 rounded-2xl border px-3 py-2 text-left transition-colors ${
                        active === z.slug
                          ? "border-transparent bg-brand text-white"
                          : "border-white/15 bg-white/10 text-white"
                      }`}
                    >
                      <span className="block text-[13px] font-bold leading-tight">{z.short ?? z.name}</span>
                      <span className="mt-0.5 block text-[11px] opacity-70">
                        {z.etaMinutes} · {distanceKm(BASE, z.coords).toFixed(0)} km
                      </span>
                    </button>
                  ))}
                  {filtered.length === 0 && (
                    <span className="px-2 py-3 text-xs text-white/70">
                      Nicio potrivire — sună-ne oricum, deservim tot județul.
                    </span>
                  )}
                </div>

                <div className="mt-2 grid grid-cols-[1.2fr_1fr] gap-2">
                  <button
                    onClick={locate}
                    className="inline-flex h-13 min-h-13 items-center justify-center gap-2 rounded-2xl bg-brand text-sm font-extrabold text-white"
                  >
                    <Navigation className={`size-4 ${locating ? "animate-spin" : ""}`} />
                    {locating ? "Te caut…" : "Calculează ETA"}
                  </button>
                  <a
                    href={`tel:${TEL}`}
                    className="inline-flex h-13 min-h-13 items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 text-sm font-extrabold text-white"
                  >
                    <Phone className="size-4" /> Sună
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

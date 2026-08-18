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
  ZoomControl,
  useMap,
  useMapEvents,
} from "react-leaflet";
import {
  Crosshair,
  Layers,
  Locate,
  Maximize2,
  Minimize2,
  MousePointerClick,
  Phone,
  Route as RouteIcon,
  Ruler,
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
  html: `<span class="vm-base"><span class="vm-base-pulse"></span><span class="vm-base-dot"></span></span>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const pinIcon = (color: string) =>
  L.divIcon({
    className: "",
    html: `<span class="vm-pin" style="--vm-pin:${color}"><span class="vm-pin-dot"></span></span>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
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
  onZoom,
}: {
  picking: boolean;
  onPick: (p: LatLngTuple) => void;
  onZoom: (z: number) => void;
}) {
  useMapEvents({
    click(e) {
      if (picking) onPick([e.latlng.lat, e.latlng.lng]);
    },
    zoomend(e) {
      onZoom(e.target.getZoom());
    },
  });
  return null;
}

function MapApi({ onReady }: { onReady: (m: L.Map) => void }) {
  const map = useMap();
  useEffect(() => {
    onReady(map);
    // harta se activează la click (evită scroll-jacking)
    map.scrollWheelZoom.disable();
    const enable = () => map.scrollWheelZoom.enable();
    const disable = () => map.scrollWheelZoom.disable();
    map.on("click", enable);
    map.on("mouseout", disable);
    return () => {
      map.off("click", enable);
      map.off("mouseout", disable);
    };
  }, [map, onReady]);
  return null;
}

export default function CoverageMap() {
  const dark = useIsDark();
  const wrapRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  const [tiles, setTiles] = useState<TileKey>("street");
  const [showRings, setShowRings] = useState(true);
  const [showRoutes, setShowRoutes] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [layersOpen, setLayersOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string | null>(null);
  const [picking, setPicking] = useState(false);
  const [pick, setPick] = useState<LatLngTuple | null>(null);
  const [user, setUser] = useState<LatLngTuple | null>(null);
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [zoom, setZoom] = useState(9);
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
    map.flyToBounds(L.latLngBounds([BASE, ...zones.map((z) => z.coords)]).pad(0.25), {
      duration: 0.9,
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

  const toggleFullscreen = useCallback(() => {
    setFullscreen((f) => !f);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => mapRef.current?.invalidateSize(), 260);
    return () => clearTimeout(t);
  }, [fullscreen]);

  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fullscreen]);

  const measured = pick ?? user;
  const measuredKm = measured ? distanceKm(BASE, measured) : null;

  return (
    <div
      ref={wrapRef}
      className={
        fullscreen
          ? "fixed inset-0 z-[9999] bg-background p-3 sm:p-5"
          : "relative h-[540px] w-full"
      }
    >
      <div className="relative h-full w-full overflow-hidden rounded-2xl">
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
          <MapEvents picking={picking} onPick={setPick} onZoom={setZoom} />
          <TileLayer
            key={tiles + (dark ? "-d" : "-l")}
            attribution={layer.attribution}
            url={dark ? layer.dark : layer.light}
            subdomains={layer.subdomains as unknown as string[]}
          />
          <ZoomControl position="bottomright" />
          <ScaleControl position="bottomleft" imperial={false} />

          {showRoutes &&
            filtered.map((z) => (
              <Polyline
                key={`route-${z.slug}`}
                positions={[BASE, z.coords]}
                pathOptions={{
                  color: "#2563eb",
                  weight: active === z.slug ? 2.6 : 1.2,
                  opacity: active === z.slug ? 0.9 : 0.32,
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
              >
                <Tooltip direction="top" className="vm-tip">{`${ring.minutes} — rază ${ring.km} km`}</Tooltip>
              </Circle>
            ))}

          <Marker position={BASE} icon={baseIcon} zIndexOffset={1000}>
            {showLabels && (
              <Tooltip permanent direction="top" offset={[0, -14]} className="vm-tip vm-tip-strong">
                Baza noastră · Constanța
              </Tooltip>
            )}
            <Popup className="vm-popup">
              <span className="block text-[13px] font-extrabold">Bază operațională</span>
              <span className="mt-1 block text-[12px] opacity-70">Șos. Mangaliei 126 B, Constanța</span>
            </Popup>
          </Marker>

          {filtered.map((z) => (
            <CircleMarker
              key={z.slug}
              center={z.coords}
              radius={active === z.slug ? 10 : 7}
              eventHandlers={{
                click: () => setActive(z.slug),
              }}
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
                <span className="mt-1 block text-[11px] opacity-60">{z.roads.slice(0, 3).join(" · ")}</span>
                <span className="mt-2 flex gap-2">
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
              <Marker position={user} icon={userIcon} zIndexOffset={900}>
                <Tooltip direction="top" className="vm-tip vm-tip-strong">
                  Locația ta
                </Tooltip>
              </Marker>
              <Polyline
                positions={[BASE, user]}
                pathOptions={{ color: "#16a34a", weight: 2.4, opacity: 0.85, dashArray: "2 7" }}
              />
            </>
          )}

          {pick && (
            <>
              <Marker position={pick} icon={pickIcon} zIndexOffset={900}>
                <Popup className="vm-popup">
                  <span className="block text-[13px] font-extrabold">Punct selectat</span>
                  <span className="mt-1 block text-[12px] opacity-70">
                    {distanceKm(BASE, pick).toFixed(1)} km · {etaFor(distanceKm(BASE, pick))}
                  </span>
                  <a
                    href={waLink(
                      `Bună ziua! Am nevoie de vulcanizare mobilă la locația: https://maps.google.com/?q=${pick[0].toFixed(5)},${pick[1].toFixed(5)}`,
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block text-[12px] font-bold text-green-600"
                  >
                    Trimite locația pe WhatsApp →
                  </a>
                </Popup>
              </Marker>
              <Polyline
                positions={[BASE, pick]}
                pathOptions={{ color: "#f59e0b", weight: 2.4, opacity: 0.9, dashArray: "2 7" }}
              />
            </>
          )}
        </MapContainer>

        {/* ==== BARA DE SUS: căutare + acțiuni ==== */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[600] flex flex-wrap items-start gap-2 p-3">
          <div className="pointer-events-auto flex min-w-[150px] flex-1 items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-2 text-white backdrop-blur">
            <Search className="size-3.5 shrink-0 opacity-70" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Caută localitate sau drum…"
              className="w-full bg-transparent text-xs font-medium outline-none placeholder:text-white/50"
            />
            {query && (
              <button onClick={() => setQuery("")} aria-label="Șterge căutarea">
                <X className="size-3.5 opacity-70 hover:opacity-100" />
              </button>
            )}
          </div>

          <div className="pointer-events-auto flex flex-wrap items-center justify-end gap-1.5">
            <button
              onClick={locate}
              className="vm-ctrl"
              title="Localizează-mă"
              aria-label="Localizează-mă"
            >
              <Locate className={`size-3.5 ${locating ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={() => setPicking((p) => !p)}
              className={`vm-ctrl ${picking ? "vm-ctrl-on" : ""}`}
              title="Alege punct pe hartă"
              aria-label="Alege punct pe hartă"
            >
              <Crosshair className="size-3.5" />
            </button>
            <button onClick={fitAll} className="vm-ctrl" title="Vezi toată acoperirea" aria-label="Vezi toată acoperirea">
              <Target className="size-3.5" />
            </button>
            <div className="relative">
              <button
                onClick={() => setLayersOpen((o) => !o)}
                className={`vm-ctrl ${layersOpen ? "vm-ctrl-on" : ""}`}
                title="Straturi"
                aria-label="Straturi"
              >
                <Layers className="size-3.5" />
              </button>
              {layersOpen && (
                <div className="absolute right-0 top-10 w-48 rounded-2xl border border-white/15 bg-black/80 p-2 text-white backdrop-blur">
                  <p className="px-2 pb-1 text-[10px] uppercase tracking-wide opacity-60">Hartă</p>
                  {(Object.keys(TILE_LAYERS) as TileKey[]).map((k) => (
                    <button
                      key={k}
                      onClick={() => setTiles(k)}
                      className={`flex w-full items-center justify-between rounded-xl px-2 py-1.5 text-xs font-semibold hover:bg-white/10 ${
                        tiles === k ? "bg-white/15" : ""
                      }`}
                    >
                      {TILE_LAYERS[k].label}
                      {tiles === k && <span className="size-1.5 rounded-full bg-white" />}
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
                      className="flex w-full items-center justify-between rounded-xl px-2 py-1.5 text-xs font-semibold hover:bg-white/10"
                    >
                      {o.label}
                      <span
                        className={`h-3.5 w-6 rounded-full transition-colors ${o.v ? "bg-brand" : "bg-white/25"}`}
                      >
                        <span
                          className={`block size-3 translate-y-[1px] rounded-full bg-white transition-transform ${
                            o.v ? "translate-x-[11px]" : "translate-x-[2px]"
                          }`}
                        />
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={toggleFullscreen}
              className="vm-ctrl"
              title={fullscreen ? "Ieși din ecran complet" : "Ecran complet"}
              aria-label="Ecran complet"
            >
              {fullscreen ? <Minimize2 className="size-3.5" /> : <Maximize2 className="size-3.5" />}
            </button>
          </div>
        </div>

        {/* ==== HINT MOD SELECTARE ==== */}
        {picking && (
          <div className="pointer-events-none absolute left-1/2 top-16 z-[600] -translate-x-1/2 rounded-full border border-white/15 bg-black/70 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur">
            <MousePointerClick className="mr-1 inline size-3.5" /> Dă click pe hartă pentru a marca locația
          </div>
        )}
        {geoError && (
          <div className="absolute left-1/2 top-16 z-[600] -translate-x-1/2 rounded-full border border-red-400/30 bg-red-500/85 px-3 py-1.5 text-[11px] font-semibold text-white">
            {geoError}
          </div>
        )}

        {/* ==== PANOU DISTANȚĂ / ETA ==== */}
        {measuredKm !== null && (
          <div className="absolute left-3 top-16 z-[600] w-[210px] rounded-2xl border border-white/15 bg-black/70 p-3 text-white backdrop-blur">
            <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide opacity-70">
              <Ruler className="size-3.5" /> Estimare intervenție
            </p>
            <p className="mt-1.5 text-2xl font-extrabold leading-none">{measuredKm.toFixed(1)} km</p>
            <p className="mt-1 text-xs opacity-80">Sosire ≈ {etaFor(measuredKm)}</p>
            <p className="mt-1 text-[11px] opacity-60">
              {measuredKm <= 50 ? "În zona de acoperire ✓" : "În afara razei standard — te sunăm cu ofertă"}
            </p>
            <div className="mt-2 flex gap-2">
              <a
                href={`tel:${TEL}`}
                className="flex-1 rounded-full bg-brand px-2 py-1.5 text-center text-[11px] font-bold"
              >
                Sună acum
              </a>
              <button
                onClick={() => {
                  setPick(null);
                  setUser(null);
                }}
                className="rounded-full border border-white/20 px-2 py-1.5 text-[11px] font-semibold"
              >
                Reset
              </button>
            </div>
          </div>
        )}

        {/* ==== CTA TELEFON ==== */}
        <a
          href={`tel:${TEL}`}
          className="absolute bottom-14 left-3 z-[600] inline-flex items-center gap-1.5 rounded-full bg-brand px-3.5 py-2 text-xs font-bold text-white shadow-lg transition-transform hover:scale-105"
        >
          <Phone className="size-3.5" /> Cere intervenție
        </a>

        {/* ==== LEGENDĂ + ZOOM ==== */}
        <div className="pointer-events-none absolute bottom-3 left-1/2 z-[600] flex -translate-x-1/2 flex-wrap justify-center gap-1.5">
          {mapRings.map((r, i) => (
            <span
              key={r.km}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur"
            >
              <span
                className="size-2 rounded-full bg-brand"
                style={{ opacity: 1 - i * 0.28 }}
              />
              {r.minutes} · {r.km} km
            </span>
          ))}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
            <RouteIcon className="size-3" /> zoom {zoom}
          </span>
        </div>

        {/* ==== LISTĂ ZONE FILTRATE ==== */}
        <div className="absolute right-3 top-16 z-[600] hidden w-[184px] overflow-hidden rounded-2xl border border-white/15 bg-black/65 text-white backdrop-blur sm:block">
          <p className="border-b border-white/10 px-3 py-2 text-[10px] uppercase tracking-wide opacity-60">
            {filtered.length} zone
          </p>
          <ul className="max-h-[220px] overflow-y-auto p-1.5">
            {filtered.map((z) => (
              <li key={z.slug}>
                <button
                  onClick={() => {
                    setActive(z.slug);
                    flyTo(z.coords, 12);
                  }}
                  className={`flex w-full items-center justify-between gap-2 rounded-xl px-2 py-1.5 text-left text-[11px] font-semibold hover:bg-white/10 ${
                    active === z.slug ? "bg-white/15" : ""
                  }`}
                >
                  <span className="truncate">{z.name}</span>
                  <span className="shrink-0 opacity-60">{distanceKm(BASE, z.coords).toFixed(0)} km</span>
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-2 py-2 text-[11px] opacity-70">Nicio potrivire. Sună-ne oricum.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

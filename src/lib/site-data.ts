export const PHONE = "0734 573 430";
export const TEL = "+40734573430";
export const WA_NUMBER = "40734573430";
export const WA =
  "https://wa.me/40734573430?text=Bun%C4%83%20ziua!%20Am%20nevoie%20de%20vulcanizare%20mobil%C4%83%20%C3%AEn%20Constan%C8%9Ba.";
export const REVIEWS = "https://maps.app.goo.gl/TWmDYyph7UUA6BAx6";
export const MAPS =
  "https://www.google.com/maps/search/?api=1&query=%C8%98oseaua%20Mangaliei%20126%20B%2C%20Constan%C8%9Ba";

export const BASE: [number, number] = [44.1598, 28.6348];

export type Service = {
  slug: string;
  icon:
    | "lifebuoy"
    | "wrench"
    | "circle"
    | "gauge"
    | "truck"
    | "navigation";
  title: string;
  desc: string;
  intro: string;
  price: string;
  priceFrom: string;
  priceNote?: string;
  pricing?: { label: string; value: string; note?: string }[];
  duration: string;
  bullets: string[];
  steps: string[];
};

export type FAQ = {
  q: string;
  a: string;
  category: "prețuri" | "disponibilitate" | "timp-sosire" | "servicii" | "plată" | "siguranță";
};

export const services: Service[] = [
  {
    slug: "asistenta-rutiera",
    icon: "lifebuoy",
    title: "Asistență rutieră 24/7",
    desc: "Intervenim non-stop pe A2, A4, DN39 și în tot orașul, indiferent de oră.",
    intro:
      "Rămâi cu pana pe autostradă sau pe drum național? Venim la tine cu duba de intervenție, complet echipată, la orice oră din zi sau din noapte. Nu ai nevoie de platformă și nu trebuie să îți muți mașina.",
    price: "de la 120 lei",
    priceFrom: "120 lei",
    priceNote: "deplasare inclusă în oraș",
    pricing: [
      { label: "În Constanța", value: "120 lei", note: "deplasare inclusă" },
      { label: "A2 / A4 / DN39", value: "150 lei", note: "autostradă & drum național" },
      { label: "Camioane & utilitare", value: "personalizat", note: "contracte flote" },
    ],
    duration: "20–40 minute pe loc",
    bullets: [
      "Intervenții pe A2, A4, DN39, DN3 și centura Constanța",
      "Sculărie profesională și compresor la bord",
      "Anvelope de schimb pentru cele mai comune dimensiuni",
      "Semnalizare corectă a zonei de lucru, în siguranță",
    ],
    steps: [
      "Ne suni sau trimiți locația pe WhatsApp",
      "Confirmăm timpul de sosire și prețul estimat",
      "Ajungem la tine și reparăm pe loc",
      "Plătești cu cardul, transfer sau numerar",
    ],
  },
  {
    slug: "reparatii-pe-loc",
    icon: "wrench",
    title: "Reparație pană pe loc",
    desc: "Pene, tăieturi sau valve defecte — reparate la fața locului, fără platformă.",
    intro:
      "Reparăm pana direct acolo unde ești: plombă internă, ciuperci de vulcanizare, schimb de valvă sau resigilare jantă. Anvelopa rămâne sigură pentru rulaj normal, cu garanție pentru lucrare.",
    price: "de la 80 lei",
    priceFrom: "80 lei",
    priceNote: "reparație simplă pe loc",
    duration: "15–30 minute",
    bullets: [
      "Plombă internă la cald sau ciupercă (reparație permanentă)",
      "Reparație tăieturi laterale ușoare, unde e sigur",
      "Schimb valve și senzori de presiune",
      "Verificare presiune la toate roțile, gratuit",
    ],
    steps: [
      "Diagnosticăm anvelopa la fața locului",
      "Îți spunem dacă reparația e sigură sau e nevoie de anvelopă nouă",
      "Reparăm, umflăm și verificăm etanșeitatea",
      "Primești garanție pentru lucrare",
    ],
  },
  {
    slug: "montaj-domiciliu",
    icon: "circle",
    title: "Schimb anvelope la domiciliu",
    desc: "Montaj vară/iarnă direct acasă sau la birou, fără timpi de așteptare.",
    intro:
      "Venim cu utilajul mobil de montat și echilibrat direct în curtea ta sau în parcarea de la birou. Schimbăm setul sezonier în aproximativ o oră, fără să pierzi timpul la coadă în service.",
    price: "de la 150 lei / set de 4",
    priceFrom: "150 lei",
    priceNote: "set de 4 anvelope",
    duration: "45–75 minute pentru un set complet",
    bullets: [
      "Montaj și demontaj pe jantă, cu mașină mobilă",
      "Echilibrare electronică inclusă la cerere",
      "Cuplu de strângere corect, cu cheie dinamometrică",
      "Preluăm anvelopele vechi la cerere",
    ],
    steps: [
      "Stabilim ziua și ora prin telefon sau WhatsApp",
      "Venim la adresa ta cu tot echipamentul",
      "Montăm, echilibrăm și verificăm presiunile",
      "Îți lăsăm factură sau bon, la alegere",
    ],
  },
  {
    slug: "echilibrare-roti",
    icon: "gauge",
    title: "Echilibrare roți",
    desc: "Echilibrare electronică precisă pentru rulare lină și uzură uniformă.",
    intro:
      "Vibrațiile în volan la 90–120 km/h vin aproape mereu de la roți neechilibrate. Facem echilibrare electronică cu aparatură mobilă, direct la tine, cu contragreutăți adezive sau cu clemă.",
    price: "de la 40 lei / roată",
    priceFrom: "40 lei",
    priceNote: "per roată",
    duration: "10 minute pe roată",
    bullets: [
      "Echilibrare pentru jante de aluminiu și de oțel",
      "Contragreutăți invizibile pentru jante de aluminiu",
      "Verificare deformări de jantă și uzură neuniformă",
      "Recomandări de rotire a anvelopelor",
    ],
    steps: [
      "Verificăm vibrațiile și starea roților",
      "Echilibrăm fiecare roată pe aparat",
      "Remontăm la cuplul corect",
      "Test scurt de rulare, dacă e nevoie",
    ],
  },
  {
    slug: "vulcanizare-camioane",
    icon: "truck",
    title: "Vulcanizare camioane",
    desc: "Intervenții pentru TIR-uri și autoutilitare, contracte pentru flote.",
    intro:
      "Avem echipament special pentru camioane, autotrenuri și autoutilitare: pistoale de impact de mare cuplu, cricuri de tonaj și anvelope de intervenție. Lucrăm cu transportatori și flote pe bază de contract.",
    price: "ofertă personalizată",
    priceFrom: "ofertă",
    priceNote: "contracte flote",
    duration: "30–60 minute pe roată",
    bullets: [
      "Intervenții pe A2, A4 și în zona Portului Constanța",
      "Reparații și schimb pentru roți de camion și remorcă",
      "Contracte și facturare lunară pentru flote",
      "Prioritate la dispecerat pentru clienții pe contract",
    ],
    steps: [
      "Dispecerul tău ne trimite locația și dimensiunea",
      "Confirmăm disponibilitatea anvelopei",
      "Intervenim pe loc, cu semnalizare de siguranță",
      "Primești documentele pentru flotă",
    ],
  },
  {
    slug: "transport-auto",
    icon: "navigation",
    title: "Transport auto",
    desc: "Tractare și transport pentru autoturisme în Constanța și împrejurimi.",
    intro:
      "Când anvelopa nu mai poate fi reparată sau mașina nu poate rula, organizăm tractarea către service-ul sau adresa dorită, în Constanța și în județ.",
    price: "de la 200 lei",
    priceFrom: "200 lei",
    priceNote: "în funcție de distanță",
    duration: "în funcție de distanță",
    bullets: [
      "Tractare autoturisme și utilitare ușoare",
      "Transport către service, acasă sau la ITP",
      "Intervenții pe autostradă și pe drumuri naționale",
      "Preț comunicat clar înainte de plecare",
    ],
    steps: [
      "Ne spui locația și destinația",
      "Primești prețul final, fără surprize",
      "Preluăm mașina în siguranță",
      "Livrăm la adresa stabilită",
    ],
  },
];

export type Zone = {
  slug: string;
  name: string;
  short: string;
  eta: string;
  etaMinutes: string;
  coords: [number, number];
  desc: string;
  intro: string;
  roads: string[];
  localities: string[];
};

export const zones: Zone[] = [
  {
    slug: "constanta",
    name: "Constanța",
    short: "Constanța oraș",
    eta: "Sosire ~10–20 min",
    etaMinutes: "10–20 min",
    coords: [44.1733, 28.6383],
    desc: "Tot orașul, inclusiv Tomis Nord, Faleză, Km 4-5 și zona port.",
    intro:
      "Baza noastră este pe Șoseaua Mangaliei 126 B, așa că acoperim tot orașul rapid: Tomis Nord, Tomis III, Faleză Nord, Km 4-5, Coiciu, Palas, Inel II și zona Portului.",
    roads: ["Bd. Mamaia", "Bd. Aurel Vlaicu", "Șos. Mangaliei", "Bd. 1 Mai", "Centura Constanța"],
    localities: ["Tomis Nord", "Faleză Nord", "Km 4-5", "Coiciu", "Palas", "Zona Port"],
  },
  {
    slug: "mamaia-navodari",
    name: "Mamaia & Năvodari",
    short: "Mamaia / Năvodari",
    eta: "Sosire ~15–30 min",
    etaMinutes: "15–30 min",
    coords: [44.2745, 28.6197],
    desc: "Intervenții rapide pe litoral, inclusiv în sezon estival.",
    intro:
      "Vara traficul pe litoral e greu, dar cunoaștem rutele ocolitoare. Intervenim în Mamaia, Mamaia Nord, Năvodari și Corbu, la hotel, în parcare sau pe drum.",
    roads: ["DN24", "Bd. Mamaia", "DJ226", "Pasaj Butelii"],
    localities: ["Mamaia", "Mamaia Nord", "Năvodari", "Corbu", "Lumina"],
  },
  {
    slug: "agigea-a4",
    name: "Agigea & Autostrada A4",
    short: "A2 / A4 — nod Agigea",
    eta: "Sosire ~15–35 min",
    etaMinutes: "15–35 min",
    coords: [44.0913, 28.6395],
    desc: "Pene pe autostradă și pe centura Constanța, non-stop.",
    intro:
      "Pe autostradă intervenim cu semnalizare completă, în siguranță. Acoperim nodul Agigea, tronsonul A4 și intrarea pe A2 spre București, inclusiv zona Podului Agigea.",
    roads: ["A4", "A2", "DN39", "Pod Agigea"],
    localities: ["Agigea", "Nod A4", "Lazu", "Cumpăna"],
  },
  {
    slug: "ovidiu-lumina",
    name: "Ovidiu & Lumina",
    short: "Ovidiu / Lumina",
    eta: "Sosire ~20–35 min",
    etaMinutes: "20–35 min",
    coords: [44.2694, 28.5589],
    desc: "Montaj la domiciliu și reparații pe loc în zona limitrofă.",
    intro:
      "Zona Ovidiu, Lumina, Poiana și Mihail Kogălniceanu este acoperită zilnic, inclusiv pentru montaj sezonier programat la domiciliu.",
    roads: ["DN2A", "A4", "DJ226"],
    localities: ["Ovidiu", "Lumina", "Poiana", "Mihail Kogălniceanu"],
  },
  {
    slug: "eforie-techirghiol",
    name: "Eforie & Techirghiol",
    short: "Eforie / Techirghiol",
    eta: "Sosire ~25–45 min",
    etaMinutes: "25–45 min",
    coords: [44.0499, 28.6353],
    desc: "Deplasare pe DN39 pentru autoturisme și utilitare.",
    intro:
      "Coborâm pe DN39 spre Eforie Nord, Eforie Sud, Techirghiol și Costinești pentru reparații pe loc și montaj la domiciliu.",
    roads: ["DN39", "DJ391", "A4"],
    localities: ["Eforie Nord", "Eforie Sud", "Techirghiol", "Costinești", "Tuzla"],
  },
  {
    slug: "mangalia-sud",
    name: "Mangalia & sudul litoralului",
    short: "Mangalia & sud",
    eta: "Sosire ~35–55 min",
    etaMinutes: "35–55 min",
    coords: [43.8167, 28.5833],
    desc: "Deservim și sudul litoralului, la cerere, cu programare.",
    intro:
      "Pentru Mangalia, Olimp, Neptun, Jupiter, Venus și 2 Mai venim la cerere, de regulă cu o scurtă confirmare telefonică pentru dimensiunea anvelopei.",
    roads: ["DN39", "DJ391"],
    localities: ["Mangalia", "Olimp", "Neptun", "Venus", "2 Mai", "Vama Veche"],
  },
];

export const mapRings = [
  { minutes: "15 min", km: 15, radius: 15000 },
  { minutes: "30 min", km: 30, radius: 30000 },
  { minutes: "45 min", km: 50, radius: 50000 },
];

export function waLink(text: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const EMAIL = "contact@vulcanizaremobilaconstanta.ro";
export const ADDRESS = "Șos. Mangaliei 126 B, Constanța";

export const stats = [
  { value: "15 min", label: "Timp mediu de răspuns în oraș" },
  { value: "2.000+", label: "Clienți ajutați cu pene și anvelope" },
  { value: "365 zile", label: "Intervenții fără programare" },
  { value: "100%", label: "Prețuri clare, fără costuri ascunse" },
];

export const reviews = [
  {
    initials: "LS",
    name: "Laur Solomon",
    when: "Constanța",
    text: "Cel mai bun pe cuvânt și punctual, lucrează cel mai bine și cel mai rapid oriunde ai fi.",
  },
  {
    initials: "CI",
    name: "Ciprian",
    when: "Constanța",
    text: "A fost la fața locului în 15 minute. Politicos și corect, prețul foarte rezonabil. Pneul a fost reparat în 10 minute.",
  },
  {
    initials: "AM",
    name: "Andrei M.",
    when: "acum 3 săptămâni",
    text: "Pană pe A4 la 23:00. Au ajuns rapid, montaj profesionist, preț corect. Salvatori!",
  },
  {
    initials: "EP",
    name: "Elena P.",
    when: "acum o lună",
    text: "Mi-au schimbat setul de iarnă direct în curte. Punctuali, curați, recomand cu încredere.",
  },
];

export const faqs = [
  {
    q: "Cât costă o intervenție de vulcanizare mobilă în Constanța?",
    a: "Prețul pornește de la 80 lei pentru o reparație simplă pe loc (pană cu cui) și ajunge la 150–250 lei pentru schimb roată + echilibrare la domiciliu. Pe A2/A4 tariful include și deplasarea. Sunați pentru o estimare exactă în 30 de secunde.",
    category: "prețuri",
  },
  {
    q: "Veniți și noaptea sau în weekend?",
    a: "Da, suntem disponibili 24/7, inclusiv noaptea, sâmbăta, duminica și de sărbători. Dacă rămâneți cu pana la 3 dimineața, sunați și venim.",
    category: "disponibilitate",
  },
  {
    q: "Cât durează până ajungeți la mine?",
    a: "În Constanța oraș ajungem în 10–20 de minute. În Mamaia, Năvodari sau Agigea în 15–35 de minute. În Eforie, Techirghiol sau Ovidiu în 25–45 de minute, în funcție de trafic.",
    category: "timp-sosire",
  },
  {
    q: "Ce servicii faceți la fața locului?",
    a: "Reparație pană (plombă internă, ciuperci), schimb roată cu cea de rezervă, montaj anvelope noi, echilibrare roți cu aparatură mobilă, verificare presiune și schimb valve. Pentru cazuri severe oferim și transport auto.",
    category: "servicii",
  },
  {
    q: "Pot plăti cu cardul?",
    a: "Da, acceptăm plata cu cardul (POS mobil), transfer bancar și numerar. Emitem factură pentru companii.",
    category: "plată",
  },
  {
    q: "Lucrați și cu camioane sau TIR?",
    a: "Da, avem echipament special pentru vulcanizare camioane și autotrenuri. Intervenim pe A2, A4 și în zona portului pentru flote și transportatori.",
    category: "servicii",
  },
  {
    q: "Este sigur să reparați pană pe autostradă?",
    a: "Intervenim doar după semnalizarea corectă a zonei de lucru, cu triunghiuri, veste reflectorizante și lumină de avertizare. Siguranța ta și a echipei noastre e prioritatea zero.",
    category: "siguranță",
  },
  {
    q: "Dacă anvelopa nu poate fi reparată, ce fac?",
    a: "Îți spunem de la început dacă reparația e sigură sau dacă e nevoie de anvelopă nouă. Oferim și transport auto către service-ul dorit, cu preț comunicat înainte de plecare.",
    category: "servicii",
  },
];

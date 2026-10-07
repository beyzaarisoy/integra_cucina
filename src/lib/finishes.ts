export type FinishFamily = "wood" | "lacquer" | "stone" | "metal";

export type Finish = {
  id: string;
  name: string;
  code: string;
  family: FinishFamily;
  color: string;
  note: string;
};

export const finishes: Finish[] = [
  // Woods
  { id: "natural-oak", name: "Natural Oak", code: "W01", family: "wood", color: "#c39d73", note: "Brushed European oak, matte oil" },
  { id: "bleached-ash", name: "Bleached Ash", code: "W02", family: "wood", color: "#d4c8b3", note: "Pale Nordic ash, whitewashed grain" },
  { id: "honey-teak", name: "Honey Teak", code: "W03", family: "wood", color: "#a57240", note: "Warm teak, satin hand-rubbed" },
  { id: "smoked-oak", name: "Smoked Oak", code: "W04", family: "wood", color: "#70543c", note: "Fumed oak with deep amber tones" },
  { id: "canaletto-walnut", name: "Canaletto Walnut", code: "W05", family: "wood", color: "#603f2a", note: "Italian walnut, book-matched veneer" },
  { id: "ebony-oak", name: "Ebony Oak", code: "W06", family: "wood", color: "#2f2925", note: "Stained oak, open-pore texture" },
  // Lacquers
  { id: "alabaster", name: "Alabastro", code: "L01", family: "lacquer", color: "#eee8df", note: "Soft-touch ivory lacquer" },
  { id: "cashmere", name: "Cashmere", code: "L02", family: "lacquer", color: "#d7cbb8", note: "Warm greige, anti-fingerprint" },
  { id: "sage", name: "Salvia", code: "L03", family: "lacquer", color: "#9aa28b", note: "Muted sage, velvet matte" },
  { id: "olive-grove", name: "Oliva", code: "L04", family: "lacquer", color: "#6b694a", note: "Deep olive, satin sheen" },
  { id: "terracotta", name: "Terracotta", code: "L05", family: "lacquer", color: "#a86449", note: "Sun-baked clay, matte" },
  { id: "bordeaux", name: "Bordeaux", code: "L06", family: "lacquer", color: "#5c292d", note: "Oxblood lacquer, high gloss option" },
  { id: "midnight", name: "Notte", code: "L07", family: "lacquer", color: "#26303d", note: "Midnight navy, velvet matte" },
  { id: "graphite", name: "Grafite", code: "L08", family: "lacquer", color: "#3b3b39", note: "Graphite grey, soft-touch" },
  // Stones
  { id: "travertino", name: "Travertino Classico", code: "S01", family: "stone", color: "#d2c1a8", note: "Honed Roman travertine" },
  { id: "calacatta-oro", name: "Calacatta Oro", code: "S02", family: "stone", color: "#f0ebe4", note: "Carrara marble with gold veining" },
  { id: "arabescato", name: "Arabescato", code: "S03", family: "stone", color: "#dededc", note: "Bold grey veins, polished" },
  { id: "taj-mahal", name: "Taj Mahal", code: "S04", family: "stone", color: "#e7ddcb", note: "Quartzite, leathered finish" },
  { id: "pietra-grey", name: "Pietra Grey", code: "S05", family: "stone", color: "#62605c", note: "Persian limestone, honed" },
  { id: "nero-marquina", name: "Nero Marquina", code: "S06", family: "stone", color: "#232222", note: "Spanish black marble" },
  { id: "verde-alpi", name: "Verde Alpi", code: "S07", family: "stone", color: "#273d34", note: "Alpine green serpentine" },
  { id: "terrazzo", name: "Terrazzo Veneziano", code: "S08", family: "stone", color: "#d9d1c4", note: "Venetian terrazzo, marble chips" },
  { id: "concrete", name: "Cemento", code: "S09", family: "stone", color: "#95918c", note: "Micro-cement, sealed matte" },
  // Metals
  { id: "brushed-brass", name: "Ottone Spazzolato", code: "M01", family: "metal", color: "#ae8d55", note: "Brushed solid brass, living finish" },
  { id: "bronze", name: "Bronzo", code: "M02", family: "metal", color: "#684a31", note: "Burnished bronze" },
  { id: "satin-steel", name: "Acciaio Satinato", code: "M03", family: "metal", color: "#a0a0a0", note: "Satin stainless steel" },
  { id: "black-titanium", name: "Titanio Nero", code: "M04", family: "metal", color: "#292929", note: "PVD black titanium" },
];

export const familyLabels: Record<FinishFamily, string> = {
  wood: "Woods",
  lacquer: "Lacquers",
  stone: "Stone & Surfaces",
  metal: "Metals",
};

export const finishById = (id: string) => finishes.find((f) => f.id === id)!;
export const texture = (id: string) => `/textures/${id}.webp`;

/** Finishes that have a rendered layer in the configurator photograph. */
export const configurator = {
  cabinets: ["natural-oak", "bleached-ash", "smoked-oak", "canaletto-walnut", "ebony-oak", "alabaster", "cashmere", "sage", "midnight", "graphite"],
  counters: ["travertino", "calacatta-oro", "taj-mahal", "arabescato", "pietra-grey", "nero-marquina"],
  /** The base photograph already shows these. */
  baseCabinet: "natural-oak",
  baseCounter: "travertino",
};

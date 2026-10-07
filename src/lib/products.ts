import { media, localKitchens } from "./media";
import type { Media } from "./media";

export type Category = "kitchens" | "fronts" | "surfaces" | "islands" | "storage" | "hardware";

export const categories: { id: Category; label: string; blurb: string }[] = [
  { id: "kitchens", label: "Kitchen Collections", blurb: "Complete architectural kitchens, designed as one." },
  { id: "fronts", label: "Cabinet Fronts", blurb: "Door profiles crafted in wood, lacquer and glass." },
  { id: "surfaces", label: "Countertops", blurb: "Natural stone and composite surfaces, cut to order." },
  { id: "islands", label: "Islands", blurb: "The sculptural heart of every Integra kitchen." },
  { id: "storage", label: "Tall & Pantry", blurb: "Pocket-door pantries and appliance towers." },
  { id: "hardware", label: "Hardware", blurb: "Solid metal pulls and knobs, machined in Italy." },
];

export type Visual =
  | { kind: "photo"; media: Media; byFinish?: Record<string, string> }
  | { kind: "door"; style: DoorStyle }
  | { kind: "slab"; edge: "mitred" | "thin" | "waterfall" }
  | { kind: "hardware"; shape: "edge" | "bar" | "knob" | "loop" };

export type DoorStyle = "slab" | "handleless" | "fluted" | "shaker" | "framed" | "reeded" | "tambour";

export type Product = {
  slug: string;
  name: string;
  category: Category;
  tagline: string;
  description: string;
  finishes: string[];
  visual: Visual;
  leadTime: string;
  bestseller?: boolean;
  isNew?: boolean;
};

const woods = ["natural-oak", "bleached-ash", "honey-teak", "smoked-oak", "canaletto-walnut", "ebony-oak"];
const lacquers = ["alabaster", "cashmere", "sage", "olive-grove", "terracotta", "bordeaux", "midnight", "graphite"];
const stones = ["travertino", "calacatta-oro", "arabescato", "taj-mahal", "pietra-grey", "nero-marquina", "verde-alpi", "terrazzo", "concrete"];
const metals = ["brushed-brass", "bronze", "satin-steel", "black-titanium"];

const variant = (id: string) => `/images/kitchen-${id}.jpg`;
const island = (id: string) => `/images/island-${id}.jpg`;
const pantry = (id: string) => `/images/pantry-${id}.jpg`;

export const products: Product[] = [
  // Kitchen collections
  {
    slug: "aria", name: "Aria", category: "kitchens", bestseller: true,
    tagline: "Warm minimalism in natural oak",
    description: "Floor-to-ceiling oak cabinetry, a pocket-door pantry and a travertine waterfall island. Aria is our most requested kitchen in the United States.",
    finishes: ["natural-oak", "canaletto-walnut", "midnight", "graphite", "sage", "ebony-oak"],
    visual: { kind: "photo", media: media.collections.aria, byFinish: {
      "natural-oak": localKitchens.oak, "canaletto-walnut": localKitchens.walnut, midnight: localKitchens.midnight,
      graphite: localKitchens.graphite, sage: localKitchens.sage, "ebony-oak": localKitchens.ebony } },
    leadTime: "10–12 weeks",
  },
  {
    slug: "linea", name: "Linea", category: "kitchens", bestseller: true,
    tagline: "Handleless lacquer, perfectly quiet",
    description: "A continuous integrated groove replaces every handle. Soft-touch lacquers in eight shades, with stone or steel worktops.",
    finishes: lacquers, visual: { kind: "photo", media: media.collections.linea }, leadTime: "8–10 weeks",
  },
  {
    slug: "pietra", name: "Pietra", category: "kitchens",
    tagline: "Architecture carved in stone",
    description: "Monolithic islands in book-matched marble paired with recessed, shadow-gap cabinetry.",
    finishes: stones, visual: { kind: "photo", media: media.collections.pietra }, leadTime: "12–14 weeks",
  },
  {
    slug: "notte", name: "Notte", category: "kitchens", isNew: true,
    tagline: "After-dark drama in walnut and marble",
    description: "Canaletto walnut and Nero Marquina, lit from within. A kitchen made for long dinners.",
    finishes: ["canaletto-walnut", "ebony-oak", "graphite", "midnight"],
    visual: { kind: "photo", media: media.collections.notte }, leadTime: "10–12 weeks",
  },
  {
    slug: "villa", name: "Villa", category: "kitchens",
    tagline: "Modern shaker, Italian proportions",
    description: "A softened shaker profile in matte lacquers for homes that love a classic line.",
    finishes: lacquers, visual: { kind: "photo", media: media.collections.villa }, leadTime: "8–10 weeks",
  },
  // Fronts
  {
    slug: "aria-fluted-front", name: "Aria Fluted", category: "fronts", bestseller: true,
    tagline: "Vertical 18 mm flutes, solid timber", description: "Precision-milled flutes that catch the light through the day.",
    finishes: [...woods, ...lacquers], visual: { kind: "door", style: "fluted" }, leadTime: "6–8 weeks",
  },
  {
    slug: "linea-handleless-front", name: "Linea Handleless", category: "fronts", bestseller: true,
    tagline: "Slab front with integrated grip", description: "A 45° grip line machined into the top edge, invisible from across the room.",
    finishes: [...lacquers, ...woods], visual: { kind: "door", style: "handleless" }, leadTime: "6–8 weeks",
  },
  {
    slug: "cornice-shaker-front", name: "Cornice Shaker", category: "fronts",
    tagline: "A slender 35 mm frame", description: "Our reinterpretation of the shaker door, with a narrow frame and a recessed panel.",
    finishes: [...lacquers, ...woods], visual: { kind: "door", style: "shaker" }, leadTime: "6–8 weeks",
  },
  {
    slug: "telaio-framed-front", name: "Telaio Framed", category: "fronts", isNew: true,
    tagline: "Mitred frame, flush centre panel", description: "Four mitred rails frame a flush veneer panel with a fine shadow gap.",
    finishes: woods, visual: { kind: "door", style: "framed" }, leadTime: "8 weeks",
  },
  {
    slug: "vetro-reeded-front", name: "Vetro Reeded", category: "fronts",
    tagline: "Reeded glass in a metal frame", description: "Fluted glass softens what is behind it while letting cabinet lighting glow.",
    finishes: metals, visual: { kind: "door", style: "reeded" }, leadTime: "6 weeks",
  },
  {
    slug: "cannete-tambour-front", name: "Canneté Tambour", category: "fronts",
    tagline: "Fine half-round tambour", description: "Narrow half-round reeds laid on a flexible backing, perfect for curved ends.",
    finishes: [...woods, ...lacquers], visual: { kind: "door", style: "tambour" }, leadTime: "8–10 weeks",
  },
  {
    slug: "piano-slab-front", name: "Piano Slab", category: "fronts",
    tagline: "The essential flat front", description: "A pure 22 mm slab in any finish, pairing with every Integra pull.",
    finishes: [...lacquers, ...woods], visual: { kind: "door", style: "slab" }, leadTime: "4–6 weeks",
  },
  // Surfaces
  {
    slug: "monolith-mitred-top", name: "Monolith 6 cm", category: "surfaces", bestseller: true,
    tagline: "Mitred 60 mm stone countertop", description: "A seamless mitred edge gives slender slabs the presence of solid stone.",
    finishes: stones, visual: { kind: "slab", edge: "mitred" }, leadTime: "4–6 weeks",
  },
  {
    slug: "lama-thin-top", name: "Lama 12 mm", category: "surfaces",
    tagline: "Razor-thin profile", description: "A 12 mm top for minimalist kitchens, reinforced invisibly underneath.",
    finishes: stones, visual: { kind: "slab", edge: "thin" }, leadTime: "4–6 weeks",
  },
  {
    slug: "cascata-waterfall-top", name: "Cascata Waterfall", category: "surfaces", isNew: true,
    tagline: "Vein-matched waterfall ends", description: "The veining flows from the worktop down each side without interruption.",
    finishes: stones, visual: { kind: "slab", edge: "waterfall" }, leadTime: "6–8 weeks",
  },
  // Islands
  {
    slug: "isola-waterfall", name: "Isola Waterfall", category: "islands", bestseller: true,
    tagline: "Stone waterfall with timber base", description: "Integrated induction, downdraft extraction and a stone-carved sink.",
    finishes: ["natural-oak", "canaletto-walnut", "midnight", "graphite", "sage", "ebony-oak"],
    visual: { kind: "photo", media: { src: island("natural-oak-travertino"), alt: "Isola Waterfall island" }, byFinish: {
      "natural-oak": island("natural-oak-travertino"), "canaletto-walnut": island("canaletto-walnut-nero-marquina"),
      midnight: island("midnight-calacatta-oro"), graphite: island("graphite-taj-mahal"), sage: island("sage-arabescato"), "ebony-oak": island("ebony-oak-pietra-grey") } },
    leadTime: "10–12 weeks",
  },
  {
    slug: "isola-monolith", name: "Isola Monolith", category: "islands",
    tagline: "Solid-looking stone block", description: "Every face in mitred stone for an island that reads as a single carved volume.",
    finishes: stones, visual: { kind: "photo", media: { src: localKitchens.graphite, alt: "Isola Monolith" } }, leadTime: "12–14 weeks",
  },
  // Storage
  {
    slug: "dispensa-pantry", name: "Dispensa Pocket Pantry", category: "storage", bestseller: true,
    tagline: "Doors that disappear", description: "Pocket doors slide back into the carcass to reveal a lit, stone-lined pantry.",
    finishes: ["natural-oak", "canaletto-walnut", "midnight", "graphite", "sage", "ebony-oak"],
    visual: { kind: "photo", media: { src: pantry("natural-oak-travertino"), alt: "Dispensa pocket pantry" }, byFinish: {
      "natural-oak": pantry("natural-oak-travertino"), "canaletto-walnut": pantry("canaletto-walnut-nero-marquina"),
      midnight: pantry("midnight-calacatta-oro"), graphite: pantry("graphite-taj-mahal"), sage: pantry("sage-arabescato"), "ebony-oak": pantry("ebony-oak-pietra-grey") } },
    leadTime: "8–10 weeks",
  },
  {
    slug: "colonna-tower", name: "Colonna Appliance Tower", category: "storage",
    tagline: "Integrated ovens, flush to the millimetre", description: "Tall housings for ovens, coffee and steam, with ventilated shadow gaps.",
    finishes: [...woods, ...lacquers], visual: { kind: "door", style: "framed" }, leadTime: "8 weeks",
  },
  // Hardware
  {
    slug: "filo-edge-pull", name: "Filo Edge Pull", category: "hardware", bestseller: true,
    tagline: "A 4 mm line of solid metal", description: "Machined from solid brass and finished by hand.",
    finishes: metals, visual: { kind: "hardware", shape: "edge" }, leadTime: "2–3 weeks",
  },
  {
    slug: "barra-handle", name: "Barra Bar Handle", category: "hardware",
    tagline: "Knurled round bar", description: "A tactile knurled grip in four lengths.",
    finishes: metals, visual: { kind: "hardware", shape: "bar" }, leadTime: "2–3 weeks",
  },
  {
    slug: "nodo-knob", name: "Nodo Knob", category: "hardware",
    tagline: "Turned solid knob", description: "A weighty turned knob with a softened domed face.",
    finishes: metals, visual: { kind: "hardware", shape: "knob" }, leadTime: "2–3 weeks",
  },
  {
    slug: "arco-loop", name: "Arco Loop Pull", category: "hardware", isNew: true,
    tagline: "A soft arch in bronze", description: "An arched pull cast in bronze, shaped to the hand.",
    finishes: metals, visual: { kind: "hardware", shape: "loop" }, leadTime: "3–4 weeks",
  },
];

export const bestsellers = products.filter((p) => p.bestseller);

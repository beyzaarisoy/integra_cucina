/**
 * Central image registry.
 *
 * Every photograph on the site is referenced from here, so swapping in the
 * brand's own photography is a one-file change. Remote images load directly
 * in the browser; if one ever fails, <Photo> falls back to the local file
 * given as `fallback`, so the layout never shows a broken image.
 */
export type Media = { src: string; fallback?: string; alt: string };

const u = (id: string, w = 2000) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const local = {
  oak: "/images/kitchen-natural-oak-travertino.jpg",
  midnight: "/images/kitchen-midnight-calacatta-oro.jpg",
  walnut: "/images/kitchen-canaletto-walnut-nero-marquina.jpg",
  graphite: "/images/kitchen-graphite-taj-mahal.jpg",
  sage: "/images/kitchen-sage-arabescato.jpg",
  ebony: "/images/kitchen-ebony-oak-pietra-grey.jpg",
  atelier: "/images/atelier-island.jpg",
};
export const localKitchens = local;

export const media = {
  hero: [
    { src: u("1600489000022-c2086d79f9d4", 2400), fallback: local.walnut, alt: "Integra Cucina Notte kitchen" },
    { src: u("1556909114-f6e7ad7d3136", 2400), fallback: local.midnight, alt: "Integra Cucina Linea kitchen" },
    { src: u("1565538810643-b5bdb714032a", 2400), fallback: local.graphite, alt: "Integra Cucina Pietra kitchen" },
  ] satisfies Media[],
  expand: { src: u("1556912173-3bb406ef7e77", 2400), fallback: local.oak, alt: "Integra Cucina showroom kitchen" } satisfies Media,
  collections: {
    linea: { src: u("1556911220-bff31c812dba", 1400), fallback: local.midnight, alt: "Linea handleless kitchen" },
    aria: { src: local.oak, alt: "Aria kitchen in natural oak with travertine island" },
    pietra: { src: u("1600566753190-17f0baa2a6c3", 1400), fallback: local.graphite, alt: "Pietra kitchen with a monolithic stone island" },
    notte: { src: local.walnut, alt: "Notte kitchen in walnut with Nero Marquina marble" },
    villa: { src: u("1556185781-a47769abb7ee", 1400), fallback: local.sage, alt: "Villa kitchen in salvia lacquer" },
  } satisfies Record<string, Media>,
  about: {
    workshop: { src: u("1504148455328-c376907d081c", 1600), fallback: "/images/detail-canaletto-walnut-nero-marquina.jpg", alt: "Craftsman finishing a wooden panel in the workshop" },
    material: { src: u("1618220179428-22790b461013", 1600), fallback: "/images/island-midnight-calacatta-oro.jpg", alt: "Close up of veined marble" },
    studio: { src: u("1484154218962-a197022b5858", 1600), fallback: local.oak, alt: "Kitchen styled in our design studio" },
  } satisfies Record<string, Media>,
  craft: { src: local.atelier, alt: "Travertine island with integrated sink" } satisfies Media,
};

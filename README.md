# Integra Cucina — Showroom Website

Luxury showroom site for Integra Cucina, built with **Next.js 15 (App Router)**, **Tailwind CSS 4**, **Motion** and **Lenis** smooth scrolling.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Pages

| Route | What's there |
| --- | --- |
| `/` | Hero slider (3 kitchens), scroll-lit manifesto, expanding image, collections accordion, bestsellers carousel, live finish configurator, before/after slider, material marquee, process, craftsmanship, testimonials, showrooms |
| `/products` | Filterable catalogue (6 categories, 23 pieces, finish swatches on every card), kitchen studio configurator, 27-material finish library with sample dialog |
| `/about` | Story, horizontal-scroll heritage timeline, values, process, before/after |
| `/contact` | Consultation form (pre-filled from product/finish links), showrooms, FAQ |

## Editing content

- **Photography** — every photo is registered in `src/lib/media.ts`. Remote photos fall back to local files if they fail to load. Replace them with the brand's own photography.
- **Products** — `src/lib/products.ts`
- **Finishes** — `src/lib/finishes.ts` (textures live in `public/textures/`)
- **Configurator** — layered renders in `public/configurator/` (`base.webp` plus one transparent layer per cabinet and countertop finish).
- **Contact form** — posts to `src/app/api/contact/route.ts`; connect it to your inbox/CRM there.

Addresses, phone numbers, history and statistics are placeholder copy and should be confirmed before launch.

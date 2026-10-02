# Tejori — landing page

A conversion-focused haircare landing page built with **Next.js 16 (App Router)**, **React 19**, **TypeScript** and **Tailwind CSS v4**.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## What's on the page

| Section | Conversion job |
| --- | --- |
| Announcement bar + sticky header | Free-shipping threshold, bundle offer, live bag count |
| Hero | Value prop, two CTAs (shop / quiz), social proof, clinical stat |
| Bestsellers | Filter by concern, creative product cards (size picker, savings, quick add, hover ingredient reveal) |
| Build your ritual | 3-step bundle builder with live 20% saving |
| Inside the vault | Expanding ingredient panels |
| Results | Before/after strand slider + animated clinical stats |
| Hair quiz | 3 questions → personalised product + 10% off add-to-bag |
| Reviews, comparison, FAQ | Objection handling and trust |
| Footer | 15% off email capture, guarantees |
| Cart drawer + mobile buy bar | Free-shipping progress, ritual upsell, persistent bag (localStorage) |

## Brand

- Ink `#2e4345` (sampled from the wordmark), bone, sand, clay and copper accents — tokens live in `app/globals.css`.
- Type: **Inter Tight** (display, matches the wordmark), **Inter** (body), **Instrument Serif** italic (editorial accents) via `next/font`.

## Editing content

- Products, prices, palettes and claims: `lib/products.ts`
- Packshots are vector illustrations (`components/Bottle.tsx`) so the page looks finished without photography. Swap in real product renders when ready.
- Reviews, statistics, ratings and study results in the copy are **placeholders** — replace them with your verified data before going live.
- Checkout is not wired up; connect the "Checkout securely" button in `components/CartDrawer.tsx` to Shopify / your commerce backend.

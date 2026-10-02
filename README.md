# Tejori — home page

Conversion-focused home page for Tejori, built with **Next.js 16 (App Router)**, **React 19**, **TypeScript** and **Tailwind CSS v4**. The design follows the Tejori Shopify store aesthetic: soft whites, sage and mint, dark-teal accents. Typography is Outfit (soft geometric sans) for headings and UI, with Inter Tight reserved for the wordmark. Product cards follow a minimal floating-product style: soft sage panel, centred packshot, large price and a round brand-teal add button on a deep brand-teal stage.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Deploy: import the repo on vercel.com — no configuration needed.

## Sections

| Section | What it does |
| --- | --- |
| Announcement + header | Offer bar collapses on scroll; header is transparent over the hero, solid on scroll |
| Hero | Full-screen slideshow — slow push-in zoom, crossfades, line-by-line headline reveal, progress rail, swipe on mobile |
| Shop by concern | Hair growth / Anti dandruff / Dry hair — routes visitors to the right product first |
| Our products | Apple-style product cards (label, name, tagline, benefit icons, price, Add to bag / Learn more) with a quick-look product sheet |
| The combo | "Better together" bundle: oil + shampoo breakdown, bought-separately vs combo price, quantity + add to bag |
| Tejori, every day | Shoppable photo/video cards with product tags |
| Reviews | Three review cards linked to products |
| FAQ, newsletter, footer | Objection handling and email capture |
| Bag drawer + mobile buy bar | Free-shipping progress, savings, upsell; bag persists in localStorage |

## Product pages

`/products/[id]` — one static page per product (`app/products/[id]/page.tsx`, `components/pdp/`).

- **Desktop:** gallery (swipe + thumbnails) sticky on the left, details on the right.
- **Mobile:** gallery first; the details sheet slides up over it as you scroll, with a sticky buy bar once the main button scrolls away.
- **Sections:** Why you'll love it (brand-gradient feature box with the product rising from a sage dome) · How to use · Ingredients · People usually pair it with (split card + combo strip; the combo page shows "What's inside").
- **Content** lives in `lib/products.ts` under `details` (gallery, why, howTo, ingredients, pair copy, pairWith). Ingredient lists are partial — add the full list from the pack.

## Icons

Custom hairline brand icons (`components/icons/BrandIcons.tsx`) — 96×96 grid, 1.25px non-scaling strokes, `currentColor`, each combining two ideas (drop + leaf, sprout + roots, shield + check…). Feature labels use DM Mono uppercase (`.label-mono`). Map features to icons in `components/FeatureIcon.tsx`. To swap in designer-made icons, replace the paths in `BrandIcons.tsx` keeping the same component names.

## Editing content

- **Products & prices:** `lib/products.ts` (prices use the store's `Rs. 499.00` format).
- **Product packshots:** `public/images/cut-*.png` sit on the exact card colour `#dce0c5`. For the sharpest result, replace them with high-res product renders on that background (or transparent PNGs). Images are served unoptimised (`next.config.ts`) so the colour stays exact.
- **Images:** `public/images/`. The current files were cropped from store screenshots and are low resolution — replace them with the original high-res photos **using the same file names** for a much sharper result.
- **Hero slides:** `components/HeroSlider.tsx` (`slides` array). A full-screen hero needs large images — use at least 2400 px wide photos or a short muted video loop for the best cinematic result.
- **Customer stories:** `components/CustomerResults.tsx` — set `video: "/videos/clip.mp4"` to play real customer clips.
- **Reviews** in `components/Testimonials.tsx` are placeholders — replace with verified reviews.
- **Free-shipping threshold** (`FREE_SHIPPING_AT`, currently Rs. 999) is a placeholder — set it to your policy or `null` to hide it.
- **Checkout** is not connected — wire the Checkout button in `components/CartDrawer.tsx` to your Shopify store (e.g. Storefront API cart permalink).

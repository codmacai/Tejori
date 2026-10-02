# Tejori — home page

Conversion-focused home page for Tejori, built with **Next.js 16 (App Router)**, **React 19**, **TypeScript** and **Tailwind CSS v4**. The design follows the Tejori Shopify store aesthetic: soft whites, sage and mint, dark-teal accents, light Manrope headings and spaced uppercase labels.

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
| Announcement bar + header | Rotating offers, centred logo, bag with live count |
| Hero slideshow | 3 auto-playing slides (swipe on mobile), pause on hover, shoppable product chip |
| Benefits strip | Packaging claims in a scrolling ribbon |
| Our Products | Cards with savings tab, badges, quick add, hover benefit chips |
| Shop by concern | Hair growth / Anti dandruff / Dry hair image tiles |
| How to use | Interactive 3-step ritual with combo CTA |
| Real Customer Results | Phone-frame shoppable stories carousel (supports video) |
| Loved by our community | Review slider with linked product |
| FAQ, newsletter, footer | Objection handling and email capture |
| Bag drawer + mobile buy bar | Free-shipping progress, savings, upsell; bag persists in localStorage |

## Editing content

- **Products & prices:** `lib/products.ts` (prices use the store's `Rs. 499.00` format).
- **Images:** `public/images/`. The current files were cropped from store screenshots and are low resolution — replace them with the original high-res photos **using the same file names** for a much sharper result.
- **Hero slides:** `components/HeroSlider.tsx` (`slides` array).
- **Customer stories:** `components/CustomerResults.tsx` — set `video: "/videos/clip.mp4"` to play real customer clips.
- **Reviews** in `components/Testimonials.tsx` are placeholders — replace with verified reviews.
- **Free-shipping threshold** (`FREE_SHIPPING_AT`, currently Rs. 999) is a placeholder — set it to your policy or `null` to hide it.
- **Checkout** is not connected — wire the Checkout button in `components/CartDrawer.tsx` to your Shopify store (e.g. Storefront API cart permalink).

# Tejori — Shopify theme pack

The Next.js site converted into Shopify Online Store 2.0 sections. Every section pulls real products, prices and variants from your store and adds to the Shopify cart (AJAX `/cart/add.js`). Works inside any OS 2.0 theme (Dawn, Sense, Refresh, etc.).

## What's inside

| Folder | Files |
| --- | --- |
| `assets/` | `tejori.css` (all styles, scoped under `.tj`), `tejori.js` (cart, variant picker, gallery, drawer, reveals) |
| `snippets/` | `tejori-assets` (fonts + CSS/JS), `tejori-icon` (UI + brand icons), `tejori-product-card` |
| `sections/` | `tejori-header`, `tejori-footer`, `tejori-hero`, `tejori-standards`, `tejori-concerns`, `tejori-products`, `tejori-combo`, `tejori-shop-the-look`, `tejori-reviews`, `tejori-faq`, `tejori-main-product`, `tejori-product-features`, `tejori-how-to-use`, `tejori-ingredients`, `tejori-pair` |
| `templates/` | `index.json` (home page), `product.tejori-oil.json`, `product.tejori-shampoo.json`, `product.tejori-combo.json` |

## Install

1. **Back up** your theme: Online Store → Themes → ⋯ → Duplicate. Work on the copy.
2. ⋯ → **Edit code** and add each file with the same name in the matching folder:
   - Assets → Add a new asset → upload `tejori.css` and `tejori.js`.
   - Snippets → Add a new snippet → `tejori-assets`, `tejori-icon`, `tejori-product-card` → paste contents.
   - Sections → Add a new section → each `tejori-*.liquid` → paste contents.
   - Templates → open `index.json` and replace its contents (this replaces your home page layout). Add new templates `product.tejori-oil.json`, `product.tejori-shampoo.json`, `product.tejori-combo.json` (Add a new template → product → JSON → name `tejori-oil` …) and paste.
   - Alternatively: zip the theme (Download theme file), drop these folders in, and re-upload.
3. **Header & footer** — in the theme editor, in the Header group click *Add section* → **Tejori header**, then hide/remove the old header. Same for the Footer group → **Tejori footer**. Pick your menus (main menu + up to 3 footer menus) and logo.
4. **Products** — Products → each product → *Theme template*: Neelayamari oil → `tejori-oil`, shampoo → `tejori-shampoo`, combo → `tejori-combo`.
5. **Pick products & images in the theme editor** — the templates are prefilled with the handles `neelayamari-hair-oil`, `neelayamari-anti-dandruff-shampoo` and `anti-dandruff-combo`. If your handles differ, re-pick the products in Combo, Shop the look, Reviews, Pair and Concerns. Then upload images:
   - **Hero** → each slide block has *Image*, *Mobile image* (optional) and *Video* (optional), plus layout, colour, text and two buttons. Add/remove/reorder slides freely.
   - Shop by concern, Combo, Shop the look, How to use, Ingredients (one photo per ingredient; also in the product accordion).
6. Product photos: the gallery uses the product's own media. For the floating card look, use transparent PNG packshots as the first image.

## Optional metafields (Settings → Custom data → Products)

| Namespace.key | Type | Used for |
| --- | --- | --- |
| `custom.size` | Single line text | Card/size label (e.g. `200 ml`); falls back to variant title |
| `custom.badge` | Single line text | Badge above product title (e.g. `Bestseller`) |
| `custom.tagline` | Single line text | Line under product title |

## Notes

- **Cart:** add-to-bag shows a toast, updates any `[data-tj-cart-count]` badge and dispatches `cart:refresh` and `tejori:cart:added` on `document`, so a theme cart drawer can listen and open.
- **Collections:** the Products section uses the collection you pick, or all products if none is set.
- **Theme editor:** sections re-initialise on edit; selecting a hero slide block jumps to that slide.
- Reviews and claims (dermatologist tested, scientifically proven, cruelty free) are placeholder copy — replace with genuine reviews and claims you can substantiate.

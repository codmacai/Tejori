# Zajel: all solutions carousel

One carousel: an "all solutions" cover followed by one poster-style slide per solution, in English and Arabic (mirrored right-to-left). The layout follows the poster reference (full-bleed photography, extended uppercase headlines with an italic accent word, angled colour blocks, white side bands, small supporting copy). It keeps Zajel's logo and greens, and uses Noto Kufi Arabic for the Arabic slides.

| # | Slide | Visual |
|---|---|---|
| 00 | Cover: Every solution. One partner. (index of all 7) | 4-photo mosaic |
| 01 | On Demand Express | photo |
| 02 | Freight Solutions | line art, photo to come |
| 03 | Ecommerce | photo |
| 04 | Customs Clearance | line art, photo to come |
| 05 | International Shipping | photo |
| 06 | Warehousing | line art, photo to come |
| 07 | Secure & Government | photo |

- `output/en/NN.png`, `output/ar/NN.png`: 1080 × 1350 slides
- `output/pdf/all-solutions-{en,ar}.pdf`: LinkedIn document posts
- `output/overview-{en,ar}.jpg`: all slides on one sheet
- `content.md`: the copy (EN + AR), with ⚑ on claims Zajel must confirm
- `src/content.js`: copy, layouts and photos; `src/styles.css`: the design; `src/build.js`: renderer

Rebuild from `zajel/carousels`: `npm install && npx playwright install chromium`, then `node solutions/src/build.js`.

To add a photo to a line-art slide, put it in `../assets/photos/` and replace `art: {…}` with `photo: { src: 'file.jpg', position: 'x% y%', positionAr: 'x% y%' }` in `src/content.js`.

Headline font: Archivo Expanded (Google Fonts) to match the reference. Swap in Manrope in `src/styles.css` if Zajel wants to stay strictly on the brand typeface.

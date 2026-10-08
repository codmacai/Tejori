# Zajel: all solutions carousel

One carousel: an "all solutions" cover followed by one poster-style slide per solution, in English and Arabic (mirrored right-to-left). The layout follows the poster reference (full-bleed photography, angled colour blocks, white side bands, small supporting copy), refined into a high-end finish:

- Manrope Medium headlines in sentence case, tight tracking; accent words in a light-to-Zajel-green gradient
- Brand-green gradients on every block (light green → Zajel Green → deep green), ink panels with a green glow
- Photos toned with deep-green gradients, fine film grain, thin gradient hairlines on the diagonal edges
- Oversized ExtraLight slide numbers, letter-spaced labels and dot-separated tags
- Line-art slides: gradient-stroked icons with a soft glow on a green mesh background
- Noto Kufi Arabic (medium) for the Arabic slides

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

The PDFs are assembled from the rendered slides (high-quality JPEG) so they match the PNGs exactly.

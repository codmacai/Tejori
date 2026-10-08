# Zajel: all solutions carousel

One carousel: an "all solutions" cover followed by one slide per solution, in English and Arabic (mirrored right-to-left).

**Concept: The Route.** The Zajel symbol is a single continuous line, "logistics as an uninterrupted journey from origin to destination". Here one glowing route line runs along the bottom of every slide at the same height, so it joins up as you swipe, and each solution is a stop on it. The cover is the route map: all seven solutions as stops on one line that bends into the route.

- Wing frames: photos sit in rounded frames with one sweeping corner, taken from the curve of the pigeon's wing
- Glass icon badge on each photo frame, glass pill tags
- Rhythm: photo slides on deep green, line-art slides on bright Zajel-green gradients
- Manrope Medium headlines with gradient accent words; Noto Kufi Arabic for Arabic
- Fine grain, soft glows, gradient-stroked line icons

| # | Slide | Visual |
|---|---|---|
| 00 | Cover: Every solution. One partner. (route map of all 7) | 4-photo frame |
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

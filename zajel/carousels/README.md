# Zajel solution carousels

Seven Instagram / LinkedIn carousels for Zajel's services, each in English and Arabic (right-to-left, mirrored layout), built to the Zajel Brand Book v1.0 (April 2026).

| Carousel | Slides | Cover |
|---|---|---|
| On Demand Express | 6 | photo |
| International Shipping | 6 | photo |
| Ecommerce | 6 | photo |
| Freight Solutions (sea, air, land) | 7 | graphic, photo to come |
| Customs Clearance | 6 | graphic, photo to come |
| Warehousing | 6 | graphic, photo to come |
| Secure & Government | 6 | photo |

## Files

- `output/<carousel>/<en|ar>/NN.png`: 1080 × 1350 slides, ready to post
- `output/pdf/<carousel>-<en|ar>.pdf`: one PDF per carousel (LinkedIn document posts)
- `preview.html`: every slide on one page
- `content.md`: the full copy deck (EN + AR), with ⚑ on claims Zajel must confirm
- `src/content.js`: the copy, the only file to edit for text changes
- `src/styles.css`: layouts and brand tokens
- `src/build.js`: generates the HTML, PNGs, PDFs, `content.md` and `preview.html`
- `assets/`: Manrope and Noto Kufi Arabic fonts, logo vectors traced from the brand book PDF, Lucide icons (ISC licence), brand photos from the brand book

## Rebuild

```bash
cd zajel/carousels
npm install
npx playwright install chromium
npm run build                                  # everything
node src/build.js --only freight --lang ar     # one carousel, one language
```

## Swapping photos

Put the new image in `assets/photos/`, then on that carousel's cover in `src/content.js` either change `photo.src` or replace `graphic: {…}` with `photo: { src: 'file.jpg', position: 'x% y%' }` plus `panel: 'dark' | 'green' | 'ink'`. `positionAr` sets a different crop for the Arabic slides, where the logo sits top-right.

## Brand notes

- Colours: Zajel Green `#36B936`, Dark Green `#064423`, plus `#132818`, `#EAF1E7`, `#77E07A` and white. The brand book PDF itself draws the logo in `#3DB53F` and the dark green as `#0A4324`; the printed hex values are used here.
- The stepped edge on the photo covers follows the flat–diagonal–flat line of the "Z" in the symbol.
- The dual-language logo (the book's primary logo) is used on every cover and closing slide.

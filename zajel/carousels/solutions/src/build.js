// Builds the "all solutions" carousel ("The Route": cover + one slide per solution) in EN and AR:
// HTML, a PNG per slide, one PDF per language, content.md and preview.html.
//
//   node src/build.js              build + render
//   node src/build.js --no-render  HTML + content.md only

const fs = require('fs');
const path = require('path');
const { ui, cover, solutions } = require('./content');

const ROOT = path.resolve(__dirname, '..');
const ASSETS = path.resolve(ROOT, '..', 'assets');
const HTML_DIR = path.join(ROOT, 'build', 'html');
const OUT_DIR = path.join(ROOT, 'output');
const render = !process.argv.includes('--no-render');

// Route geometry (English coordinates; mirrored for Arabic). Kept in step with styles.css.
const W = 1080;
const RAIL_Y = 1262;
const STATION_X = 148;
const MAP_TOP = 640;
const MAP_STEP = 84;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const rich = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<em>$1</em>');
const pad = (n) => String(n).padStart(2, '0');
const asset = (...p) => '../../../assets/' + p.join('/');

const svgCache = {};
const readSvg = (file) =>
  (svgCache[file] ||= fs.readFileSync(file, 'utf8').replace(/<!--[\s\S]*?-->/g, '').replace(/<\?xml[^>]*>/, '').trim());
const icon = (name, stroke, paint) => {
  let svg = readSvg(path.join(ASSETS, 'icons', `${name}.svg`))
    .replace(/class="[^"]*"/, 'class="ico" aria-hidden="true"')
    .replace(/stroke-width="[^"]*"/, `stroke-width="${stroke}"`)
    .replace(/\s(width|height)="24"/g, '');
  if (paint) svg = svg.replace('stroke="currentColor"', `stroke="${paint}"`);
  return svg;
};
const logo = () => `<div class="logo-wrap">${readSvg(path.join(ASSETS, 'logo', 'zajel-dual.svg')).replace('<svg ', '<svg class="logo" ')}</div>`;
const arrow = (lang) => icon(lang === 'ar' ? 'arrow-left' : 'arrow-right', 2);

// Gradients. The rail gradients are in user space across the full slide width, bright at the
// station and equally dim at both edges, so the line meets the next slide seamlessly.
function defs(lang) {
  const sx = (lang === 'ar' ? W - STATION_X : STATION_X) / W;
  const stops = (list) => list.map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`).join('');
  const rail = (id, edge, peak, a) =>
    `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${W}" y2="0">${stops([[0, edge, a], [sx, peak], [1, edge, a]])}</linearGradient>`;
  const [ix1, ix2] = lang === 'ar' ? [24, 0] : [0, 24];
  return `<svg class="defs" aria-hidden="true"><defs>
    ${rail('gRailDark', '#36B936', '#C2F7B9', 0.5)}
    ${rail('gRailGreen', '#FFFFFF', '#FFFFFF', 0.55)}
    <linearGradient id="gMap" gradientUnits="userSpaceOnUse" x1="0" y1="${MAP_TOP}" x2="0" y2="${RAIL_Y}">${stops([[0, '#C2F7B9'], [1, '#36B936']])}</linearGradient>
    <linearGradient id="gStroke" gradientUnits="userSpaceOnUse" x1="${ix1}" y1="0" x2="${ix2}" y2="24">${stops([[0, '#C2F7B9'], [0.5, '#36B936'], [1, '#0E7A34', 0.55]])}</linearGradient>
  </defs></svg>`;
}

// The route on a solution slide: the full-width rail plus this slide's station.
function route(lang, extra = '') {
  const x = lang === 'ar' ? W - STATION_X : STATION_X;
  return `<svg class="route" viewBox="0 0 ${W} 1350" preserveAspectRatio="none">
    <path class="rail" d="M0 ${RAIL_Y} H${W}"/>
    ${extra}
    <circle class="station-halo" cx="${x}" cy="${RAIL_Y}" r="28"/>
    <circle class="station-ring" cx="${x}" cy="${RAIL_Y}" r="17"/>
    <circle class="station" cx="${x}" cy="${RAIL_Y}" r="7"/>
  </svg>`;
}

// The cover's route map: a vertical line of seven stops that bends into the rail.
function coverRoute(lang) {
  const m = (v) => (lang === 'ar' ? W - v : v);
  const first = MAP_TOP + MAP_STEP / 2;
  const last = first + MAP_STEP * (solutions.length - 1);
  const bend = 76;
  const line = `<path class="rail" style="stroke:url(#gMap)" d="M${m(STATION_X)} ${first} V${last} L${m(STATION_X)} ${RAIL_Y - bend} Q${m(STATION_X)} ${RAIL_Y} ${m(STATION_X + bend)} ${RAIL_Y}"/>`;
  const stops = solutions.map((_, k) => `<circle class="stop" cx="${m(STATION_X)}" cy="${first + k * MAP_STEP}" r="9"/>`).join('');
  return `<svg class="route" viewBox="0 0 ${W} 1350" preserveAspectRatio="none">
    <path class="rail" d="M0 ${RAIL_Y} H${W}"/>
    ${line}${stops}
  </svg>`;
}

const pills = (list, lang) => `<div class="pills">${list.map((x) => `<span>${esc(x[lang])}</span>`).join('')}</div>`;

function frame(s, lang) {
  if (s.photo) {
    const pos = (lang === 'ar' && s.photo.positionAr) || s.photo.position;
    return `<div class="frame"><img src="${asset('photos', s.photo.src)}" style="object-position:${pos}" alt=""></div>`;
  }
  return `<div class="frame art">${icon(s.art.icon, 0.5, 'url(#gStroke)')}</div>`;
}

function solutionSlide(s, i, n, lang) {
  const last = i === n;
  const end = last
    ? `<span class="route-label end mail"><bdi>${ui.contact}</bdi></span>`
    : `<span class="route-label end">${esc(ui.swipe[lang])}${arrow(lang)}</span>`;
  return `<section class="slide theme-${s.theme}">
    <div class="top">${logo()}<span class="count" dir="ltr"><b>${pad(i)}</b> / ${pad(n)}</span></div>
    ${frame(s, lang)}
    ${s.chip ? `<div class="chip">${icon(s.chip, 1.6)}</div>` : ''}
    <div class="text">
      <div class="kicker">${esc(s.name[lang])}</div>
      <h2 class="headline">${rich(s.headline[lang])}</h2>
      <p class="body-copy">${esc(s.body[lang])}</p>
      ${pills(s.tags, lang)}
    </div>
    ${route(lang)}
    <span class="route-label start">${esc(ui.label[lang])}</span>
    ${end}
    <div class="grain"></div>
  </section>`;
}

function coverSlide(lang) {
  const tiles = cover.photos.map((src) => `<img src="${asset('photos', src)}" alt="">`).join('');
  const map = solutions.map((s, k) => `<li><span class="num">${pad(k + 1)}</span><span>${esc(s.name[lang])}</span></li>`).join('');
  return `<section class="slide cover theme-dark">
    <div class="top">${logo()}<span class="label">${esc(ui.label[lang])}</span></div>
    <div class="hero">
      <h1 class="headline">${rich(cover.headline[lang])}</h1>
      <p class="body-copy">${esc(cover.body[lang])}</p>
    </div>
    <div class="frame">${tiles}</div>
    ${coverRoute(lang)}
    <ol class="map">${map}</ol>
    <span class="route-label end">${esc(ui.swipe[lang])}${arrow(lang)}</span>
    <div class="grain"></div>
  </section>`;
}

function deckHtml(lang) {
  const n = solutions.length;
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  return `<!doctype html>
<html lang="${lang}" dir="${dir}"><head><meta charset="utf-8">
<title>Zajel · All solutions (${lang.toUpperCase()})</title>
<link rel="stylesheet" href="../../src/styles.css"></head>
<body dir="${dir}">
${defs(lang)}
${coverSlide(lang)}
${solutions.map((s, k) => solutionSlide(s, k + 1, n, lang)).join('\n')}
</body></html>
`;
}

function contentMd() {
  const f = (v, lang, flag) => v[lang] + (v.confirm || flag ? ' ⚑' : '');
  const cell = (s) => s.replace(/\|/g, '\\|');
  let md = `# Zajel "all solutions" carousel: slide copy

Generated from \`src/content.js\` by \`src/build.js\`, so edit the copy there.
Cover + ${solutions.length} solution slides, English and Arabic, 1080 × 1350. **Bold** = accent. ⚑ = claim Zajel must confirm.

| # | Slide | English | Arabic |
|---|---|---|---|
| 0 | Cover | ${cell(`${ui.label.en}<br>${cover.headline.en}<br>${cover.body.en}<br>Route map: ${solutions.map((s) => s.name.en).join(' · ')}`)} | ${cell(`${ui.label.ar}<br>${cover.headline.ar}<br>${cover.body.ar}<br>${solutions.map((s) => s.name.ar).join(' · ')}`)} |
`;
  solutions.forEach((s, k) => {
    const row = (lang) => cell(`${s.headline[lang]}<br>${f(s.body, lang, s.bodyConfirm)}<br>${s.tags.map((x) => f(x, lang)).join(' · ')}`);
    md += `| ${k + 1} | ${s.name.en} · ${s.name.ar} | ${row('en')} | ${row('ar')} |\n`;
  });
  md += `\nPhotos: brand-book photos on slides 1, 3, 5, 7 and the cover; slides 2, 4, 6 use line art until Zajel supplies freight, customs and warehouse photography.\n`;
  return md;
}

function previewHtml() {
  const n = solutions.length + 1;
  const row = (lang) =>
    `<div class="row">${Array.from({ length: n }, (_, i) => `<a href="output/${lang}/${pad(i)}.png"><img src="output/${lang}/${pad(i)}.png" alt="${lang} slide ${i}"></a>`).join('')}</div>`;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Zajel All Solutions</title>
<style>body{margin:0;background:#08140D;color:#fff;font:16px/1.5 system-ui,sans-serif}main{padding:24px}h1{font-size:24px;margin:0 0 4px}
h2{font-size:13px;letter-spacing:.12em;text-transform:uppercase;opacity:.7;margin:24px 0 8px}a{color:#36B936}
.row{display:flex;gap:0;overflow-x:auto;padding-bottom:8px}.row img{display:block;width:240px;height:300px}</style></head>
<body><main><h1>Zajel · All solutions carousel</h1><p>Cover + ${solutions.length} slides, shown edge to edge so the route reads across · <a href="output/pdf/all-solutions-en.pdf">EN PDF</a> · <a href="output/pdf/all-solutions-ar.pdf">AR PDF</a></p>
<h2>English</h2>${row('en')}<h2>العربية</h2>${row('ar')}</main></body></html>
`;
}

async function main() {
  fs.mkdirSync(HTML_DIR, { recursive: true });
  for (const lang of ['en', 'ar']) fs.writeFileSync(path.join(HTML_DIR, `all-solutions.${lang}.html`), deckHtml(lang));
  fs.writeFileSync(path.join(ROOT, 'content.md'), contentMd());
  fs.writeFileSync(path.join(ROOT, 'preview.html'), previewHtml());
  console.log('wrote HTML, content.md, preview.html');
  if (!render) return;

  const { chromium } = require('playwright');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  fs.mkdirSync(path.join(OUT_DIR, 'pdf'), { recursive: true });
  for (const lang of ['en', 'ar']) {
    await page.goto('file://' + path.join(HTML_DIR, `all-solutions.${lang}.html`));
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].map((im) => (im.complete ? 0 : new Promise((r) => (im.onload = im.onerror = r)))));
    });
    const dir = path.join(OUT_DIR, lang);
    const jpgDir = path.join(ROOT, 'build', 'jpg', lang);
    fs.mkdirSync(dir, { recursive: true });
    fs.mkdirSync(jpgDir, { recursive: true });
    const slides = await page.$$('.slide');
    for (let i = 0; i < slides.length; i++) {
      await slides[i].screenshot({ path: path.join(dir, `${pad(i)}.png`) });
      await slides[i].screenshot({ path: path.join(jpgDir, `${pad(i)}.jpg`), type: 'jpeg', quality: 92 });
    }
    // The PDF is assembled from the rendered slides (JPEG, to keep it light) so it matches the PNGs exactly.
    const sheet = path.join(HTML_DIR, `pdf.${lang}.html`);
    const imgs = slides.map((_, i) => `<img src="file://${path.join(jpgDir, `${pad(i)}.jpg`)}">`).join('');
    fs.writeFileSync(sheet, `<!doctype html><style>@page{size:1080px 1350px;margin:0}body{margin:0}img{display:block;width:1080px;height:1350px;break-after:page}</style>${imgs}`);
    await page.goto('file://' + sheet);
    await page.evaluate(() => Promise.all([...document.images].map((im) => (im.complete ? 0 : new Promise((r) => (im.onload = r))))));
    await page.pdf({ path: path.join(OUT_DIR, 'pdf', `all-solutions-${lang}.pdf`), width: '1080px', height: '1350px', printBackground: true });
    console.log(`rendered ${lang}: ${slides.length} slides`);
  }
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

// Builds the "all solutions" carousel (cover + one slide per solution) in EN and AR:
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
const W = 1080;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const rich = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<em>$1</em>');
const pad = (n) => String(n).padStart(2, '0');
const asset = (...p) => '../../../assets/' + p.join('/');

const svgCache = {};
const readSvg = (file) =>
  (svgCache[file] ||= fs.readFileSync(file, 'utf8').replace(/<!--[\s\S]*?-->/g, '').replace(/<\?xml[^>]*>/, '').trim());
const icon = (name, stroke) =>
  readSvg(path.join(ASSETS, 'icons', `${name}.svg`))
    .replace(/class="[^"]*"/, 'class="ico" aria-hidden="true"')
    .replace(/stroke-width="[^"]*"/, `stroke-width="${stroke}"`)
    .replace(/\s(width|height)="24"/g, '');
const logo = () => `<div class="logo-wrap">${readSvg(path.join(ASSETS, 'logo', 'zajel-dual.svg')).replace('<svg ', '<svg class="logo" ')}</div>`;

// Shapes are drawn in English (LTR) coordinates and mirrored for Arabic.
function shapes(list, lang) {
  const X = (x) => (lang === 'ar' ? W - x : x);
  const el = ({ cls, pts, line }) =>
    line
      ? `<line class="${cls}" x1="${X(line[0][0])}" y1="${line[0][1]}" x2="${X(line[1][0])}" y2="${line[1][1]}"/>`
      : `<polygon class="${cls}" points="${pts.map(([x, y]) => `${X(x)},${y}`).join(' ')}"/>`;
  return `<svg class="shapes" viewBox="0 0 1080 1350" preserveAspectRatio="none">${list.map(el).join('')}</svg>`;
}

// Brand-green gradients shared by every slide; horizontal direction flips for Arabic.
function defs(lang) {
  const [x1, x2] = lang === 'ar' ? [1, 0] : [0, 1];
  const lin = (id, stops, y2 = 1, user = false) =>
    `<linearGradient id="${id}" ${user ? `gradientUnits="userSpaceOnUse" x1="${x1 * 24}" y1="0" x2="${x2 * 24}" y2="24"` : `x1="${x1}" y1="0" x2="${x2}" y2="${y2}"`}>${stops
      .map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`)
      .join('')}</linearGradient>`;
  return `<svg class="defs" aria-hidden="true"><defs>
    ${lin('gGreen', [[0, '#7FE07C'], [0.42, '#36B936'], [1, '#0A5C2B']])}
    ${lin('gInk', [[0, '#0F4A28'], [0.55, '#132818'], [1, '#08120C']])}
    ${lin('gWhite', [[0, '#FFFFFF'], [1, '#E2EEDD']], 1)}
    ${lin('gStroke', [[0, '#C2F7B9'], [0.5, '#36B936'], [1, '#0E7A34', 0.55]], 1, true)}
    ${lin('gHair', [[0, '#B6F5AE', 0.95], [1, '#36B936', 0.2]])}
  </defs></svg>`;
}

const SHAPES = {
  A: [
    { cls: 'white', pts: [[0, 0], [210, 140], [210, 1100], [0, 1100]] },
    { cls: 'green', pts: [[210, 1100], [760, 1100], [920, 1350], [210, 1350]] },
    { cls: 'hair', line: [[760, 1100], [920, 1350]] },
  ],
  B: [
    { cls: 'ink', pts: [[560, 900], [560, 700], [1080, 180], [1080, 900]] },
    { cls: 'green', pts: [[0, 900], [720, 900], [720, 1350], [0, 1350]] },
    { cls: 'hair', line: [[560, 700], [1080, 180]] },
  ],
  C: [
    { cls: 'green', pts: [[1080, 600], [860, 820], [860, 1180], [1080, 1180]] },
    { cls: 'white', pts: [[0, 1180], [860, 1180], [860, 1350], [0, 1350]] },
    { cls: 'hair', line: [[1080, 600], [860, 820]] },
  ],
  cover: [
    { cls: 'green', pts: [[0, 800], [1080, 800], [1080, 1350], [0, 1350]] },
    { cls: 'ink', pts: [[660, 1350], [660, 880], [740, 800], [1080, 800], [1080, 1350]] },
    { cls: 'hair', line: [[660, 880], [740, 800]] },
  ],
};

const tags = (list, lang) => `<div class="tags label">${list.map((x) => `<span>${esc(x[lang])}</span>`).join('')}</div>`;
const nameLabel = (s, i, n, lang) => `<span class="num" dir="ltr">${pad(i)} / ${pad(n)}</span> · ${esc(s.name[lang])}`;

function frame(s, lang) {
  if (s.photo) {
    const pos = (lang === 'ar' && s.photo.positionAr) || s.photo.position;
    return `<img class="photo" src="${asset('photos', s.photo.src)}" style="object-position:${pos}" alt="">`;
  }
  return `<div class="art">${icon(s.art.icon, 0.5).replace('stroke="currentColor"', 'stroke="url(#gStroke)"')}</div>`;
}

function solutionSlide(s, i, n, lang) {
  const head = `<h2 class="headline">${rich(s.headline[lang])}</h2>`;
  const body = `<p class="body-copy">${esc(s.body[lang])}</p>`;
  let parts = '';
  if (s.layout === 'A') {
    parts = `
      <span class="vtext v1 ${lang === 'ar' ? 'ar' : ''}">${esc(ui.label[lang])}</span>
      <span class="vtext v2">${ui.contact}</span>
      <div class="copy">${body}${head}</div>
      <div class="base"><div class="label">${nameLabel(s, i, n, lang)}</div>${tags(s.tags, lang)}</div>
      <span class="counter">${pad(i)}</span>`;
  } else if (s.layout === 'B') {
    parts = `
      <div class="panel-copy">${body}${tags(s.tags, lang)}</div>
      <div class="block on-green"><div class="label"><span>${esc(s.name[lang])}</span><span class="num" dir="ltr">${pad(i)} / ${pad(n)}</span></div>${head}</div>
      <span class="counter">${pad(i)}</span>`;
  } else {
    parts = `
      <div class="copy">${body}${head}</div>
      <span class="counter">${pad(i)}</span>
      <div class="strip"><div class="row label"><span>${esc(s.name[lang])}</span><span>${ui.contact}</span></div>${tags(s.tags, lang)}</div>`;
  }
  return `<section class="slide lay-${s.layout}">
    ${frame(s, lang)}
    <div class="tone"></div>
    ${shapes(SHAPES[s.layout], lang)}
    <div class="grain"></div>
    ${logo()}
    ${parts}
  </section>`;
}

function coverSlide(lang) {
  const tiles = cover.photos
    .map((src, k) => {
      const x = (k % 2) * 540, y = Math.floor(k / 2) * 400;
      const side = lang === 'ar' ? 'right' : 'left';
      return `<img class="tile" src="${asset('photos', src)}" style="${side}:${x}px;top:${y}px" alt="">`;
    })
    .join('');
  const index = solutions.map((s, k) => `<li><span class="num" dir="ltr">${pad(k + 1)}</span><span>${esc(s.name[lang])}</span></li>`).join('');
  return `<section class="slide cover">
    ${tiles}
    <div class="tone"></div>
    ${shapes(SHAPES.cover, lang)}
    <div class="grain"></div>
    ${logo()}
    <div class="lead on-green"><div class="label">${esc(ui.label[lang])}</div><h1 class="headline">${rich(cover.headline[lang])}</h1></div>
    <div class="swipe label"><span>${esc(ui.swipe[lang])}</span>${icon(lang === 'ar' ? 'arrow-left' : 'arrow-right', 2)}</div>
    <p class="note">${esc(cover.body[lang])}</p>
    <ol class="index">${index}</ol>
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
| 0 | Cover | ${cell(`${ui.label.en}<br>${cover.headline.en}<br>${cover.body.en}<br>Index: ${solutions.map((s) => s.name.en).join(' · ')}`)} | ${cell(`${ui.label.ar}<br>${cover.headline.ar}<br>${cover.body.ar}<br>${solutions.map((s) => s.name.ar).join(' · ')}`)} |
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
    `<div class="row" dir="${lang === 'ar' ? 'rtl' : 'ltr'}">${Array.from({ length: n }, (_, i) => `<a href="output/${lang}/${pad(i)}.png"><img src="output/${lang}/${pad(i)}.png" alt="${lang} slide ${i}"></a>`).join('')}</div>`;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Zajel All Solutions</title>
<style>body{margin:0;background:#132818;color:#fff;font:16px/1.5 system-ui,sans-serif}main{padding:24px}h1{font-size:24px;margin:0 0 4px}
h2{font-size:13px;letter-spacing:.12em;text-transform:uppercase;opacity:.7;margin:24px 0 8px}a{color:#36B936}
.row{display:flex;gap:10px;overflow-x:auto;padding-bottom:8px}.row img{display:block;width:216px;height:270px;border-radius:4px}</style></head>
<body><main><h1>Zajel · All solutions carousel</h1><p>Cover + ${solutions.length} slides · <a href="output/pdf/all-solutions-en.pdf">EN PDF</a> · <a href="output/pdf/all-solutions-ar.pdf">AR PDF</a></p>
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
    fs.mkdirSync(dir, { recursive: true });
    const slides = await page.$$('.slide');
    const jpgDir = path.join(ROOT, 'build', 'jpg', lang);
    fs.mkdirSync(jpgDir, { recursive: true });
    for (let i = 0; i < slides.length; i++) {
      await slides[i].screenshot({ path: path.join(dir, `${pad(i)}.png`) });
      await slides[i].screenshot({ path: path.join(jpgDir, `${pad(i)}.jpg`), type: 'jpeg', quality: 92 });
    }
    // The PDF is assembled from the rendered slides (JPEG, to keep it light) so it matches the PNGs exactly.
    const pngs = slides.map((_, i) => 'file://' + path.join(jpgDir, `${pad(i)}.jpg`));
    const sheet = path.join(HTML_DIR, `pdf.${lang}.html`);
    fs.writeFileSync(sheet, `<!doctype html><style>@page{size:1080px 1350px;margin:0}body{margin:0}img{display:block;width:1080px;height:1350px;break-after:page}</style>${pngs.map((u) => `<img src="${u}">`).join('')}`);
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

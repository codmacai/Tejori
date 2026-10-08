// Builds the Zajel carousels: HTML per carousel/language, PNG per slide, PDF per carousel,
// plus content.md (copy deck) and preview.html (contact sheet).
//
//   node src/build.js                      build + render everything
//   node src/build.js --only ecommerce     one carousel
//   node src/build.js --lang ar            one language
//   node src/build.js --no-render          HTML + content.md only

const fs = require('fs');
const path = require('path');
const { series, ui, carousels } = require('./content');

const ROOT = path.resolve(__dirname, '..');
const ASSETS = path.join(ROOT, 'assets');
const HTML_DIR = path.join(ROOT, 'build', 'html');
const OUT_DIR = path.join(ROOT, 'output');

const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? null : args[i + 1];
};
const only = flag('--only');
const langs = flag('--lang') ? [flag('--lang')] : ['en', 'ar'];
const render = !args.includes('--no-render');

// ---------- helpers ----------

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const rich = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<em>$1</em>');
const pad = (n) => String(n).padStart(2, '0');

const svgCache = {};
function readSvg(file) {
  if (!svgCache[file]) {
    svgCache[file] = fs
      .readFileSync(file, 'utf8')
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<\?xml[^>]*>/, '')
      .trim();
  }
  return svgCache[file];
}
const icon = (name, stroke = 1.5) =>
  readSvg(path.join(ASSETS, 'icons', `${name}.svg`))
    .replace(/class="[^"]*"/, 'class="ico" aria-hidden="true"')
    .replace(/stroke-width="[^"]*"/, `stroke-width="${stroke}"`)
    .replace(/\s(width|height)="24"/g, '');
const logo = (variant) => readSvg(path.join(ASSETS, 'logo', `zajel-${variant}.svg`)).replace('<svg ', '<svg class="logo" ');
const symbol = () => `<div class="sym">${readSvg(path.join(ASSETS, 'logo', 'zajel-symbol.svg'))}</div>`;

// ---------- slide templates ----------

function header(c, lang, i, n) {
  return `<header class="hdr">
    <div class="hdr-brand">${symbol()}<span>${esc(c.name[lang])}</span></div>
    <div class="hdr-count" dir="ltr">${pad(i)} / ${pad(n)}</div>
  </header>`;
}

function footer(lang, i, n) {
  const rail = Array.from({ length: n }, (_, k) => `<i class="${k < i ? 'on' : ''}"></i>`).join('');
  const next = i < n ? `<span class="next">${icon(lang === 'ar' ? 'arrow-left' : 'arrow-right', 1.75)}</span>` : '';
  return `<footer class="ftr"><div class="rail">${rail}</div>${next}</footer>`;
}

const swipe = (lang) =>
  `<div class="swipe"><span>${esc(ui.swipe[lang])}</span>${icon(lang === 'ar' ? 'arrow-left' : 'arrow-right', 1.75)}</div>`;

// Cover panel: a stepped edge taken from the "Z" of the symbol (flat, 45° rise, flat).
function panelPolygon(lang) {
  const pts = [[0, 800], [560, 800], [740, 620], [1080, 620], [1080, 1350], [0, 1350]];
  return pts.map(([x, y]) => `${lang === 'ar' ? 1080 - x : x},${y}`).join(' ');
}

function cover(c, s, lang) {
  const top = `<div class="cover-top">
    <div class="logo-wrap">${logo('dual')}</div>
    <span class="series-tag">${esc(series[c.series][lang])}</span>
  </div>`;
  const text = (extra = '') => `<div class="cover-text">
    ${extra}
    <span class="pill">${esc(c.name[lang])}</span>
    <h1>${rich(s.title[lang])}</h1>
    <p class="sub">${rich(s.sub[lang])}</p>
  </div>`;

  if (s.photo) {
    return `<section class="slide type-cover cover-photo panel-${s.panel}">
      <img class="photo" src="../../assets/photos/${s.photo.src}" style="object-position:${(lang === 'ar' && s.photo.positionAr) || s.photo.position}" alt="">
      <div class="scrim"></div>
      ${top}
      <svg class="panel" viewBox="0 0 1080 1350" preserveAspectRatio="none"><polygon points="${panelPolygon(lang)}"/></svg>
      ${swipe(lang)}
      ${text()}
    </section>`;
  }
  const modes = `<div class="modes">${s.graphic.icons.map((n) => `<span>${icon(n, 1.5)}</span>`).join('')}</div>`;
  return `<section class="slide type-cover cover-graphic theme-${s.graphic.theme}">
    <div class="big-sym">${symbol()}</div>
    ${top}
    ${text(modes)}
    ${swipe(lang)}
  </section>`;
}

const templates = {
  statement: (c, s, lang) => `
    <div class="body">
      <span class="eyebrow">${esc((s.eyebrow || ui.challenge)[lang])}</span>
      <p class="statement">${rich(s.text[lang])}</p>
    </div>
    <div class="deco-sym">${symbol()}</div>`,

  list: (c, s, lang) => `
    <div class="body">
      <span class="eyebrow">${esc((s.eyebrow || ui.included)[lang])}</span>
      <h2>${rich(s.title[lang])}</h2>
      <ul class="rows">${s.items
        .map(
          (it) => `<li><span class="tile">${icon(it.icon)}</span><span class="row-text"><b>${rich(it.text[lang])}</b>${
            it.sub ? `<small>${rich(it.sub[lang])}</small>` : ''
          }</span></li>`,
        )
        .join('')}</ul>
    </div>`,

  steps: (c, s, lang) => `
    <div class="body">
      <span class="eyebrow">${esc((s.eyebrow || ui.how)[lang])}</span>
      <h2>${rich(s.title[lang])}</h2>
      <ol class="steps">${s.steps
        .map(
          (st, k) => `<li><span class="num">${pad(k + 1)}</span><div class="step-text">${
            st.label ? `<small>${esc(st.label[lang])}</small>` : ''
          }<b>${rich(st.text[lang])}</b></div></li>`,
        )
        .join('')}</ol>
    </div>`,

  detail: (c, s, lang) => `
    <div class="body">
      <span class="detail-icon">${icon(s.icon, 1.4)}</span>
      <div class="detail-copy">
        <span class="eyebrow">${esc(s.eyebrow[lang])}</span>
        <h2>${rich(s.title[lang])}</h2>
        <div class="pills">${s.pills.map((p, k) => `<span class="pill p${(k % 3) + 1}">${esc(p[lang])}</span>`).join('')}</div>
      </div>
    </div>
    <div class="deco-icon">${icon(s.icon, 0.6)}</div>`,

  why: (c, s, lang) => `
    <div class="body">
      <h2>${esc(ui.why[lang])}</h2>
      <ul class="why-rows">${s.items.map((it) => `<li>${icon(it.icon, 1.5)}<span>${rich(it.text[lang])}</span></li>`).join('')}</ul>
    </div>`,

  grid: (c, s, lang) => `
    <div class="body">
      <span class="eyebrow">${esc(s.eyebrow[lang])}</span>
      <h2>${rich(s.title[lang])}</h2>
      <div class="cards">${s.items
        .map((it) => `<div class="card">${icon(it.icon, 1.5)}<b>${esc(it.name[lang])}</b><small>${esc(it.text[lang])}</small></div>`)
        .join('')}</div>
    </div>`,
};

function cta(c, s, lang) {
  return `<section class="slide type-cta theme-${s.theme}">
    <div class="big-sym">${symbol()}</div>
    <div class="cta-text">
      <h2>${rich(s.title[lang])}</h2>
      <span class="btn">${esc(s.button[lang])}${icon(lang === 'ar' ? 'arrow-left' : 'arrow-right', 2)}</span>
      <span class="contact"><bdi>${ui.contact}</bdi></span>
    </div>
    <div class="cta-logo">${logo('dual')}</div>
  </section>`;
}

function slideHtml(c, s, lang, i, n) {
  if (s.type === 'cover') return cover(c, s, lang);
  if (s.type === 'cta') return cta(c, s, lang);
  return `<section class="slide type-${s.type} theme-${s.theme}">
    ${header(c, lang, i, n)}
    ${templates[s.type](c, s, lang)}
    ${footer(lang, i, n)}
  </section>`;
}

function carouselHtml(c, lang) {
  const n = c.slides.length;
  const slides = c.slides.map((s, k) => slideHtml(c, s, lang, k + 1, n)).join('\n');
  return `<!doctype html>
<html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}">
<head>
<meta charset="utf-8">
<title>Zajel · ${esc(c.name.en)} (${lang.toUpperCase()})</title>
<link rel="stylesheet" href="../../src/styles.css">
</head>
<body dir="${lang === 'ar' ? 'rtl' : 'ltr'}">
${slides}
</body>
</html>
`;
}

// ---------- content.md (copy deck generated from the same data) ----------

function contentMd() {
  const flagged = (v, lang) => (v ? v[lang] + (v.confirm ? ' ⚑' : '') : '');
  const cell = (s) => s.replace(/[\u2066-\u2069]/g, '').replace(/\|/g, '\\|');
  const rowsFor = (s, lang) => {
    switch (s.type) {
      case 'cover': return `${s.title[lang]}<br>${s.sub[lang]}`;
      case 'statement': return s.text[lang];
      case 'list': return [s.title[lang], ...s.items.map((it) => `• ${flagged(it.text, lang)}${it.sub ? ` — ${flagged(it.sub, lang)}` : ''}`)].join('<br>');
      case 'steps': return [s.title[lang], ...s.steps.map((st, k) => `${pad(k + 1)} ${st.label ? st.label[lang] + ': ' : ''}${flagged(st.text, lang)}`)].join('<br>');
      case 'detail': return [`${s.eyebrow[lang]}: ${s.title[lang]}`, s.pills.map((p) => flagged(p, lang)).join(' · ')].join('<br>');
      case 'why': return [ui.why[lang], ...s.items.map((it) => `• ${flagged(it.text, lang)}`)].join('<br>');
      case 'grid': return [s.title[lang], ...s.items.map((it) => `• ${it.name[lang]}: ${it.text[lang]}`)].join('<br>');
      case 'cta': return `${s.title[lang]}<br>\`${s.button[lang]}\` · ${ui.contact}`;
      default: return '';
    }
  };
  const label = { cover: 'Cover', statement: 'Challenge', list: 'Included', steps: 'How it works', detail: 'Detail', why: 'Why Zajel', grid: 'Services', cta: 'CTA' };
  let md = `# Zajel solution carousels: slide copy (draft v3)

Generated from \`src/content.js\` by \`src/build.js\`, so edit the copy there.

Seven carousels, each in English (LTR) and Arabic (RTL, mirrored), 1080 × 1350.
**Bold** is the accent phrase in Zajel Green. ⚑ marks a claim Zajel must confirm before publishing.

| # | Carousel | Series | Slides |
|---|---|---|---|
${carousels.map((c, k) => `| ${k + 1} | ${c.name.en} · ${c.name.ar} | ${series[c.series].en} | ${c.slides.length} |`).join('\n')}
`;
  carousels.forEach((c, k) => {
    md += `\n---\n\n## ${k + 1}. ${c.name.en} · ${c.name.ar}\n\n| # | Slide | English | Arabic |\n|---|---|---|---|\n`;
    c.slides.forEach((s, i) => {
      md += `| ${i + 1} | ${label[s.type]} | ${cell(rowsFor(s, 'en'))} | ${cell(rowsFor(s, 'ar'))} |\n`;
    });
  });
  md += `\n---\n\n**Before publishing:** a native Arabic speaker on Zajel's side should review the Arabic, and every ⚑ item must be confirmed. "Intelligent movement for growing businesses" and "Intelligent movement, in trusted hands" are proposed lines; the brand book does not define them.\n`;
  return md;
}

// ---------- preview.html ----------

function previewHtml() {
  const sets = carousels
    .map((c) => {
      const row = (lang) =>
        `<div class="row" dir="${lang === 'ar' ? 'rtl' : 'ltr'}">${c.slides
          .map((_, i) => `<a href="output/${c.id}/${lang}/${pad(i + 1)}.png"><img loading="lazy" src="output/${c.id}/${lang}/${pad(i + 1)}.png" alt="${esc(c.name.en)} ${lang} slide ${i + 1}"></a>`)
          .join('')}</div>`;
      return `<section><h2>${esc(c.name.en)} <span>${esc(c.name.ar)}</span></h2>
        <p>English · <a href="output/pdf/${c.id}-en.pdf">PDF</a> &nbsp; Arabic · <a href="output/pdf/${c.id}-ar.pdf">PDF</a></p>
        <h3>English</h3>${row('en')}<h3>العربية</h3>${row('ar')}</section>`;
    })
    .join('\n');
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Zajel Carousels</title>
<style>
  :root { --green:#36B936; --dark:#064423; --ink:#132818; --mist:#EAF1E7; }
  body { margin:0; background:var(--mist); color:var(--ink); font:16px/1.5 system-ui, sans-serif; }
  header { background:var(--dark); color:#fff; padding:32px 24px; }
  header h1 { margin:0; font-size:28px; font-weight:600; }
  header p { margin:6px 0 0; opacity:.75; }
  main { padding:8px 24px 48px; }
  section { margin-top:32px; }
  h2 { font-size:22px; margin:0 0 4px; font-weight:600; } h2 span { opacity:.6; font-weight:500; margin-inline-start:8px; }
  h3 { font-size:13px; text-transform:uppercase; letter-spacing:.12em; margin:16px 0 8px; opacity:.6; }
  a { color:var(--dark); }
  .row { display:flex; gap:10px; overflow-x:auto; padding-bottom:8px; }
  .row img { display:block; width:216px; height:270px; border-radius:6px; box-shadow:0 1px 4px rgba(0,0,0,.15); }
</style></head>
<body><header><h1>Zajel solution carousels</h1><p>7 carousels · English and Arabic · 1080 × 1350</p></header>
<main>${sets}</main></body></html>
`;
}

// ---------- main ----------

async function main() {
  fs.mkdirSync(HTML_DIR, { recursive: true });
  const jobs = [];
  for (const c of carousels) {
    if (only && c.id !== only) continue;
    for (const lang of langs) {
      const file = path.join(HTML_DIR, `${c.id}.${lang}.html`);
      fs.writeFileSync(file, carouselHtml(c, lang));
      jobs.push({ c, lang, file });
    }
  }
  fs.writeFileSync(path.join(ROOT, 'content.md'), contentMd());
  fs.writeFileSync(path.join(ROOT, 'preview.html'), previewHtml());
  console.log(`wrote ${jobs.length} HTML files, content.md, preview.html`);
  if (!render) return;

  const { chromium } = require('playwright');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  fs.mkdirSync(path.join(OUT_DIR, 'pdf'), { recursive: true });
  for (const { c, lang, file } of jobs) {
    await page.goto('file://' + file);
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].map((im) => (im.complete ? 0 : new Promise((r) => (im.onload = im.onerror = r)))));
    });
    const dir = path.join(OUT_DIR, c.id, lang);
    fs.mkdirSync(dir, { recursive: true });
    const slides = await page.$$('.slide');
    for (let i = 0; i < slides.length; i++) {
      await slides[i].screenshot({ path: path.join(dir, `${pad(i + 1)}.png`) });
    }
    await page.pdf({ path: path.join(OUT_DIR, 'pdf', `${c.id}-${lang}.pdf`), width: '1080px', height: '1350px', printBackground: true });
    console.log(`rendered ${c.id} (${lang}): ${slides.length} slides`);
  }
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

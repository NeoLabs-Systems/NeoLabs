#!/usr/bin/env node
// Builds landing/ into dist/: expands the page template from landing/data/site.js
// and copies the static files. No dependencies.
'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const src = path.join(root, 'landing');
const out = path.join(root, 'dist');
const site = require(path.join(src, 'data', 'site.js'));

const escapeHtml = (v) => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const lookup = (scope, key) => key.trim().split('.').reduce((o, k) => (o == null ? o : o[k]), scope);

// Finds the close tag for the block opening at `from`, allowing nested blocks of the same tag.
function closeOf(tpl, tag, from) {
  const re = new RegExp(`<(/?)${tag}\\b`, 'g');
  re.lastIndex = from;
  let depth = 1;
  for (let m; (m = re.exec(tpl));) {
    depth += m[1] ? -1 : 1;
    if (depth === 0) return m.index;
  }
  throw new Error(`Unclosed <${tag}> at ${from}`);
}

function render(tpl, scope) {
  let html = '';
  let i = 0;
  const open = /<sc-(for|if)\b([^>]*)>/g;
  for (let m; (m = open.exec(tpl));) {
    html += holes(tpl.slice(i, m.index), scope);
    const tag = `sc-${m[1]}`;
    const start = m.index + m[0].length;
    const end = closeOf(tpl, tag, start);
    const body = tpl.slice(start, end);
    const attr = (name) => (m[2].match(new RegExp(`${name}="([^"]*)"`)) || [])[1];
    const value = lookup(scope, attr(m[1] === 'for' ? 'list' : 'value').replace(/[{}]/g, ''));
    if (m[1] === 'if') {
      if (value) html += render(body, scope);
    } else {
      if (!Array.isArray(value)) throw new Error(`<sc-for> list is not an array: ${attr('list')}`);
      const as = attr('as');
      value.forEach((item, $index) => { html += render(body, { ...scope, [as]: item, $index }); });
    }
    i = end + `</${tag}>`.length;
    open.lastIndex = i;
  }
  return html + holes(tpl.slice(i), scope);
}

function holes(text, scope) {
  return text
    .replace(/\{\{\{\s*([^}]+?)\s*\}\}\}/g, (_, k) => {
      const v = lookup(scope, k);
      if (v === undefined) throw new Error(`Unknown value: ${k}`);
      return v;
    })
    .replace(/\{\{\s*([^}]+?)\s*\}\}/g, (_, k) => {
      const v = lookup(scope, k);
      if (v === undefined) throw new Error(`Unknown value: ${k}`);
      return escapeHtml(v);
    });
}

function routerRows(presetIndex) {
  const { order } = site.PRESETS[presetIndex];
  const busyStart = order.length;
  let busy = 0;
  return site.MODELS.map((m, i) => {
    const rank = m.busy ? busyStart + busy++ : order.indexOf(i);
    return { name: m.name, time: m.busy ? 'busy' : `${m.time} · free`, y: rank * 46, cls: m.busy ? 'busy' : rank === 0 ? 'top' : '' };
  });
}

const siteUrl = (process.env.SITE_URL || site.SITE_URL).replace(/\/?$/, '/').replace(/^\/$/, '');
const base = siteUrl ? new URL(siteUrl).pathname : '/';

const firstAsk = site.ASKS[0];
const scope = {
  meta: { ...site.META, url: siteUrl },
  products: site.PRODUCTS,
  providers: site.PROVIDERS,
  thesis: site.THESIS.split(' ').map((t) => ({ t, cls: site.GOLD_WORDS.includes(t) ? 'g' : '' })),
  wave: site.WAVE,
  dots: Array.from({ length: 81 }, (_, i) => ({ i })),
  ask: { q: firstAsk.q, words: firstAsk.a.split(' '), cites: firstAsk.cites },
  askChips: site.ASKS.map((a, i) => ({ q: a.q, cls: i === 0 ? 'on' : '' })),
  presets: site.PRESETS.map((p, i) => ({ name: p.name, cls: i === 0 ? 'on' : '' })),
  rows: routerRows(0),
  stats: site.STATS,
  ledger: site.LEDGER,
  tabs: site.PRODUCTS.map((p, i) => ({ ...p, cls: i === 0 ? 'on' : '', hiddenAttr: i === 0 ? '' : 'hidden' })),
  demoJson: JSON.stringify({ asks: site.ASKS, models: site.MODELS, presets: site.PRESETS, faces: site.FACES }).replace(/</g, '\\u003c')
};

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
const page = (name, values) => fs.writeFileSync(path.join(out, `${name}.html`), render(fs.readFileSync(path.join(src, `${name}.template.html`), 'utf8'), values));
page('index', scope);
page('404', { base });
for (const entry of fs.readdirSync(src)) {
  if (entry === 'data' || entry.endsWith('.template.html')) continue;
  fs.cpSync(path.join(src, entry), path.join(out, entry), { recursive: true });
}
console.log(`Built ${path.relative(root, out)}/`);

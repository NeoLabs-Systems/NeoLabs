// NeoLabs home page: the live orbit, scroll scenes and the small product demos.
// All of the content is already in the HTML; this only adds motion and interaction.
(() => {
  'use strict';

  const el = document.querySelector('[data-nl]');
  if (!el) return;

  const q = (s, root = el) => root.querySelector(s);
  const qa = (s, root = el) => Array.from(root.querySelectorAll(s));
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const easeOut = (x) => 1 - Math.pow(1 - x, 4);

  const data = JSON.parse(document.getElementById('demo-data').textContent);
  const reducedQuery = matchMedia('(prefers-reduced-motion: reduce)');
  let still = reducedQuery.matches;
  el.classList.toggle('still', still);

  const hero = q('[data-hero]');
  const canvas = q('[data-orbit]');
  const ctx = canvas ? canvas.getContext('2d') : null;
  const slot = q('[data-anchor]');
  const pnodes = qa('[data-pnode]');
  const words = qa('[data-w]');
  const thesisEl = q('[data-thesis]');
  const storyEl = q('[data-story]');
  const steps = qa('[data-st]');
  const rail = q('[data-rail]');
  const railItems = qa('[data-rail-i]');
  const chaps = qa('[data-chap]');
  const galEl = q('[data-gal]');
  const galRows = qa('[data-gal-row]');
  const cur = { hp: 0, th: 0, st: 0 };

  let colors = {};
  let vh = 860;
  let flat = false;
  let stacked = false;
  let step = 0;
  let dirty = 60;
  let dpr = 1;
  let cw = 0;
  let ch = 0;
  let anchor = null;
  let slow = false;
  let speed = 1;
  let ptx = 0;
  let pty = 0;
  let px = 0;
  let py = 0;
  let lastT = 0;
  const t0 = performance.now();

  const count = pnodes.length || 1;
  const rings = pnodes.map((_, i) => ({ f: count === 1 ? 1 : innerWidth < 900 ? 0.62 + 0.38 * i / (count - 1) : 0.46 + 0.54 * i / (count - 1), a: -1.2 + i * 2.399, v: 0.13 - 0.025 * i }));
  const dust = Array.from({ length: innerWidth < 700 ? 46 : 110 }, () => ({
    f: 0.3 + Math.random() * 1.15,
    a: Math.random() * 6.283,
    v: 0.015 + Math.random() * 0.05,
    r: 0.5 + Math.random() * 1.3,
    p: Math.random() * 6.283
  }));

  function readColors() {
    const s = getComputedStyle(el);
    colors = { orbit: s.getPropertyValue('--orbit-rgb').trim(), dust: s.getPropertyValue('--dust-rgb').trim(), glow: s.getPropertyValue('--glow-rgb').trim() };
    dirty = 60;
  }

  function grain() {
    try {
      const c = document.createElement('canvas');
      c.width = c.height = 128;
      const x = c.getContext('2d');
      const d = x.createImageData(128, 128);
      for (let i = 0; i < d.data.length; i += 4) {
        const v = Math.random() * 255;
        d.data[i] = d.data[i + 1] = d.data[i + 2] = v;
        d.data[i + 3] = 255;
      }
      x.putImageData(d, 0, 0);
      el.style.setProperty('--grain', `url(${c.toDataURL()})`);
    } catch (e) { /* the page reads fine without grain */ }
  }

  function measure() {
    const w = innerWidth;
    const h = innerHeight;
    vh = Math.max(Math.min(h, 1100), 680);
    el.style.setProperty('--vh', `${vh}px`);
    // On a phone or a very short window, everything stacks instead of pinning.
    flat = w < 900 || h < 620;
    stacked = !flat && h >= 800;
    el.classList.toggle('flat', flat);
    el.classList.toggle('stacked', stacked);
    if (canvas) {
      dpr = Math.min(devicePixelRatio || 1, 2);
      cw = canvas.clientWidth;
      ch = canvas.clientHeight;
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      const hr = hero.getBoundingClientRect();
      const sr = slot.getBoundingClientRect();
      anchor = { x: sr.left - hr.left + sr.width / 2, y: sr.top - hr.top + sr.height / 2, R: Math.min(sr.width, sr.height) * (w < 900 ? 0.4 : 0.43) };
    }
    dirty = 60;
  }

  /* ---------- reveals and count-ups ---------- */
  function countUp(c) {
    const to = parseInt(c.getAttribute('data-count'), 10) || 0;
    if (still || to === 0) { c.textContent = String(to); return; }
    const start = performance.now();
    const tick = (t) => {
      const p = clamp((t - start) / 1500);
      c.textContent = String(Math.round(to * easeOut(p)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  let routerSeen = false;
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        qa('[data-count]', e.target).forEach(countUp);
        io.unobserve(e.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
    qa('.rv,[data-st]').forEach((n) => io.observe(n));
    const router = q('[data-router]');
    if (router) new IntersectionObserver((e) => { routerSeen = e[0].isIntersecting; }).observe(router);
  } else {
    qa('.rv,[data-st]').forEach((n) => n.classList.add('in'));
  }

  /* ---------- scroll scenes ---------- */
  function scrub() {
    const wh = innerHeight;
    const k = still ? 1 : 0.16;
    const rr = el.getBoundingClientRect();
    el.classList.toggle('scrolled', rr.top < -30);
    const scrollable = rr.height - wh;
    if (scrollable > 0) el.style.setProperty('--page', clamp(-rr.top / scrollable).toFixed(4));

    if (hero) {
      const r = hero.getBoundingClientRect();
      cur.hp += (clamp(-r.top / r.height) - cur.hp) * k;
      hero.style.setProperty('--hp', cur.hp.toFixed(4));
    }
    if (!flat && thesisEl && words.length) {
      const r = thesisEl.getBoundingClientRect();
      const span = Math.max(1, r.height * 0.72 + wh * 0.32);
      cur.th += (clamp((wh * 0.84 - r.top) / span) - cur.th) * k;
      const n = words.length;
      words.forEach((w, i) => {
        const o = clamp(cur.th * (n + 6) - i, 0, 6) / 6;
        w.style.setProperty('--o', (0.14 + 0.86 * o).toFixed(3));
      });
    }
    if (!flat && storyEl) {
      const r = storyEl.getBoundingClientRect();
      const target = clamp(-r.top / Math.max(1, r.height - vh));
      cur.st += (target - cur.st) * k;
      const next = Math.min(steps.length - 1, Math.floor(target * steps.length));
      if (next !== step) {
        step = next;
        steps.forEach((s, i) => s.classList.toggle('on', i === step));
        railItems.forEach((s, i) => s.classList.toggle('on', i <= step));
      }
      if (rail) rail.style.setProperty('--sp', cur.st.toFixed(4));
    }
    if (stacked) {
      for (let i = 0; i < chaps.length - 1; i++) {
        const next = chaps[i + 1].getBoundingClientRect();
        const h = chaps[i].offsetHeight || 1;
        chaps[i].style.setProperty('--s', clamp(1 - (next.top - 88) / h).toFixed(4));
      }
    }
    if (galEl && galRows.length) {
      const r = galEl.getBoundingClientRect();
      if (r.bottom > -100 && r.top < wh + 100) {
        const p = clamp((wh - r.top) / (wh + r.height));
        const w = galEl.clientWidth;
        galRows.forEach((row) => {
          const range = Math.max(0, row.scrollWidth - w);
          const x = row.getAttribute('data-gal-row') === 'a' ? -p * range : -(1 - p) * range;
          row.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
        });
      }
    }
  }

  /* ---------- the hero: the NeoLabs mark at full size, with a node per product ---------- */
  function draw(now) {
    if (!ctx || !anchor) return;
    const c = ctx;
    const t = now / 1000;
    const dt = Math.min(0.05, (now - (lastT || now)) / 1000);
    lastT = now;
    speed += ((slow ? 0.12 : 1) - speed) * 0.06;
    px += (ptx - px) * 0.05;
    py += (pty - py) * 0.05;
    const hp = cur.hp;
    const intro = still ? 1 : easeOut(clamp((now - t0) / 2000));
    const squash = 0.96 - 0.5 * hp;
    const roll = -0.26 - 0.55 * hp + px * 0.03;
    const sc = (0.86 + 0.14 * intro) * (1 + 0.3 * hp);
    const alpha = 1 - clamp((hp - 0.5) / 0.42);
    const cx = anchor.x + px * 16;
    const cy = anchor.y + py * 12 - hp * 30;
    const R = anchor.R;
    const cr = Math.cos(roll);
    const sr = Math.sin(roll);
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.clearRect(0, 0, cw, ch);
    if (alpha <= 0) {
      pnodes.forEach((n) => { n.style.setProperty('--a', 0); n.style.pointerEvents = 'none'; });
      return;
    }
    c.save();
    c.globalAlpha = alpha;
    c.translate(cx, cy);

    const pulse = 0.5 + 0.5 * Math.sin(t * 0.9);
    let g = c.createRadialGradient(0, 0, 0, 0, 0, R * 1.1);
    g.addColorStop(0, `rgba(${colors.glow},${(0.17 + 0.06 * pulse) * intro})`);
    g.addColorStop(1, `rgba(${colors.glow},0)`);
    c.fillStyle = g;
    c.beginPath();
    c.arc(0, 0, R * 1.1, 0, 6.283);
    c.fill();

    c.save();
    c.rotate(roll);
    c.scale(sc, sc * squash);

    dust.forEach((d) => {
      if (!still) d.a += d.v * dt * speed;
      const tw = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 1.4 + d.p));
      c.fillStyle = `rgba(${colors.dust},${(0.5 * tw * intro).toFixed(3)})`;
      c.beginPath();
      c.arc(Math.cos(d.a) * R * d.f, Math.sin(d.a) * R * d.f, d.r, 0, 6.283);
      c.fill();
    });

    // A slow wave leaving the core.
    if (!still) {
      const w = (t % 5) / 5;
      c.strokeStyle = `rgba(${colors.dust},${((1 - w) * 0.2 * intro).toFixed(3)})`;
      c.lineWidth = 1;
      c.beginPath();
      c.arc(0, 0, R * (0.12 + w * 1.1), 0, 6.283);
      c.stroke();
    }

    const lw = Math.max(3, R * 0.022);
    rings.forEach((ring) => {
      if (!still) ring.a += ring.v * dt * speed;
      const r = R * ring.f;
      c.strokeStyle = `rgba(${colors.orbit},.09)`;
      c.lineWidth = 1;
      c.beginPath();
      c.arc(0, 0, r, 0, 6.283);
      c.stroke();
      const gap = (R * 0.13) / r;
      const sweep = 5.1 * intro;
      const end = ring.a - gap;
      const start = end - sweep;
      if (c.createConicGradient) {
        const cg = c.createConicGradient(start, 0, 0);
        cg.addColorStop(0, `rgba(${colors.orbit},0)`);
        cg.addColorStop(sweep / 6.2832, `rgba(${colors.orbit},.92)`);
        cg.addColorStop(Math.min(1, sweep / 6.2832 + 0.001), `rgba(${colors.orbit},0)`);
        c.strokeStyle = cg;
      } else {
        c.strokeStyle = `rgba(${colors.orbit},.55)`;
      }
      c.lineWidth = lw;
      c.lineCap = 'round';
      c.beginPath();
      c.arc(0, 0, r, start, end);
      c.stroke();
    });
    c.restore();

    // The core stays round, like the mark.
    const coreR = R * 0.115 * (0.6 + 0.4 * intro) * (1 + 0.03 * pulse);
    g = c.createRadialGradient(-coreR * 0.3, -coreR * 0.36, coreR * 0.1, 0, 0, coreR);
    g.addColorStop(0, '#fffdf6');
    g.addColorStop(0.5, '#eee3cc');
    g.addColorStop(1, '#b5a888');
    c.fillStyle = g;
    c.beginPath();
    c.arc(0, 0, coreR, 0, 6.283);
    c.fill();
    c.restore();

    const dx = cx - anchor.x;
    const dy = cy - anchor.y;
    pnodes.forEach((n, i) => {
      const ring = rings[i];
      const r = R * ring.f * sc;
      const lx = Math.cos(ring.a) * r;
      const ly = Math.sin(ring.a) * r * squash;
      const x = lx * cr - ly * sr + dx;
      const y = lx * sr + ly * cr + dy;
      const depth = 1 + Math.sin(ring.a) * 0.08 * (1 - squash) * 4;
      n.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) translate(-50%,-31px) scale(${depth.toFixed(3)})`;
      n.style.setProperty('--a', alpha.toFixed(3));
      n.style.pointerEvents = alpha < 0.2 ? 'none' : '';
    });
  }

  function frame(now) {
    requestAnimationFrame(frame);
    const heroVisible = hero && hero.getBoundingClientRect().bottom > 0;
    if (dirty > 0) { dirty--; scrub(); }
    if (heroVisible && (!still || dirty > 0)) draw(now);
  }

  /* ---------- NeoAgent's mascot: the same faces as the app ---------- */
  const mascot = q('[data-mascot]');
  const lit = mascot ? qa('b', mascot) : [];
  let face = 'idle';
  let sx = 0;
  let sy = 0;

  function paintFace() {
    const rows = data.faces[face];
    const follow = face === 'idle' ? 1 : 0;
    lit.forEach((d, i) => {
      const r = rows[Math.floor(i / 9) - sy * follow];
      d.style.opacity = r && r[i % 9 - sx * follow] === '#' ? 1 : 0;
    });
  }

  function lookAt(mx, my) {
    if (!mascot || still) return;
    const r = mascot.getBoundingClientRect();
    const x = Math.round(clamp((mx - r.left - r.width / 2) / 220, -1, 1));
    const y = Math.round(clamp((my - r.top - r.height / 2) / 220, -1, 1));
    if (x !== sx || y !== sy) { sx = x; sy = y; paintFace(); }
  }

  function setFace(name, thenIdleAfter) {
    face = name;
    paintFace();
    setTimeout(() => { face = 'idle'; paintFace(); }, thenIdleAfter);
  }

  if (mascot) {
    paintFace();
    if (!still) {
      let beat = 0;
      setInterval(() => {
        if (document.hidden) return;
        beat++;
        if (beat % 4 === 0) setFace('done', 1500);
        else setFace('blink', 130);
      }, 3200);
    }
  }

  /* ---------- NeoRouter's board re-ranks itself until someone picks a style ---------- */
  const presetChips = qa('[data-preset]');
  const rows = qa('[data-rt]');
  let preset = 0;
  let autoRank = true;

  function showPreset(index) {
    preset = index;
    const { order } = data.presets[index];
    let busy = 0;
    presetChips.forEach((b, i) => {
      b.classList.toggle('on', i === index);
      b.setAttribute('aria-pressed', String(i === index));
    });
    rows.forEach((row, i) => {
      const m = data.models[i];
      const rank = m.busy ? order.length + busy++ : order.indexOf(i);
      row.style.transform = `translateY(${rank * 46}px)`;
      row.classList.toggle('top', !m.busy && rank === 0);
    });
  }

  presetChips.forEach((b, i) => b.addEventListener('click', () => { autoRank = false; showPreset(i); }));
  if (!still && rows.length) {
    setInterval(() => {
      if (routerSeen && autoRank && !document.hidden) showPreset((preset + 1) % data.presets.length);
    }, 3400);
  }

  /* ---------- NeoRecall's "Ask your day" ---------- */
  const askChips = qa('[data-ask]');
  const askQ = q('[data-ask-q]');
  const askWords = q('[data-ask-words]');
  const askCites = q('[data-ask-cites]');

  function showAsk(index) {
    const a = data.asks[index];
    askChips.forEach((b, i) => {
      b.classList.toggle('on', i === index);
      b.setAttribute('aria-pressed', String(i === index));
    });
    askQ.textContent = a.q;
    askWords.replaceChildren(...a.a.split(' ').map((w, i) => {
      const span = document.createElement('span');
      span.className = 'awd';
      span.style.setProperty('--i', i);
      span.textContent = w;
      return span;
    }));
    askCites.replaceChildren(...a.cites.map((s) => {
      const row = document.createElement('div');
      row.className = 'cite';
      const time = document.createElement('time');
      time.textContent = s.t;
      const where = document.createElement('span');
      where.textContent = s.w;
      const kind = document.createElement('span');
      kind.className = 'tag';
      kind.textContent = s.k;
      row.append(time, where, kind);
      return row;
    }));
  }

  askChips.forEach((b, i) => b.addEventListener('click', () => showAsk(i)));

  /* ---------- install tabs and copy ---------- */
  const tabs = qa('[data-tab]');
  const panels = qa('[data-panel]');
  tabs.forEach((tab, i) => tab.addEventListener('click', () => {
    tabs.forEach((t, j) => {
      t.classList.toggle('on', j === i);
      t.setAttribute('aria-pressed', String(j === i));
    });
    panels.forEach((p, j) => { p.hidden = j !== i; });
  }));

  qa('[data-copy]').forEach((button) => {
    let timer = 0;
    const label = (text) => {
      button.textContent = text;
      clearTimeout(timer);
      timer = setTimeout(() => { button.textContent = 'Copy'; }, 1800);
    };
    const cmd = q('[data-cmd]', button.closest('[data-panel]'));
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(cmd.textContent.replace(/^\$/, '').trim());
        label('Copied');
      } catch (e) {
        // No clipboard access: select the command so it can be copied by hand.
        getSelection().selectAllChildren(cmd);
        label('Selected');
      }
    });
  });

  /* ---------- menu ---------- */
  const burger = q('[data-burger]');
  const sheet = q('[data-sheet]');
  const setMenu = (open) => {
    sheet.hidden = !open;
    burger.setAttribute('aria-expanded', String(open));
  };
  burger.addEventListener('click', () => setMenu(sheet.hidden));
  sheet.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !sheet.hidden) { setMenu(false); burger.focus(); } });

  /* ---------- pointer ---------- */
  el.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;
    ptx = (e.clientX / innerWidth - 0.5) * 2;
    pty = (e.clientY / innerHeight - 0.5) * 2;
    const t = e.target;
    const spot = t.closest('[data-spot]');
    if (spot) {
      const r = spot.getBoundingClientRect();
      spot.style.setProperty('--mx', `${e.clientX - r.left}px`);
      spot.style.setProperty('--my', `${e.clientY - r.top}px`);
    }
    if (!still) {
      const m = t.closest('[data-mag]');
      if (m) {
        const r = m.getBoundingClientRect();
        m.style.transform = `translate(${((e.clientX - r.left - r.width / 2) * 0.16).toFixed(1)}px,${((e.clientY - r.top - r.height / 2) * 0.26).toFixed(1)}px)`;
      }
    }
    lookAt(e.clientX, e.clientY);
  }, { passive: true });
  el.addEventListener('pointerover', (e) => { slow = !!e.target.closest('[data-pnode]'); }, { passive: true });
  el.addEventListener('pointerout', (e) => {
    const m = e.target.closest('[data-mag]');
    if (m && !m.contains(e.relatedTarget)) m.style.transform = '';
  }, { passive: true });

  /* ---------- start ---------- */
  let resizeTimer = 0;
  addEventListener('scroll', () => { dirty = 60; }, { passive: true });
  addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(measure, 120);
  });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', readColors);
  reducedQuery.addEventListener('change', () => {
    still = reducedQuery.matches;
    el.classList.toggle('still', still);
    dirty = 60;
  });

  readColors();
  grain();
  measure();
  // The orbit follows its slot, whose size changes with the window and once fonts load.
  if (slot && 'ResizeObserver' in window) new ResizeObserver(measure).observe(slot);
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('ready')));
  setTimeout(() => pnodes.forEach((n) => n.classList.add('in')), still ? 0 : 700);
  requestAnimationFrame(frame);
})();

// NeoCloud page: reveals, the key levels and the install tabs.
(() => {
  'use strict';

  const el = document.querySelector('[data-nc]');
  if (!el) return;

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
    el.querySelectorAll('.rv').forEach((n) => io.observe(n));
  } else {
    el.querySelectorAll('.rv').forEach((n) => n.classList.add('in'));
  }

  // One button group switches one set of panels.
  const switcher = (buttonAttr, panelAttr) => {
    const buttons = Array.from(el.querySelectorAll(`[${buttonAttr}]`));
    const panels = Array.from(el.querySelectorAll(`[${panelAttr}]`));
    buttons.forEach((button, i) => button.addEventListener('click', () => {
      buttons.forEach((b, j) => {
        b.classList.toggle('on', j === i);
        b.setAttribute('aria-pressed', String(j === i));
      });
      panels.forEach((p, j) => { p.hidden = j !== i; });
    }));
  };
  switcher('data-level', 'data-level-panel');
  switcher('data-tab', 'data-panel');

  el.addEventListener('pointermove', (e) => {
    const spot = e.target.closest('[data-spot]');
    if (!spot) return;
    const r = spot.getBoundingClientRect();
    spot.style.setProperty('--mx', `${e.clientX - r.left}px`);
    spot.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, { passive: true });
})();

/* ── Custom cursor (shared across all pages) ── */
(function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const dot  = document.getElementById('c-dot');
  const ring = document.getElementById('c-ring');
  const hint = document.getElementById('c-hint'); // null on pages without a hint element
  let mx = -200, my = -200, rx = -200, ry = -200;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
    if (hint) { hint.style.left = mx + 'px'; hint.style.top = my + 'px'; }
  });

  (function loop() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(loop);
  })();

  /* Slider viewport: hint arrow + ring resize */
  document.querySelectorAll('.slider-viewport').forEach(vp => {
    vp.addEventListener('mousemove', e => {
      if (hint) {
        hint.textContent = e.offsetX < vp.getBoundingClientRect().width / 2 ? '←' : '→';
        hint.classList.add('show');
      }
      ring.style.width       = '44px';
      ring.style.height      = '44px';
      ring.style.borderColor = 'rgba(24,22,20,0.5)';
    });
    vp.addEventListener('mouseleave', () => {
      if (hint) hint.classList.remove('show');
      ring.style.width       = '30px';
      ring.style.height      = '30px';
      ring.style.borderColor = 'rgba(24,22,20,0.38)';
    });
  });

  /* Links + buttons: ring expand */
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width       = '46px';
      ring.style.height      = '46px';
      ring.style.borderColor = 'rgba(24,22,20,0.6)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width       = '30px';
      ring.style.height      = '30px';
      ring.style.borderColor = 'rgba(24,22,20,0.38)';
    });
  });
})();

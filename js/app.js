/* ═══════════════════════════════════════════════════════
   CalcLab · app.js  v4
   ═══════════════════════════════════════════════════════ */

/* ─── XP GLOBAL ─── */
let globalXP = 0;

window.sumarXP = function(pts) {
  globalXP += pts;
  const el = document.getElementById('xp-total');
  if (el) {
    el.textContent = globalXP;
    const badge = el.closest('.xp-badge');
    if (badge) {
      badge.style.transform = 'scale(1.25)';
      setTimeout(() => badge.style.transform = '', 350);
    }
  }
};

window.mostrarXP = function(pts, titulo) {
  const popup = document.getElementById('xp-popup');
  if (!popup) return;
  document.getElementById('xp-popup-title').textContent = titulo || '¡Correcto!';
  document.getElementById('xp-popup-pts').textContent   = '+' + pts + ' XP';
  document.getElementById('xp-popup-icon').textContent  = pts >= 30 ? '🏆' : pts >= 15 ? '⚡' : '✦';
  popup.classList.add('show');
  clearTimeout(popup._t);
  popup._t = setTimeout(() => popup.classList.remove('show'), 1900);
};

/* ─── NAVEGACIÓN ─── */
const PAGE_INITS = {
  derivadas:  () => typeof initCalcDerivadas === 'function' && initCalcDerivadas(),
  limites:    () => typeof initCalcLimites   === 'function' && initCalcLimites(),
  ejercicios: () => typeof initEjercicios    === 'function' && initEjercicios(),
  prueba:     () => typeof initPrueba        === 'function' && initPrueba(),
  juegos:     () => typeof initJuegos        === 'function' && initJuegos(),
  teoria:     () => typeof initTeoria        === 'function' && initTeoria(),
};

function goTo(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tnav').forEach(b => b.classList.remove('active'));

  const pg  = document.getElementById('pg-' + pageId);
  const btn = document.querySelector('[data-page="' + pageId + '"]');
  if (pg)  pg.classList.add('active');
  if (btn) btn.classList.add('active');

  if (pg && !pg.dataset.built && PAGE_INITS[pageId]) {
    PAGE_INITS[pageId]();
    pg.dataset.built = '1';
  }

  if (pageId === 'prueba' && typeof renderizarRanking === 'function') renderizarRanking();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ─── EVENTOS ─── */
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.tnav').forEach(btn => {
    btn.addEventListener('click', function() {
      const p = this.dataset.page;
      if (p) goTo(p);
    });
  });
  console.log('%cCalcLab v4 ✓', 'color:#6366f1;font-weight:800;font-size:1.1rem');
});

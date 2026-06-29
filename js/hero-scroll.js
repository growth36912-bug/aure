/* ============================================================
   HERO SCROLL — PAAM
   Strip horizontal: hero + collection-menu en fila.
   El strip completo se traduce -200vw al hacer scroll.
   El título se mueve 1.5× más rápido (dual velocity).
   Referencia: melem.tokyo teardown [C]
   ============================================================ */

document.addEventListener('preloader:done', initHeroScroll);
document.addEventListener('DOMContentLoaded', function () {
  if (!document.getElementById('preloader')) initHeroScroll();
});

var _heroST   = null;  /* instancia activa de ScrollTrigger */
var _strip, _title, _pinEl;
var _resizeTimer;

function buildHeroAnimation() {
  /* Destruir instancia anterior completa (elimina pin spacer) */
  if (_heroST) {
    _heroST.kill();
    _heroST = null;
  }

  /* Devolver control al CSS antes de reconstruir — clearProps elimina
     el inline style de GSAP sin pisar el transform original del CSS */
  gsap.set(_strip,               { clearProps: 'transform' });
  gsap.set(_title,               { clearProps: 'transform' });
  gsap.set('.hero__overlay',     { clearProps: 'opacity' });
  gsap.set('.hero__scroll-hint', { clearProps: 'opacity' });

  var tl = gsap.timeline({
    scrollTrigger: {
      trigger:       _pinEl,
      start:         'top top',
      end:           '+=1400',
      scrub:         1,
      pin:           true,
      anticipatePin: 1,
      onRefresh: function (self) {
        /* Fuerza la actualización del estado animado al nuevo scroll */
        self.animation && self.animation.progress(self.progress);
      },
    },
  });

  /* Strip recorre 200vw total */
  tl.to(_strip, { x: '-200vw', ease: 'none', duration: 2 }, 0);

  /* Título sale en la primera mitad */
  tl.to(_title, { x: '-55vw', ease: 'none', duration: 1 }, 0);

  /* Overlay oscurece en la primera mitad */
  tl.to('.hero__overlay', { opacity: 1, ease: 'none', duration: 1 }, 0);

  tl.to('.hero__scroll-hint', { opacity: 0, ease: 'none', duration: 0.15 }, 0);

  _heroST = tl.scrollTrigger;

  ScrollTrigger.refresh();
}

function initHeroScroll() {
  gsap.registerPlugin(ScrollTrigger);

  _strip = document.getElementById('horizontal-strip');
  _title = document.querySelector('.hero__title');
  _pinEl = document.getElementById('scroll-pin');

  if (!_strip || !_title || !_pinEl) return;

  buildHeroAnimation();

  /* Resize (incluye F11) — espera a que el browser asiente las nuevas dimensiones */
  window.addEventListener('resize', function () {
    clearTimeout(_resizeTimer);
    _resizeTimer = setTimeout(buildHeroAnimation, 350);
  });

  /* fullscreenchange es el evento exacto de F11 — timeout algo mayor para asegurar */
  document.addEventListener('fullscreenchange', function () {
    clearTimeout(_resizeTimer);
    _resizeTimer = setTimeout(buildHeroAnimation, 500);
  });
}

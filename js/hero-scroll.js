/* ============================================================
   HERO SCROLL — PAAM
   Mientras scrolleas:
     - El strip completo se mueve -200vw (héroe sale / colección entra)
     - El título se mueve -55vw EXTRA = dual velocity
   Tres capas: hero-bg → hero__title → hero__fg (efecto de profundidad)
   ============================================================ */

document.addEventListener('preloader:done', initHeroScroll);
document.addEventListener('DOMContentLoaded', function () {
  if (!document.getElementById('preloader')) initHeroScroll();
});

var _heroST         = null;
var _strip, _title, _pinEl;
var _resizeTimer;
var _initialized    = false;
var _listenersAdded = false;

function buildHeroAnimation() {
  /* 1. Matar instancia anterior — elimina el pin spacer del DOM */
  if (_heroST) {
    _heroST.kill();
    _heroST = null;
  }

  /* 2. Reset explícito: GSAP toma control del centrado del título
        (evita conflicto entre CSS transform y GSAP transform) */
  gsap.set(_strip, { x: 0 });
  gsap.set(_title, { clearProps: 'transform' });
  gsap.set(_title, { xPercent: -50, yPercent: -50, x: 0 });
  gsap.set('.hero__overlay', { opacity: 0 });

  /* 3. Construir animación con las dimensiones actuales del viewport */
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger:             _pinEl,
      start:               'top top',
      end:                 '+=1400',
      scrub:               1.5,
      pin:                 true,
      anticipatePin:       1,
      invalidateOnRefresh: true,
    },
  });

  /* Strip recorre 200vw — el héroe sale, la colección entra */
  tl.to(_strip, { x: '-200vw', ease: 'none', duration: 2 }, 0);

  /* Título recorre 55vw EXTRA encima del strip = va más rápido
     Resultado visual: las letras "pasan" detrás de hero__fg */
  tl.to(_title, { x: '-55vw', ease: 'none', duration: 1 }, 0);

  /* Overlay oscurece mientras el héroe sale */
  tl.to('.hero__overlay', { opacity: 1, ease: 'none', duration: 1 }, 0);

  _heroST = tl.scrollTrigger;
}

function initHeroScroll() {
  if (_initialized) return;
  _initialized = true;

  gsap.registerPlugin(ScrollTrigger);

  _strip = document.getElementById('horizontal-strip');
  _title = document.querySelector('.hero__title');
  _pinEl = document.getElementById('scroll-pin');

  if (!_strip || !_title || !_pinEl) return;

  buildHeroAnimation();

  /* Un solo listener — resize cubre F11, zoom de OS y DevTools
     700ms: tiempo suficiente para que el browser termine la transición de F11 */
  if (!_listenersAdded) {
    _listenersAdded = true;
    window.addEventListener('resize', function () {
      clearTimeout(_resizeTimer);
      _resizeTimer = setTimeout(buildHeroAnimation, 700);
    });
  }
}

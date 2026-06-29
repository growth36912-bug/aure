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

var _heroST        = null;
var _strip, _title, _pinEl;
var _resizeTimer;
var _initialized   = false;
var _listenersAdded = false;

function buildHeroAnimation() {
  /* Destruir instancia anterior completa (elimina pin spacer) */
  if (_heroST) {
    _heroST.kill();
    _heroST = null;
  }

  /* Devolver control al CSS antes de reconstruir */
  gsap.set(_strip,               { clearProps: 'transform' });
  gsap.set(_title,               { clearProps: 'transform' });
  gsap.set('.hero__overlay',     { clearProps: 'opacity' });
  gsap.set('.hero__scroll-hint', { clearProps: 'opacity' });

  /* Diferir un frame para que el DOM procese el clearProps y el
     navegador termine de calcular el nuevo viewport (crítico en F11) */
  gsap.delayedCall(0.05, function () {
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger:            _pinEl,
        start:              'top top',
        end:                '+=1400',
        scrub:              1,
        pin:                true,
        anticipatePin:      1,
        invalidateOnRefresh: true,
        onRefresh: function (self) {
          self.animation && self.animation.progress(self.progress);
        },
      },
    });

    /* Strip recorre 200vw total */
    tl.to(_strip, { x: '-200vw', ease: 'none', duration: 2 }, 0);

    /* Título sale en la primera mitad — dual velocity */
    tl.to(_title, { x: '-55vw',  ease: 'none', duration: 1 }, 0);

    /* Overlay oscurece en la primera mitad */
    tl.to('.hero__overlay',     { opacity: 1, ease: 'none', duration: 1  }, 0);
    tl.to('.hero__scroll-hint', { opacity: 0, ease: 'none', duration: 0.15 }, 0);

    _heroST = tl.scrollTrigger;
  });
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

  /* Un solo listener de resize — fullscreenchange NO dispara en F11 del browser,
     solo dispara la Fullscreen API. Resize cubre F11, DevTools, zoom de OS. */
  if (!_listenersAdded) {
    _listenersAdded = true;
    window.addEventListener('resize', function () {
      clearTimeout(_resizeTimer);
      /* 700ms: tiempo suficiente para que Chrome termine la animación de F11
         (barra de dirección + transición de tabs) antes de reconstruir */
      _resizeTimer = setTimeout(function () {
        buildHeroAnimation();
        /* Segunda pasada 400ms después — captura ajustes tardíos del viewport */
        setTimeout(function () {
          if (_heroST) ScrollTrigger.refresh();
        }, 400);
      }, 700);
    });
  }
}

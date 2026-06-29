/* ============================================================
   PRELOADER — Auré
   Referencia: MeleM teardown (analisis.txt)
   ease: expo.out [C] — duration 1.2s [C]
   ============================================================ */

(function () {
  const el = {
    preloader:  document.getElementById('preloader'),
    wordmark:   document.querySelector('.preloader__wordmark'),
    counter:    document.querySelector('.preloader__counter'),
    borderTop:  document.querySelector('.preloader__border--top'),
    borderBot:  document.querySelector('.preloader__border--bottom'),
    borderL:    document.querySelector('.preloader__border--left'),
    borderR:    document.querySelector('.preloader__border--right'),
  };

  if (!el.preloader) return;

  const tl = gsap.timeline({ onComplete: hidePreloader });

  /* 1. Bordes se expanden desde el centro */
  tl.to([el.borderTop, el.borderBot], {
    width: '100%',
    duration: 1.0,
    ease: 'expo.out',
  }, 0)
  .to([el.borderL, el.borderR], {
    height: '100%',
    duration: 1.0,
    ease: 'expo.out',
  }, 0)

  /* 2. Wordmark se desborra y aparece — [C] MeleM timing */
  .to(el.wordmark, {
    filter: 'blur(0px)',
    opacity: 1,
    duration: 1.2,
    ease: 'expo.out',
  }, 0.2)

  /* 3. Contador sube de 0 a 100 */
  .to({}, {
    duration: 2.2,
    ease: 'none',
    onUpdate() {
      const p = Math.round(this.progress() * 100);
      if (el.counter) el.counter.textContent = String(p).padStart(2, '0') + '%';
    },
  }, 0);

  function hidePreloader() {
    gsap.to(el.preloader, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut',
      delay: 0.3,
      onComplete() {
        el.preloader.style.display = 'none';
        document.body.style.overflow = '';
        /* Dispara evento para que hero-scroll.js arranque */
        document.dispatchEvent(new Event('preloader:done'));
      },
    });
  }

  /* Bloquea scroll durante preloader */
  document.body.style.overflow = 'hidden';
})();

/* ============================================================
   COLLECTION REVEAL — efecto niebla que se levanta
   Cada tarjeta materializa cuando entra al viewport.
   Stagger de 110ms entre tarjetas del mismo grupo de 3.
   ============================================================ */

function initCollectionReveal() {
  const cards = Array.from(document.querySelectorAll('.col-card'));
  if (!cards.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;

      const card   = entry.target;
      const idx    = cards.indexOf(card);
      const stagger = (idx % 3) * 110; /* 0 / 110 / 220 ms dentro del grupo */

      setTimeout(function () {
        card.classList.add('is-visible');
      }, stagger);

      observer.unobserve(card);
    });
  }, {
    threshold: 0.05, /* dispara cuando el 5% de la tarjeta es visible */
  });

  cards.forEach(function (card) {
    observer.observe(card);
  });
}

document.addEventListener('preloader:done', initCollectionReveal);
document.addEventListener('DOMContentLoaded', function () {
  if (!document.getElementById('preloader')) initCollectionReveal();
});

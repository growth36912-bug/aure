/* ============================================================
   NAVIGATION — Auré
   Click en bolsa del collection menu → abre grid de colección
   Click en producto → abre PDP
   ============================================================ */

/* Datos de las 6 colecciones */
const COLLECTIONS = [
  {
    id:          'hobo',
    name:        'PAAM HOBO',
    shortName:   'HOBO',
    img:         'images/bag-01-hobo.png',
    editorialImg:'images/col-01-hobo.png',
    products: [
      { name: 'Hobo Tabaco',      price: '$5,500 MXN' },
      { name: 'Hobo Negro',       price: '$5,500 MXN' },
      { name: 'Hobo Camel',       price: '$5,500 MXN' },
      { name: 'Hobo Vino',        price: '$5,500 MXN' },
      { name: 'Hobo Chocolate',   price: '$5,800 MXN' },
      { name: 'Hobo Miel',        price: '$5,800 MXN' },
    ],
  },
  {
    id:          'cloud',
    name:        'PAAM CLOUD',
    shortName:   'CLOUD',
    img:         'images/bag-02-cloud.png',
    editorialImg:'images/col-02-cloud.png',
    products: [
      { name: 'Cloud Marfil',     price: '$1,800 MXN' },
      { name: 'Cloud Hueso',      price: '$1,800 MXN' },
      { name: 'Cloud Arena',      price: '$1,800 MXN' },
      { name: 'Cloud Blanco',     price: '$1,900 MXN' },
      { name: 'Cloud Crema',      price: '$1,900 MXN' },
      { name: 'Cloud Nude',       price: '$1,900 MXN' },
    ],
  },
  {
    id:          'mini',
    name:        'PAAM MINI',
    shortName:   'MINI',
    img:         'images/bag-03-mini.png',
    editorialImg:'images/col-03-mini.png',
    products: [
      { name: 'Mini Oliva',       price: '$4,900 MXN' },
      { name: 'Mini Musgo',       price: '$4,900 MXN' },
      { name: 'Mini Pino',        price: '$4,900 MXN' },
      { name: 'Mini Verde Agua',  price: '$4,900 MXN' },
      { name: 'Mini Sage',        price: '$5,100 MXN' },
      { name: 'Mini Khaki',       price: '$5,100 MXN' },
    ],
  },
  {
    id:          'classic',
    name:        'PAAM CLASSIC',
    shortName:   'CLASSIC',
    img:         'images/bag-04-classic.png',
    editorialImg:'images/col-04-classic.png',
    products: [
      { name: 'Classic Periwinkle', price: '$2,500 MXN' },
      { name: 'Classic Azul Mar',   price: '$2,500 MXN' },
      { name: 'Classic Lavanda',    price: '$2,500 MXN' },
      { name: 'Classic Cielo',      price: '$2,600 MXN' },
      { name: 'Classic Celeste',    price: '$2,600 MXN' },
      { name: 'Classic Índigo',     price: '$2,700 MXN' },
    ],
  },
  {
    id:          'tote',
    name:        'PAAM TOTE',
    shortName:   'TOTE',
    img:         'images/bag-05-tote.png',
    editorialImg:'images/col-05-tote.png',
    products: [
      { name: 'Tote Sage Grande',   price: '$6,900 MXN' },
      { name: 'Tote Oliva Grande',  price: '$6,900 MXN' },
      { name: 'Tote Pino Grande',   price: '$6,900 MXN' },
      { name: 'Tote Musgo Grande',  price: '$7,100 MXN' },
      { name: 'Tote Khaki Grande',  price: '$7,100 MXN' },
      { name: 'Tote Verde Noche',   price: '$7,200 MXN' },
    ],
  },
  {
    id:          'bucket',
    name:        'PAAM BUCKET',
    shortName:   'BUCKET',
    img:         'images/bag-06-bucket.png',
    editorialImg:'images/col-06-bucket.png',
    products: [
      { name: 'Bucket Rosa',        price: '$5,200 MXN' },
      { name: 'Bucket Durazno',     price: '$5,200 MXN' },
      { name: 'Bucket Blush',       price: '$5,200 MXN' },
      { name: 'Bucket Nude Rosa',   price: '$5,400 MXN' },
      { name: 'Bucket Malva',       price: '$5,400 MXN' },
      { name: 'Bucket Palo Rosa',   price: '$5,400 MXN' },
    ],
  },
];

/* Colores de swatch por colección */
const SWATCHES = {
  hobo:    ['#6B4A2E', '#1A1A1A', '#C6A882', '#6B1E2E', '#3D2010', '#C4951A'],
  cloud:   ['#F5EFE0', '#EDE3CC', '#D4BFA0', '#FFFFFF', '#F0E8D8', '#E8DCC8'],
  mini:    ['#4A5230', '#3D4A28', '#2D3B20', '#7BA896', '#8A9E7A', '#7C7845'],
  classic: ['#8090C8', '#5A7AB8', '#9080B0', '#A8C0E0', '#98B8D8', '#3A4870'],
  tote:    ['#8A9E7A', '#4A5230', '#2D3B20', '#3D4A28', '#7C7845', '#1E2C18'],
  bucket:  ['#E8A0A0', '#E8B090', '#E0B4B4', '#C87878', '#C896B4', '#D4A0A0'],
};

document.addEventListener('DOMContentLoaded', function () {
  /* --- Bind click en tarjetas editoriales --- */
  document.querySelectorAll('.col-card').forEach(function (card) {
    card.addEventListener('click', function () {
      const collId = card.dataset.collection;
      openCollection(collId);
    });
  });

  /* --- Back desde collection grid --- */
  const backFromGrid = document.getElementById('back-from-grid');
  if (backFromGrid) {
    backFromGrid.addEventListener('click', closeCollection);
  }

  /* --- Back desde PDP --- */
  const backFromPdp = document.getElementById('back-from-pdp');
  if (backFromPdp) {
    backFromPdp.addEventListener('click', closePdp);
  }
});

/* ---- COLLECTION GRID ---- */

function openCollection(id) {
  const view      = document.getElementById('collection-view');
  const titleEl   = document.getElementById('collection-view-title');
  const displayEl = document.getElementById('collection-view-display-title');
  const countEl   = document.getElementById('collection-view-count');
  const grid      = document.getElementById('collection-view-grid');

  if (!view) return;

  titleEl.textContent   = 'PAAM — Todos los modelos';
  displayEl.textContent = 'COLLECTION';
  if (countEl) countEl.textContent = '06 modelos';

  /* Mostrar todos los modelos, cada uno con su imagen de fondo blanco */
  grid.innerHTML = COLLECTIONS.map(function (c, i) {
    var num = String(i + 1).padStart(2, '0');
    return '<div class="product-card" data-collection="' + c.id + '" data-index="0">' +
      '<span class="product-card__num">' + num + '</span>' +
      '<img class="product-card__img" src="' + c.img + '" alt="' + c.shortName + '" loading="lazy">' +
      '<p class="product-card__name">' + c.shortName + '</p>' +
      '<p class="product-card__price">' + c.products[0].price + '</p>' +
    '</div>';
  }).join('');

  /* Click en modelo → PDP de ese modelo */
  grid.querySelectorAll('.product-card').forEach(function (card) {
    card.addEventListener('click', function () {
      openPdp(card.dataset.collection, 0);
    });
  });

  view.classList.add('is-open');
  gsap.fromTo(view, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' });
}

function closeCollection() {
  const view = document.getElementById('collection-view');
  gsap.to(view, {
    opacity: 0,
    y: 30,
    duration: 0.35,
    ease: 'power2.in',
    onComplete: function () { view.classList.remove('is-open'); },
  });
}

/* ---- PDP ---- */

function openPdp(collId, productIndex) {
  const coll    = COLLECTIONS.find(function (c) { return c.id === collId; });
  const product = coll.products[productIndex];
  const view    = document.getElementById('product-view');

  document.getElementById('pdp-category').textContent = coll.name;
  document.getElementById('pdp-name').textContent     = product.name;
  document.getElementById('pdp-price').textContent    = product.price;
  document.getElementById('pdp-img').src              = coll.editorialImg || coll.img;
  document.getElementById('pdp-img').alt              = product.name;

  /* Swatches */
  const swatchEl = document.getElementById('pdp-swatches');
  const colors   = SWATCHES[collId] || [];
  swatchEl.innerHTML = colors.map(function (hex, i) {
    return '<button class="swatch' + (i === 0 ? ' is-active' : '') + '" style="background:' + hex + '" aria-label="Color ' + (i + 1) + '"></button>';
  }).join('');

  swatchEl.querySelectorAll('.swatch').forEach(function (sw) {
    sw.addEventListener('click', function () {
      swatchEl.querySelectorAll('.swatch').forEach(function (s) { s.classList.remove('is-active'); });
      sw.classList.add('is-active');
    });
  });

  view.classList.add('is-open');
  gsap.fromTo(view, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' });
}

function closePdp() {
  const view = document.getElementById('product-view');
  gsap.to(view, {
    opacity: 0,
    y: 30,
    duration: 0.35,
    ease: 'power2.in',
    onComplete: function () { view.classList.remove('is-open'); },
  });
}

// ====== PRODUCTOS DE EJEMPLO ======
const products = [
  { name:"Remera Blanca", price:2500, description:"Algodón clásico.", image:"https://via.placeholder.com/400x400?text=Remera" },
  { name:"Perfume Floral", price:4200, description:"50ml unisex.", image:"https://via.placeholder.com/400x400?text=Perfume" },
  { name:"Gorro Lana", price:1800, description:"Color neutro.", image:"https://via.placeholder.com/400x400?text=Gorro" },
  { name:"Pantalón Jeans", price:3500, description:"Corte recto.", image:"https://via.placeholder.com/400x400?text=Jeans" }
];

// ====== SELECCIÓN DE ELEMENTOS ======
const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

// ====== CREAR CARDS DINÁMICAMENTE ======
products.forEach(p => {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.innerHTML = `
    <img src="${p.image}" alt="${p.name}">
    <div class="body">
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <p><strong>$${p.price}</strong></p>
      <button>Agregar al carrito</button>
    </div>
  `;
  track.appendChild(card);
});

// ====== BOTONES CARRUSEL ======
const cardWidth = track.children[0].offsetWidth + 32; // ancho + gap

nextBtn.addEventListener('click', () => {
  track.scrollBy({ left: cardWidth, behavior:'smooth' });
});
prevBtn.addEventListener('click', () => {
  track.scrollBy({ left: -cardWidth, behavior:'smooth' });
});

// ====== DRAG / SWIPE ======
let isDragging = false, startX, scrollLeft;

track.addEventListener('mousedown', e => {
  isDragging = true;
  track.classList.add('dragging');
  startX = e.pageX - track.offsetLeft;
  scrollLeft = track.scrollLeft;
});

track.addEventListener('mouseup', () => { isDragging = false; track.classList.remove('dragging'); });
track.addEventListener('mouseleave', () => { isDragging = false; track.classList.remove('dragging'); });
track.addEventListener('mousemove', e => {
  if(!isDragging) return;
  const x = e.pageX - track.offsetLeft;
  const walk = (x - startX) * 2;
  track.scrollLeft = scrollLeft - walk;
});

// Touch móviles
track.addEventListener('touchstart', e => {
  isDragging = true;
  startX = e.touches[0].pageX - track.offsetLeft;
  scrollLeft = track.scrollLeft;
});
track.addEventListener('touchend', () => { isDragging = false; });
track.addEventListener('touchmove', e => {
  if(!isDragging) return;
  const x = e.touches[0].pageX - track.offsetLeft;
  const walk = (x - startX) * 2;
  track.scrollLeft = scrollLeft - walk;
});

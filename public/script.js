// -------------------- Productos --------------------
const products = [
  { name: "Remera Blanca", price: 2500, description: "Algodón clásico.", image: "https://via.placeholder.com/400x400?text=Remera" },
  { name: "Perfume Floral", price: 4200, description: "50ml unisex.", image: "https://via.placeholder.com/400x400?text=Perfume" },
  { name: "Gorro Lana", price: 1800, description: "Color neutro.", image: "https://via.placeholder.com/400x400?text=Gorro" },
  { name: "Pantalón Jeans", price: 3500, description: "Corte recto.", image: "https://via.placeholder.com/400x400?text=Jeans" }
];

// -------------------- Renderizar Cards --------------------
const track = document.querySelector('.carousel-track');

products.forEach(p => {
  const card = document.createElement("div");
  card.className = "product-card";
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

// -------------------- Carrusel --------------------
const cards = Array.from(track.children);
const gap = parseInt(window.getComputedStyle(track).gap) || 16;
const cardWidth = cards[0].offsetWidth + gap;

const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

prevBtn.addEventListener('click', () => track.scrollBy({ left: -cardWidth, behavior: 'smooth' }));
nextBtn.addEventListener('click', () => track.scrollBy({ left: cardWidth, behavior: 'smooth' }));

// -------------------- Drag / Touch --------------------
let isDragging = false, startX, scrollStart;

const startDrag = e => {
  isDragging = true;
  track.classList.add('dragging');
  startX = e.type.includes('touch') ? e.touches[0].pageX : e.pageX;
  scrollStart = track.scrollLeft;
};

const stopDrag = () => {
  isDragging = false;
  track.classList.remove('dragging');
};

const doDrag = e => {
  if(!isDragging) return;
  e.preventDefault();
  const x = e.type.includes('touch') ? e.touches[0].pageX : e.pageX;
  const walk = (x - startX) * 2; // velocidad
  track.scrollLeft = scrollStart - walk;
};

track.addEventListener('mousedown', startDrag);
track.addEventListener('mouseup', stopDrag);
track.addEventListener('mouseleave', stopDrag);
track.addEventListener('mousemove', doDrag);

track.addEventListener('touchstart', startDrag);
track.addEventListener('touchend', stopDrag);
track.addEventListener('touchmove', doDrag);

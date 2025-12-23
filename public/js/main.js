// ====== LISTA DE PRODUCTOS ======
const productos = [
{
id: 1,
nombre: "Remera Blanca",
precio: 2500,
descripcion: "Algodón clásico.",
imagen: "[https://via.placeholder.com/400x400?text=Remera](https://via.placeholder.com/400x400?text=Remera)"
},
{
id: 2,
nombre: "Perfume Floral",
precio: 4200,
descripcion: "50ml unisex.",
imagen: "[https://via.placeholder.com/400x400?text=Perfume](https://via.placeholder.com/400x400?text=Perfume)"
},
{
id: 3,
nombre: "Gorro Lana",
precio: 1800,
descripcion: "Color neutro.",
imagen: "[https://via.placeholder.com/400x400?text=Gorro](https://via.placeholder.com/400x400?text=Gorro)"
},
{
id: 4,
nombre: "Pantalón Jeans",
precio: 3500,
descripcion: "Corte recto.",
imagen: "[https://via.placeholder.com/400x400?text=Jeans](https://via.placeholder.com/400x400?text=Jeans)"
}
];

// ====== SELECCIÓN DE ELEMENTOS ======
const pistaCarrusel = document.querySelector('.carousel-track');
const botonAnterior = document.querySelector('.carousel-btn.prev');
const botonSiguiente = document.querySelector('.carousel-btn.next');

// ====== CREAR TARJETAS DINÁMICAS ======
productos.forEach(producto => {
const tarjeta = document.createElement('div');
tarjeta.className = 'tarjeta-producto';

tarjeta.innerHTML = `     <img src="${producto.imagen}" alt="${producto.nombre}">     <div class="cuerpo">       <h3>${producto.nombre}</h3>       <p>${producto.descripcion}</p>       <p><strong>$${producto.precio}</strong></p>       <button onclick='agregarAlCarrito(${JSON.stringify(producto)})'>
        Agregar al carrito       </button>     </div>
  `;

pistaCarrusel.appendChild(tarjeta);
});

// ====== BOTONES DEL CARRUSEL ======
const anchoTarjeta = pistaCarrusel.children[0].offsetWidth + 32;

botonSiguiente.addEventListener('click', () => {
pistaCarrusel.scrollBy({ left: anchoTarjeta, behavior:'smooth' });
});

botonAnterior.addEventListener('click', () => {
pistaCarrusel.scrollBy({ left: -anchoTarjeta, behavior:'smooth' });
});

// ====== DRAG / SWIPE ======
let arrastrando = false, startX, scrollLeft;

pistaCarrusel.addEventListener('mousedown', e => {
arrastrando = true;
pistaCarrusel.classList.add('dragging');
startX = e.pageX - pistaCarrusel.offsetLeft;
scrollLeft = pistaCarrusel.scrollLeft;
});

pistaCarrusel.addEventListener('mouseup', () => {
arrastrando = false;
pistaCarrusel.classList.remove('dragging');
});

pistaCarrusel.addEventListener('mouseleave', () => {
arrastrando = false;
pistaCarrusel.classList.remove('dragging');
});

pistaCarrusel.addEventListener('mousemove', e => {
if (!arrastrando) return;
const x = e.pageX - pistaCarrusel.offsetLeft;
const walk = (x - startX) * 2;
pistaCarrusel.scrollLeft = scrollLeft - walk;
});

// ===== TOUCH EN MÓVIL =====
pistaCarrusel.addEventListener('touchstart', e => {
arrastrando = true;
startX = e.touches[0].pageX - pistaCarrusel.offsetLeft;
scrollLeft = pistaCarrusel.scrollLeft;
});

pistaCarrusel.addEventListener('touchend', () => { arrastrando = false; });

pistaCarrusel.addEventListener('touchmove', e => {
if (!arrastrando) return;
const x = e.touches[0].pageX - pistaCarrusel.offsetLeft;
const walk = (x - startX) * 2;
pistaCarrusel.scrollLeft = scrollLeft - walk;
});


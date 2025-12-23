// js/productos.js
// Renderiza el grid completo de productos (productos.html)

document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("lista-productos");
  if (!lista) return;

  const productos = window.PRODUCTOS || [];

  lista.innerHTML = productos.map(p => `
    <div class="product-card">
      <img src="${p.imagen}" alt="${p.nombre}">
      <div class="body">
        <h3>${p.nombre}</h3>
        <p class="price">$${p.precio}</p>
        <button class="btn-add" data-id="${p.id}">Agregar al carrito</button>
      </div>
    </div>
  `).join("");

  // Attach listeners (delegación)
  lista.querySelectorAll(".btn-add").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.currentTarget.dataset.id, 10);
      const producto = productos.find(x => x.id === id);
      if (producto && window.agregarAlCarrito) {
        window.agregarAlCarrito(producto);
      } else {
        console.error("Producto o función agregarAlCarrito no disponible", id);
      }
    });
  });
});


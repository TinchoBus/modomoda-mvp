// js/index-mini-carousel.js
// Mini carrusel de home (toma los primeros 4 productos)

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("mini-slider");
  if (!contenedor) return;

  const productos = (window.PRODUCTOS || []).slice(0, 4);

  contenedor.innerHTML = productos.map(p => `
    <div class="product-card mini">
      <img src="${p.imagen}" alt="${p.nombre}">
      <div class="body">
        <h3>${p.nombre}</h3>
        <p class="price">$${p.precio}</p>
      </div>
    </div>
  `).join("");

  const btnPrev = document.querySelector(".carousel-btn.prev");
  const btnNext = document.querySelector(".carousel-btn.next");
  const cardWidth = contenedor.children[0]?.offsetWidth || 260;

  if (btnNext) btnNext.addEventListener("click", () => contenedor.scrollBy({ left: cardWidth, behavior: "smooth" }));
  if (btnPrev) btnPrev.addEventListener("click", () => contenedor.scrollBy({ left: -cardWidth, behavior: "smooth" }));

  // drag/touch (simple)
  let dragging = false, startX = 0, scrollLeft = 0;
  contenedor.addEventListener('mousedown', e => {
    dragging = true; startX = e.pageX - contenedor.offsetLeft; scrollLeft = contenedor.scrollLeft;
  });
  window.addEventListener('mouseup', () => dragging = false);
  contenedor.addEventListener('mousemove', e => {
    if(!dragging) return;
    const x = e.pageX - contenedor.offsetLeft;
    contenedor.scrollLeft = scrollLeft - (x - startX);
  });
  contenedor.addEventListener('touchstart', e => { startX = e.touches[0].pageX - contenedor.offsetLeft; scrollLeft = contenedor.scrollLeft; dragging = true; });
  contenedor.addEventListener('touchend', () => dragging = false);
  contenedor.addEventListener('touchmove', e => {
    if(!dragging) return;
    const x = e.touches[0].pageX - contenedor.offsetLeft;
    contenedor.scrollLeft = scrollLeft - (x - startX);
  });
});

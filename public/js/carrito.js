/// js/carrito.js
// Lógica en castellano: obtener/guardar/agregar/eliminar/finalizar

(function(){
  // Exponer funciones en window para que otros scripts puedan llamarlas
  window.obtenerCarrito = function() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
  };

  window.guardarCarrito = function(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  };

  window.agregarAlCarrito = function(producto) {
    const carrito = window.obtenerCarrito();
    const existente = carrito.find(item => item.id === producto.id);
    if (existente) existente.cantidad++;
    else carrito.push({...producto, cantidad: 1});
    window.guardarCarrito(carrito);
    window.actualizarContadorCarrito && window.actualizarContadorCarrito();
    mostrarNotificacion("Producto agregado 🛍️");
  };

  window.eliminarDelCarrito = function(id) {
    let carrito = window.obtenerCarrito().filter(i => i.id !== id);
    window.guardarCarrito(carrito);
    mostrarNotificacion("Producto eliminado");
  };

  window.actualizarContadorCarrito = function() {
    const c = window.obtenerCarrito();
    const total = c.reduce((s, it) => s + (it.cantidad||0), 0);
    const elem = document.querySelector(".cart-link a") || document.querySelector("#cart-btn");
    if (elem) elem.textContent = `🛒 ${total}`;
  };

  function mostrarNotificacion(texto) {
    const aviso = document.createElement("div");
    aviso.className = "notificacion";
    aviso.textContent = texto;
    document.body.appendChild(aviso);
    setTimeout(() => aviso.remove(), 2200);
  }

  // Render del carrito en carrito.html
  function mostrarCarritoEnPagina() {
    const cont = document.getElementById("cart-items");
    if (!cont) return;
    const carrito = window.obtenerCarrito();
    if (carrito.length === 0) {
      cont.innerHTML = `<div class="carrito-vacio">Tu carrito está vacío 🛒</div>`;
      const tot = document.getElementById("total-price"); if(tot) tot.textContent = "$0";
      return;
    }
    cont.innerHTML = carrito.map(item => `
      <div class="cart-item">
        <div class="item-left">
          <img src="${item.imagen}" alt="${item.nombre}" />
        </div>
        <div class="item-mid">
          <div class="item-nombre">${item.nombre}</div>
          <div class="item-info">Cantidad: ${item.cantidad}</div>
        </div>
        <div class="item-right">
          <div class="item-info">$${item.precio}</div>
          <button class="btn-eliminar" data-id="${item.id}">Eliminar</button>
        </div>
      </div>
    `).join("");
    const total = carrito.reduce((s,i) => s + i.precio * (i.cantidad||1), 0);
    const totEl = document.getElementById("total-price"); if (totEl) totEl.textContent = `$${total}`;
    // attach eliminar listeners
    cont.querySelectorAll(".btn-eliminar").forEach(b => {
      b.addEventListener("click", e => {
        const id = parseInt(e.currentTarget.dataset.id,10);
        window.eliminarDelCarrito(id);
        mostrarCarritoEnPagina();
        window.actualizarContadorCarrito();
      });
    });
  }

  // Finalizar compra
  function finalizarCompra() {
    const carrito = window.obtenerCarrito();
    if (carrito.length === 0) {
      mostrarNotificacion("Tu carrito está vacío 🛒");
      return;
    }
    // Mensaje visual (no alert)
    const mensaje = document.getElementById("mensaje-final");
    if(mensaje) {
      mensaje.innerHTML = `<div class="mensaje-compra">🎉 ¡Gracias por su compra!<br>Se le agradece por su compra, de parte del equipo de ModoModa. Vuelva pronto ❤️</div>`;
    } else {
      mostrarNotificacion("Gracias por su compra. Vuelva pronto.");
    }
    localStorage.removeItem('carrito');
    window.actualizarContadorCarrito();
    mostrarCarritoEnPagina();
  }

  // Inicialización del DOM
  document.addEventListener("DOMContentLoaded", () => {
    window.actualizarContadorCarrito();
    mostrarCarritoEnPagina();
    const botonFinalizar = document.getElementById("checkout-btn");
    if (botonFinalizar) botonFinalizar.addEventListener("click", finalizarCompra);
    // Si hay botones "Agregar" generados por otras páginas pero no conectados: delegación
    document.body.addEventListener("click", e => {
      const target = e.target;
      if (target.matches && target.matches(".btn-add")) {
        const id = parseInt(target.dataset.id, 10);
        const producto = (window.PRODUCTOS || []).find(p => p.id === id);
        if (producto) window.agregarAlCarrito(producto);
      }
    });
  });

})();

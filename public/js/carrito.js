const cartItems = document.getElementById("cart-items");
const totalPriceEl = document.getElementById("total-price");
const checkoutBtn = document.getElementById("checkout-btn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Función para renderizar el carrito
function renderCart() {
  cartItems.innerHTML = "";

  if(cart.length === 0){
    cartItems.textContent = "Tu carrito está vacío 🛒";
    totalPriceEl.textContent = "$0";
    return;
  }

  cart.forEach((p, index) => {
    const item = document.createElement("div");
    item.className = "cart-item";

    item.innerHTML = `
      <span class="name">${p.name}</span>
      <span class="price">$${p.price}</span>
      <input type="number" min="1" value="${p.quantity || 1}" data-index="${index}" class="qty">
      <button class="remove" data-index="${index}">❌</button>
    `;

    cartItems.appendChild(item);
  });

  updateTotal();
  attachEvents();
}

// Función para actualizar total
function updateTotal() {
  let total = cart.reduce((acc, p) => acc + p.price * (p.quantity || 1), 0);
  totalPriceEl.textContent = `$${total}`;
}

// Función para manejar eventos de cantidad y eliminar
function attachEvents() {
  // Cambiar cantidad
  document.querySelectorAll(".qty").forEach(input => {
    input.addEventListener("change", (e) => {
      const idx = e.target.dataset.index;
      cart[idx].quantity = parseInt(e.target.value);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateTotal();
    });
  });

  // Eliminar producto
  document.querySelectorAll(".remove").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const idx = e.target.dataset.index;
      cart.splice(idx, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });
  });
}

// Botón finalizar compra
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    if(cart.length === 0){
      alert("Tu carrito está vacío 🛒");
      return;
    }
    alert(`Compra finalizada! Total: ${totalPriceEl.textContent}`);
    localStorage.removeItem("cart");
    cart = [];
    renderCart();
  });
}

// Inicializar carrito
renderCart();


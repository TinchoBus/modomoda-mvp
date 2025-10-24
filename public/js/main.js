// Array de productos simulados
const products = [
  { name: "Remera Básica Blanca", price: 2500, image: "https://via.placeholder.com/400x400?text=Remera+Blanca" },
  { name: "Perfume Floral", price: 4200, image: "https://via.placeholder.com/400x400?text=Perfume" },
  { name: "Gorro de Lana", price: 1800, image: "https://via.placeholder.com/400x400?text=Gorro" }
];

// Mostrar productos solo si existe el contenedor
const productList = document.getElementById("product-list");

if (productList) {
  products.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p><strong>$${p.price}</strong></p>
      <button data-id="${i}">Agregar al carrito</button>
    `;
    productList.appendChild(card);
  });

  // Agregar funcionalidad a los botones
  document.querySelectorAll(".product-card button").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(products[id]);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${products[id].name} agregado al carrito!`);
    });
  });
}

// Botón del carrito en el header
const cartBtn = document.getElementById("cart-btn");
if (cartBtn) {
  cartBtn.addEventListener("click", () => {
    window.location.href = "/carrito.html";
  });
}



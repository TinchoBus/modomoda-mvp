// Productos de ejemplo (podrán venir del backend después)
const products = [
  {
    name: "Remera Básica Blanca",
    price: 2500,
    description: "Remera de algodón, corte clásico.",
    image: "https://via.placeholder.com/400x400?text=Remera+Blanca"
  },
  {
    name: "Perfume Floral",
    price: 4200,
    description: "Perfume femenino-unisex, 50ml.",
    image: "https://via.placeholder.com/400x400?text=Perfume"
  },
  {
    name: "Gorro de Lana",
    price: 1800,
    description: "Gorro tejido, color neutro.",
    image: "https://via.placeholder.com/400x400?text=Gorro"
  }
];

// Renderizar productos
const productList = document.getElementById("product-list");

products.forEach(p => {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <img src="${p.image}" alt="${p.name}">
    <h3>${p.name}</h3>
    <p>${p.description}</p>
    <p><strong>$${p.price}</strong></p>
    <button>Agregar al carrito</button>
  `;
  productList.appendChild(card);
});

document.getElementById("cart-btn").addEventListener("click", () => {
  alert("🛒 Carrito próximamente disponible...");
});

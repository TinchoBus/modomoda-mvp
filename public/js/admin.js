// Funcionalidad simulada de administración
const adminActions = document.querySelectorAll(".admin-actions button");

adminActions.forEach(btn => {
  btn.addEventListener("click", () => {
    alert(`Funcionalidad de "${btn.textContent}" próximamente disponible`);
  });
});

// =========================
//   CARRITO DE COMPRAS
// =========================

// Objeto del carrito (se carga desde localStorage si existe)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Elementos del DOM
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

// =========================
//   ACTUALIZAR CARRITO
// =========================
function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}">
        <div class="item-info">
          <h4>${item.name}</h4>
          <p>₲ ${item.price.toLocaleString()}</p>

          <div class="item-controls">
            <button onclick="changeQuantity(${index}, -1)">−</button>
            <span>${item.quantity}</span>
            <button onclick="changeQuantity(${index}, 1)">+</button>
          </div>
        </div>

        <button class="delete-btn" onclick="removeItem(${index})">🗑️</button>
      </div>
    `;
  });

  cartTotal.textContent = total.toLocaleString();
  cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);

  localStorage.setItem("cart", JSON.stringify(cart));
}

// =========================
//   AÑADIR PRODUCTO
// =========================
function addToCart(name, price, img) {
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ name, price, img, quantity: 1 });
  }

  updateCart();
}

// Manejar el click en los botones "Agregar al carrito"
document.querySelectorAll(".add-to-cart").forEach(btn => {
  btn.addEventListener("click", () => {
    addToCart(
      btn.dataset.name,
      Number(btn.dataset.price),
      btn.dataset.img
    );
  });
});

// =========================
//   CAMBIAR CANTIDAD
// =========================
function changeQuantity(index, amount) {
  cart[index].quantity += amount;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1); 
  }

  updateCart();
}

// =========================
//   ELIMINAR PRODUCTO
// =========================
function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

// =========================
//   ABRIR Y CERRAR CARRITO
// =========================
function openCart() {
  document.getElementById("cart").classList.add("open");
}

function closeCart() {
  document.getElementById("cart").classList.remove("open");
}

// =========================
//   VALIDACIÓN FORMULARIO
// =========================
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const motivo = document.getElementById("motivo").value;

  if (nombre === "" || email === "" || motivo === "") {
    alert("Por favor completá todos los campos.");
    e.preventDefault();
  }

  if (!email.includes("@") || !email.includes(".")) {
    alert("Ingresá un correo electrónico válido.");
    e.preventDefault();
  }
});

// Cargar el carrito al iniciar
updateCart();

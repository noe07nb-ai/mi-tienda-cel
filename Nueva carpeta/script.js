// ===============================
// LISTA DE PRODUCTOS (ARRAY)
// ===============================
const productos = [
  {
    nombre: "Xiaomi 14T",
    descripcion:
      "Xiaomi se presenta como una opción atractiva para quienes buscan un smartphone con grandes prestaciones y precio accesible.",
    precio: 350000,
    imagen: "imagen/xiaomi.png",
  },
  {
    nombre: "Samsung Galaxy S",
    descripcion:
      "El Galaxy S combina potencia, estilo y una experiencia completa con diseño premium y excelente cámara.",
    precio: 350000,
    imagen: "imagen/todos.jpg",
  },
  {
    nombre: "iPhone • Motorola • Redmi • Samsung",
    descripcion:
      "Opciones ideales para quienes buscan rendimiento, diseño y buena tecnología sin gastar de más.",
    precio: 500000,
    imagen: "imagen/todos.jpg",
  },
];

// ===============================
// FUNCIÓN DE CARGA DINÁMICA
// ===============================
function cargarProductos() {
  const contenedor = document.getElementById("productos-container");
  contenedor.innerHTML = "";

  productos.forEach((producto) => {
    const article = document.createElement("article");
    article.classList.add("producto");

    article.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h5>${producto.nombre}</h5>
      <p>${producto.descripcion}</p>
      <p class="precio">₲ ${producto.precio.toLocaleString()}</p>
      <button class="add-to-cart"
        data-name="${producto.nombre}"
        data-price="${producto.precio}"
        data-img="${producto.imagen}">
        Agregar al carrito
      </button>
    `;

    contenedor.appendChild(article);
  });
}

// ===============================
// EJECUTAR AL CARGAR LA PÁGINA
// ===============================
document.addEventListener("DOMContentLoaded", cargarProductos);
// ===============================
// CARRITO DE COMPRAS + LOCALSTORAGE
// ===============================
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

// EVENT DELEGATION PARA BOTONES DINÁMICOS
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-to-cart")) {
    const nombre = e.target.dataset.name;
    const precio = Number(e.target.dataset.price);

    agregarAlCarrito(nombre, precio);
  }

  if (e.target.classList.contains("remove-item")) {
    const index = e.target.dataset.index;
    eliminarProducto(index);
  }
});

function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  guardarCarrito();
  actualizarCarrito();
}

function eliminarProducto(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  actualizarCarrito();
}

function actualizarCarrito() {
  cartItems.innerHTML = "";
  let total = 0;

  carrito.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <span>${item.nombre}</span>
      <span>₲ ${item.precio.toLocaleString()}</span>
      <button class="remove-item" data-index="${index}">✖</button>
    `;
    cartItems.appendChild(div);
    total += item.precio;
  });

  cartCount.textContent = carrito.length;
  cartTotal.textContent = total.toLocaleString();
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// ===============================
// ABRIR / CERRAR CARRITO
// ===============================
function openCart() {
  document.getElementById("cart").classList.add("open");
}

function closeCart() {
  document.getElementById("cart").classList.remove("open");
}
// ===============================
// VACIAR CARRITO
// ===============================
document.getElementById("clear-cart").addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
  carrito = [];
  localStorage.removeItem("carrito");
  actualizarCarrito();
}

// ===============================
// CARGAR CARRITO AL INICIAR
// ===============================
document.addEventListener("DOMContentLoaded", actualizarCarrito);
// ===============================
// ===============================
document.addEventListener("click", (e) => {
  const btn = e.target.closest("#checkout-btn");
  if (btn) finalizarCompra();
});

function finalizarCompra() {
  if (!carrito || carrito.length === 0) {
    alert("🛒 Tu carrito está vacío");
    return;
  }

  mostrarLoader("⏳ Procesando compra...");

  setTimeout(() => {
    ocultarLoader();

    alert("✅ Gracias por su compra");

    carrito.length = 0;
    localStorage.removeItem("carrito");
    actualizarCarrito();
    closeCart();
  }, 2000);
  }
function mostrarLoader(texto) {
  const loader = document.createElement("div");
  loader.id = "loader";
  loader.innerHTML = `
    <div class="loader-box">${texto}</div>
  `;
  document.body.appendChild(loader);
}

function ocultarLoader() {
  document.getElementById("loader")?.remove();
}


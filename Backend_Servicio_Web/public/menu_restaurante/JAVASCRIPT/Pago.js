// Obtener los datos del carrito desde localStorage
const cart = JSON.parse(localStorage.getItem("cart")) || [];

// Asegurarse de que el total se guarda correctamente desde Carrito.js
let totalCalculated = parseFloat(localStorage.getItem("orderTotal")) || 0;

// Recalcular el total si no está disponible
if (!totalCalculated) {
  totalCalculated = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
}

// Función para mostrar los nombres de los platos y el total del pedido
function displayCartSummary() {
  const itemList = document.getElementById("item-list");
  const totalAmount = document.getElementById("total-amount");

  // Limpiar los elementos actuales del contenedor
  itemList.innerHTML = "";

  // Mostrar los nombres de los platos con la cantidad
  cart.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.name} x${item.quantity}`; // Mostrar el nombre del plato con su cantidad
    itemList.appendChild(listItem);
  });

  // Mostrar el total ya calculado
  totalAmount.textContent = `Total del Pedido: $${totalCalculated.toLocaleString()}`;
}

// Ejecutar la función al cargar la página
document.addEventListener("DOMContentLoaded", displayCartSummary);

// Función para enviar el pedido al servicio web mediante POST
function enviarPedido() {
  // Captura de valores del formulario
  const customerName = document.getElementById('nombre').value;
  const customerPhone = document.getElementById('telefono').value;
  const customerEmail = document.getElementById('email').value;
  const customerAddress = document.getElementById('direccion').value;

  // Captura del carrito desde localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const total = cart.reduce((acc, item) => acc + item.precio_unitario * item.cantidad, 0); // Calcular total

  // Validar que los datos sean correctos antes de enviarlos
  if (!customerName || !customerPhone || !customerEmail || !customerAddress) {
      alert('Por favor, completa todos los campos.');
      return;
  }

  // Enviar datos al backend
  fetch("/guardar-orden", {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          nombre: customerName,
          telefono: customerPhone,
          email: customerEmail,
          direccion: customerAddress,
          productos: cart,
          total: total, // Incluir el total calculado
      }),
  })
  .then(response => response.json())
  .then(data => {
      if (data.message) {
          alert('Pedido enviado correctamente');
          localStorage.removeItem('cart'); // Limpiar el carrito después de enviar
      } else {
          throw new Error(data.error || 'Error al enviar el pedido');
      }
  })
  .catch(error => {
      console.error('Error al enviar el pedido:', error);
      alert('Error al enviar el pedido');
  });
}

function finalizarCompra() {
  console.log("Finalizar Compra Iniciada");
  
  // Aquí puedes realizar acciones previas al envío, como validaciones
  enviarPedido(); // Llama a la función para enviar el pedido
}

// Manejador para el envío del formulario
document
  .getElementById("payment-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    enviarPedido();
  });

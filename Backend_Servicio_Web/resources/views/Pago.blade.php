<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario de Pago - La Pinta</title>
    <!-- Enlace a la hoja de estilos usando el helper asset() -->
    <link rel="stylesheet" href="{{ asset('menu_restaurante/CSS/pago.css') }}">
    <!-- Fuentes de Google -->
    <link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Questrial&display=swap" rel="stylesheet">
    <!-- Enlace al archivo JavaScript usando el helper asset() -->
    <script src="{{ asset('menu_restaurante/JAVASCRIPT/Pago.js') }}" defer></script>
</head>

<body>
    <img src="{{ asset('menu_restaurante/Imagenes/Home/LaPintaLogo.png') }}" alt="Imagen">
    <h1>Formulario de Pago</h1>
    <form id="payment-form">
        <label for="name">Nombre Completo:</label>
        <input type="text" id="name" name="name" required>

        <label for="telefono">Telefono:</label>
        <input type="telefono" id="telefono" name="telefono" required>

        <label for="email">Correo Electrónico:</label>
        <input type="email" id="email" name="email" required>

        <label for="address">Dirección:</label>
        <input type="text" id="address" name="address" required>

        <label for="payment-method">Método de Pago:</label>
        <select id="payment-method" name="payment-method" required>
            <option value="credit-card">Tarjeta de Crédito</option>
            <option value="debit-card">Tarjeta de Débito</option>
            <option value="paypal">PayPal</option>
        </select>

        <div id="cart-items" class="cart-items">
            <!-- Los elementos del carrito se insertarán aquí dinámicamente -->
        </div>

        <button type="submit">Pagar</button>
    </form>

    <div id="order-summary"></div>
        <h2>Resumen del Pedido</h2>
        <ul id="item-list"></ul>
        <p id="total-amount"></p>
    </div>
</body>
</html>

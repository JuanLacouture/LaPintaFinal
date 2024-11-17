// Función para borrar el placeholder al hacer clic en el campo
function handleFocus(event) {
    event.target.dataset.placeholder = event.target.placeholder;
    event.target.placeholder = '';
}

// Función para restaurar el placeholder si el campo está vacío
function handleBlur(event) {
    if (event.target.value === '') {
        event.target.placeholder = event.target.dataset.placeholder;
    }
}

// Seleccionar los campos de usuario y contraseña
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

// Añadir eventos de focus y blur
usernameInput.addEventListener('focus', handleFocus);
usernameInput.addEventListener('blur', handleBlur);
passwordInput.addEventListener('focus', handleFocus);
passwordInput.addEventListener('blur', handleBlur);

// Función para validar el login y redirigir al administrador
async function redirectToAdmin() {
    const username = usernameInput.value;
    const password = passwordInput.value;

    // Verificar que los campos no estén vacíos
    if (username === '' || password === '') {
        alert('Por favor, ingresa tu usuario y contraseña.');
        return;
    }

    try {
        // Hacer una solicitud POST al backend para validar el usuario
        const response = await fetch('validate-login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        // Si la respuesta es exitosa, redirigir a admin.html
        if (data.success) {
            alert('Login exitoso. Redireccionando...');
            sessionStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'admin.html';
        } else {
            alert('Usuario o contraseña incorrectos. Intenta de nuevo.');
        }
    } catch (error) {
        console.error('Error al validar el login:', error);
        alert('Hubo un problema con el servidor. Intenta de nuevo más tarde.');
    }
}
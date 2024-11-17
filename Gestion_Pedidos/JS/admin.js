$(document).ready(function () {
    // Datos simulados para la tabla de pedidos
    const pedidos = [
        { nombre: 'Juan Perez', numero: '123456789', email: 'juan@mail.com', direccion: 'Calle 123', productos: 'Pizza, Bebida', estado: 'Pendiente' },
        { nombre: 'Maria Garcia', numero: '987654321', email: 'maria@mail.com', direccion: 'Avenida 456', productos: 'Ensalada, Jugo', estado: 'Atendido' },
        { nombre: 'Carlos Lopez', numero: '555555555', email: 'carlos@mail.com', direccion: 'Carrera 789', productos: 'Hamburguesa, Cerveza', estado: 'Pendiente' }
    ];

    // Inicializar DataTable
    const tablaPedidos = $('#tablaPedidos').DataTable({
        data: pedidos,
        columns: [
            { data: 'nombre' },
            { data: 'numero' },
            { data: 'email' },
            { data: 'direccion' },
            { data: 'productos' },
            {
                data: 'estado',
                render: function (data, type, row, meta) {
                    return `
                        <select class="form-select estado-select">
                            <option value="Pendiente" ${data === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
                            <option value="Atendido" ${data === 'Atendido' ? 'selected' : ''}>Atendido</option>
                        </select>
                    `;
                }
            },
            {
                data: null,
                defaultContent: `
                    <button class="btn btn-success btn-sm btn-view"><i class="fas fa-eye"></i> Ver</button>
                    <button class="btn btn-warning btn-sm btn-edit"><i class="fas fa-edit"></i> Editar</button>
                `
            }
        ],
        language: {
            url: "//cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json"
        }
    });

    // Función de búsqueda personalizada
    $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
        const filtroEstado = $('#filterEstado').val();
        const estado = data[5]; // La columna de "Estado" es la sexta columna (índice 5)

        // Si el filtro está en "Todos", mostrar todas las filas
        if (filtroEstado === 'Todos') {
            return true;
        }

        // Filtrar solo las filas que coincidan con el estado seleccionado
        return estado === filtroEstado;
    });

    // Manejar el cambio de estado
    $('#tablaPedidos').on('change', '.estado-select', function () {
        const nuevoEstado = $(this).val();
        const fila = $(this).closest('tr');
        const data = tablaPedidos.row(fila).data();

        // Actualizar el estado en los datos de la fila
        data.estado = nuevoEstado;

        // Actualizar la fila en DataTables
        tablaPedidos.row(fila).data(data).invalidate().draw();

        alert(`El estado del pedido ha sido cambiado a ${nuevoEstado}`);
    });

    // Manejar el filtro por estado
    $('#filterEstado').on('change', function () {
        tablaPedidos.draw(); // Aplicar el filtro personalizado
    });

    // Manejar el clic en el botón de Logout
    $('#logoutBtn').on('click', () => {
        const confirmLogout = confirm("¿Estás seguro de que deseas cerrar sesión?");
        if (confirmLogout) {
            window.location.href = "index.html";
        }
    });
});

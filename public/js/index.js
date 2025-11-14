const API_URL = 'http://localhost:3000/api';
const lista_products = document.getElementById('lista-products');
const lista_categories = document.getElementById('lista-categories');
const lista_licences = document.getElementById('lista-licences');
const lista_users = document.getElementById('lista-users');
const form = document.getElementById('form-crear');
const inputNombre = document.getElementById('input-nombre');
const inputCategoria = document.getElementById('input-categoria');
const statusDiv = document.getElementById('status');

// Función para mostrar mensajes de estado
function mostrarStatus(mensaje, tipo) {
    statusDiv.textContent = mensaje;
    statusDiv.className = `status ${tipo}`;
    setTimeout(() => {
        statusDiv.className = 'status hidden';
    }, 1000);
}

// ULTIMOOOO
async function verItem(item) {
    console.log(item.name)
    //const response = await fetch(`${API_URL}/products/${id}`);
    //const data = await response.json();
    //console.log(data)
}

async function test(text) {
    console.log(typeof text)
    //const response = await fetch(`${API_URL}/products/${id}`);
    //const data = await response.json();
    //console.log(data)
}

const getProducts = async () => {
    try {
        console.log('🔍 Intentando obtener items...');
        const response = await fetch(`${API_URL}/products`);

        if (!response.ok) {
            throw new Error('Error al obtener items');
        }

        const data = await response.json();
        console.log('✅ Items recibidos:', data);

        // Limpiar la lista
        lista_products.innerHTML = '';

        // Mostrar items
        if (data.length === 0) {
            lista_products.innerHTML = '<li style="justify-content: center; color: #999;">No hay items todavía</li>';
        } else {
            data.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `
                            <div class="item-info">
                                <div class="item-nombre">${item.name}</div>
                                <div class="item-categoria">📁 ${item.category.name}</div>
                            </div>
                            <button onclick="test(${item})">👁 Ver</button>
                            <button class="btn-eliminar" onclick="eliminarItem(${item.id})">
                                🗑️ Eliminar
                            </button>
                        `;
                lista_products.appendChild(li);
            });
        }

    } catch (error) {
        console.error('❌ Error:', error);
        lista_products.innerHTML = '<li style="justify-content: center; color: #c00;">❌ Error al cargar items. Revisa la consola.</li>';
        mostrarStatus('Error de CORS o conexión. Revisa la consola.', 'error');
    }    
}

const getCategories = async () => {
    try {
        console.log('🔍 Intentando obtener items...');
        const response = await fetch(`${API_URL}/categories`);

        if (!response.ok) {
            throw new Error('Error al obtener items');
        }

        const data = await response.json();
        console.log('✅ Items recibidos:', data);

        // Limpiar la lista
        lista_categories.innerHTML = '';

        // Mostrar items
        if (data.length === 0) {
            lista_categories.innerHTML = '<li style="justify-content: center; color: #999;">No hay items todavía</li>';
        } else {
            data.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `
                            <div class="item-info">
                                <div class="item-nombre">${item.name}</div>
                            </div>
                            <button onclick="test(${item})">👁 Ver</button>
                            <button class="btn-eliminar" onclick="eliminarItem(${item.id})">
                                🗑️ Eliminar
                            </button>
                        `;
                lista_categories.appendChild(li);
            });
        }

    } catch (error) {
        console.error('❌ Error:', error);
        lista_categories.innerHTML = '<li style="justify-content: center; color: #c00;">❌ Error al cargar items. Revisa la consola.</li>';
        mostrarStatus('Error de CORS o conexión. Revisa la consola.', 'error');
    }    
}

const getLicences = async () => {
    try {
        console.log('🔍 Intentando obtener items...');
        const response = await fetch(`${API_URL}/licences`);

        if (!response.ok) {
            throw new Error('Error al obtener items');
        }

        const data = await response.json();
        console.log('✅ Items recibidos:', data);

        // Limpiar la lista
        lista_licences.innerHTML = '';

        // Mostrar items
        if (data.length === 0) {
            lista_licences.innerHTML = '<li style="justify-content: center; color: #999;">No hay items todavía</li>';
        } else {
            data.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `
                            <div class="item-info">
                                <div class="item-nombre">${item.name}</div>
                            </div>
                            <button onclick="test(${item})">👁 Ver</button>
                            <button class="btn-eliminar" onclick="eliminarItem(${item.id})">
                                🗑️ Eliminar
                            </button>
                        `;
                lista_licences.appendChild(li);
            });
        }

    } catch (error) {
        console.error('❌ Error:', error);
        lista_licences.innerHTML = '<li style="justify-content: center; color: #c00;">❌ Error al cargar items. Revisa la consola.</li>';
        mostrarStatus('Error de CORS o conexión. Revisa la consola.', 'error');
    }    
}

const getUsers = async () => {
    try {
        console.log('🔍 Intentando obtener items...');
        const response = await fetch(`${API_URL}/users`);

        if (!response.ok) {
            throw new Error('Error al obtener items');
        }

        const data = await response.json();
        console.log('✅ Items recibidos:', data);

        // Limpiar la lista
        lista_users.innerHTML = '';

        // Mostrar items
        if (data.length === 0) {
            lista_users.innerHTML = '<li style="justify-content: center; color: #999;">No hay items todavía</li>';
        } else {
            data.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `
                            <div class="item-info">
                                <div class="item-nombre">${item.name}</div>
                            </div>
                            <button onclick="test(${item})">👁 Ver</button>
                            <button class="btn-eliminar" onclick="eliminarItem(${item.id})">
                                🗑️ Eliminar
                            </button>
                        `;
                lista_users.appendChild(li);
            });
        }

    } catch (error) {
        console.error('❌ Error:', error);
        lista_users.innerHTML = '<li style="justify-content: center; color: #c00;">❌ Error al cargar items. Revisa la consola.</li>';
        mostrarStatus('Error de CORS o conexión. Revisa la consola.', 'error');
    }    
}
// FUNCIÓN 2: Crear item (POST)
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nuevoItem = {
        nombre: inputNombre.value,
        categoria: inputCategoria.value || 'Sin categoría'
    };

    try {
        console.log('📤 Enviando nuevo item:', nuevoItem);
        const response = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoItem)
        });

        if (!response.ok) {
            throw new Error('Error al crear item');
        }

        const data = await response.json();
        console.log('✅ Item creado:', data);

        // Limpiar formulario
        inputNombre.value = '';
        inputCategoria.value = '';

        // Refrescar lista
        obtenerItems();
        mostrarStatus('¡Item agregado correctamente!', 'success');

    } catch (error) {
        console.error('❌ Error:', error);
        mostrarStatus('Error al agregar item. Revisa la consola.', 'error');
    }
});

// FUNCIÓN 3: Eliminar item (DELETE)
// async function eliminarItem(id) {
//     if (!confirm('¿Estás seguro de eliminar este item?')) {
//         return;
//     }

//     try {
//         console.log('🗑️ Eliminando item:', id);
//         const response = await fetch(`${API_URL}/items/${id}`, {
//             method: 'DELETE'
//         });

//         if (!response.ok) {
//             throw new Error('Error al eliminar item');
//         }

//         console.log('✅ Item eliminado');
//         obtenerItems();
//         mostrarStatus('Item eliminado correctamente', 'success');

//     } catch (error) {
//         console.error('❌ Error:', error);
//         mostrarStatus('Error al eliminar item', 'error');
//     }
// }


async function eliminarItem(id) {

    const confirmacion = await Swal.fire({
        title: '¿Eliminar item?',
        text: "Esta acción no se puede deshacer!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });

    if (!confirmacion.isConfirmed) return;

    try {
        console.log('🗑️ Eliminando item:', id);
        const response = await fetch(`${API_URL}/products/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Error al eliminar item');
        }

        await Swal.fire({
            title: '✅ Eliminado!',
            text: 'El item se eliminó correctamente.',
            icon: 'success',
            confirmButtonText: 'OK'
        });

        obtenerItems();

    } catch (error) {
        console.error('❌ Error:', error);

        Swal.fire({
            title: 'Error',
            text: 'No se pudo eliminar el item.',
            icon: 'error'
        });
    }
}

const main = () => {
    getProducts();
    getCategories();
    getLicences();
    getUsers();
}

main();
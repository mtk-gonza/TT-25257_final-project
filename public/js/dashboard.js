const API_URL = 'http://localhost:3000/api';
const lista_products = document.getElementById('lista-products');
const lista_categories = document.getElementById('lista-categories');
const lista_licences = document.getElementById('lista-licences');
const lista_users = document.getElementById('lista-users');
const form = document.getElementById('form-crear');
const inputNombre = document.getElementById('input-nombre');
const inputCategoria = document.getElementById('input-categoria');
const statusDiv = document.getElementById('status');
const product_status = document.getElementById('products-status');
const categories_status = document.getElementById('categories-status');
const licences_status = document.getElementById('licences-status');
const users_status = document.getElementById('users-status');

const showStatus = (mensaje, tipo, collection) => {
    switch(collection) {
        case 'products':
            collection = product_status;
            break;
        case 'categories':
            collection = categories_status;
            break;
        case 'licences':
            collection = licences_status;   
            break;
        case 'users':
            collection = users_status; 
            break;  
        default:
            collection = statusDiv;
    }   
    collection.textContent = mensaje;
    collection.className = `status ${tipo}`;
    setTimeout(() => {
        collection.className = 'status hidden';
    }, 3000);
}

const removeItem = async (id, tipo) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este elemento?')) {
        return; 
    }
    try {
        const response = await fetch(`${API_URL}/${tipo}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showStatus('Elemento eliminado correctamente', 'success', tipo);
            switch(tipo) {
                case 'products':
                    getProducts();
                    break;
                case 'categories':
                    getCategories();
                    break;
                case 'licences':
                    getLicences();
                    break;
                case 'users':
                    getUsers();
                    break;
            }
        } else {
            const errorData = await response.json().catch(() => ({}));
            console.error('Error al eliminar:', errorData);
            showStatus(`Error: ${errorData.error || 'No se pudo eliminar'}`, 'error', tipo);
        }
    } catch (error) {
        console.error('Error de red al eliminar:', error);
        showStatus('Error de conexión al eliminar', 'error', tipo);
    }       
};

const getProducts = async () => {
    try {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) {
            throw new Error('Error al obtener items');
        }
        const data = await response.json();
        lista_products.innerHTML = '';
        if (data.length === 0) {
            lista_products.innerHTML = '<li class="item-list">No hay items todavía</li>';
        } else {
            data.forEach(item => {
                const li = document.createElement('li');
                const btn = document.createElement('button');
                li.className = 'item-list'
                li.innerHTML = `
                            <div class="item-info">
                                <div class="item-name">${item.name}</div>
                                <div class="item-category">📁 ${item.category.name}</div>
                            </div>
                            <a class="btn-outline btn-outline-primary" href="http://localhost:3000/product_form/${item.id}">👁 Ver</a>
                        `;
                btn.textContent = '🗑️ Eliminar';
                btn.classList.add('btn-outline', 'btn-outline-danger');
                btn.addEventListener('click', () => removeItem(item.id, 'products'));
                li.appendChild(btn);
                lista_products.appendChild(li);
            });
        }
    } catch (error) {
        console.error('❌ Error:', error);
        lista_products.innerHTML = '<li class="item-list" style="color: #c00;">❌ Error al cargar productos.</li>';
        showStatus('Error de CORS o conexión. Revisa la consola.', 'error', 'products');
    }    
}

const getCategories = async () => {
    try {
        const response = await fetch(`${API_URL}/categories`);
        if (!response.ok) {
            throw new Error('Error al obtener items');
        }
        const data = await response.json();
        lista_categories.innerHTML = '';
        if (data.length === 0) {
            lista_categories.innerHTML = '<li class="item-list">No hay items todavía</li>';
        } else {
            data.forEach(item => {
                const li = document.createElement('li');
                const btn = document.createElement('button');
                li.className = 'item-list'
                li.innerHTML = `
                            <div class="item-info">
                                <div class="item-name">${item.name}</div>
                            </div>
                            <a class="btn-outline btn-outline-primary" href="http://localhost:3000/category_form/${item.id}">👁 Ver</a>
                        `;
                btn.textContent = '🗑️ Eliminar';
                btn.classList.add('btn-outline', 'btn-outline-danger');
                btn.addEventListener('click', () => removeItem(item.id, 'categories'));
                li.appendChild(btn);
                lista_categories.appendChild(li);
            });
        }
    } catch (error) {
        console.error('❌ Error:', error);
        lista_categories.innerHTML = '<li class="item-list" style="color: #c00;">❌ Error al cargar categorias.</li>';
        showStatus('Error de CORS o conexión. Revisa la consola.', 'error', 'categories');
    }    
}

const getLicences = async () => {
    try {
        const response = await fetch(`${API_URL}/licences`);
        if (!response.ok) {
            throw new Error('Error al obtener items');
        }
        const data = await response.json();
        lista_licences.innerHTML = '';
        if (data.length === 0) {
            lista_licences.innerHTML = '<li class="item-list">No hay items todavía</li>';
        } else {
            data.forEach(item => {
                const li = document.createElement('li');
                const btn = document.createElement('button');
                li.className = 'item-list'
                li.innerHTML = `
                            <div class="item-info">
                                <div class="item-name">${item.name}</div>
                            </div>
                            <a class="btn-outline btn-outline-primary" href="http://localhost:3000/licence_form/${item.id}">👁 Ver</a>
                        `;
                btn.textContent = '🗑️ Eliminar';
                btn.classList.add('btn-outline', 'btn-outline-danger');
                btn.addEventListener('click', () => removeItem(item.id, 'licences'));
                li.appendChild(btn);
                lista_licences.appendChild(li);
            });
        }
    } catch (error) {
        console.error('❌ Error:', error);
        lista_licences.innerHTML = '<li class="item-list" style="color: #c00;">❌ Error al cargar licencias.</li>';
        showStatus('Error de CORS o conexión. Revisa la consola.', 'error', 'licences');
    }    
}

const getUsers = async () => {
    try {
        const response = await fetch(`${API_URL}/users`);
        if (!response.ok) {
            throw new Error('Error al obtener items');
        }
        const data = await response.json();
        lista_users.innerHTML = '';
        if (data.length === 0) {
            lista_users.innerHTML = '<li style="class="item-list">No hay items todavía</li>';
        } else {
            data.forEach(item => {
                const li = document.createElement('li');
                const btn = document.createElement('button');
                li.className = 'item-list'
                li.innerHTML = `
                            <div class="item-info">
                                <div class="item-name">${item.name}</div>
                            </div>
                            <a class="btn-outline btn-outline-primary" href="http://localhost:3000/user_form/${item.id}">👁 Ver</a>
                        `;
                btn.textContent = '🗑️ Eliminar';
                btn.classList.add('btn-outline', 'btn-outline-danger');
                btn.addEventListener('click', () => removeItem(item.id, 'users'));
                li.appendChild(btn);
                lista_users.appendChild(li);
            });
        }
    } catch (error) {
        console.error('❌ Error:', error);
        lista_users.innerHTML = '<li class="item-list" style="color: #c00;">❌ Error al cargar items. Revisa la consola.</li>';
        showStatus('Error de CORS o conexión. Revisa la consola.', 'error', 'users');
    }    
}

const main = () => {
    getProducts();
    getCategories();
    getLicences();
    getUsers();
}

main();
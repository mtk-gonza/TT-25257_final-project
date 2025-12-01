const API_URL = 'http://localhost:3000/api';
const urlParams = new URLSearchParams(window.location.search);
const pathSegments = window.location.pathname.split('/');
const id = pathSegments[2];

const token = localStorage.getItem('token');

if (!token) {
    window.location.href = '/login';
}

if (id) {
    document.getElementById('form_title').textContent = 'Edit Category';
    fetch(`${API_URL}/categories/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => {
            if (res.status === 401 || res.status === 403) {
                throw new Error('Acceso denegado');
            }
            return res.json();
        })
        .then(category => {
            document.getElementById('name').value = category.name;
            document.getElementById('description').value = category.description;
        })
        .catch(err => {
            console.error('Error al cargar categoría:', err);
            alert('No se pudo cargar la categoría. Es posible que no tengas permisos.');
            window.location.href = '/dashboard';
        });
}

document.getElementById('category_form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const categoryData = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value
    };

    try {
        const url = id ? `${API_URL}/categories/${id}` : `${API_URL}/categories`;
        const method = id ? 'PUT' : 'POST';
        const res = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(categoryData)
        });

        if (res.ok) {
            alert(id ? 'Categoría actualizada' : 'Categoría creada');
            window.location.href = '/dashboard';
        } else {
            if (res.status === 401 ) {
                alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
            if (res.status === 403) {
                alert('No tienes permisos suficientes');            
            } else {
                const error = await res.json().catch(() => ({}));
                alert('Error: ' + (error.error || 'Falló la operación'));
            }
        }
    } catch (err) {
        console.error('Error al guardar:', err);
        alert('Error de red al guardar la categoría');
    }
});
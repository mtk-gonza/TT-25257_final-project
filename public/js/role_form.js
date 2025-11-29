const API_URL = 'http://localhost:3000/api';
const urlParams = new URLSearchParams(window.location.search);
const pathSegments = window.location.pathname.split('/');
const id = pathSegments[2];

const token = localStorage.getItem('token');

if (!token) {
    alert('Debes iniciar sesión para acceder a esta página');
    window.location.href = '/login';
}

if (id) {
    document.getElementById('form_title').textContent = 'Edit Role';
    fetch(`${API_URL}/roles/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(role => {
        document.getElementById('name').value = role.name;
        document.getElementById('permission').value = role.permission.join('\n');
    }).catch(err => {
        console.error('Error al cargar rol:', err);
    });
}

document.getElementById('role_form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const roleData = {
        name: document.getElementById('name').value,
        permission: document.getElementById('permission').value
            .split('\n')
            .map(s => s.trim())
            .filter(s => s)
    };
    try {
        const url = id ? `${API_URL}/roles/${id}` :` ${API_URL}/roles`;
        const method = id ? 'PUT' : 'POST';
        const res = await fetch(url, {
            method,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(roleData)
        });
        if (res.ok) {
            alert(id ? 'Rol actualizado' : 'Rol creado');
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
        alert('Error de red al guardar el Rol.');
    }
});
const API_URL = 'http://localhost:3000/api';
const roleSelect = document.getElementById('role');
const urlParams = new URLSearchParams(window.location.search);
const pathSegments = window.location.pathname.split('/');
const id = pathSegments[2];

const token = localStorage.getItem('token');

if (!token) {
    alert('Debes iniciar sesión para acceder a esta página');
    window.location.href = '/login';
}

if (id) {
    document.getElementById('form_title').textContent = 'Edit User';
    document.getElementById('label_pwd').textContent = 'New Password';
    fetch(`${API_URL}/users/${id}`)
        .then(res => res.json())
        .then(user => {
            document.getElementById('name').value = user.name;
            document.getElementById('last_name').value = user.last_name;
            document.getElementById('username').value = user.username;
            document.getElementById('role').value = user.role.id;
        }).catch(err => {
            console.error('Error al cargar usuario:', err);
        });
}

const loadRoles = async () => {
    try {
        const [roleRes] = await Promise.all([
            fetch(`${API_URL}/roles`)
        ]);
        const roles = await roleRes.json();
        roles.forEach(role => {
            const opt = document.createElement('option');
            opt.value = role.id;
            opt.textContent = role.name;
            roleSelect.appendChild(opt);
        });
    } catch (err) {
        console.error('Error al cargar roles:', err);
        alert('No se pudieron cargar los roles');
    }
}

loadRoles();

document.getElementById('user_form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userData = {
        name: document.getElementById('name').value,
        last_name: document.getElementById('last_name').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        role_id: document.getElementById('role').value
    };

    try {
        const url = id ? `${API_URL}/users/${id}` : `${API_URL}/users`;
        const method = id ? 'PUT' : 'POST';

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        if (res.ok) {
            alert(id ? 'Usuario actualizado' : 'Usuario creado');
            window.location.href = '/dashboard';
        } else {
            const error = await res.json();
            alert('Error: ' + (error.error || 'Falló la operación'));
        }
    } catch (err) {
        console.error('Error al guardar:', err);
        alert('Error de red al guardar el usuario');
    }
});
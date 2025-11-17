const urlParams = new URLSearchParams(window.location.search);
const pathSegments = window.location.pathname.split('/');
const id = pathSegments[2];

if (id) {
    document.getElementById('form_title').textContent = 'Edit User';
    document.getElementById('label_pwd').textContent = 'New Password';
    fetch(`/api/users/${id}`)
        .then(res => res.json())
        .then(user => {
            document.getElementById('name').value = user.name;
            document.getElementById('last_name').value = user.last_name;
            document.getElementById('username').value = user.username;
        }).catch(err => {
            console.error('Error al cargar usuario:', err);
        });
}

document.getElementById('user_form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userData = {
        name: document.getElementById('name').value,
        last_name: document.getElementById('last_name').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    try {
        const url = id ? `/api/users/${id}` : '/api/users';
        const method = id ? 'PUT' : 'POST';

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        if (res.ok) {
            alert(id ? 'Usuario actualizado' : 'Usuario creado');
            window.location.href = '/home';
        } else {
            const error = await res.json();
            alert('Error: ' + (error.error || 'Falló la operación'));
        }
    } catch (err) {
        console.error('Error al guardar:', err);
        alert('Error de red al guardar el usuario');
    }
});
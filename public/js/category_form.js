const API_URL = 'http://localhost:3000/api';
const urlParams = new URLSearchParams(window.location.search);
const pathSegments = window.location.pathname.split('/');
const id = pathSegments[2];

if (id) {
    document.getElementById('form_title').textContent = 'Edit Category';
    fetch(`${API_URL}/categories/${id}`)
        .then(res => res.json())
        .then(category => {
            document.getElementById('name').value = category.name;
            document.getElementById('description').value = category.description;
        }).catch(err => {
            console.error('Error al cargar categoria:', err);
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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(categoryData)
        });

        if (res.ok) {
            alert(id ? 'Categoria actualizada' : 'Categoria creada');
            window.location.href = '/dashboard';
        } else {
            const error = await res.json();
            alert('Error: ' + (error.error || 'Falló la operación'));
        }
    } catch (err) {
        console.error('Error al guardar:', err);
        alert('Error de red al guardar la categoria');
    }
});
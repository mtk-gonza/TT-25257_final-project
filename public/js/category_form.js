const urlParams = new URLSearchParams(window.location.search);
const pathSegments = window.location.pathname.split('/');
const id = pathSegments[2];

if (id) {
    document.getElementById('form_title').textContent = 'Edit Category';
    fetch(`/api/categories/${id}`)
        .then(res => res.json())
        .then(category => {
            document.getElementById('name').value = category.name;
            document.getElementById('description').value = category.description;
        }).catch(err => {
            console.error('Error al cargar categoria:', err);
        });
}
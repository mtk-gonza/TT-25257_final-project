const urlParams = new URLSearchParams(window.location.search);
const pathSegments = window.location.pathname.split('/');
const id = pathSegments[2];

if (id) {
    document.getElementById('form_title').textContent = 'Edit Licence';
    fetch(`/api/licences/${id}`)
        .then(res => res.json())
        .then(licence => {
            document.getElementById('name').value = licence.name;
            document.getElementById('description').value = licence.description;
            document.getElementById('images').value = licence.images.join('\n');
        }).catch(err => {
            console.error('Error al cargar licencia:', err);
        });
}
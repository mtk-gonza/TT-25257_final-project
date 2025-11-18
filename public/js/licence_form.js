const API_URL = 'http://localhost:3000/api';
const urlParams = new URLSearchParams(window.location.search);
const pathSegments = window.location.pathname.split('/');
const id = pathSegments[2];

if (id) {
    document.getElementById('form_title').textContent = 'Edit Licence';
    fetch(`${API_URL}/licences/${id}`)
        .then(res => res.json())
        .then(licence => {
            document.getElementById('name').value = licence.name;
            document.getElementById('description').value = licence.description;
            document.getElementById('images').value = licence.images.join('\n');
        }).catch(err => {
            console.error('Error al cargar licencia:', err);
        });
}

document.getElementById('licence_form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const licenceData = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        images: document.getElementById('images').value
            .split('\n')
            .map(s => s.trim())
            .filter(s => s)
    };

    try {
        const url = id ? `${API_URL}/licences/${id}` : `${API_URL}/licences`;
        const method = id ? 'PUT' : 'POST';

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(licenceData)
        });

        if (res.ok) {
            alert(id ? 'Licencia actualizada' : 'Licencia creada');
            window.location.href = '/dashboard';
        } else {
            const error = await res.json();
            alert('Error: ' + (error.error || 'Falló la operación'));
        }
    } catch (err) {
        console.error('Error al guardar:', err);
        alert('Error de red al guardar la licencia');
    }
});
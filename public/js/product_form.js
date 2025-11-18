const API_URL = 'http://localhost:3000/api';
const licenceSelect = document.getElementById('licence');
const categorySelect = document.getElementById('category');
const urlParams = new URLSearchParams(window.location.search);
const pathSegments = window.location.pathname.split('/');
const id = pathSegments[2];

async function loadLicencesAndCategories() {
    try {
        const [licencesRes, categoriesRes] = await Promise.all([
            fetch(`${API_URL}/licences`),
            fetch(`${API_URL}/categories`)
        ]);

        const licences = await licencesRes.json();
        const categories = await categoriesRes.json();

        licences.forEach(licence => {
            const opt = document.createElement('option');
            opt.value = licence.id;
            opt.textContent = licence.name;
            licenceSelect.appendChild(opt);
        });

        categories.forEach(category => {
            const opt = document.createElement('option');
            opt.value = category.id;
            opt.textContent = category.name;
            categorySelect.appendChild(opt);
        });
    } catch (err) {
        console.error('Error al cargar licencias o categorías:', err);
        alert('No se pudieron cargar las licencias o categorías');
    }
}

loadLicencesAndCategories();

if (id) {
    document.getElementById('form_title').textContent = 'Edit Product';
    Promise.all([
        fetch(`${API_URL}/products/${id}`).then(res => res.json())
    ]).then(([, product]) => {
        document.getElementById('name').value = product.name;
        document.getElementById('sku').value = product.sku;
        document.getElementById('stock').value = product.stock;
        document.getElementById('price').value = product.price;
        document.getElementById('dues').value = product.dues;
        document.getElementById('discount').value = product.discount;
        document.getElementById('special').checked = product.special;
        document.getElementById('licence').value = product.licence.id;
        document.getElementById('category').value = product.category.id;
        document.getElementById('images').value = product.images.join('\n');
    }).catch(err => {
        console.error('Error al cargar producto:', err);
    });
} else { 
    licenceSelect.innerHTML = '<option value="">Seleccionar licencia</option>';
    categorySelect.innerHTML = '<option value="">Seleccionar categoría</option>';    
}

document.getElementById('product_form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const productData = {
        name: document.getElementById('name').value,
        sku: document.getElementById('sku').value,
        stock: Number(document.getElementById('stock').value),
        price: Number(document.getElementById('price').value),
        dues: Number(document.getElementById('dues').value),
        discount: Number(document.getElementById('discount').value),
        special: document.getElementById('special').checked,
        licence_id: document.getElementById('licence').value,
        category_id: document.getElementById('category').value,
        images: document.getElementById('images').value
            .split('\n')
            .map(s => s.trim())
            .filter(s => s)
    };

    try {
        const url = id ? `${API_URL}/products/${id}` :` ${API_URL}/products`;
        const method = id ? 'PUT' : 'POST';

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });

        if (res.ok) {
            alert(id ? 'Producto actualizado' : 'Producto creado');
            window.location.href = '/dashboard';
        } else {
            const error = await res.json();
            alert('Error: ' + (error.error || 'Falló la operación'));
        }
    } catch (err) {
        console.error('Error al guardar:', err);
        alert('Error de red al guardar el producto');
    }
});
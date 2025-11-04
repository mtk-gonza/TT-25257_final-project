import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '..', 'data', 'products.json');

if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf-8');
}


const writeProducts = (products) => {
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf-8');
};

export const createProduct = (data) => {
    const products = getProducts();
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const thumbnail = `https://example.com/${data.name}.jpg`
    const newProduct = { id: newId, ...data, thumbnail: thumbnail};
    products.push(newProduct);
    writeProducts(products);
    return newProduct;
};

export const getProducts = () => {
    const data = fs.readFileSync(filePath, 'utf-8');
    const products = JSON.parse(data);
    return products
};

export const getProductById = (id) => {
    const products = getProducts();
    const product = products.find(p => p.id === Number(id));
    return product
};

export const updateProductById = (id, updateData) => {
    const products = getProducts();
    const index = products.findIndex(p => p.id === Number(id));
    if (index === -1) return null;
    const thumbnail = `https://example.com/${updateData.name}.jpg`
    products[index] = { ...products[index], name: updateData.name, price: Number(updateData.price), thumbnail };
    writeProducts(products);
    return products[index];
};

export const deleteProductById = (id) => {
    const products = getProducts();
    const initialLength = products.length;
    const filtered = products.filter(p => p.id !== Number(id));
    if (filtered.length === initialLength) return false;

    writeProducts(filtered);
    return true;
};
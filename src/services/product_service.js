import { db } from './../settings/database.js';
import { convertTimestamps } from './../utils/convertTime.js';

export const getAllProducts = async () => {
    const snapshot = await db.collection('products').get();
    const products = [];
    snapshot.forEach(doc => {
        const data = doc.data();
        const cleanData = convertTimestamps(data);
        products.push({ id: doc.id, ...cleanData });
    });
    return products;
};

export const createProduct = async (productData) => {
    const { name, description, price, stock, discount, sku, dues, special, images, licence_id, category_id } = productData;
    const newProduct = {
        name,
        description,
        price,
        stock,
        discount,
        sku,
        dues,
        special,
        images,
        licence_id,
        category_id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };
    const docRef = await db.collection('products').add(newProduct);
    return { id: docRef.id, ...newProduct };
};

export const getProductById = async (id) => {
    const doc = await db.collection('products').doc(id).get();
    if (!doc.exists) return null;
    const data = doc.data();
    const cleanData = convertTimestamps(data);
    return { id: doc.id, ...cleanData };
};

export const updateProductById = async (id, updateData) => {
    const userRef = db.collection('products').doc(id);
    const doc = await userRef.get();
    if (!doc.exists) {
        throw new Error('Producto no encontrado');
    }
    updateData.updated_at = new Date().toISOString();
    await userRef.update(updateData);
    const updatedDoc = await userRef.get();
    return { id: updatedDoc.id, ...updatedDoc.data() };
};

export const deleteProductById = async (id) => {
    const productRef = db.collection('products').doc(id);
    const doc = await productRef.get();
    if (!doc.exists) {
        throw new Error('Producto no encontrado');
    }
    await productRef.delete()
    return { message: 'Producto eliminado correctamente' };
};
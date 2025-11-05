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

export const getProductsByFilters = async (filters) => {
    let query = db.collection('products');
    if (filters.id) {
        const doc = await db.collection('products').doc(filters.id).get();
        if (doc.exists) {
            return [{ id: doc.id, ...doc.data() }];
        }
        return [];
    }
    if (filters.name !== undefined) {
        query = query.where('name', '==', filters.name);
    }
    if (filters.price !== undefined) {
        query = query.where('price', '==', filters.price);
    }
    if (filters.stock !== undefined) {
        query = query.where('stock', '==', filters.stock);
    }
    if (filters.sku !== undefined) {
        query = query.where('sku', '==', filters.sku);
    }
    if (filters.category_id !== undefined) {
        query = query.where('category_id', '==', filters.category_id);
    }
    if (filters.licence_id !== undefined) {
        query = query.where('licence_id', '==', filters.licence_id);
    }
    if (filters.discount !== undefined) {
        query = query.where('discount', '==', filters.discount);
    }
    if (filters.dues !== undefined) {
        query = query.where('dues', '==', filters.dues);
    }
    if (filters.special !== undefined) {
        query = query.where('special', '==', filters.special);
    }

    const snapshot = await query.get();
    const products = [];
    snapshot.forEach(doc => {
        products.push({ id: doc.id, ...doc.data() });
    });

    return products;
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
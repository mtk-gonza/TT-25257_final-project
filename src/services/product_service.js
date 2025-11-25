import { db } from './../settings/database.js';
import { convertTimestamps } from './../utils/convert_time.js';
import { getLicenceByIdSimple } from './licence_service.js';
import { getCategoryByIdSimple } from './category_service.js';

export const getAllProducts = async () => {
    const snapshot = await db.collection('products').get();
    const productPromises = snapshot.docs.map(async (doc) => {
        const data = doc.data();
        const cleanData = convertTimestamps(data);
        const [licence, category] = await Promise.all([
            getLicenceByIdSimple(cleanData.licence_id),
            getCategoryByIdSimple(cleanData.category_id)
        ]);
        const { licence_id, category_id, ...productWithoutIds } = cleanData;
        return {
            id: doc.id,
            ...productWithoutIds,
            licence,
            category
        };
    });
    const products = await Promise.all(productPromises);
    return products;
};

export const createProduct = async (productData) => {
    const { name, description, price, stock, discount, sku, dues, special, images, licence_id, category_id } = productData;
    const existing = await db.collection('products').where('sku', '==', sku).get();
    if (!existing.empty) {
        throw new Error('El SKU ya existe');
    }
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
    const [licence, category] = await Promise.all([
        getLicenceByIdSimple(cleanData.licence_id),
        getCategoryByIdSimple(cleanData.category_id)
    ]);
    const { licence_id, category_id, ...productWithoutIds } = cleanData;
    return { 
        id: doc.id, 
        ...productWithoutIds,
        licence,
        category 
    };
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
    const productPromises = snapshot.docs.map(async (doc) => {
        const data = doc.data();
        const cleanData = convertTimestamps(data);
        const [licence, category] = await Promise.all([
            getLicenceByIdSimple(cleanData.licence_id),
            getCategoryByIdSimple(cleanData.category_id)
        ]);
        const { licence_id, category_id, ...productWithoutIds } = cleanData;
        return {
            id: doc.id,
            ...productWithoutIds,
            licence,
            category
        };
    });
    const products = await Promise.all(productPromises);
    return products;
};

export const updateProductById = async (id, updateData) => {
    const productRef = db.collection('products').doc(id);
    const doc = await productRef.get();
    if (!doc.exists) {
        throw new Error('Producto no encontrado');
    }
    updateData.updated_at = new Date().toISOString();
    await productRef.update(updateData);
    const updatedDoc = await productRef.get();
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
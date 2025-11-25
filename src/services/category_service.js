import { db } from './../settings/database.js';
import { convertTimestamps } from './../utils/convert_time.js';

export const getAllCategories = async () => {
    const snapshot = await db.collection('categories').get();
    const categories = [];
    snapshot.forEach(doc => {
        const data = doc.data();
        const cleanData = convertTimestamps(data);
        categories.push({ id: doc.id, ...cleanData });
    });
    return categories;
};

export const createCategory = async (categoryData) => {
    const { name, description } = categoryData;
    if (!name || !description) {
        throw new Error('Los campos "name" y "description" son obligatorios');
    }
    const newCategory = {
        name,
        description,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };
    const docRef = await db.collection('categories').add(newCategory);
    return { id: docRef.id, ...newCategory };
};

export const getCategoryById = async (id) => {
    const doc = await db.collection('categories').doc(id).get();
    if (!doc.exists) return null;
    const data = doc.data();
    const cleanData = convertTimestamps(data);
    return { id: doc.id, ...cleanData };
};

export const getCategoryByIdSimple = async (id) => {
    const doc = await db.collection('categories').doc(id).get();
    if (!doc.exists) return null;
    const data = doc.data();    
    return { 
        id: doc.id,
        name: data.name,
        description: data.description
    };
};

export const updateCategoryById = async (id, updateData) => {
    const categoryRef = db.collection('categories').doc(id);
    const doc = await categoryRef.get();
    if (!doc.exists) {
        throw new Error('Categoria no encontrada');
    }
    updateData.updated_at = new Date().toISOString();
    await categoryRef.update(updateData);
    const updatedDoc = await categoryRef.get();
    return { id: updatedDoc.id, ...updatedDoc.data() };
};

export const deleteCategoryById = async (id) => {
    const categoryRef = db.collection('categories').doc(id);
    const doc = await categoryRef.get();
    if (!doc.exists) {
        throw new Error('Categoria no encontrado');
    }
    await categoryRef.delete();
    return { message: 'Categoria eliminada correctamente' };
};
import { db } from './../settings/database.js';
import { convertTimestamps } from './../utils/convert_time.js';

export const getAllLicences = async () => {
    const snapshot = await db.collection('licences').get();
    const licences = [];
    snapshot.forEach(doc => {
        const data = doc.data();
        const cleanData = convertTimestamps(data);
        licences.push({ id: doc.id, ...cleanData });
    });
    return licences;
};

export const createLicence = async (licenceData) => {
    const { name, description, images } = licenceData;
    const newCategory = {
        name,
        description,
        images,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };
    const docRef = await db.collection('licences').add(newCategory);
    return { id: docRef.id, ...newCategory };
};

export const getLicenceById = async (id) => {
    const doc = await db.collection('licences').doc(id).get();
    if (!doc.exists) return null;
    const data = doc.data();
    const cleanData = convertTimestamps(data);
    return { id: doc.id, ...cleanData };
};

export const getLicenceByIdSimple = async (id) => {
    const doc = await db.collection('licences').doc(id).get();
    if (!doc.exists) return null;
    const data = doc.data();
    return { 
        id: doc.id,
        name: data.name,
        description: data.description,
        images: data.images
    };
};

export const updateLicenceById = async (id, updateData) => {
    const licenceRef = db.collection('licences').doc(id);
    const doc = await licenceRef.get();
    if (!doc.exists) {
        throw new Error('Licencia no encontrada');
    }
    updateData.updated_at = new Date().toISOString();
    await licenceRef.update(updateData);
    const updatedDoc = await licenceRef.get();
    return { id: updatedDoc.id, ...updatedDoc.data() };
};

export const deleteLicenceById = async (id) => {
    const licenceRef = db.collection('licences').doc(id);
    const doc = await licenceRef.get();
    if (!doc.exists) {
        throw new Error('Licencia no encontrada');
    }
    await licenceRef.delete();
    return { message: 'Licencia eliminada correctamente' };
};
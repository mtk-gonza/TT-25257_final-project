import { db } from './../settings/database.js';
import { convertTimestamps } from './../utils/convert_time.js';

export const getAllRoles = async () => {
    const snapshot = await db.collection('roles').get();
    const roles = [];
    snapshot.forEach(doc => {
        const data = doc.data();
        const cleanData = convertTimestamps(data);
        roles.push({ id: doc.id, ...cleanData });
    });
    return roles;
};

export const createRole = async (roleData) => {
    const { name, permission } = roleData;
    const existing = await db.collection('roles').where('name', '==', name).get();
    if (!existing.empty) throw new Error('Ya existe un rol con ese nombre.');
    const newRole = {
        name,
        permission,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };
    const docRef = await db.collection('roles').add(newRole);
    return { id: docRef.id, ...newRole };
};

export const getRoleById = async (id) => {
    const doc = await db.collection('roles').doc(id).get();
    if (!doc.exists) return null;
    const data = doc.data();
    const cleanData = convertTimestamps(data);
    return { id: doc.id, ...cleanData };
};

export const getRoleByIdSimple = async (id) => {
    const doc = await db.collection('roles').doc(id).get();
    if (!doc.exists) return null;
    const data = doc.data();    
    return { 
        id: doc.id,
        name: data.name
    };
};

export const updateRoleById = async (id, updateData) => {
    const roleRef = db.collection('roles').doc(id);
    const doc = await roleRef.get();
    if (!doc.exists) throw new Error('Rol no encontrado.');
    updateData.updated_at = new Date().toISOString();
    await roleRef.update(updateData);
    const updatedDoc = await roleRef.get();
    return { id: updatedDoc.id, ...updatedDoc.data() };
};

export const deleteRoleById = async (id) => {
    const roleRef = db.collection('roles').doc(id);
    const doc = await roleRef.get();
    if (!doc.exists) throw new Error('Rol no encontrado.');
    await roleRef.delete();
    return { message: 'Rol eliminadao correctamente.' };
};
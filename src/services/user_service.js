import { db } from './../settings/database.js';
import { convertTimestamps } from './../utils/convert_time.js';
import { getRoleByIdSimple } from './role_service.js'
import * as authService from './auth_service.js';

export const getAllUsers = async () => {
    const snapshot = await db.collection('users').get();
    const userPromises = snapshot.docs.map(async (doc) => {
        const data = doc.data();
        const cleanData = convertTimestamps(data);
        const role = await getRoleByIdSimple(cleanData.role_id);
        const { password, salt, role_id, ...roleWithOutIds } = cleanData;
        return {
            id: doc.id,
            ...roleWithOutIds,
            role
        };        
    });
    const users = await Promise.all(userPromises);
    return users;
};

export const createUser = async (userData) => {
    const { name, last_name, username, password, role_id } = userData;
    const user = {
        name,
        last_name,
        username,
        password,
        role_id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };
    const userCrypto = authService.encrypterPassword(user);
    const docRef = await db.collection('users').add(userCrypto);
    return { id: docRef.id, ...userCrypto };
};

export const getUserById = async (id) => {
    const doc = await db.collection('users').doc(id).get();
    if (!doc.exists) return null;
    const data = doc.data();
    const cleanData = convertTimestamps(data);
    const role = await getRoleByIdSimple(cleanData.role_id);
    const { password, salt, role_id, ...safeUser } = cleanData;
    return { 
        id: doc.id, 
        ...safeUser,
        role 
    };
};

export const getUserByUsername = async (username) => {
    if (!username || typeof username !== 'string') {
        throw new Error('Username inválido.');
    }
    const snapshot = await db
        .collection('users')
        .where('username', '==', username.trim())
        .limit(1)
        .get();
    if (snapshot.empty) {
        return null;
    }
    const doc = snapshot.docs[0];
    const data = doc.data();
    const cleanData = convertTimestamps(data);
    const role = await getRoleByIdSimple(cleanData.role_id);
    return { id: doc.id, ...cleanData, role };
};

export const updateUserById = async (id, updateData) => {
    const userRef = db.collection('users').doc(id);
    const doc = await userRef.get();
    if (!doc.exists) {
        throw new Error('Usuario no encontrado.');
    }
    updateData.updated_at = new Date().toISOString();
    const userCrypto = authService.encrypterPassword(updateData);
    await userRef.update(userCrypto);
    const updatedDoc = await userRef.get();
    const cleanData = convertTimestamps(updatedDoc.data());
    const { password, salt, ...safeUser } = cleanData;
    return { id: updatedDoc.id, ...safeUser };
};

export const deleteUserById = async (id) => {
    const userRef = db.collection('users').doc(id);
    const doc = await userRef.get();
    if (!doc.exists) {
        throw new Error('Usuario no encontrado.');
    }
    await userRef.delete();
    return { message: 'Usuario eliminado correctamente.' };
};
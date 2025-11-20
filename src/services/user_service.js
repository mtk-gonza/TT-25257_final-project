import { db } from './../settings/database.js';
import { convertTimestamps } from './../utils/convertTime.js';
import * as authService from './auth_service.js';

export const getAllUsers = async () => {
    const snapshot = await db.collection('users').get();
    const users = [];
    snapshot.forEach(doc => {
        const data = doc.data();
        const cleanData = convertTimestamps(data);
        const { password, salt, ...safeUser } = cleanData;
        users.push({ id: doc.id, ...safeUser });
    });
    return users;
};

export const createUser = async (userData) => {
    const { name, last_name, username, password } = userData;
    if (!name || !last_name || !username || !password) {
        throw new Error('Los campos son obligatorios');
    }
    const user = {
        name,
        last_name,
        username,
        password,
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
    const { password, salt, ...safeUser } = cleanData;
    return { id: doc.id, ...safeUser };
};

export const getUserByUsername = async (username) => {
    if (!username || typeof username !== 'string') {
        throw new Error('Username inválido');
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
    return { id: doc.id, ...cleanData };
};

export const updateUserById = async (id, updateData) => {
    const userRef = db.collection('users').doc(id);
    const doc = await userRef.get();
    if (!doc.exists) {
        throw new Error('Usuario no encontrado');
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
        throw new Error('Usuario no encontrado');
    }
    await userRef.delete();
    return { message: 'Usuario eliminado correctamente' };
};
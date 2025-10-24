import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import * as authService from './auth_service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '..', 'data', 'users.json');

if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf-8');
}

const writeUsers = (users) => {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');
};

export const createUser = (data) => {
    const users = readUsers();
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const userCrypto = authService.encrypterPassword(data);
    const newUser = { id: newId, ...userCrypto };
    users.push(newUser);
    writeUsers(users);
    return newUser;
};

export const readUsers = () => {
    const data = fs.readFileSync(filePath, 'utf-8');
    const users = JSON.parse(data);
    return users
};

export const readUserById = (id) => {
    const users = readUsers();
    const user = users.find(u => u.id === Number(id));
    return user
};

export const readUserByUsername = (username) => {
    const users = readUsers();
    const user = users.find(u => u.username === username);
    return user
};

export const updateUser = (id, updateData) => {
    const users = readUsers();
    const index = users.findIndex(u => u.id === Number(id));
    if (index === -1) return null;
    const userCrypto = authService.encrypterPassword(updateData);
    users[index] = { ...users[index], ...userCrypto };
    writeUsers(users);
    return users[index];
};

export const deleteUser = (id) => {
    const users = readUsers();
    const initialLength = users.length;
    const filtered = users.filter(u => u.id !== Number(id));
    if (filtered.length === initialLength) return false;

    writeUsers(filtered);
    return true;
};
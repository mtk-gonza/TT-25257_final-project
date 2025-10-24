import * as userService from '../services/user_service.js';

export const createUser = async (req, res) => {
    const { name, lastname, username, password } = req.body;
    try {
        if (!name || !lastname || !username || !password) {
            return res.status(400).json({ error: 'Faltan datos requeridos' });
        }
        const existingUser = await userService.readUserByUsername(username);
        if (existingUser) {
            return res.status(409).json({ error: 'El nombre de usuario ya está en uso' });
        }
        const user = { name, lastname, username, password };
        const newUser = await userService.createUser(user);
        return res.status(201).json(newUser);
    } catch (err) {
        console.error('Error en registro:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await userService.readUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getUserById = async (req, res) => {
    const { user_id } = req.params;
    try {
        const user = await userService.readUserById(user_id);
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const updateUserById = async (req, res) => {
    const { user_id } = req.params;
    const updateData = req.body;
    try {
        const updatedUser = await userService.updateUser(user_id, updateData);
        if (!updatedUser) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const deleteProductById = async (req, res) => {
    const { user_id } = req.params;
    try {
        const deletedUser = await userService.deleteUser(user_id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }
        res.json(deletedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
import * as userLocalService from './../services/user_local_service.js';

export const createUser = async (req, res) => {
    try {
        const { name, last_name, username, password } = req.body;
        if (!name || !last_name || !username || !password) {
            return res.status(400).json({ error: 'Faltan datos requeridos' });
        }
        const existingUser = await userLocalService.getUserByUsername(username);
        if (existingUser) {
            return res.status(409).json({ error: 'El nombre de usuario ya está en uso' });
        }
        const user = { name, last_name, username, password };
        const newUser = await userLocalService.createUser(user);
        return res.status(201).json(newUser);
    } catch (err) {
        console.error('Error en registro:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await userLocalService.getUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { user_id } = req.params;
        const user = await userLocalService.getUserById(user_id);
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const updateUserById = async (req, res) => {
    try {
        const { user_id } = req.params;
        const updateData = req.body;
        const updatedUser = await userLocalService.updateUserById(user_id, updateData);
        if (!updatedUser) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const deleteUserById = async (req, res) => {
    try {
        const { user_id } = req.params;
        const deletedUser = await userLocalService.deleteUserById(user_id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }
        res.json(deletedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
import * as userService from './../services/user_service.js';

export const createUser = async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await userService.createUser(userData);
        res.status(201).json(newUser);
    } catch (err) {
        console.error('Error en createUser del controller:', err);
        if (err.message === 'Ya existe un usuario con ese nombre de usuario.') return res.status(409).json({ error: err.message });
        res.status(500).json({ error: 'No se pudo crear el Usuario.' });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (err) {
        console.error('Error en getAllUsers del controller:', err);
        res.status(500).json({ error: 'Error al obtener Usuarios.' });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { user_id } = req.params;
        const user = await userService.getUserById(user_id.trim());
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado.' });
        res.json(user);
    } catch (err) {
        console.error('Error en getUserById del controller:', err);
        res.status(500).json({ error: 'Error al obtener el Usuario.' });
    }
};

export const updateUserById = async (req, res) => {
    try {
        const { user_id } = req.params;
        const updateData = req.body;
        const updatedUser = await userService.updateUserById(user_id, updateData);
        res.status(200).json(updatedUser);
    } catch (err) {
        console.error('Error en updateUser del controller:', err);
        if (err.message === 'Usuario no encontrado.') return res.status(404).json({ error: err.message });
        res.status(500).json({ error: 'No se pudo actualizar el Usuario.' });
    }
};

export const deleteUserById = async (req, res) => {
    try {
        const { user_id } = req.params;
        const response = await userService.deleteUserById(user_id);
        res.status(200).json({ message: response.message });
    } catch (err) {
        console.error('Error en deleteUser del controller:', err);
        if (err.message === 'Usuario no encontrado.') return res.status(404).json({ error: err.message });
        res.status(500).json({ error: 'No se pudo eliminar el Usuario.' });
    }
};
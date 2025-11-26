import * as userService from './../services/user_service.js';

export const createUser = async (req, res) => {
    try {
        const { name, last_name, username, password } = req.body;
        if (!name || !last_name|| !username || !password) {
            return res.status(400).json({ error: 'Faltan campos' });
        }
        const existingUser = await userService.getUserByUsername(username);
        if (existingUser) {
            return res.status(409).json({ error: 'El nombre de Usuario ya está en uso.' });
        }
        const userData = {
            name,
            last_name,
            username,
            password
        }
        const newUser = await userService.createUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error en createUser del controller:', error);
        res.status(500).json({ error: 'No se pudo crear el Usuario.' });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        console.error('Error en getAllUsers del controller:', error);
        res.status(500).json({ error: 'Error al obtener Usuarios.' });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { user_id } = req.params;
        if (!user_id || typeof user_id !== 'string' || user_id.trim() === '') {
            return res.status(400).json({ error: 'ID de usuario inválido' });
        }
        const user = await userService.getUserById(user_id.trim());
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error en getUserById del controller:', error);
        res.status(500).json({ error: 'Error al obtener el Usuario.' });
    }
};

export const updateUserById = async (req, res) => {
    try {
        const { user_id } = req.params;
        const updateData = req.body;
        const updatedUser = await userService.updateUserById(user_id, updateData);
        res.status(200).json(updatedUser);
    } catch (error) {
        if (error.message === 'Usuario no encontrado.') {
            return res.status(404).json({ error: error.message });
        }
        if (error.message.includes('campos')) {
            return res.status(400).json({ error: error.message });
        }
        console.error('Error en updateUserController:', error);
        res.status(500).json({ error: 'No se pudo actualizar el Usuario.' });
    }
};

export const deleteUserById = async (req, res) => {
    try {
        const { user_id } = req.params;
        await userService.deleteUserById(user_id);
        res.status(200).json({ message: 'Usuario eliminado correctamente.' });
    } catch (error) {
        if (error.message === 'Usuario no encontrado.') {
            return res.status(404).json({ error: error.message });
        }
        console.error('Error en deleteUserController:', error);
        res.status(500).json({ error: 'No se pudo eliminar el Usuario.' });
    }
};
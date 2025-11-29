import * as userService from './../services/user_service.js';
import * as authService from './../services/auth_service.js';
import { generateToken } from './../utils/token_generator.js';

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Se requieren usuario y contraseña' });
        }
        const user = await userService.getUserByUsername(username);
        if (!user) {
            return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
        }
        const validPassword = await authService.validateUser(user, password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
        }
        const token = generateToken(user);
        return res.status(200).json({ token: token });

    } catch (error) {
        console.error('Error en login:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const register = async (req, res) => {
    const { name, last_name, username, password } = req.body;
    try {
        if (!name || !last_name || !username || !password) {
            return res.status(400).json({ error: 'Faltan datos requeridos' });
        }
        const existingUser = await userService.getUserByUsername(username);
        if (existingUser) {
            return res.status(409).json({ error: 'El nombre de usuario ya está en uso' });
        }
        const role_id = 'bkal0Noc77fqgeMmqxue'
        const user = { name, last_name, username, password, role_id };
        const newUser = await userService.createUser(user);
        return res.status(201).json(newUser);
    } catch (err) {
        console.error('Error en registro:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}
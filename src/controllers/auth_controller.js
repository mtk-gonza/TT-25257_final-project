import * as userService from './../services/user_service.js';
import * as authService from './../services/auth_service.js';
import { generateToken } from './../utils/token_generator.js';

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ 
                success: false,
                message: 'Se requieren usuario y contraseña.' 
            });
        }
        const user = await userService.getUserByUsername(username);
        const validPassword = await authService.validateUser(user, password);
        if (!user || !validPassword) {
            return res.status(401).json({ 
                success: false,
                message: 'Usuario o contraseña incorrectos.' 
            });
        }
        const token = generateToken(user);
        return res.status(200).json({ 
            success: true,
            message: 'Inicio de sesión correcto.',
            token: token 
        });

    } catch (err) {
        console.error('Error en login controller:', err);
        return res.status(500).json({ 
            success: false,
            message: 'Error interno del servidor' 
        });
    }
}

export const register = async (req, res) => {
    const { name, last_name, username, password } = req.body;
    try {
        if (!name || !last_name || !username || !password) {
            return res.status(400).json({ 
                success: false,
                message: 'Faltan datos requeridos.' 
            });
        }
        const existingUser = await userService.getUserByUsername(username);
        if (existingUser) {
            return res.status(409).json({ 
                success: false,
                message: 'El nombre de usuario no esta disponible.' 
            });
        }
        const role_id = 'vhdWvKes3ERh6Efk1YAl'
        const user = { name, last_name, username, password, role_id };
        const newUser = await userService.createUser(user);
        return res.status(201).json({
            success: true,
            message: 'Usuario registrado exitosamente.',
            data: newUser
        });
    } catch (err) {
        console.error('Error en registro:', err);
        return res.status(500).json({ 
            success: false,
            message: 'Error interno del servidor.' 
        });
    }
}
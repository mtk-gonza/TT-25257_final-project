import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './../settings/config.js';

export const generateToken = (userData) => { 
    const { password, salt, created_at, update_at, role_id, ...user} = userData
    const expiration = { expiresIn: '1h' }; 
    return jwt.sign(user, JWT_SECRET, expiration); 
}
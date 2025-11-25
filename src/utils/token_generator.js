import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './../settings/config.js';

export const generateToken = (userData) => { 
    const user = {id: userData.id, email: userData.email}; 
    const expiration = { expiresIn: '1h' }; 
    return jwt.sign(user, JWT_SECRET, expiration); 
}
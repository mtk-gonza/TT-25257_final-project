import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './../settings/config.js';
 
export const authentication = (req, res, next) => { 
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.sendStatus(401);
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
        return res.sendStatus(403); 
        }
        req.user = user;
        next();
    });
} 
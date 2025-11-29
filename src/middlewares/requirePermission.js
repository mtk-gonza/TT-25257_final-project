import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './../settings/config.js';

export const requirePermission = (requiredPermission) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }
        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            const userPermissions = decoded.role?.permission || [];
            if (!userPermissions.includes(requiredPermission)) {
                return res.status(403).json({ message: 'Permisos insuficientes' });
            }
            req.user = decoded;
            next();
        } catch (err) {
            return res.status(401).json({ message: 'Token inválido o expirado' });
        }
    };
};
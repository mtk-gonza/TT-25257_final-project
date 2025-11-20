import crypto from 'crypto';

export const encrypterPassword = user => {
    user.salt = crypto.randomBytes(128).toString('base64');
    user.password = crypto.createHmac('sha256', user.salt).update(user.password).digest('hex');
    return user;
};

export const validateUser = async (user, password) => {
    try {
        if (!user || !password) {
            return false;
        }
        const newHash = await crypto.createHmac('sha256', user.salt).update(password).digest('hex');
        return newHash == user.password;
    } catch (error) {
        console.error('Error validando contraseña:', error);
        return false;
    }
};
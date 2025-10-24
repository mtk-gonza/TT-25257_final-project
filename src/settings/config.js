import 'dotenv/config';

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || 'localhost';
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export {
    PORT,
    HOST,
    JWT_SECRET
};
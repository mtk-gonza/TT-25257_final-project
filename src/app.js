import express from 'express';
import cors from 'cors';
import { PORT } from './settings/config.js';
//Routers
import { publicRouter } from './routes/public_router.js';
import { authRouter } from './routes/auth_router.js';
import { roleRouter } from './routes/role_router.js';
import { userRouter } from './routes/user_router.js';
import { licenceRouter } from './routes/licence_router.js';
import { categoryRouter } from './routes/category_router.js';
import { productRouter } from './routes/product_router.js';

export const app = express();
//Settings
app.set('port', PORT);
//Middlewares
app.use(cors());
/*
// Configuración avanzada: Permitir dominios específicos 
const corsOptions = { 
    // Dominios permitidos 
    origin: ['https://example.com', 'https://anotherdomain.com'], 
    // Métodos HTTP permitidos 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    // Encabezados permitidos 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true // Permitir cookies o credenciales 
}; 
app.use(cors(corsOptions)); 
*/

//Routes 
app.use(express.json());
app.use(publicRouter);
app.use('/api/auth', authRouter);
app.use('/api/roles', roleRouter);
app.use('/api/users', userRouter);
app.use('/api/licences', licenceRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter);

// Middleware global de manejo de errores
app.use((req, res, next) => {
    res.status(404).send('Recurso no encontrado o ruta inválida.');
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal en el servidor.' });
});
import express from 'express';
import { authRouter } from './routes/auth_router.js';
import { userRouter } from './routes/user_router.js';
import { licenceRouter } from './routes/licence_router.js';
import { categoryRouter } from './routes/category_router.js';
import { productRouter } from './routes/product_router.js';

//Routers para endpoints de datos locales
import { userLocalRouter } from './routes/user_local_router.js';
import { productLocalRouter } from './routes/product_local_router.js';  

export const app = express();

app.use(express.static('public'))
app.use(express.json());
app.use('/api', authRouter);
app.use('/api/users', userRouter);
app.use('/api/licences', licenceRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter);

// Endpoints para datos locales
app.use('/api/local/users', userLocalRouter);
app.use('/api/local/products', productLocalRouter);

// Middleware global de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal en el servidor' });
});
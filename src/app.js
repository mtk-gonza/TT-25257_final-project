import express from 'express';
import { authRouter } from './routes/auth_router.js';
import { userRouter } from './routes/user_router.js';
import { productRouter } from './routes/product_router.js';

export const app = express();

app.use(express.static('public'))
app.use(express.json());
app.use('/api', authRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

// Middleware global de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal en el servidor' });
});
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { PORT } from './settings/config.js';

export const app = express();

//Settings
app.set('port', PORT);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
//Routers
import { authRouter } from './routes/auth_router.js';
import { userRouter } from './routes/user_router.js';
import { licenceRouter } from './routes/licence_router.js';
import { categoryRouter } from './routes/category_router.js';
import { productRouter } from './routes/product_router.js';
//Routers para endpoints de datos locales
import { userLocalRouter } from './routes/user_local_router.js';
import { productLocalRouter } from './routes/product_local_router.js';  

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
app.get('/docs', (req, res) => {
  res.sendFile(path.join(projectRoot, 'public', 'pages', 'docs.html'));
});
app.get('/about', (req, res) => {
  res.sendFile(path.join(projectRoot, 'public', 'pages', 'about.html'));
});
app.use(express.static(path.join(projectRoot, 'public')));
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
app.use((req, res, next) => {
    res.status(404).send('Recurso no encontrado o ruta inválida.');
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal en el servidor' });
});
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..', '..');

export const publicRouter = express.Router();

publicRouter.use(express.static(path.join(projectRoot, 'public')));

publicRouter.get('/product_form', (req, res) => {
    res.sendFile(path.join(projectRoot, 'public', 'pages', 'product_form.html'));
});
publicRouter.get('/product_form/:id', (req, res) => {
    const { id } = req.params;
    if (!id || typeof id !== 'string') {
        return res.status(400).send('ID inválido');
    }
    res.sendFile(path.join(projectRoot, 'public', 'pages', 'product_form.html'));
});

publicRouter.get('/category_form', (req, res) => {
    res.sendFile(path.join(projectRoot, 'public', 'pages', 'category_form.html'));
});
publicRouter.get('/category_form/:id', (req, res) => {
    const { id } = req.params;
    if (!id || typeof id !== 'string') {
        return res.status(400).send('ID inválido');
    }
    res.sendFile(path.join(projectRoot, 'public', 'pages', 'category_form.html'));
});

publicRouter.get('/licence_form', (req, res) => {
    res.sendFile(path.join(projectRoot, 'public', 'pages', 'licence_form.html'));
});
publicRouter.get('/licence_form/:id', (req, res) => {
    const { id } = req.params;
    if (!id || typeof id !== 'string') {
        return res.status(400).send('ID inválido');
    }
    res.sendFile(path.join(projectRoot, 'public', 'pages', 'licence_form.html'));
});

publicRouter.get('/user_form', (req, res) => {
    res.sendFile(path.join(projectRoot, 'public', 'pages', 'user_form.html'));
});
publicRouter.get('/user_form/:id', (req, res) => {
    const { id } = req.params;
    if (!id || typeof id !== 'string') {
        return res.status(400).send('ID inválido');
    }
    res.sendFile(path.join(projectRoot, 'public', 'pages', 'user_form.html'));
});

publicRouter.get('/:name', (req, res) => {
    const { name } = req.params;
    const allowedPages = ['dashboard', 'docs', 'about', 'login', 'register']; 

    if (!allowedPages.includes(name)) {
        return res.status(404).send('Página no encontrada');
    }

    res.sendFile(path.join(projectRoot, 'public', 'pages', `${name}.html`));
});
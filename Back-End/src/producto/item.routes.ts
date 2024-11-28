import { Router } from 'express';
import { sanitizeItemInput, findAll, findOne, add, update, remove, searchItemsByText, findItemsByCategory, imagenProducto } from './item.controler.js';

export const itemRouter = Router();

itemRouter.get('/', findAll);
itemRouter.get('/:id', findOne);

itemRouter.post('/', sanitizeItemInput, add);
// itemRouter.post('/', imagenProducto.single('foto'), sanitizeItemInput, add);

itemRouter.put('/:id', sanitizeItemInput, update);
itemRouter.patch('/:id', sanitizeItemInput, update);
itemRouter.delete('/:id', remove);

// Nuevas rutas para búsqueda y filtrado
itemRouter.get('/search', searchItemsByText); // Buscar items por texto
itemRouter.get('/category/:categoryId', findItemsByCategory); // Obtener items por categoría

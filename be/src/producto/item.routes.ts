// Revisar para imágenes

import { Router } from 'express';
import { sanitizeItemInput, findAll, findOne, add, update, remove, searchItemsByText, findItemsByCategory, imagenProducto, cargaImagenes, uploadDir } from './item.controler.js';

export const itemRouter = Router();

// No se usan:
itemRouter.get('/', findAll);

// Se usan:
itemRouter.post('/', sanitizeItemInput, add);
itemRouter.patch('/:id', sanitizeItemInput, update);
itemRouter.delete('/:id', remove);
// itemRouter.post('/', imagenProducto.single('foto'), sanitizeItemInput, add); ???
itemRouter.get('/search', searchItemsByText); // Buscar items por texto
itemRouter.get('/category/:categoryId', findItemsByCategory); // Obtener items por categoría
itemRouter.get('/:id', findOne);
// Ruta para manejar la carga de imágenes
itemRouter.post('/imagenesProductos/multi', imagenProducto, cargaImagenes);

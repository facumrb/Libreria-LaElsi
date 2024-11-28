import { Router } from 'express';
import { findAll, findOne, add, update, remove, searchCategorias } from './categoria.controler.js';

export const categoriaRouter = Router();

categoriaRouter.get('/', findAll);
categoriaRouter.get('/:id', findOne);
categoriaRouter.post('/', add);
categoriaRouter.put('/:id', update);
categoriaRouter.delete('/:id', remove);

// Ruta para buscar categorías por nombre o descripción
categoriaRouter.get('/search', searchCategorias);

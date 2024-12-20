import { Router } from 'express';
import { findAll, findOne, add, update, remove, searchCategorias, sanitizeCategoriaInput } from './categoria.controler.js';

export const categoriaRouter = Router();

categoriaRouter.get('/', findAll);
categoriaRouter.get('/:id', findOne);
categoriaRouter.post('/', sanitizeCategoriaInput, add);
categoriaRouter.patch('/:id', sanitizeCategoriaInput, update);
categoriaRouter.delete('/:id', remove);

// Ruta para buscar categorías por nombre o descripción
categoriaRouter.get('/search', searchCategorias);

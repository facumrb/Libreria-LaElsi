import { Router } from 'express';
import { sanitizeItemInput, findAll, findOne, add, update, remove, searchItemsByText, findItemsByCategory, imagenProducto } from './item.controler.js';

export const itemRouter = Router();

// No se usan:
itemRouter.get('/', findAll);
itemRouter.put('/:id', sanitizeItemInput, update);

// Se usan:
itemRouter.post('/', sanitizeItemInput, add);
itemRouter.patch('/:id', sanitizeItemInput, update);
itemRouter.delete('/:id', remove);
// itemRouter.post('/', imagenProducto.single('foto'), sanitizeItemInput, add); ???
itemRouter.get('/search', searchItemsByText); // Buscar items por texto
itemRouter.get('/category/:categoryId', findItemsByCategory); // Obtener items por categoría
itemRouter.get('/:id', findOne);
/*itemRouter.post('/imagenesProductos/single', imagenProducto.single('fotoProducto'), (req, res) => {
  console.log(req.file);
  res.send('Terminado');
});
*/

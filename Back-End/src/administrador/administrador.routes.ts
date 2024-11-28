import { Router } from 'express';
import { sanitizeAdministradorInput, findAll, findOne, add, update, remove, login, getAccountInfo } from './administrador.controler.js';

export const administradorRouter = Router();

administradorRouter.get('/', findAll);
administradorRouter.get('/:id', findOne);
administradorRouter.post('/', sanitizeAdministradorInput, add);
administradorRouter.delete('/:id', remove);
administradorRouter.post('/login', login); // Ruta para el login

// Rutas para obtener y actualizar la cuenta del administrador
administradorRouter.get('/account/:id', getAccountInfo); // Obtener información de cuenta
administradorRouter.put('/account/:id', sanitizeAdministradorInput, update); // Actualizar información de cuenta
administradorRouter.put('/:id', sanitizeAdministradorInput, update);
administradorRouter.patch('/:id', sanitizeAdministradorInput, update);

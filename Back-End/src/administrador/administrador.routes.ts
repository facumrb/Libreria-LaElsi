import { Router } from 'express';
import { sanitizeAdministradorInput, findAll, findOne, add, update, remove, login, getAccountInfo } from './administrador.controler.js';

export const administradorRouter = Router();

// No se usan:
administradorRouter.get('/', findAll);
administradorRouter.get('/:id', findOne);
administradorRouter.post('/', sanitizeAdministradorInput, add);

// Se usan:
administradorRouter.post('/login', login); // Ruta para el login
administradorRouter.get('/account/:id', getAccountInfo); // Obtener información de cuenta
administradorRouter.delete('/:id', remove);
administradorRouter.patch('/:id', sanitizeAdministradorInput, update);
// administradorRouter.put('/account/:id', sanitizeAdministradorInput, updateAccount); // Actualizar información de cuenta

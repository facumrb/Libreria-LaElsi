import 'reflect-metadata';
import express from 'express';
import { administradorRouter } from './administrador/administrador.routes.js';
import { categoriaRouter } from './producto/categoria.routes.js';
import { itemRouter } from './producto/item.routes.js';
import { orm, syncSchema } from './shared/db/orm.js';
import { RequestContext } from '@mikro-orm/core';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

//luego de los middlewares base
app.use((req, res, next) => {
  RequestContext.create(orm.em, next);
});
//antes de las rutas y middlewares de negocio

app.use('/api/items/categorias', categoriaRouter);
app.use('/api/items', itemRouter);
app.use('/api/administradores', administradorRouter);

app.use((_, res) => {
  return res.status(404).send({ message: 'Recurso no encontrado' });
});

await syncSchema(); //never in production

app.listen(3000, () => {
  console.log('Server runnning on http://localhost:3000/');
});

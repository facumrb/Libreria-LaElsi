import { Request, Response, NextFunction } from 'express';
import { Categoria } from './categoria.entity.js';
import { orm } from '../shared/db/orm.js';

const em = orm.em;

function sanitizeCategoriaInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    estado: req.body.estado,
    items: req.body.items,
  };
  //more checks here

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}

async function searchCategorias(req: Request, res: Response) {
  const { query } = req.query; // Obtener el texto de búsqueda

  try {
    const categorias = await em.find(
      Categoria,
      {
        $or: [{ nombre: { $like: `%${query}%` } }, { descripcion: { $like: `%${query}%` } }],
      },
      { populate: ['items'] }
    );
    res.status(200).json({ message: 'Categorías encontradas', data: categorias });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const { nombre, descripcion } = req.body.sanitizedInput;

    if (!nombre || !descripcion) {
      return res.status(400).json({ message: 'Nombre y descripción son requeridos' });
    }

    const categoriaData = {
      nombre,
      descripcion,
      estado: req.body.sanitizedInput.estado || 'Activo',
    };

    const categoria = em.create(Categoria, categoriaData);
    await em.flush();

    res.status(201).json({ message: 'Categoría creada', data: categoria });
  } catch (error: any) {
    console.error('Error al crear categoría:', error);
    res.status(500).json({ message: 'Error al crear la categoría' });
  }
}

async function findAll(req: Request, res: Response) {
  try {
    const categorias = await em.find(Categoria, {}, { populate: ['items'] });
    res.status(200).json({ message: 'Todas las Categorías fueron encontradas', data: categorias });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const categoria = await em.findOneOrFail(Categoria, { id }, { populate: ['items'] });
    res.status(200).json({ message: 'Categoría encontrada', data: categoria });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const categoria = await em.findOneOrFail(Categoria, { id });
    em.assign(categoria, req.body.sanitizedInput);
    await em.flush();
    res.status(200).json({ message: 'Categoría actualizada', data: categoria });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const categoria = await em.findOneOrFail(Categoria, { id }, { populate: ['items'] });
    await em.removeAndFlush(categoria);
    res.status(200).send({ message: 'Categoría eliminada' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { sanitizeCategoriaInput, findAll, findOne, add, update, remove, searchCategorias };

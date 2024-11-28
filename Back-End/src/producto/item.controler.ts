import { Request, Response, NextFunction } from 'express';
import { Item } from './item.entity.js';
import { orm } from '../shared/db/orm.js';
import multer from 'multer';
import path from 'path';

const em = orm.em;

function sanitizeItemInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    categoria: req.body.categoria,
    foto: req.body.foto,
    decripcion: req.body.descripcion,
    precio: req.body.precio,
    marca: req.body.marca,
    cantVendidos: req.body.cantVendidos,
    estado: req.body.estado,
    stock: req.body.stock,
    //fechaDeAlta: req.body.fechaDeAlta,
    //fechaDeActualizacion: req.body.fechaDeActualizacion,
    //aReservar: req.body.aReservar,
    //cantidadAReservar: req.body.cantidadAReservar,
  };
  //more checks here

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'imagenesProductos/'); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Renombrar el archivo
  },
});

const imagenProducto = multer({ storage });

// Función para agregar un nuevo item con la imagen
async function add(req: Request, res: Response) {
  try {
    const { nombre, categoria, precio, marca, stock } = req.body.sanitizedInput;
    const foto = req.file?.path; // Obtener la ruta de la imagen cargada

    // Validaciones para asegurarse de que los atributos no sean nulos
    if (!nombre) {
      return res.status(400).json({ message: 'El nombre es requerido' });
    }
    if (!categoria) {
      return res.status(400).json({ message: 'La categoría es requerida' });
    }
    if (precio === undefined || precio === null) {
      return res.status(400).json({ message: 'El precio es requerido' });
    }
    if (!marca) {
      return res.status(400).json({ message: 'La marca es requerida' });
    }
    if (stock === undefined || stock === null) {
      return res.status(400).json({ message: 'El stock es requerido' });
    }

    // Crear un nuevo item utilizando los datos sanitizados del cuerpo de la solicitud
    const itemData = {
      ...req.body.sanitizedInput,
      foto, // Asignar la ruta de la imagen al item
      estado: req.body.sanitizedInput.estado || 'Activo',
      cantVendidos: 0, // Inicializar con 0
      // aReservar: false,
      // cantidadAReservar: 0,
    };

    const item = em.create(Item, itemData);
    await em.flush(); // Guardar el nuevo item en la base de datos

    res.status(201).json({ message: 'Item creado', data: item });
  } catch (error: any) {
    console.error('Error al crear el item:', error);
    res.status(500).json({ message: 'Error al crear el item: ' + error.message });
  }
}

// Función para buscar items por texto
async function searchItemsByText(req: Request, res: Response) {
  const { query } = req.query; // Obtener el texto de búsqueda

  try {
    const items = await em.find(Item, {
      $or: [{ nombre: { $like: `%${query}%` } }, { descripcion: { $like: `%${query}%` } }, { marca: { $like: `%${query}%` } }],
    }); // Buscar por nombre, descripcion y marca
    res.status(200).json({ message: 'Items encontrados', data: items });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

// Función para obtener items por categoría
async function findItemsByCategory(req: Request, res: Response) {
  const categoryId = Number(req.params.categoryId); // Obtener ID de categoría

  try {
    const items = await em.find(Item, { categoria: categoryId }); // Buscar por categoría
    res.status(200).json({ message: 'Items encontrados en la categoría', data: items });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findAll(req: Request, res: Response) {
  try {
    const items = await em.find(Item, {}, { populate: ['categoria'] });
    res.status(200).json({ message: 'Todos los Items fueron encontrados', data: items });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const item = await em.findOneOrFail(Item, { id }, { populate: ['categoria'] });
    res.status(200).json({ message: 'Item encontrado', data: item });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const itemAActualizar = await em.findOneOrFail(Item, { id });
    em.assign(itemAActualizar, req.body.sanitizedInput);
    await em.flush();
    res.status(200).json({ message: 'Item actualizado', data: itemAActualizar });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const item = em.getReference(Item, id);
    await em.removeAndFlush(item);
    res.status(200).send({ message: 'Item eliminado' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { sanitizeItemInput, findAll, findOne, add, update, remove, searchItemsByText, findItemsByCategory, imagenProducto };

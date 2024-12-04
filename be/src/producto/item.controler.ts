import { Request, Response, NextFunction } from 'express';
import express from 'express';
import { Item } from './item.entity.js';
import { orm } from '../shared/db/orm.js';
/* import multer from 'multer';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, 'imagenesProductos');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración de multer para cargar múltiples imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'imagenesProductos'); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Renombrar el archivo
  }
});

let cantMaxFotos = 10;
const imagenProducto = multer({ storage }).array('Fotos', cantMaxFotos); // 'Fotos' es el nombre del campo en el formulario

// Definir la función de carga de imágenes
async function cargaImagenes(req: express.Request, res: express.Response) {
  // Verificar si se han subido archivos
  if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
    return res.status(400).send('No se han subido archivos.');
  }

  try {
    const filePaths: string[] = [];

    // Convertir req.files a un arreglo si es necesario
    const filesArray = Array.isArray(req.files) ? req.files : Object.values(req.files).flat();

    for (const file of filesArray) {
      const uploadPath = path.join(__dirname, 'imagenes', file.originalname);
      await fs.promises.writeFile(uploadPath, file.buffer);
      filePaths.push(uploadPath);
    }

    res.status(200).send('Imágenes guardadas: ' + filePaths.join(', '));
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send('Error al guardar las imágenes: ' + error.message);
    } else {
      res.status(500).send('Error al guardar las imágenes: ' + String(error));
    }
  }
} */

const em = orm.em;

function sanitizeItemInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    categoria: req.body.categoria,
    //fotos: req.body.fotos,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    marca: req.body.marca,
    cant_vendidos: req.body.cant_vendidos,
    estado: req.body.estado,
    stock: req.body.stock
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

async function add(req: Request, res: Response) {
  try {
    /* const { nombre, categoria, precio, marca, stock } = req.body.sanitizedInput;
    //  descripcion, estado, cant_vendidos ?
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

    // Obtener las rutas de todas las imágenes cargadas
    const fotos = [];
    if (Array.isArray(req.files)) {
      for (let i = 0; i < req.files.length; i++) {
        fotos.push(req.files[i].path);
      }
    } else {
      console.error('req.files no es un arreglo');
    }
    // Crear un nuevo item utilizando los datos sanitizados del cuerpo de la solicitud
    const itemData = {
      ...req.body.sanitizedInput,
      fotos // Asignar la ruta de la imagen al item
      // aReservar: false,
      // cantidadAReservar: 0,
    }; */

    const item = em.create(Item, req.body.sanitizedInput); //anteriormente itemData
    await em.flush();

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
      $or: [{ nombre: { $like: `%${query}%` } }, { descripcion: { $like: `%${query}%` } }, { marca: { $like: `%${query}%` } }]
    }); // Buscar por nombre, descripcion y marca
    res.status(200).json({ message: 'Items encontrados', data: items });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

// Función para obtener items por categoría
async function findItemsByCategory(req: Request, res: Response) {
  const categoriaId = Number(req.params.id); // Obtener ID de categoría

  try {
    const items = await em.find(Item, { categoria: categoriaId }); // Buscar por categoría
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
    const itemAActualizar = await em.getReference(Item, id);
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

export { sanitizeItemInput, findAll, findOne, add, update, remove, searchItemsByText, findItemsByCategory /* cargaImagenes, imagenProducto, uploadDir */ };

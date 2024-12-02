import { Request, Response, NextFunction } from 'express';
import { Administrador } from './administrador.entity.js';
import { orm } from '../shared/db/orm.js';
// import bcrypt from 'bcryptjs';
// Crear endpoint, verificar credencial y manejar respuesta.

const em = orm.em;

function sanitizeAdministradorInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    // foto: req.body.foto,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    telefono: req.body.telefono,
    // direccion: req.body.direccion,
    // fechaDeAlta: req.body.fechaDeAlta,
    usuario: req.body.usuario,
    password: req.body.password,
    email: req.body.email
  };
  //more checks here

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}

// Obtener información de cuenta del administrador
async function getAccountInfo(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const administrador = await em.findOneOrFail(Administrador, id);
    // Filtrar los datos que se enviarán al cliente
    const accountInfo = {
      // foto: administrador.foto,
      id: administrador.id,
      nombre: administrador.nombre,
      apellido: administrador.apellido,
      telefono: administrador.telefono,
      usuario: administrador.usuario,
      email: administrador.email
      // password: administrador.password, // Considera no enviar la contraseña en la respuesta
    };

    res.status(200).json({ message: 'Información de cuenta obtenida', data: accountInfo });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const administrador = await em.findOneOrFail(Administrador, id);
    res.status(200).json({ message: 'Administrador encontrado', data: administrador });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

//Agregar Políticas de Contraseña y Autenticación y Tokens

async function login(req: Request, res: Response) {
  const { usuario, password } = req.body;

  // Validaciones para asegurarse de que el usuario y la contraseña fueron ingresados
  /*if (!usuario) {
    return res.status(400).json({ message: 'El usuario es requerido' });
  }
  if (!password) {
    return res.status(400).json({ message: 'La contraseña es requerida' });
  }*/

  try {
    // Buscar el administrador por usuario y contraseña
    const administrador = await em.findOne(Administrador, { usuario, password });

    if (!administrador) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrecta' });
    }
    // Este enfoque es incorrecto porque no se deben almacenar contraseñas en texto plano en la base de datos. Las contraseñas deberían ser almacenadas en forma hasheada por razones de seguridad.
    // En el futuro generar un token de autenticación

    /* Comparar la contraseña proporcionada con la contraseña hasheada
    const passwordValida = await bcrypt.compare(password, administrador.password);

    if (!passwordValida) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrecta' });
    }
    */

    const accountInfo = {
      // foto: administrador.foto,
      id: administrador.id, // Obtengo el id de Administrador porque luego es el que uso para acceder al administrador mediante otras funciones
      nombre: administrador.nombre,
      apellido: administrador.apellido,
      telefono: administrador.telefono,
      usuario: administrador.usuario,
      email: administrador.email
      // password: administrador.password, // Considera no enviar la contraseña en la respuesta
    };

    // Si todo es correcto, puedes devolver algún tipo de token o mensaje
    res.status(200).json({ message: 'Inicio de sesión exitoso', data: accountInfo });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
  // Recomendaciones:
  /*
  Bloqueo después de varios intentos fallidos
  Registro de auditoría para inicios de sesión: IP del usuario, fecha y hora, dispositivo utilizado
  Implementar sistema de tokens para manejar autenticación
  */
}

async function findAll(req: Request, res: Response) {
  try {
    const administradores = await em.find(Administrador, {});
    res.status(200).json({ message: 'Todos los Administradores fueron encontrados', data: administradores });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const administrador = em.create(Administrador, req.body.sanitizedInput);
    /* Si la contraseña se está creando, hashearla
    if (req.body.sanitizedInput.password) {
      administrador.password = await bcrypt.hash(req.body.sanitizedInput.password, 10);
    }
    */
    await em.flush();
    res.status(201).json({ message: 'Administrador creado', data: administrador });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

// Actualizar información de cuenta del administrador
async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const administradorToUpdate = await em.getReference(Administrador, id);
    em.assign(administradorToUpdate, req.body.sanitizedInput);

    /* Si la contraseña se está actualizando, hashearla
    if (req.body.sanitizedInput.password) {
      administradorToUpdate.password = await bcrypt.hash(req.body.sanitizedInput.password, 10);
    }
    */

    await em.flush();
    res.status(200).json({ message: 'Información de cuenta actualizada' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const administrador = em.getReference(Administrador, id);
    await em.removeAndFlush(administrador);
    res.status(200).send({ message: 'Administrador eliminado' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { login, sanitizeAdministradorInput, findAll, findOne, add, update, remove, getAccountInfo };

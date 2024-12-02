import { IApiCategoria } from './categoria.model';

export interface IApiItem {
  id: number; // Identificador único del item
  nombre: string; // Nombre del item
  foto?: string; // URL de la foto del item
  descripcion?: string; // Descripción del item
  precio: number; // Precio del item
  marca: string; // Marca del item
  cantVendidos: number; // Cantidad de veces que el item ha sido vendido
  estado: string; // Estado del item (por ejemplo: "Activo" o "Inactivo")
  stock: number; // Cantidad disponible en stock
  categoria: IApiCategoria; // Categoría a la que pertenece el item
}

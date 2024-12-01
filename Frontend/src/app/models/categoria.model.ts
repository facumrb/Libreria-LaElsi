import { IApiItem } from './item.model';

export interface IApiCategoria {
  id: number; // Identificador único de la categoría
  nombre: string; // Nombre de la categoría
  descripcion: string; // Descripción de la categoría
  estado: string; // Estado de la categoría (por ejemplo: "Activo" o "Inactivo")
  items?: IApiItem[]; // Lista de items relacionados
}

import { Entity, Property, ManyToOne, Rel } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Categoria } from './categoria.entity.js';

@Entity()
export class Item extends BaseEntity {
  @Property({ nullable: false, unique: true })
  nombre!: string;

  /* // Campo para almacenar las rutas de las imágenes
  @Property({ nullable: true })
  fotos?: string[]; // Array de rutas de imágenes */

  @Property({ nullable: true })
  descripcion?: string;

  @Property({ nullable: false })
  precio!: number;

  @Property({ nullable: false })
  marca!: string;

  @Property({ nullable: false })
  cant_vendidos!: number;

  @Property({ nullable: false })
  estado!: string; // Activo o Inactivo

  @Property({ nullable: false })
  stock!: number;

  // @Property({ nullable: false })
  // fechaDeAlta!: date?;

  // @Property({ nullable: false })
  //fechaDeActualizacion!: date?;

  // @Property({ nullable: false })
  // aReservar!: boolean;

  // @Property({ nullable: false })
  // cantidadAReservar!: number;

  @ManyToOne(() => Categoria, { nullable: false })
  categoria!: Rel<Categoria>;
}

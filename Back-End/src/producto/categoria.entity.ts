import { Entity, OneToMany, Property, Cascade, Collection } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Item } from './item.entity.js';

@Entity()
export class Categoria extends BaseEntity {
  @Property({ nullable: false, unique: true }) // debe ser unique
  nombre!: string;

  @Property({ nullable: false }) // Capaz si permite nulos
  descripcion!: string;

  @Property({ nullable: false })
  estado!: string; // Activo o Inactivo -- 'Activo' | 'Inactivo'

  @OneToMany(() => Item, (item) => item.categoria, {
    cascade: [Cascade.ALL]
  })
  items = new Collection<Item>(this);
}

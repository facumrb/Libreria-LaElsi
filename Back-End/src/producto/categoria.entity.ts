import { Entity, OneToMany, Property, Cascade, Collection } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Item } from './item.entity.js';

@Entity()
export class Categoria extends BaseEntity {
  @Property({ nullable: false, unique: true })
  nombre!: string;

  @Property({ nullable: true })
  descripcion!: string;

  @Property({ nullable: false })
  estado!: string; // Activo o Inactivo

  @OneToMany(() => Item, (item) => item.categoria, {
    cascade: [Cascade.ALL],
  })
  Items = new Collection<Item>(this);
}

import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';

@Entity()
export class Administrador extends BaseEntity {
  // @Property({ type: 'string', nullable: true })
  // foto?: string;

  @Property({ type: 'string', nullable: false })
  nombre!: string;

  @Property({ type: 'string', nullable: false })
  apellido!: string;

  @Property({ type: 'string', nullable: true })
  telefono?: string;

  // @Property({ type: 'string', nullable: true })
  // direccion?: string;

  // @Property({ type: 'Date' })
  // fechaDeAlta!: Date;

  @Property({ type: 'string', nullable: false, unique: true })
  usuario!: string;

  @Property({ type: 'string', nullable: false })
  password!: string;

  @Property({ type: 'string', nullable: true, unique: true })
  email?: string;
}

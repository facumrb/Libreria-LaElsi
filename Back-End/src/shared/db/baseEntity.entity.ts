import { PrimaryKey /*, DataTimeType*/ } from '@mikro-orm/core';

export abstract class BaseEntity {
  @PrimaryKey()
  id?: number;
}
/*

  @Property({ type: DateTimeType })
  fechaDeAlta? = new Date()

  @Property({
    type: DateTimeType,
    onUpdate: () => new Date(),
  })
  fechaDeActualizacion? = new Date()

*/

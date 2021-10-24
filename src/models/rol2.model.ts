import {Entity, model, property, hasMany} from '@loopback/repository';
import {Usuario2} from './usuario2.model';
import {UsuarioRol2} from './usuario-rol2.model';

@model()
export class Rol2 extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @hasMany(() => Usuario2, {through: {model: () => UsuarioRol2}})
  usuario2s: Usuario2[];

  constructor(data?: Partial<Rol2>) {
    super(data);
  }
}

export interface Rol2Relations {
  // describe navigational properties here
}

export type Rol2WithRelations = Rol2 & Rol2Relations;

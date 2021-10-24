import {Entity, model, property} from '@loopback/repository';

@model()
export class UsuarioRol2 extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
  })
  rol2Id?: string;

  @property({
    type: 'string',
  })
  usuario2Id?: string;

  constructor(data?: Partial<UsuarioRol2>) {
    super(data);
  }
}

export interface UsuarioRol2Relations {
  // describe navigational properties here
}

export type UsuarioRol2WithRelations = UsuarioRol2 & UsuarioRol2Relations;

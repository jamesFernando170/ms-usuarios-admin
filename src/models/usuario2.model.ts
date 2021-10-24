import {Entity, model, property} from '@loopback/repository';

@model()
export class Usuario2 extends Entity {
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
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
    required: false,
  })
  clave?: string;

  @property({
    type: 'string',
    required: true,
  })
  documento: string;

  @property({
    type: 'string',
    default: true,
  })
  estado?: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaNacimiento: string;


  constructor(data?: Partial<Usuario2>) {
    super(data);
  }
}

export interface Usuario2Relations {
  // describe navigational properties here
}

export type Usuario2WithRelations = Usuario2 & Usuario2Relations;

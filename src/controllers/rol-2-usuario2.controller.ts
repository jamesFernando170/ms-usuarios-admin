import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
Rol2,
UsuarioRol2,
Usuario2,
} from '../models';
import {Rol2Repository} from '../repositories';

export class Rol2Usuario2Controller {
  constructor(
    @repository(Rol2Repository) protected rol2Repository: Rol2Repository,
  ) { }

  @get('/rol2s/{id}/usuario2s', {
    responses: {
      '200': {
        description: 'Array of Rol2 has many Usuario2 through UsuarioRol2',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario2)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Usuario2>,
  ): Promise<Usuario2[]> {
    return this.rol2Repository.usuario2s(id).find(filter);
  }

  @post('/rol2s/{id}/usuario2s', {
    responses: {
      '200': {
        description: 'create a Usuario2 model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuario2)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Rol2.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario2, {
            title: 'NewUsuario2InRol2',
            exclude: ['_id'],
          }),
        },
      },
    }) usuario2: Omit<Usuario2, '_id'>,
  ): Promise<Usuario2> {
    return this.rol2Repository.usuario2s(id).create(usuario2);
  }

  @patch('/rol2s/{id}/usuario2s', {
    responses: {
      '200': {
        description: 'Rol2.Usuario2 PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario2, {partial: true}),
        },
      },
    })
    usuario2: Partial<Usuario2>,
    @param.query.object('where', getWhereSchemaFor(Usuario2)) where?: Where<Usuario2>,
  ): Promise<Count> {
    return this.rol2Repository.usuario2s(id).patch(usuario2, where);
  }

  @del('/rol2s/{id}/usuario2s', {
    responses: {
      '200': {
        description: 'Rol2.Usuario2 DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Usuario2)) where?: Where<Usuario2>,
  ): Promise<Count> {
    return this.rol2Repository.usuario2s(id).delete(where);
  }
}

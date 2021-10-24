import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {UsuarioRol2} from '../models';
import {UsuarioRol2Repository} from '../repositories';

export class UsuarioRol2Controller {
  constructor(
    @repository(UsuarioRol2Repository)
    public usuarioRol2Repository: UsuarioRol2Repository,
  ) { }

  @post('/usuario-rol2s')
  @response(200, {
    description: 'UsuarioRol2 model instance',
    content: {'application/json': {schema: getModelSchemaRef(UsuarioRol2)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioRol2, {
            title: 'NewUsuarioRol2',
            exclude: ['_id'],
          }),
        },
      },
    })
    usuarioRol2: Omit<UsuarioRol2, '_id'>,
  ): Promise<UsuarioRol2> {
    return this.usuarioRol2Repository.create(usuarioRol2);
  }

  @post('/usuarios-rol2', {
    responses: {
      '200': {
        description: 'create a Rol model instance',
        content: {'application/json': {schema: getModelSchemaRef(UsuarioRol2)}}, //**Le agregue eschema USUARIOROL */
      },
    },
  })
  async createRelation(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioRol2, {
            title: 'NewRolInUsuario',
            exclude: ['_id'],
          }),
        },
      },
    }) datos: Omit<UsuarioRol2, '_id'>,
  ): Promise<UsuarioRol2 | null> {
    console.log(datos);
    let registro = await this.usuarioRol2Repository.create(datos);
    if (registro) {
      return registro
    } return null
  }

  @get('/usuario-rol2s/count')
  @response(200, {
    description: 'UsuarioRol2 model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(UsuarioRol2) where?: Where<UsuarioRol2>,
  ): Promise<Count> {
    return this.usuarioRol2Repository.count(where);
  }

  @get('/usuario-rol2s')
  @response(200, {
    description: 'Array of UsuarioRol2 model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UsuarioRol2, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UsuarioRol2) filter?: Filter<UsuarioRol2>,
  ): Promise<UsuarioRol2[]> {
    return this.usuarioRol2Repository.find(filter);
  }

  @patch('/usuario-rol2s')
  @response(200, {
    description: 'UsuarioRol2 PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioRol2, {partial: true}),
        },
      },
    })
    usuarioRol2: UsuarioRol2,
    @param.where(UsuarioRol2) where?: Where<UsuarioRol2>,
  ): Promise<Count> {
    return this.usuarioRol2Repository.updateAll(usuarioRol2, where);
  }

  @get('/usuario-rol2s/{id}')
  @response(200, {
    description: 'UsuarioRol2 model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UsuarioRol2, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(UsuarioRol2, {exclude: 'where'}) filter?: FilterExcludingWhere<UsuarioRol2>
  ): Promise<UsuarioRol2> {
    return this.usuarioRol2Repository.findById(id, filter);
  }

  @patch('/usuario-rol2s/{id}')
  @response(204, {
    description: 'UsuarioRol2 PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioRol2, {partial: true}),
        },
      },
    })
    usuarioRol2: UsuarioRol2,
  ): Promise<void> {
    await this.usuarioRol2Repository.updateById(id, usuarioRol2);
  }

  @put('/usuario-rol2s/{id}')
  @response(204, {
    description: 'UsuarioRol2 PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuarioRol2: UsuarioRol2,
  ): Promise<void> {
    await this.usuarioRol2Repository.replaceById(id, usuarioRol2);
  }

  @del('/usuario-rol2s/{id}')
  @response(204, {
    description: 'UsuarioRol2 DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuarioRol2Repository.deleteById(id);
  }
}
